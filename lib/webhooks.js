import { db } from "./firebase.js";

import {
  doc,
  collection,
  query,
  where,
  serverTimestamp,
  getDocs,
  deleteDoc,
  setDoc,
  addDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  writeBatch,
  limit,
} from "firebase/firestore";
import { getUser } from "./users.js";
import { getRandomHexColor } from "../utils/functions.js";

const collName = "webhooks";

function publicId(name) {
  return name.replace(/ /g, "-") + "-" + Date.now().toString(36);
}

export async function addWebhook(name, message, userId) {
  console.log("Adding new webhook ...");

  try {
    const docRef = await addDoc(collection(db, collName), {
      userId,
      name,
      messages: [message],
      advanced: false,
      active: true,
      public: false,
      color: getRandomHexColor(),
      created_at: serverTimestamp(),
      publicId: publicId(name),
    });
    console.log("Document written with: ", docRef);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function addAdvancedWebhook(name, pair, userId, fixedLotSize) {
  console.log("Adding new advanced webhook ...");

  try {
    const docRef = await addDoc(collection(db, collName), {
      userId,
      name,
      pair,
      advanced: true,
      active: true,
      public: false,
      fixedLotSize,
      publicId: publicId(name),
      color: getRandomHexColor(),
      created_at: serverTimestamp(),
    });
    console.log("Document written with: ", docRef);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function getWebhooksByUserId(userId, onlyPublic = false) {
  const q = query(
    collection(db, collName),
    where("userId", "==", userId)
    // orderBy("created_at", "desc")
  );
  console.log("Getting webhooks by userId ...", userId);

  const querySnapshot = await getDocs(q);
  const whs = [];
  querySnapshot.forEach((doc) => {
    let webhook = doc.data();
    //console.log(`${doc.id} => ${doc.data()}`);
    if ((onlyPublic && webhook.public) || !onlyPublic)
      whs.push({ id: doc.id, ...webhook });
  });

  // console.log(whs);
  return whs;
}

export async function getWebhook(id) {
  if (!id) return null;
  const docRef = doc(db, collName, id);
  const docSnap = await getDoc(docRef);

  console.log("Getting webhook ...", id);

  if (docSnap.exists()) {
    const wh = docSnap.data();
    return { id, ...wh };
  } else {
    console.log("No such document!");
    return null;
  }
}

export async function getWebhookByPublicId(publicId) {
  if (!publicId) return null;

  console.log("Getting webhook by public ID ...", publicId);

  const q = query(collection(db, collName), where("publicId", "==", publicId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No matching documents found.");
    return null;
  }

  const docSnap = querySnapshot.docs[0];
  const id = docSnap.id;
  const wh = docSnap.data();

  const tradesCollectionRef = collection(db, collName, id, "trades");
  const tradesDocs = await getDocs(tradesCollectionRef);
  let trades = [];
  tradesDocs.forEach((doc) => {
    trades = trades.concat(doc.data());
  });

  return { id, ...wh, trades };
}

export const searchWebhooksByName = async (name) => {
  if (!name) return null;

  console.log("Searshing webhook by name ...", name);
  // name = name.toLowerCase();

  const endName = name + "\uf8ff"; // End of Unicode character to simulate the end of a prefix

  const q = query(
    collection(db, collName),
    // where("name", ">=", name),
    where("name", "<", endName)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No matching documents found.");
    return [];
  }

  const webhooks = [];
  querySnapshot.forEach((doc) => {
    let webhook = doc.data();
    if (webhook.name.toLowerCase().includes(name.toLowerCase())) {
      if (webhook.public) webhooks.push({ id: doc.id, ...webhook });
    }
  });

  return webhooks;
};

export async function getWebhookWithTrades(id) {
  if (!id) return null;
  const docRef = doc(db, collName, id);
  const docSnap = await getDoc(docRef);

  console.log("Getting webhook ...", id);

  if (docSnap.exists()) {
    const wh = docSnap.data();

    const q = collection(db, collName, id, "trades");
    const tradesDocs = await getDocs(q);
    let trades = [];
    tradesDocs.forEach((doc) => {
      trades = trades.concat(doc.data());
    });

    return { id, ...wh, trades };
  } else {
    console.log("No such document!");
    return null;
  }
}

export async function getUserWebhooksWithTrades(userId, onlyPublic = false) {
  const webhooks = await getWebhooksByUserId(userId, onlyPublic);
  const webhooksWithTradesPromises = webhooks.map(async (webhook) => {
    const webhookWithTrade = await getWebhookWithTrades(webhook.id);
    return webhookWithTrade;
  });

  const webhooksWithTrades = await Promise.all(webhooksWithTradesPromises);
  return webhooksWithTrades;
}

// Recursively delete documents in batches
async function deleteCollectionBatch(collectionRef, batchSize) {
  const q = query(collectionRef, limit(batchSize));
  const querySnapshot = await getDocs(q);
  const batch = writeBatch(db);

  querySnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  if (querySnapshot.size >= batchSize) {
    // Continue deleting if there are more documents to delete
    return deleteCollectionBatch(collectionRef, batchSize);
  }
}

export async function deleteWebhook(id) {
  const docRef = doc(db, collName, id);
  const collectionRef = collection(docRef, "trades");

  console.log("Delete webhook ...", id);

  try {
    // Start the recursive deletion of the trades collection
    await deleteCollectionBatch(collectionRef, 500);

    const d = await deleteDoc(docRef);

    return d;
  } catch (e) {
    console.log(e);
    return { error: "An error occured!" };
  }
}

export async function addMessage(id, message) {
  console.log("Adding new message ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    messages: arrayUnion(message),
  });

  // const nwh = await getWebhook(id);
  // return nwh;
  return true;
}

export async function editMessage(id, updatedMessage, oldMessage) {
  console.log("Editing message ... ", id);

  const msgDocRef = doc(db, collName, id);
  const msgDocSnapshot = await getDoc(msgDocRef);

  if (msgDocSnapshot.exists()) {
    const msgData = msgDocSnapshot.data();
    const { messages } = msgData;

    const messageIndex = messages.findIndex(
      (msg) => msg.label === oldMessage.label
    );

    if (messageIndex !== -1) {
      messages[messageIndex] = updatedMessage;

      await updateDoc(msgDocRef, {
        messages: messages,
      });

      // const nwh = await getWebhook(id);
      return true;
    } else {
      throw new Error(
        `Message with label "${updatedMessage.label}" not found in document ${id}`
      );
    }
  } else {
    throw new Error(`Document with ID ${id} does not exist`);
  }
}

export async function deleteMessage(id, message) {
  console.log("Deleeting new message ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    messages: arrayRemove(message),
  });

  return true;
}

export async function activeWebhook(id, active) {
  const msgDoc = doc(db, collName, id);
  // console.log("Activate webhook ...", id, active);

  const r = await updateDoc(msgDoc, {
    active,
  });

  // const nwh = await getWebhook(id);
  // nwh["id"] = id;
  return r;
}

export async function publicWebhook(id, ispublic) {
  const msgDoc = doc(db, collName, id);
  const w = await getWebhook(id);
  let pId = w.publicId;

  if (ispublic || !pId) {
    pId = publicId(w.name);
  }

  const r = await updateDoc(msgDoc, {
    public: ispublic,
    publicId: pId,
  });

  // const nwh = await getWebhook(id);
  // nwh["id"] = id;
  return r;
}

export async function addMT4Account(id, accountId) {
  console.log("Adding new MT4 account ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    MT4: arrayUnion(accountId),
  });

  const nwh = await getWebhook(id);
  return nwh;
}

export async function deleteMT4Account(id, accountId) {
  console.log("Deleeting new MT4 account ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    MT4: arrayRemove(accountId),
  });

  const nwh = await getWebhook(id);
  return nwh;
}

export async function updateWebhookName(userId, id, name) {
  console.log("Update webhook name ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    name,
    publicId: publicId(name),
  });

  const r = getWebhooksByUserId(userId);
  return r;

  // const nwh = await getMTAccount(id);
  // return nwh;
}

