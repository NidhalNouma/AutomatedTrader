import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { firebaseConfig } from "../utils/constant";

const app = initializeApp(firebaseConfig);

export const updateProfilePicture = async (photoURL) => {
  const auth = getAuth();
  const r = await updateProfile(auth.currentUser, {
    //   displayName: "Jane Q. User",
    photoURL,
  });

  return auth.currentUser;
};
