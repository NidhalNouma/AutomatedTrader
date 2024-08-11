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
  onSnapshot,
} from "firebase/firestore";
import { firebaseConfig } from "../utils/constant";
const collName = "notifications";
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export async function addNotification(recipientUserId, message, title, link) {
  console.log("Adding new notification ...");

  try {
    const docRef = await addDoc(collection(db, collName), {
      message,
      title,
      recipientUserId,
      isReadBy: [],
      link,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
    console.log("Document written with: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
}

export async function listenToNotifications(userId, func) {
  const q = query(
    collection(db, collName),
    where("recipientUserId", "in", ["", userId])
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const whs = [];
    querySnapshot.forEach((doc) => {
      whs.push({ id: doc.id, ...doc.data() });
    });
    console.log("Current notifications: ", whs);
    const sortedAsc = whs.sort(
      (objA, objB) => Number(objB.created_at) - Number(objA.created_at)
    );

    func(sortedAsc);
  });

  return unsubscribe;
}

export async function markAsRead(id, userId) {
  const docRef = doc(db, collName, id);
  const notification = await getDoc(docRef);

  const pastReadBy = notification?.isReadBy ? notification?.isReadBy : [];

  let isReadBy = [...pastReadBy, userId];

  await updateDoc(docRef, { isReadBy, updated_at: serverTimestamp() });

  console.log("mark notification as read ...", id);

  return true;
}
