import React from "react";
import { Modal1 } from "../../components/Modal";
import { Button } from "react-daisyui";
import { useRouter } from "next/router";

import { XIcon } from "@heroicons/react/solid";
import { H3 } from "../../components/H";

import { ButtonP } from "../../components/Button";

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
              You don&apos;t have access to this feature, Click below to upgrade
              your membership.{" "}
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

export function UpgradeWaitlist({ open, close, sub }) {
  // console.log(sub);
  const router = useRouter();
  return (
    <Modal1 open={open}>
      <div className="">
        <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
          <H3 className="flex">Coming soon</H3>
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

        {sub.name === "Lifetime" ? (
          <div className="flex flex-col justify-center items-center w-full mt-2 mb-6">
            <div className="px-7">
              <p className="text-sm">
                CONGRATULATIONS ON YOUR LIFETIME MEMBERSHIP WE HAVE SO MUCH MORE
                PLANNED FOR YOU 🎉 You’re on the waitlist and will get access to
                all of Automated Traders new features soon! We are randomly
                selecting users everyday to enter our new BETA testing. You will
                be notified via email when you get access please be patient with
                us!
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-full mt-2">
            <div className="px-7">
              <p className="text-sm">
                🔑 Lifetime members get first access to new features: Including
                metatrader API integration + Basic & Advanced webhooks , upgrade
                your membership today.
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
        )}
      </div>
    </Modal1>
  );
}

export default Index;
