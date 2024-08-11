import React from "react";
import { H1 } from "../../components/H";
import { Input1 } from "../../components/Input";
import { ButtonP } from "../../components/Button";

import { Divider, Button, Alert } from "react-daisyui";
import Link from "next/link";
import { useRouter } from "next/router";

import { SignInHook, ContinueWithGoogle } from "../../hooks/SignHook";

function SignIn() {
  const { email, password, setEmail, setPassword, error, submit } =
    SignInHook();

  const { continueWithGoogleClick } = ContinueWithGoogle();

  const router = useRouter();

  return (
    <div className="p-7 flex flex-col items-center justify-center">
      <H1 className="mb-8">Sign In</H1>
      <div className="mb-2 w-full">
        <Input1
          className="mx-auto mb-3"
          classNameInput="bg-transparent "
          placeholder="Email"
          name="Email"
          type="email"
          value={email}
          setValue={setEmail}
        />
        <Input1
          className="mx-auto mb-2"
          classNameInput="bg-transparent "
          placeholder="Password"
          name="Password"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <Link className="" href="/forgetpassword">
          <span className="text-xs cursor-pointer">Forgot password?</span>
        </Link>
      </div>
      {error && (
        <div className="mb-4 w-full">
          <Alert
            className="p-2 rounded-lg text-sm"
            status="error"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-5 h-5 mr-1 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                ></path>
              </svg>
            }
          >
            {error}
          </Alert>
        </div>
      )}
      <div className="w-full max-w-xs flex justify-center">
        <ButtonP
          className="w-full mt-2"
          onClick={async () => {
            const r = await submit();
            // if (r === true) router.push("/profile");
          }}
        >
          Sign In
        </ButtonP>
      </div>
      <Divider>Or</Divider>
      <Button
        size="sm"
        className="w-full bg-bga rounded-2xl"
        onClick={async () => {
          const r = await continueWithGoogleClick();
          // if (r === true) router.push("/profile");
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

      <div className="w-full mt-4">
        <span className="text-xs">Dont have account?</span>
        <Link href="/signup">
          <span className="text-sm text-primary ml-1 cursor-pointer">
            Sign up
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
