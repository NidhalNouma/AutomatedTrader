import { Fragment, useState } from "react";
import Alert from "./Alert";
import { Button, ButtonGroup } from "react-daisyui";

import { XIcon } from "@heroicons/react/solid";
import { H3 } from "../../components/H";
import { Modal1 } from "../../components/Modal";

export default function NewAlertPopUp({ newAlert, setNewAlert }) {
  const [accountData, setAccountData] = useState(null);
  return (
    newAlert &&
    newAlert?.message && (
      <Modal1
        open={newAlert}
        close={() => {
          setNewAlert(null);
        }}
      >
        <div className="p-3 bg-transparent">
          <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
            <H3 className="flex">Settings</H3>
            <Button
              size="sm"
              shape="circle"
              className=" bg-accenti"
              onClick={() => {
                setNewAlert(null);
              }}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="">
            <Alert v={newAlert} />
          </div>
        </div>
      </Modal1>
    )
  );
}
