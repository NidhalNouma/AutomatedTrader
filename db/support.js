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
  deleteDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";

import { firebaseConfig } from "../utils/constant";

const collName = "support";
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export async function newSupportTicket(userId, subject, message) {
  console.log("new support ticket ...");

  const msg = { ...message, at: Timestamp.now() };
  console.log(msg, serverTimestamp());
  try {
    const docRef = await addDoc(collection(db, collName), {
      userId,
      subject,
      open: true,
      messages: [msg],
      created_at: serverTimestamp(),
    });
    console.log("Document written with: ", docRef.id);
    return { id: docRef.id, exist: false };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { error: e };
  }
}

export async function getSupportTicket(id) {
  if (!id) return null;
  const docRef = doc(db, collName, id);
  const docSnap = await getDoc(docRef);

  console.log("Getting support tocket ...", id);

  if (docSnap.exists()) {
    const wh = docSnap.data();
    return { id, ...wh };
  } else {
    console.log("No such document!");
    return null;
  }
}

export async function getSupportTicketByUserId(userId) {
  const q = query(
    collection(db, collName),
    where("userId", "==", userId)
    // orderBy("created_at", "desc")
  );
  console.log("Getting support tickets by userId ...", userId);

  const querySnapshot = await getDocs(q);
  const whs = [];
  querySnapshot.forEach((doc) => {
    //console.log(`${doc.id} => ${doc.data()}`);
    whs.push({ id: doc.id, ...doc.data() });
  });

  const sortedAsc = whs.sort(
    (objA, objB) => Number(objB.created_at) - Number(objA.created_at)
  );

  return sortedAsc;
}

export async function addMessageToTicket(ticketId, message) {
  console.log("Adding message to a ticket ...", ticketId);

  const msg = { ...message, at: Timestamp.now() };

  const docRef = doc(db, collName, ticketId);
  const u = await updateDoc(docRef, {
    messages: arrayUnion(msg),
  });
  return { added: true };
}
