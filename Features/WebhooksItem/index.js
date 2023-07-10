import { Fragment, useState, useEffect } from "react";

import { H6, Hi6, H4 } from "../../Components/H";
import { ButtonInfo, ButtonText } from "../../Components/Button";
import { Togglew, Input1 } from "../../Components/Input";
import { Toggle, Select, Dropdown } from "react-daisyui";
import {
  PlusCircleIcon,
  ClipboardIcon,
  ClipboardCopyIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";

import { H5 } from "../../Components/H";
import ColorPicker from "../../Components/ColorPicker";

import { Modal1 } from "../../Components/Modal";
import AddMessage from "../ManageWebhook/AddMessage";
import EditMessageWH from "../ManageWebhook/EditMessage";
import { DeleteMessage, EditMessage } from "../../Components/ModalMsg";

import {
  getMessages,
  setActiveWebhook,
  setPublicWebhook,
  DeleteWebhook,
  GetWebhookContext,
  EditWebhookName,
  EditWebhookColor,
  EditWebhookPair,
} from "../../hooks/WebHook";
import { GetToastContext } from "../../hooks/ToastHook";

import { copyTextToClipboard } from "../../utils/functions";

import { WebhhokURL } from "../../utils/constant";

import WebhookLineChart from "./WebhookLineChart";

function Index({ webhook, user, mtAccounts, forDisplay = false }) {
  // const [webhook, setWebhook] = useState(wh);
  const { getAllWebhooks, setWebhooks } = GetWebhookContext();

  const { whname, setWHname, editWhName } = EditWebhookName(
    user?.uid,
    webhook.id,
    webhook.name
  );

  const { whpair, setWHpair, editWhPair } = EditWebhookPair(
    user?.uid,
    webhook.id,
    webhook.pair
  );

  const { whcolor, setWHcolor, editWhColor } = EditWebhookColor(
    user?.uid,
    webhook.id,
    webhook.color
  );

  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openChangeName, setOpenChangeName] = useState(false);
  const [openChangePair, setOpenChangePair] = useState(false);
  const [openChangeColor, setOpenChangeColor] = useState(false);

  const [duplicateMsg, setDuplicateMsg] = useState(null);

  useEffect(() => {
    // console.log("ddddD", duplicateMsg);
    if (duplicateMsg) {
      setOpenEdit(false);
      setOpen(true);
    }
  }, [duplicateMsg]);

  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState(null);

  const [urlcopy, setURLcopy] = useState("Click to copy webhook URL!");
  const [msgcopy, setMsgcopy] = useState("Click to copy webhook message!");

  const [viewChart, setViewChart] = useState(forDisplay);

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
              <AddMessage
                close={() => setOpen(false)}
                webhook={webhook}
                msg={duplicateMsg}
              />
            </Modal1>
            <Modal1
              open={openEdit}
              close={() => {
                setOpenEdit(false);
              }}
            >
              <EditMessageWH
                close={() => setOpenEdit(false)}
                webhook={webhook}
                msg={msg}
                setMsg={setMsg}
                messages={messages}
                duplicateMsg={(m) => setDuplicateMsg(m)}
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

            <Modal1
              open={openChangeName}
              close={() => {
                setOpenChangeName(false);
              }}
              backclose={() => {
                setOpenChangeName(false);
              }}
            >
              <EditMessage
                close={() => setOpenChangeName(false)}
                title="Change webhook name"
                onEdit={async () => {
                  const r = await editWhName();
                  setWebhooks(r);
                }}
              >
                <div className="">
                  <Input1
                    className="mb-4 "
                    // name="Your name"
                    type="text"
                    placeholder="Name"
                    value={whname}
                    setValue={(v) => setWHname(v)}
                    // focus={openEdit}
                  />
                </div>
              </EditMessage>
            </Modal1>

            <Modal1
              open={openChangePair}
              close={() => {
                setOpenChangePair(false);
              }}
              backclose={() => {
                setOpenChangePair(false);
              }}
            >
              <EditMessage
                close={() => setOpenChangePair(false)}
                title="Change pair name"
                onEdit={async () => {
                  const r = await editWhPair();
                  setWebhooks(r);
                }}
              >
                <div className="">
                  <Input1
                    className="mb-4 "
                    // name="Your name"
                    type="text"
                    placeholder="Pair name"
                    value={whpair}
                    setValue={(v) => setWHpair(v)}
                    // focus={openEdit}
                  />
                </div>
              </EditMessage>
            </Modal1>

            <Modal1
              open={openChangeColor}
              close={() => {
                setOpenChangeColor(false);
              }}
              backclose={() => {
                setOpenChangeColor(false);
              }}
            >
              <EditMessage
                close={() => setOpenChangeColor(false)}
                title="Change webhook color"
                onEdit={async () => {
                  const r = await editWhColor();
                  setWebhooks(r);
                }}
              >
                <ColorPicker color={whcolor} setColor={setWHcolor} />
              </EditMessage>
            </Modal1>

            <div
              style={{
                boxShadow: `-1px 1px 8px -3px ${webhook.color}`,
                borderColor: webhook.color,
              }}
              className="bg-bgt w-full rounded-lg border-t-[3px]"
            >
              <div className="py-4 px-4">
                <div className="flex items-start justify-between">
                  <div className="">
                    <H4 className="font-bold">{webhook.name} </H4>
                    {webhook.pair && (
                      <span className="text-xs">({webhook.pair})</span>
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    <ButtonInfo
                      helper={urlcopy}
                      onMouseLeave={() =>
                        setURLcopy("Click to copy webhook URL!")
                      }
                      onClick={() =>
                        copyTextToClipboard(
                          WebhhokURL() + webhook.id,
                          () => setURLcopy("URL copied to clipboard!"),
                          () => newAlert("Webhooks URL copied", "error")
                        )
                      }
                    >
                      <ClipboardIcon className="h-5 w-5 text-primary" />
                    </ButtonInfo>

                    <Dropdown vertical="end" horizontal="center">
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
                      <Dropdown.Menu className="w-40 bg-bg shadow-2xl shadow-bgt">
                        <Dropdown.Item onClick={() => setOpenChangeName(true)}>
                          <span className="text-secondary text-sm font-bold">
                            Change name
                          </span>
                        </Dropdown.Item>
                        {webhook.advanced && (
                          <Dropdown.Item
                            onClick={() => setOpenChangePair(true)}
                          >
                            <span className="text-secondary text-sm font-bold">
                              Change pair
                            </span>
                          </Dropdown.Item>
                        )}
                        <Dropdown.Item onClick={() => setOpenChangeColor(true)}>
                          <span className="text-secondary text-sm font-bold">
                            Change color
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
                <div className="mt-2 flex items-center">
                  <H6 className="mr-3">Active</H6>
                  <Togglew
                    size="sm"
                    color="primary"
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

                <div className="mt-2 flex items-center">
                  <H6 className="mr-3">Public</H6>
                  <Togglew
                    size="sm"
                    color="primary"
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
                        newAlert(
                          webhook.name + " webhook is " + is + "!",
                          "success"
                        );
                      }
                    }}
                  />
                </div>
                {!webhook.advanced && (
                  <Fragment>
                    <div className="mt-2">
                      <div className="flex items-center justify-between">
                        <Hi6>List of messages</Hi6>
                        <div className="flex items-center">
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
                          {messages?.length > 0 && (
                            <ButtonInfo
                              helper={msgcopy}
                              className="ml-2"
                              onMouseLeave={() =>
                                setMsgcopy("Click to copy webhook message!")
                              }
                              onClick={() =>
                                copyTextToClipboard(
                                  msg.msg,
                                  () =>
                                    setMsgcopy("Message copied to clipboard!"),
                                  () => newAlert("Message copied", "error")
                                )
                              }
                            >
                              <ClipboardCopyIcon className="h-5 w-5 text-primary" />
                            </ButtonInfo>
                          )}

                          <Dropdown vertical="end" horizontal="center">
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
                            <Dropdown.Menu className="w-40 bg-bg shadow-2xl shadow-bgt">
                              <Dropdown.Item onClick={() => setOpen(true)}>
                                <span className="text-secondary text-sm font-bold">
                                  New message
                                </span>
                              </Dropdown.Item>
                              {messages?.length > 0 && (
                                <Dropdown.Item
                                  onClick={() => setOpenEdit(true)}
                                >
                                  <span className="text-secondary text-sm font-bold">
                                    Edit messages
                                  </span>
                                </Dropdown.Item>
                              )}
                              {/* <Dropdown.Item onClick={() => setOpenDel(true)}>
                            <span className="text-text-p text-sm font-bold">
                              Delete
                            </span>
                          </Dropdown.Item> */}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>

                      <div className="mt-2">
                        {messages?.length > 0 ? (
                          <Select
                            value={msg?.msg}
                            onChange={(v) => {
                              setMsg(messages[v]);
                            }}
                            size="sm"
                            className="bg-transparent w-full border-primary focus:outline-none rounded-lg font-normal text-text-p"
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
                        ) : (
                          <div className="py-1 mb-2">
                            <p className="text-xs">No message available!</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-2">
                      {messages?.map(
                        (v, i) =>
                          i < 3 && (
                            <span
                              key={i}
                              className="text-xs bg-bga text-text-h px-2 py-1 rounded-xl mx-1"
                            >
                              {v.data.pair}
                            </span>
                          )
                      )}
                    </div>
                  </Fragment>
                )}

                {/* <ButtonText
                  className="mt-1"
                  onClick={() => setViewChart(!viewChart)}
                >
                  {viewChart ? "Hide" : "View"} chart
                </ButtonText> */}
              </div>
            </div>
          </Fragment>
        )}
        {viewChart && (
          <div className="pt-2 w-full">
            <WebhookLineChart
              webhook={webhook}
              mtAccounts={mtAccounts}
              messages={messages}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Index;
