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
} from "firebase/firestore";
import { getRandomHexColor } from "../utils/functions.js";

const collName = "presets";

export async function addPreset(name, type, data, userId) {
  console.log("Adding new preset ...");

  try {
    const docRef = await addDoc(collection(db, collName), {
      userId,
      name,
      type,
      data,
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

export async function getPresetsByUserId(userId) {
  const q = query(
    collection(db, collName),
    where("userId", "==", userId)
    // orderBy("created_at", "desc")
  );
  console.log("Getting presets by userId ...", userId);

  const querySnapshot = await getDocs(q);
  const prs = [];
  querySnapshot.forEach((doc) => {
    let pr = doc.data();
    prs.push({ id: doc.id, ...pr });
  });

  // console.log(whs);
  return prs;
}

export async function getPreset(id) {
  if (!id) return null;
  const docRef = doc(db, collName, id);
  const docSnap = await getDoc(docRef);

  console.log("Getting preset ...", id);

  if (docSnap.exists()) {
    const pr = docSnap.data();
    return { id, ...pr };
  } else {
    console.log("No such document!");
    return null;
  }
}
