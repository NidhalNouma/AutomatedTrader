import { auth, db } from "./firebase.js";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import axios from "axios";
import { deleteSubscription } from "./third/chargebee.js";

const collName = "users";

export const addNewUser = async (
  userId,
  email,
  displayName,
  metadata,
  photoURL
) => {
  console.log("Adding or updating new user ... ");

  try {
    const existUser = await getUser(userId);
    if (existUser) {
      if (!existUser.displayName)
        await updateUserData(userId, "displayName", displayName);
      if (!existUser.metadata)
        await updateUserData(userId, "metadata", { ...metadata });
      if (!existUser.photoURL)
        await updateUserData(userId, "photoURL", photoURL);
      return true;
    }

    await setDoc(doc(db, collName, userId), {
      telegram: "",
      active: true,
      email,
      displayName,
      metadata: { ...metadata },
      photoURL,
      subscriptionId: "",
      cbCustomerId: "",
      created_at: serverTimestamp(),
    });

    console.log("Document written with ID: ", userId);

    await axios.post(`/api/klavio/${userId}`);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

export const getUser = async (id) => {
  if (!id) return null;
  const docRef = doc(db, collName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id, ...docSnap.data() };
  } else {
    console.log("No such document!");
    return null;
  }
};

export const getUserByEmail = async (email) => {
  if (!email) return null;

  console.log("Getting user by email ...", email);

  const q = query(collection(db, collName), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No matching documents found.");
    return null;
  }

  const docSnap = querySnapshot.docs[0];
  const id = docSnap.id;
  const user = docSnap.data();

  return { ...user, id };
};

export const getUserByUserName = async (userName) => {
  if (!userName) return null;

  console.log("Getting user by userName ...", userName);
  userName = userName.toLowerCase();

  const q = query(collection(db, collName), where("userName", "==", userName));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No matching documents found.");
    return null;
  }

  const docSnap = querySnapshot.docs[0];
  const id = docSnap.id;
  const user = docSnap.data();

  return { ...user, id };
};

// export const updateUserData = async (userId, key, value) => {
//   await updateDoc(doc(db, collName, userId), { [key]: value });
// };

export async function updateUserData(id, data, getuser = true) {
  console.log("Update user datas ... ", id, data);
  const msgDoc = doc(db, collName, id);

  if (data.userName) {
    const r = await getUserByUserName(data.userName);
    if (r && r.id) return { error: "UserName already exists!" };
  }

  const u = await updateDoc(msgDoc, data);
  if (getuser) {
    const nwh = await getUser(id);
    return nwh;
  } else return u;
}

export async function updateSubsciption(
  id,
  subId,
  cusId,
  getuser = true,
  oldSubscription = null
) {
  console.log("Update user subscription ... ", id, subId);
  const msgDoc = doc(db, collName, id);

  if (oldSubscription) {
    await deleteSubscription(oldSubscription);
  }

  const u = await updateDoc(msgDoc, {
    subscriptionId: subId,
    cbCustomerId: cusId,
  });

  if (getuser) {
    const nwh = await getUser(id);
    return nwh;
  } else return u;
}

export const updateProfilePicture = async (photoURL) => {
  const r = await updateProfile(auth.currentUser, {
    //   displayName: "Jane Q. User",
    photoURL,
  });

  return auth.currentUser;
};

export const searchUsersByUserName = async (userName) => {
  if (!userName) return null;

  console.log("Search users by userName ...", userName);
  userName = userName.toLowerCase();

  const endUserName = userName + "\uf8ff"; // End of Unicode character to simulate the end of a prefix

  const q = query(
    collection(db, collName),
    where("userName", ">=", userName),
    where("userName", "<", endUserName)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No matching documents found.");
    return [];
  }

  const users = [];
  querySnapshot.forEach((doc) => {
    let user = doc.data();
    if (user.userName.toLowerCase().includes(userName)) {
      if (user.public) users.push({ id: doc.id, ...user });
    }
  });

  return users;
};
