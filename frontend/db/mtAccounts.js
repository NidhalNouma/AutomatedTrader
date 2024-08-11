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
} from "firebase/firestore";

import { firebaseConfig } from "../utils/constant";

const collName = "mtaccounts";
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export async function addMTAccount(
  userId,
  accountName,
  accountServer,
  accountNumber,
  accountBalance,
  accountEquity,
  accountStartBalance,

  accountCurrency,
  accountCredit,
  accountCompany,
  type,
  version
) {
  console.log("Adding new MT account ...");

  try {
    const find = await getMTAccountByAccount(
      userId,
      accountName,
      accountServer,
      accountNumber
    );
    if (find) {
      const msgDoc = doc(db, collName, find.id);
      await updateDoc(msgDoc, { version, accountBalance, accountEquity });
      console.log("account already exist ... ");
      return { id: find.id, exist: true };
    }

    const docRef = await addDoc(collection(db, collName), {
      userId,
      accountName,
      accountDisplayName: accountName,
      accountServer,
      accountNumber,
      accountBalance,
      accountEquity,
      accountStartBalance,
      accountCurrency,
      accountCredit,
      accountCompany,
      type,
      version,
      lastUpdated: "",
      color: getRandomColor(),
      created_at: serverTimestamp(),
    });
    console.log("Document written with: ", docRef.id);
    return { id: docRef.id, exist: false };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { error: e };
  }
}

export async function getMTAccount(id) {
  const docRef = doc(db, collName, id);
  const docSnap = await getDoc(docRef);

  console.log("Getting MT account ...", id);

  if (docSnap.exists()) {
    const wh = docSnap.data();
    return { id, ...wh };
  } else {
    console.log("No such document!");
    return null;
  }
}

export async function getMTAccountByAccount(
  userId,
  accountName,
  accountServer,
  accountNumber
) {
  const q = query(
    collection(db, collName),
    where("userId", "==", userId),
    where("accountName", "==", accountName),
    where("accountNumber", "==", accountNumber),
    where("accountServer", "==", accountServer)
    // orderBy("created_at", "desc")
  );
  console.log("Getting MT accounts by accountData ...", userId);

  const querySnapshot = await getDocs(q);
  const whs = [];
  querySnapshot.forEach((doc) => {
    //console.log(`${doc.id} => ${doc.data()}`);
    whs.push({ id: doc.id, ...doc.data() });
  });
  if (whs.length === 0) return null;
  else return whs[0];
}

export async function deleteMTAccount(userId, accountId) {
  const docRef = doc(db, collName, accountId);

  const d = await deleteDoc(docRef);

  const r = getMTAccountsByUserId(userId);
  return r;
}

export async function getMTAccountsByUserId(userId) {
  const q = query(
    collection(db, collName),
    where("userId", "==", userId)
    // orderBy("created_at", "desc")
  );
  console.log("Getting MT accounts by userId ...", userId);

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

export async function listenToNewMTAccounts(userId, func) {
  const q = query(collection(db, collName), where("userId", "==", userId));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const whs = [];
    querySnapshot.forEach((doc) => {
      whs.push({ id: doc.id, ...doc.data() });
    });
    console.log("Current MT accounts: ", whs);
    const sortedAsc = whs.sort(
      (objA, objB) => Number(objB.created_at) - Number(objA.created_at)
    );

    func(sortedAsc);
  });

  return unsubscribe;
}

export async function addDataToMTAccount(
  accountId,
  accountBalance,
  accountEquity,
  data,
  lastOrder,
  gmtOffset
) {
  const r = await getMTAccount(accountId);

  if (r) {
    const ti = new Date(lastOrder);
    const t = new Date(r.lastOrder);
    if (!r.lastOrder || ti > t) {
      console.log("Adding data to MT account account ...", accountId, t, ti);
      const msgDoc = doc(db, collName, accountId);

      const u = await updateDoc(msgDoc, {
        accountBalance,
        accountEquity,
        data: arrayUnion(...data),
        lastOrder,
        gmtOffset,
      });
      return { exist: true, added: true };
    }
    return { exist: true, added: false };
  }
  return { exist: false, added: false };
}

export async function updateDisplayName(userId, id, accountDisplayName) {
  console.log("Update MT display name ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    accountDisplayName,
  });

  const r = getMTAccountsByUserId(userId);
  return r;

  // const nwh = await getMTAccount(id);
  // return nwh;
}

export async function updateColor(userId, id, color) {
  console.log("Update MT color ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    color,
  });

  const r = getMTAccountsByUserId(userId);
  return r;

  // const nwh = await getMTAccount(id);
  // return nwh;
}

function getRandomColor() {
  // var letters = "0123456789ABCDEF";
  // var color = "#";
  // for (var i = 0; i < 6; i++) {
  //   color += letters[Math.floor(Math.random() * 16)];
  // }
  // return color;
  var o = Math.round,
    r = Math.random,
    red = 155,
    green = 170,
    blue = 255;
  return (
    "rgba(" +
    o(r() * red) +
    "," +
    o(r() * green) +
    "," +
    o(r() * blue) +
    "," +
    r().toFixed(1) +
    ")"
  );
}
