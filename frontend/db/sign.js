import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { firebaseConfig, listOfEmails } from "../utils/constant";

import { addNewUser, getUser } from "./user";

import { errorMessageByCode } from "../utils/errorMessage";

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

export function checkUser(setUser, getFullUser, onNull, onExist) {
  const auth = getAuth();
  // console.log(listOfEmails);
  onAuthStateChanged(auth, async (user) => {
    if (
      user &&
      (listOfEmails?.length === 1 ||
        listOfEmails?.find((e) => e === user.email))
    ) {
      // console.log("user=> . ", user);

      let userName = user.displayName;

      if (!userName) {
        userName = user.email.match(/^([^@]*)@/)[1];
        const useru = await updateProfile(user, {
          displayName: userName,
        });
      }
      setUser(user);

      let userf = await getFullUser(user.uid);
      if (!userf) {
        userf = await addNewUser(
          user.uid,
          user.email,
          userName,
          user.metadata,
          user.photoURL
        );
        userf = await getFullUser(user.uid);
      }

      onExist();
    } else {
      setUser(null);
      onNull();
    }
  });
}

// export function getActiveUser(setUser) {
//   const auth = getAuth();
//   const user = auth.currentUser;

//   console.log("auth ", user);
//   if (user) setUser(user);
// }

export async function signUp(email, password) {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log("usr", user);

    // await sendEmailVerification(auth.currentUser);
    return { user, error: null };
  } catch (error) {
    console.log("SignUp error => . ", error.message, error.code);
    return {
      user: null,
      error,
      // err: errorMessage,
      err: errorMessageByCode(error.code),
    };
  }
}

export async function signIn(email, password) {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("usr", user);

    return { user, error: null };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      user: null,
      err: errorMessageByCode(error.code),
      error,
    };
  }
}

export async function continueWithGoogle() {
  const auth = getAuth();
  try {
    const result = await signInWithPopup(auth, provider);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;

    return { user, error: null };
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    return {
      user: null,
      err: errorMessageByCode(error.code),
      error,
    };
  }
}

export async function signOutf() {
  const auth = getAuth();
  try {
    const userCredential = await signOut(auth);
    const usr = userCredential.user;
    return { usr, user: null, error: null };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      user: null,
      err: errorMessageByCode(error.code),
      error,
    };
  }
}

export async function changePassword(password) {
  const auth = getAuth();
  const user = auth.currentUser;
  try {
    await updatePassword(user, password);
    return { user: null, error: null };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      err: errorMessageByCode(error.code),
      error,
    };
  }
}

export async function resetPassword(email) {
  const auth = getAuth();
  try {
    const reset = await sendPasswordResetEmail(auth, email);
    return { reset, error: null };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      reset: null,
      err: errorMessageByCode(error.code),
      error,
    };
  }
}
