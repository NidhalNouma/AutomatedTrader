import { db } from "./firebase.js";
import {
  doc,
  collection,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDocs,
  setDoc,
  addDoc,
  getDoc,
  writeBatch,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { getRandomHexColor } from "../utils/functions.js";

const collName = "binance";

export async function addBinanceAccount(
  userId,
  accountName,
  apiKey,
  apiSecretKey,
  testAccount
) {
  console.log("Adding new binance account to FB ...");

  try {
    const docRef = await addDoc(collection(db, collName), {
      userId,
      accountName,
      apiKey,
      apiSecretKey,
      test: testAccount,

      color: getRandomHexColor(),
      created_at: serverTimestamp(),
    });
    console.log("Document written with: ", docRef.id);

    return { id: docRef.id, exist: false };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { error: e };
  }
}

export async function getBinanceAccount(id) {
  const docRef = doc(db, collName, id);
  const docSnap = await getDoc(docRef);

  console.log("Getting binance account from FB...", id);

  if (docSnap.exists()) {
    const wh = docSnap.data();
    let account = { id, ...wh };

    return account;
  } else {
    console.log("No such document!");
    return null;
  }
}

export async function getBinanceAccountsByUserId(userId) {
  const q = query(
    collection(db, collName),
    where("userId", "==", userId)
    // orderBy("created_at", "desc")
  );
  console.log("Getting binance accounts by userId ...", userId);

  const querySnapshot = await getDocs(q);
  const whs = [];
  querySnapshot.forEach((doc) => {
    whs.push({ id: doc.id, ...doc.data() });
  });

  const sortedAsc = whs.sort(
    (objA, objB) => Number(objB.created_at) - Number(objA.created_at)
  );

  return sortedAsc;
}

export async function getUserAccountsWithHistory(userId) {
  const accounts = await getMTAccountsByUserId(userId);
  const accountsWithHistoryPromises = accounts.map(async (account) => {
    const accountWithHistory = await retrieveAccountWithHistory(account.id);
    return accountWithHistory;
  });

  const accountsWithHistory = await Promise.all(accountsWithHistoryPromises);
  return accountsWithHistory;
}

export async function deleteBinanceAccount(userId, accountId) {
  const docRef = doc(db, collName, accountId);

  const d = await deleteDoc(docRef);

  const r = getBinanceAccountsByUserId(userId);
  return r;
}

export async function updateColor(userId, id, color) {
  console.log("Update binance color ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    color,
  });

  const r = getBinanceAccountsByUserId(userId);
  return r;
}

export async function updateName(userId, id, accountName) {
  console.log("Update binance display name ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    accountName,
  });

  const r = getBinanceAccountsByUserId(userId);
  return r;
}
