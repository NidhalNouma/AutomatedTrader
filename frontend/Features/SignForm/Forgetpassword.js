import React from "react";
import { H1 } from "../../components/H";
import { Input1 } from "../../components/Input";
import { ButtonP } from "../../components/Button";

import { Alert } from "react-daisyui";
import Link from "next/link";
import { ResetPassword } from "../../hooks/SignHook";

function Forgetpassword() {
  const { email, setEmail, error, succes, submit } = ResetPassword();

  return (
    <div className="p-7 flex flex-col items-center justify-center">
      <H1 className="mb-8">Forget password</H1>
      <div className="mb-6 w-full">
        <Input1
          className="mx-auto mb-0"
          classNameInput="bg-transparent "
          placeholder="Email"
          name="Email"
          type="email"
          value={email}
          setValue={setEmail}
        />
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

      {succes && (
        <div className="mb-4 w-full">
          <Alert
            className="p-2 rounded-lg text-sm"
            status="success"
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            }
          >
            {succes}
          </Alert>
        </div>
      )}

      <div className="flex item-center justify-center w-full max-w-xs">
        <ButtonP
          className="mx-auto w-full"
          onClick={async () => {
            const r = await submit();
          }}
        >
          Send reset link
        </ButtonP>
      </div>

      <div className="w-full mt-4">
        <span className="text-xs">Back to</span>
        <Link href="/signin">
          <span className="text-sm text-primary ml-1 cursor-pointer">
            Sign in
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Forgetpassword;
