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

const collName = "alerts";
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export async function addAlert(
  webhookId,
  message,
  userId,
  webhookName,
  mtAccounts
) {
  console.log("Adding new alert ...");
  let accounts = {};

  mtAccounts.forEach((accountId) => {
    accounts[accountId] = [];
  });

  try {
    const docRef = await addDoc(collection(db, collName), {
      webhookId,
      message,
      userId,
      webhookName,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      accounts,
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

export async function listenToAlerts(userId, func) {
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

    func(sortedAsc);
  });

  return unsubscribe;
}

export async function updateAlertAccount(id, accountId, text) {
  const alert = await getAlert(id);

  let accounts = alert.accounts;
  if (accounts[accountId]) accounts[accountId].push(text);
  else accounts[accountId] = [text];

  const docRef = doc(db, collName, id);
  await updateDoc(docRef, { accounts });

  console.log("Updating alert accunts ...", id);

  return true;
}
