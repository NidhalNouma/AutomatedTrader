import { useState } from "react";
import { useRouter } from "next/router";
import {
  signUp,
  signIn,
  signOutUser,
  continueWithGoogle,
  resetPassword,
} from "../lib/auth";
import { useUser } from "../contexts/UserContext";

export const SignInHook = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    if (!email) {
      setError("Email must be provided");
      return;
    }

    if (!password) {
      setError("Password must be provided");
      return;
    }

    setError("");

    const r = await signIn(email, password);
    if (r.err) {
      setError(r.err);
      return;
    }

    router.push("/home");
    return true;
  };

  return { email, password, error, setEmail, setPassword, submit };
};

export const SignUpHook = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    if (!email) {
      setError("Email must be provided");
      return;
    }

    // if (!username) {
    //   setError("Username must be provided");
    //   return;
    // }

    if (!password) {
      setError("Password must be provided");
      return;
    }

    if (cpassword !== password) {
      setError("Password not match!");
      return;
    }

    setError("");

    const r = await signUp(email, password);
    if (r.err) {
      setError(r.err);
      return;
    }

    router.push("/membership");
    return true;
  };

  return {
    email,
    username,
    password,
    cpassword,
    error,
    setEmail,
    setUsername,
    setPassword,
    setCPassword,
    submit,
  };
};

export const SignOut = () => {
  const { setUser, setFullUser } = useUser();

  async function signOut() {
    await signOutUser();
    setUser(null);
    setFullUser(null);
  }

  return { signOut };
};

export const ContinueWithGoogle = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  async function continueWithGoogleClick() {
    const r = await continueWithGoogle();

    if (r.user) {
      router.push("/home");
      return true;
    }
    return false;
  }

  return { error, continueWithGoogleClick };
};

export const ResetPassword = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [succes, setSuccess] = useState("");

  const submit = async () => {
    if (!email) {
      setError("Email must be provided");
      return;
    }
    if (error) setError("");
    if (succes) setSuccess("");
    const r = await resetPassword(email);
    if (!r.error) {
      setSuccess("Email just sent successfully");
      return true;
    } else if (r.err) setError(r.err);
    return false;
  };

  return { email, setEmail, error, succes, submit };
};
