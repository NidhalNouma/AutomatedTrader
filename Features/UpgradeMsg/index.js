import React from "react";
import { Modal1 } from "../../Components/Modal";
import { Button } from "react-daisyui";
import { useRouter } from "next/router";

import { XIcon } from "@heroicons/react/solid";
import { H3 } from "../../Components/H";

import { ButtonP } from "../../Components/Button";

function Index({ open, close }) {
  const router = useRouter();
  return (
    <Modal1 open={open}>
      <div className="">
        <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
          <H3 className="flex">Upgrade</H3>
          <Button
            size="sm"
            shape="circle"
            className=" bg-accenti"
            onClick={() => {
              close();
            }}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col justify-center items-center w-full mt-2">
          <div className="px-7">
            <p className="text-sm">
              You don&apos;t have access to this feature, Click bellow to
              upgrade your membership.{" "}
            </p>
          </div>

          <ButtonP
            className="my-4"
            onClick={() => {
              router.push("/membership");
            }}
          >
            Upgrade
          </ButtonP>
        </div>
      </div>
    </Modal1>
  );
}

export default Index;
