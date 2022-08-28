import React from "react";

import { H1 } from "../../Components/H";
import { Input1 } from "../../Components/Input";
import { ButtonP } from "../../Components/Button";

import { Divider, Button } from "react-daisyui";
import Link from "next/link";

function SignUp() {
  return (
    <div className="p-7 flex flex-col items-center justify-center">
      <H1 className="mb-8">Sign Up</H1>
      <div className="mb-8 w-full">
        <Input1
          className="mx-auto mb-3"
          classNameInput="bg-bgl "
          placeholder="Email"
          name="Email"
        />
        <Input1
          className="mx-auto mb-3"
          classNameInput="bg-bgl "
          placeholder="Username"
          name="Username"
        />
        <Input1
          className="mx-auto mb-3"
          classNameInput="bg-bgl "
          placeholder="Password"
          name="Password"
        />
        <Input1
          className="mx-auto"
          classNameInput="bg-bgl "
          placeholder="Confirm password"
          name="Confirm password"
        />
      </div>
      <div className="flex item-center justify-between w-full max-w-xs">
        <ButtonP className="mx-auto">Sign Up</ButtonP>
      </div>
      <Divider>Or</Divider>
      <Button size="sm" className="w-full bg-bgai">
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
        <span className="text-xs">You have account?</span>
        <Link href="/signin">
          <span className="text-sm text-primaryi ml-1 cursor-pointer">
            Sign in
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
