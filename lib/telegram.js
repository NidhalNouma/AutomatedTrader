import { db } from "./firebase";

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
} from "firebase/firestore";

import { getRandomHexColor } from "../utils/functions";

const collName = "telegram";

export async function addTelegram(name, chatId, userId) {
  console.log("Adding new telegram ...");

  try {
    const docRef = await addDoc(collection(db, collName), {
      userId,
      name,
      active: true,
      chatId,
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

export async function getTelegramsByUserId(userId) {
  const q = query(collection(db, collName), where("userId", "==", userId));
  console.log("Getting telegram by userId ...", userId);

  const querySnapshot = await getDocs(q);
  const tels = [];
  querySnapshot.forEach((doc) => {
    tels.push({ id: doc.id, ...doc.data() });
  });

  return tels;
}

export async function getTelegram(id) {
  if (!id) return null;
  const docRef = doc(db, collName, id);
  const docSnap = await getDoc(docRef);

  console.log("Getting telegram ...", id);

  if (docSnap.exists()) {
    const wh = docSnap.data();
    return { id, ...wh };
  } else {
    console.log("No such document!");
    return null;
  }
}

export async function deleteTelegram(id) {
  const docRef = doc(db, collName, id);

  console.log("Delete Telegram ...", id);
  const d = await deleteDoc(docRef);

  return d;
}

export async function updateTelegramName(userId, id, name) {
  console.log("Update telegram name ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    name,
  });

  const r = getTelegramsByUserId(userId);
  return r;
}

export async function updateTelegramColor(userId, id, color) {
  console.log("Update telegram color ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    color,
  });

  const r = getTelegramsByUserId(userId);
  return r;
}

export async function activeTelegram(id, active) {
  const msgDoc = doc(db, collName, id);

  const r = await updateDoc(msgDoc, {
    active,
  });

  return r;
}
