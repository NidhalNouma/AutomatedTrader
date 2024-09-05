import { db } from "./firebase";
import {
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

const collName = "notifications";

export async function addNotification(
  recipientUserId,
  type, // can be 'new' | 'notification' | 'follow'
  message,
  title,
  link,
  data = {},
  image
) {
  console.log("Adding new notification ...");

  try {
    const docRef = await addDoc(collection(db, collName), {
      message,
      title,
      type,
      recipientUserId,
      isRead: false,
      link,
      data,
      image,
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
    where("recipientUserId", "in", [userId, null]) // Add this line to check for userId or null
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

export async function markNotificationAsRead(id) {
  const docRef = doc(db, collName, id);

  await updateDoc(docRef, { isRead: true, updated_at: serverTimestamp() });

  console.log("mark notification as read ...", id);

  return true;
}
