import React from "react";
import { H1 } from "../../Components/H";
import { Input1 } from "../../Components/Input";
import { ButtonP } from "../../Components/Button";

import { Divider, Button } from "react-daisyui";
import Link from "next/link";

function Forgetpassword() {
  return (
    <div className="p-7 flex flex-col items-center justify-center">
      <H1 className="mb-8">Forget password</H1>
      <div className="mb-6 w-full">
        <Input1
          className="mx-auto mb-0"
          classNameInput="bg-bgl "
          placeholder="Email"
          name="Email"
        />
      </div>
      <div className="flex item-center justify-between w-full max-w-xs">
        <ButtonP className="mx-auto">Send reset link</ButtonP>
      </div>

      <div className="w-full mt-4">
        <span className="text-xs">Back to</span>
        <Link href="/signin">
          <span className="text-sm text-primaryi ml-1 cursor-pointer">
            Sign in
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Forgetpassword;
