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

import {
  getMessages,
  setActiveWebhook,
  GetWebhookContext,
} from "../../hooks/WebHook";
import { GetToastContext } from "../../hooks/ToastHook";

import { copyTextToClipboard } from "../../utils/functions";

function Index({ webhook: wh }) {
  const [webhook, setWebhook] = useState(wh);

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const messages = getMessages(webhook);
  const [msg, setMsg] = useState(messages[0]);

  // const { setWebhooks } = GetWebhookContext();
  const { newAlert } = GetToastContext();

  return (
    <Fragment>
      <Modal1
        open={open}
        close={() => {
          setOpen(false);
        }}
      >
        <AddMessage close={() => setOpen(false)} webhook={webhook} />
      </Modal1>
      <Modal1
        open={openEdit}
        close={() => {
          setOpenEdit(false);
        }}
      >
        <EditMessage
          close={() => setOpenEdit(false)}
          webhook={webhook}
          msg={msg}
          setMsg={setMsg}
          messages={messages}
        />
      </Modal1>
      <div className="bg-bga p-3 rounded-b-xl">
        <div className="flex items-center justify-between">
          <H6>{webhook.name}</H6>
          <ButtonInfo
            helper="Copy webhooks URL"
            onClick={() =>
              copyTextToClipboard(
                webhook.name,
                () => newAlert("Webhooks URL copied", "success"),
                () => newAlert("Webhooks URL copied", "error")
              )
            }
          >
            <ClipboardIcon className="h-5 w-5 text-secondaryi" />
          </ButtonInfo>
        </div>
        <div className="mt-2 flex">
          <H6 className="mr-4">Active</H6>
          <Toggle
            size="sm"
            color="accent"
            className=""
            checked={webhook.active}
            onChange={async () => {
              let is = "on";
              if (webhook.active) is = "off";
              const r = await setActiveWebhook(webhook.id, !webhook.active);
              // const r1 = await getAllWebhooks();
              if (r) {
                setWebhook(r);
                newAlert(webhook.name + " webhook is " + is, "success");
              }
            }}
          />
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
              <ButtonInfo
                helper="Copy message"
                className="ml-2"
                onClick={() =>
                  copyTextToClipboard(
                    msg.msg,
                    () => newAlert("Message copied", "success"),
                    () => newAlert("Message copied", "error")
                  )
                }
              >
                <ClipboardCopyIcon className="h-5 w-5 text-secondaryi" />
              </ButtonInfo>
            </div>
          </div>
          <div className="mt-2">
            <Select
              value={msg.pair}
              onChange={(v) => setMsg(messages[v])}
              size="sm"
              className="bg-bga w-full border-primaryi focus:outline-none rounded-lg font-normal text-text-p"
            >
              {messages.map((v, i) => (
                <option
                  key={v.pair + i}
                  value={i}
                  selected={v.pair === msg.pair}
                >
                  {v.pair}
                </option>
              ))}
            </Select>
          </div>
        </div>
        {/* <div className="mt-3 "></div> */}
      </div>
    </Fragment>
  );
}

export default Index;
