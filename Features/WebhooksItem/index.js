import { Fragment, useState, useEffect } from "react";

import { H6, Hi6 } from "../../Components/H";
import { ButtonInfo } from "../../Components/Button";
import { Toggle, Select, Dropdown } from "react-daisyui";
import {
  PlusCircleIcon,
  ClipboardIcon,
  ClipboardCopyIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";

import { H5 } from "../../Components/H";

import { Modal1 } from "../../Components/Modal";
import AddMessage from "../ManageWebhook/AddMessage";
import EditMessage from "../ManageWebhook/EditMessage";
import { DeleteMessage } from "../../Components/ModalMsg";

import {
  getMessages,
  setActiveWebhook,
  setPublicWebhook,
  DeleteWebhook,
  GetWebhookContext,
} from "../../hooks/WebHook";
import { GetToastContext } from "../../hooks/ToastHook";

import { copyTextToClipboard } from "../../utils/functions";

import { WebhhokURL } from "../../utils/constant";

import WebhookLineChart from "./WebhookLineChart";

function Index({ webhook, user, forDisplay = false }) {
  // const [webhook, setWebhook] = useState(wh);
  const { getAllWebhooks } = GetWebhookContext();

  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const msgs = getMessages(webhook);
    setMessages(msgs);
    setMsg(msgs[0]);
    // messagesFn();
  }, [webhook]);

  const { newAlert } = GetToastContext();

  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center">
        {!forDisplay && (
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

            <Modal1
              open={openDel}
              close={() => {
                setOpenDel(false);
              }}
              backclose={() => {
                setOpenDel(false);
              }}
            >
              <DeleteMessage
                close={() => setOpenDel(false)}
                title="Delete webhook"
                onDelete={async () => {
                  const r = await DeleteWebhook(webhook.id);
                  getAllWebhooks(user.uid);
                }}
              >
                <H5 className="px-8">
                  Are you sure you want to delete this webhook, all your data
                  will be lost!
                </H5>
              </DeleteMessage>
            </Modal1>

            <div
              className={`${
                !forDisplay ? "bg-accent" : "bg-bg"
              } w-full rounded-t-lg`}
            >
              <div
                className="w-full pt-2 pb-1 rounded-t-lg"
                style={{ backgroundColor: webhook.color }}
              ></div>
              <div className="pt-2 p-3">
                <div className="flex items-center justify-between">
                  <H6>{webhook.name}</H6>
                  <div className="flex items-center justify-center">
                    <ButtonInfo
                      helper="Copy webhooks URL"
                      onClick={() =>
                        copyTextToClipboard(
                          WebhhokURL() + webhook.id,
                          () => newAlert("Webhooks URL copied", "success"),
                          () => newAlert("Webhooks URL copied", "error")
                        )
                      }
                    >
                      <ClipboardIcon className="h-5 w-5 text-secondaryi" />
                    </ButtonInfo>

                    <Dropdown>
                      {/* <Dropdown.Toggle className="h-4 w-4">i</Dropdown.Toggle> */}
                      {/* <Button className=""> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 cursor-pointer"
                        // style={{ color: txtColor }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                        />
                      </svg>
                      {/* </Button> */}
                      <Dropdown.Menu className="w-52  bg-accent">
                        <Dropdown.Item onClick={() => setOpen(true)}>
                          <span className="text-secondary text-sm font-bold">
                            Add message
                          </span>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setOpenEdit(true)}>
                          <span className="text-secondary text-sm font-bold">
                            Edit messages
                          </span>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setOpenDel(true)}>
                          <span className="text-text-p text-sm font-bold">
                            Delete
                          </span>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="mt-2 flex">
                  <H6 className="mr-4">Active</H6>
                  <Toggle
                    size="sm"
                    color="secondary"
                    className=""
                    checked={webhook.active}
                    onChange={async () => {
                      let is = "on";
                      if (webhook.active) is = "off";
                      const r = await setActiveWebhook(
                        webhook.id,
                        !webhook.active
                      );
                      const r1 = await getAllWebhooks(user.uid);
                      if (r) {
                        // setWebhook(r);
                        newAlert(webhook.name + " webhook is " + is, "success");
                      }
                    }}
                  />
                </div>

                <div className="mt-2 flex">
                  <H6 className="mr-4">Public</H6>
                  <Toggle
                    size="sm"
                    color="secondary"
                    className=""
                    checked={webhook.public}
                    onChange={async () => {
                      let is = "public";
                      if (webhook.public) is = "private";
                      const r = await setPublicWebhook(
                        webhook.id,
                        !webhook.public
                      );
                      const r1 = await getAllWebhooks(user.uid);
                      if (r) {
                        // setWebhook(r);
                        newAlert(webhook.name + " webhook is " + is, "!");
                      }
                    }}
                  />
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <Hi6>List of messages</Hi6>
                    <div className="flex">
                      {/* <ButtonInfo
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
                      </ButtonInfo> */}
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
                    {messages && (
                      <Select
                        value={msg?.msg}
                        onChange={(v) => {
                          setMsg(messages[v]);
                        }}
                        size="sm"
                        className="bg-transparent w-full border-primaryi focus:outline-none rounded-lg font-normal text-text-p"
                      >
                        {messages?.map((v, i) => (
                          <option
                            key={i}
                            value={i}
                            selected={v.msg === msg.msg}
                          >
                            {v.data.pair}
                            {" - "}
                            {v.data.type}
                          </option>
                        ))}
                      </Select>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="mt-3 "></div> */}
            </div>
          </Fragment>
        )}

        <WebhookLineChart webhook={webhook} />
      </div>
    </Fragment>
  );
}

export default Index;
