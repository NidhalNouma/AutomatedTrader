import { db } from "./firebase.js";

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

const collName = "alert";

export async function addAlert(
  userId,
  webhookId,
  message,
  messageData,
  type,
  symbol,
  apps,
  trades,
  openAlert = null
) {
  console.log("Adding new alert ...");

  try {
    const docRef = await addDoc(collection(db, collName), {
      webhookId,
      message,
      messageData,
      type,
      symbol,
      userId,
      apps,
      trades,
      openAlert,
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

export async function getAlert(id) {
  const docRef = doc(db, collName, id);
  const docSnap = await getDoc(docRef);

  console.log("Getting alert ...", id);

  if (docSnap.exists()) {
    const wh = docSnap.data();
    return { id, ...wh };
  } else {
    console.log("No such document!");
    return null;
  }
}

export async function getAlertsByUserId(userId) {
  const q = query(
    collection(db, collName),
    where("userId", "==", userId)
    // orderBy("created_at", "desc")
  );
  console.log("Getting alets by userId ...", userId);

  const querySnapshot = await getDocs(q);
  const whs = [];
  querySnapshot.forEach((doc) => {
    //console.log(`${doc.id} => ${doc.data()}`);
    whs.push({ id: doc.id, ...doc.data() });
  });

  const sortedAsc = whs.sort(
    (objA, objB) => Number(objB.created_at) - Number(objA.created_at)
  );
  //   console.log(whs);
  return sortedAsc;
}

export async function getAlertsByWebhookId(id) {
  console.log("Getting alets by webhookId ...", id);
  const q = query(collection(db, collName), where("webhookId", "==", id));

  const querySnapshot = await getDocs(q);
  const whs = [];
  querySnapshot.forEach((doc) => {
    //console.log(`${doc.id} => ${doc.data()}`);
    whs.push({ id: doc.id, ...doc.data() });
  });

  const sortedAsc = whs.sort(
    (objA, objB) => Number(objB.created_at) - Number(objA.created_at)
  );
  //   console.log(whs);
  return sortedAsc;
}

export async function listenToAlerts(userId, func, setOldAlertsLength) {
  const q = query(collection(db, collName), where("userId", "==", userId));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const whs = [];
    querySnapshot.forEach((doc) => {
      whs.push({ id: doc.id, ...doc.data() });
    });
    console.log("Current alerts: ", whs);
    const sortedAsc = whs.sort(
      (objA, objB) => Number(objB.created_at) - Number(objA.created_at)
    );

    if (setOldAlertsLength)
      setOldAlertsLength((v) => (v === -1 ? sortedAsc.length : v));

    func(sortedAsc);
  });

  return unsubscribe;
}

export async function getAlertByTrade() {
  const q = query(
    collection(db, collName),
    where("trades", "array-contains", { tradeId, accountId, accountSrc })
  );

  console.log("Getting alets by trade ...", userId);

  const querySnapshot = await getDocs(q);
  const alerts = [];
  querySnapshot.forEach((doc) => {
    alerts.push({ id: doc.id, ...doc.data() });
  });

  return alerts;
}
