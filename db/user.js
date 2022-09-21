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

export async function addNewUser(userId) {
  console.log("Adding new user ...");

  try {
    const docRef = await setDoc(doc(db, collName, userId), {
      telegram: "",
      active: true,
      created_at: serverTimestamp(),
    });

    console.log("Document written with: ", docRef);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function getUser(id) {
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