export async function updateWebhookPair(userId, id, pair) {
  console.log("Update webhook pair name ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    pair,
  });

  const r = getWebhooksByUserId(userId);
  return r;

  // const nwh = await getMTAccount(id);
  // return nwh;
}

export async function updateWebhookData(userId, id, name, pair, fixedLotSize) {
  console.log("Update webhook data  ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    name,
    pair,
    fixedLotSize,
  });

  const r = getWebhooksByUserId(userId);
  return r;
}

export async function updateWebhookColor(userId, id, color) {
  console.log("Update webhook color ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    color,
  });

  const r = getWebhooksByUserId(userId);
  return r;

  // const nwh = await getMTAccount(id);
  // return nwh;
}

export async function updateWebhookApps(userId, id, apps) {
  console.log("Update webhook apps ... ", id);
  const msgDoc = doc(db, collName, id);

  const r1 = await updateDoc(msgDoc, {
    apps: { ...apps },
  });

  // return r1;
  const r = getWebhooksByUserId(userId);
  return r;

  // const nwh = await getMTAccount(id);
  // return nwh;
}

export async function newWebhookTrade(webhookId, accountId, tradeId, tradeSrc) {
  console.log("New webhook trade ... ", webhookId);

  const coll = collection(db, collName, webhookId, "trades");

  try {
    const docRef = await addDoc(coll, {
      tradeId,
      accountId,
      tradeSrc,
      created_at: serverTimestamp(),
    });
    console.log("Document written with: ", webhookId);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function completeWebhookTradeData(
  webhookId,
  tradeId,
  accountId,
  tradeSrc,
  data
) {
  console.log("Complete webhook trade data ...", webhookId, data);

  const q = query(
    collection(db, collName, webhookId, "trades"),
    where("tradeId", "==", tradeId),
    where("accountId", "==", accountId),
    where("tradeSrc", "==", tradeSrc)
  );

  const querySnapshot = await getDocs(q);

  // Use a for...of loop to handle async/await correctly
  for (const docSnapshot of querySnapshot.docs) {
    const docRef = doc(db, collName, webhookId, "trades", docSnapshot.id); // Get the document reference using doc.id
    await updateDoc(docRef, {
      trade: { ...data },
    });
  }

  return querySnapshot;
}
