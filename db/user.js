import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
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
import { deleteSubscription } from "./subscriptions";
import { firebaseConfig } from "../utils/constant";
import axios from "axios";
const collName = "users";

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const updateProfilePicture = async (photoURL) => {
  const auth = getAuth();
  const r = await updateProfile(auth.currentUser, {
    //   displayName: "Jane Q. User",
    photoURL,
  });

  return auth.currentUser;
};

export async function addNewUser(
  userId,
  email,
  displayName,
  metadata,
  photoURL
) {
  console.log("Adding or updating new user ... ");

  try {
    const existUser = await getUser(userId);
    if (existUser) {
      if (!existUser.displayName)
        await updateUserData(userId, "displayName", displayName);
      if (!existUser.metadata)
        await updateUserData(userId, "metadata", { ...metadata });

      if (!existUser.photoURL)
        await updateUserData(userId, "photoURL", photoURL);
      return true;
    }

    const docRef = await setDoc(
      doc(db, collName, userId),
      {
        telegram: "",
        active: true,
        email,
        displayName,
        metadata: { ...metadata },
        photoURL,
        subscriptionId: "",
        cbCustomerId: "",
        created_at: serverTimestamp(),
      }
      // { merge: true }
    );

    console.log("Document written with: ", docRef);

    await axios.post("/api/klavio/" + userId);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function getUser(id) {
  if (!id) return null;
  const docRef = doc(db, collName, id);
  const docSnap = await getDoc(docRef);

  console.log("Getting user ...", id);

  if (docSnap.exists()) {
    const user = docSnap.data();

    return { id, ...user };
  } else {
    console.log("No such document!");
    return null;
  }
}

export async function updateUserTelegram(id, telegramChatId) {
  console.log("Update user telegram ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    telegram: telegramChatId,
    telegramArr: arrayUnion(telegramChatId),
  });

  const nwh = await getUser(id);
  return nwh;
}

export async function getUserByTelegram(chatId) {
  const q = query(
    collection(db, collName),
    where("telegram", "==", chatId)
    // orderBy("created_at", "desc")
  );
  console.log("Getting user by telegram chat id ...", chatId);

  const querySnapshot = await getDocs(q);
  const whs = [];
  querySnapshot.forEach((doc) => {
    //console.log(`${doc.id} => ${doc.data()}`);
    whs.push({ id: doc.id, ...doc.data() });
  });

  console.log(whs);
  return whs;
}

export async function updateUserData(id, key, value, getuser = true) {
  console.log("Update user data ... ", key, value, id);
  const msgDoc = doc(db, collName, id);

  const u = await updateDoc(msgDoc, {
    [key]: value,
  });

  if (getuser) {
    const nwh = await getUser(id);
    return nwh;
  } else return u;
}

export async function updateSubsciption(
  id,
  subId,
  cusId,
  getuser = true,
  oldSubscription = null
) {
  console.log("Update user subscription ... ", id, subId);
  const msgDoc = doc(db, collName, id);

  if (oldSubscription) {
    await deleteSubscription(oldSubscription);
  }

  const u = await updateDoc(msgDoc, {
    subscriptionId: subId,
    cbCustomerId: cusId,
  });

  if (getuser) {
    const nwh = await getUser(id);
    return nwh;
  } else return u;
}

export async function updateUserDatas(id, data, getuser = true) {
  console.log("Update user datas ... ", id, data);
  const msgDoc = doc(db, collName, id);

  const u = await updateDoc(msgDoc, data);
  if (getuser) {
    const nwh = await getUser(id);
    return nwh;
  } else return u;
}

export async function searchByDisplayName(displayName) {
  const q = query(
    collection(db, collName)
    // where("displayName", ">=", displayName)
    // orderBy("created_at", "desc")
  );

  console.log("Getting users by displayName ...", displayName);

  const querySnapshot = await getDocs(q);
  const r = [];
  displayName = displayName.toLowerCase();
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    //console.log(`${doc.id} => ${doc.data()}`);
    if (data?.displayName?.toLowerCase()?.search(displayName) >= 0)
      r.push({ id: doc.id, ...data });
  });

  console.log(r);
  return r;
}

// TS lifetime
const TScollName = "tslifetime";

