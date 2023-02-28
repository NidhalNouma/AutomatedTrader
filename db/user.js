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
import { firebaseConfig } from "../utils/constant";
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

export async function updateUserData(id, key, value) {
  console.log("Update user data ... ", key, value, id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    [key]: value,
  });

  const nwh = await getUser(id);
  return nwh;
}

export async function updateSubsciption(id, subId, cusId) {
  console.log("Update user subscription ... ", id, subId);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    subscriptionId: subId,
    cbCustomerId: cusId,
  });

  const nwh = await getUser(id);
  return nwh;
}

export async function updateUserDatas(id, data) {
  console.log("Update user datas ... ", id, data);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, data);

  const nwh = await getUser(id);
  return nwh;
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
