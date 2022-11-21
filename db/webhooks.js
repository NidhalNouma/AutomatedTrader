import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  query,
  where,
  serverTimestamp,
  getDocs,
  setDoc,
  addDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { firebaseConfig } from "../utils/constant";

const collName = "webhooks";
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export async function addWebhook(name, message, url, userId) {
  console.log("Adding new webhook ...");

  try {
    const docRef = await addDoc(collection(db, collName), {
      userId,
      name,
      url,
      messages: [message],
      active: true,
      public: false,
      color: getRandomColor(),
      created_at: serverTimestamp(),
    });
    console.log("Document written with: ", docRef);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function getWebhooksByUserId(userId) {
  const q = query(
    collection(db, collName),
    where("userId", "==", userId)
    // orderBy("created_at", "desc")
  );
  console.log("Getting webhooks by userId ...", userId);

  const querySnapshot = await getDocs(q);
  const whs = [];
  querySnapshot.forEach((doc) => {
    //console.log(`${doc.id} => ${doc.data()}`);
    whs.push({ id: doc.id, ...doc.data() });
  });

  console.log(whs);
  return whs;
}

export async function getWebhook(id) {
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

export async function addMessage(id, message) {
  console.log("Adding new message ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    messages: arrayUnion(message),
  });

  const nwh = await getWebhook(id);
  return nwh;
}

export async function deleteMessage(id, message) {
  console.log("Deleeting new message ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    messages: arrayRemove(message),
  });
}

export async function activeWebhook(id, active) {
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    active,
  });

  const nwh = await getWebhook(id);
  nwh["id"] = id;
  return nwh;
}

export async function publicWebhook(id, ispublic) {
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    public: ispublic,
  });

  const nwh = await getWebhook(id);
  nwh["id"] = id;
  return nwh;
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

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