export async function addTSLifetimeUser(data) {
  console.log("Adding ts lifetime user ... ");

  if (!data.Email) return;

  const d = await checkTSlifetime(data.Email);
  if (d?.length > 0) return;

  try {
    const docRef = await addDoc(collection(db, TScollName), data);

    console.log("Document written with: ", docRef);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function checkTSlifetime(email) {
  if (!email) return null;

  console.log("Checking TS lifetime user ...", email);

  const q = query(collection(db, TScollName), where("Email", "==", email));

  const querySnapshot = await getDocs(q);
  const usrs = [];
  querySnapshot.forEach((doc) => {
    //console.log(`${doc.id} => ${doc.data()}`);
    usrs.push({ id: doc.id, ...doc.data() });
  });

  console.log(usrs);
  return usrs;
}

// Users

export async function getAllUsers() {
  const q = query(collection(db, collName));
  console.log("Getting users ...");

  const querySnapshot = await getDocs(q);
  const whs = [];
  querySnapshot.forEach((doc) => {
    //console.log(`${doc.id} => ${doc.data()}`);
    whs.push({ id: doc.id, ...doc.data() });
  });

  //console.log(whs);
  return whs;
}

// Klavio Emails

export async function userKlavio(userId, user) {
  if (!user?.klavio) {
    const r = await createKlavioProfile(userId.id, user.email, user?.photoURL);
    if (r.data?.id) {
      const l = await addingKlavioProfileToaList(r.data?.id);
    }
    return r;
  } else {
    console.log("Klavio exist ", userId);
  }
}

export async function updateKlavioProfileMembership(
  userId,
  profileId,
  attributes,
  membership
) {
  const url = "https://a.klaviyo.com/api/profiles/" + profileId;
  const options = {
    headers: {
      // "Access-Control-Allow-Origin": "*",
      accept: "application/json",
      revision: "2023-02-22",
      "content-type": "application/json",
      Authorization: `Klaviyo-API-Key ${process.env.NEXT_PUBLIC_KLAVIO_PRIVATE_KEY}`,
    },
  };

  const data = {
    data: {
      type: "profile",
      id: profileId,
      attributes: {
        // ...attributes,
        properties: {
          membership: membership,
        },
      },
    },
  };

  try {
    const r = await axios.patch(url, data, options);
    console.log("update Klavio profile ... ", r?.data);
    return r?.data;
  } catch (e) {
    console.error("error updating klavio profile,   ", e.message);
    return false;
  }
}

async function createKlavioProfile(userId, email, img) {
  const url = "https://a.klaviyo.com/api/profiles/";
  const options = {
    headers: {
      // "Access-Control-Allow-Origin": "*",
      accept: "application/json",
      revision: "2023-02-22",
      "content-type": "application/json",
      Authorization: `Klaviyo-API-Key ${process.env.NEXT_PUBLIC_KLAVIO_PRIVATE_KEY}`,
    },
  };

  const data = {
    data: {
      type: "profile",
      attributes: {
        email: email,
        // phone_number: "",
        external_id: userId,
        // first_name: "",
        // last_name: "",
        // organization: "",
        // title: "",
        image: img,
        // location: {
        //   address1: "",
        //   address2: "",
        //   city: "",
        //   country: "",
        //   region: "",
        //   zip: "",
        //   timezone: "",
        // },
        // properties: { newKey: "New Value" },
      },
    },
  };

  try {
    const r = await axios.post(url, data, options);
    console.log("Klavio ... ", r?.data);
    return r?.data;
  } catch (e) {
    console.error("error adding email to klavio,   ", e.message, email);
    return false;
  }
}

async function addingKlavioProfileToaList(profileId) {
  const listId = "RYwwwL";
  const url =
    "https://a.klaviyo.com/api/lists/" + listId + "/relationships/profiles/";

  const options = {
    headers: {
      accept: "application/json",
      revision: "2023-02-22",
      "content-type": "application/json",
      Authorization: `Klaviyo-API-Key ${process.env.NEXT_PUBLIC_KLAVIO_PRIVATE_KEY}`,
    },
  };

  const data = { data: [{ type: "profile", id: profileId }] };

  try {
    const r = await axios.post(url, data, options);
    console.log("Klavio list ... ", r?.data);
    return r?.data;
  } catch (e) {
    console.error(
      "error adding profile to klavio list,   ",
      e.message,
      profileId
    );
    return false;
  }
}
