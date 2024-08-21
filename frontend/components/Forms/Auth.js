import { Fragment } from "react";
import Link from "next/link";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Error, Succes } from "../ui/Alerts";
import { Divider } from "react-daisyui";

import {
  SignInHook,
  SignUpHook,
  ResetPassword,
  ContinueWithGoogle,
} from "../../hooksp/AuthHook";

export function SignIn({}) {
  const { email, password, error, setEmail, setPassword, submit } =
    SignInHook();

  const { error: gError, continueWithGoogleClick } = ContinueWithGoogle();

  return (
    <Fragment>
      <Input
        classNameInput="!outline-text/20 "
        name="Email"
        placeholder="Email"
        type="email"
        value={email}
        setValue={setEmail}
      />
      <Input
        className="mt-4"
        classNameInput="!outline-text/20 "
        name="Password"
        placeholder="Password"
        type="password"
        value={password}
        setValue={setPassword}
      />
      <Link className="" href="/forgetpassword">
        <p className="text-xs text-text/60 mt-2 cursor-pointer">
          Forgot password?
        </p>
      </Link>
      {error && (
        <div className="mt-4">
          <Error>{error}</Error>
        </div>
      )}

      <Button
        className="mt-6 w-full"
        onClick={async () => {
          const r = await submit();
        }}
      >
        Sign In
      </Button>
      <Divider className="text-text/40 text-xs">Or</Divider>

      <Button
        className="w-full bg-dark/90 hover:bg-dark text-light outline-text/20"
        onClick={async () => {
          const r = await continueWithGoogleClick();
        }}
      >
        <svg
          className="mr-2"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          width="18px"
          height="18px"
        >
          <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
        </svg>
        Continue with google
      </Button>
    </Fragment>
  );
}

export function SignUp({}) {
  const {
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
  } = SignUpHook();

  const { error: gError, continueWithGoogleClick } = ContinueWithGoogle();

  return (
    <Fragment>
      <Input
        classNameInput="!outline-text/20 "
        name="Email"
        placeholder="Email"
        type="email"
        value={email}
        setValue={setEmail}
      />
      <Input
        className="mt-4"
        classNameInput="!outline-text/20 "
        name="Password"
        placeholder="Password"
        type="password"
        value={password}
        setValue={setPassword}
      />
      <Input
        className="mt-4 mb-2"
        classNameInput="!outline-text/20 "
        name="Confirm Password"
        placeholder="Password"
        type="password"
        value={cpassword}
        setValue={setCPassword}
      />

      {error && (
        <div className="mt-4">
          <Error>{error}</Error>
        </div>
      )}

      <Button
        className="mt-6 w-full"
        onClick={async () => {
          const r = await submit();
        }}
      >
        Sign Up
      </Button>
      <Divider className="text-text/40 text-xs">Or</Divider>

      <Button
        className="w-full bg-dark/90 hover:bg-dark text-light outline-text/20"
        onClick={async () => {
          const r = await continueWithGoogleClick();
        }}
      >
        <svg
          className="mr-2"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          width="18px"
          height="18px"
        >
          <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
        </svg>
        Continue with google
      </Button>
    </Fragment>
  );
}

export function ForgetPassword({}) {
  const { email, setEmail, error, succes, submit } = ResetPassword();

  return (
    <Fragment>
      <Input
        classNameInput="!outline-text/20 "
        className="mb-2"
        name="Email"
        placeholder="Email"
        type="email"
        value={email}
        setValue={setEmail}
      />

      {error && (
        <div className="mt-4">
          <Error>{error}</Error>
        </div>
      )}

      {succes && (
        <div className="mt-4">
          <Succes>{succes}</Succes>
        </div>
      )}

      <Button
        className="mt-6 w-full"
        onClick={async () => {
          const r = await submit();
        }}
      >
        Send reset link
      </Button>
    </Fragment>
  );
}
