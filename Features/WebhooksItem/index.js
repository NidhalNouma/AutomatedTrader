import { Fragment, useState } from "react";

import { H6, Hi6 } from "../../Components/H";
import { ButtonInfo } from "../../Components/Button";
import { Toggle, Select, Button } from "react-daisyui";
import {
  PlusCircleIcon,
  ClipboardIcon,
  ClipboardCopyIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";

import { Modal1 } from "../../Components/Modal";
import AddMessage from "../ManageWebhook/AddMessage";
import EditMessage from "../ManageWebhook/EditMessage";

function Index() {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <Fragment>
      <Modal1
        open={open}
        close={() => {
          setOpen(false);
        }}
      >
        <AddMessage close={() => setOpen(false)} />
      </Modal1>
      <Modal1
        open={openEdit}
        close={() => {
          setOpenEdit(false);
        }}
      >
        <EditMessage close={() => setOpenEdit(false)} />
      </Modal1>
      <div className="bg-bga p-3 rounded-b-xl">
        <div className="flex items-center justify-between">
          <H6>Webhooks name</H6>
          <ButtonInfo helper="Copy webhooks URL">
            <ClipboardIcon className="h-5 w-5 text-secondaryi" />
          </ButtonInfo>
        </div>
        <div className="mt-2 flex">
          <H6 className="mr-4">Active</H6>
          <Toggle size="sm" color="accent" className="" />
        </div>
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <Hi6>List of messages</Hi6>
            <div className="flex">
              <ButtonInfo
                helper="Add new message"
                className="ml-2"
                onClick={() => setOpen(true)}
              >
                <PlusCircleIcon className="h-5 w-5 text-secondaryi " />
              </ButtonInfo>
              <ButtonInfo
                helper="Edit message"
                className="ml-2"
                onClick={() => setOpenEdit(true)}
              >
                <PencilAltIcon className="h-5 w-5 text-secondaryi" />
              </ButtonInfo>
              <ButtonInfo helper="Copy message" className="ml-2">
                <ClipboardCopyIcon className="h-5 w-5 text-secondaryi" />
              </ButtonInfo>
            </div>
          </div>
          <div className="mt-2">
            <Select
              size="sm"
              className="bg-bga w-full border-primaryi focus:outline-none rounded-lg font-normal text-text-p"
            >
              <option value={"Homer"}>BTCUSD</option>
              <option value={"Marge"}>EURUSD</option>
              <option value={"Bart"}>GBPJPY</option>
            </Select>
          </div>
        </div>
        {/* <div className="mt-3 "></div> */}
      </div>
    </Fragment>
  );
}

export default Index;
