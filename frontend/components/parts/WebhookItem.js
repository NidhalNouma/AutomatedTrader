import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Toggle, SelectFull, Input } from "../ui/Input";
import { Label, Label2, Par } from "../ui/Text";
import { ButtonInfo, ButtonText } from "../ui/Button";
import { Dropdown, DropdownButton } from "../ui/Dropdown";
import { DeleteModal, EditModal, Modal, WideModal } from "../ui/Modal";
import { ColorPicker } from "../ui/ColorPicker";

import {
  AdvancedWebhookForm,
  BasicWebhookForm,
  WebhookApps,
} from "../Forms/Webhook";

import { WebhookPage } from "../../pages/webhook/[id]";

import { ClipboardIcon, ClipboardCopyIcon } from "@heroicons/react/outline";
import { TbChartPie } from "react-icons/tb";

import {
  EditWebhookColor,
  EditWebhookName,
  DeleteWebhook,
  SetPublicWebhook,
  SetActiveWebhook,
  getMessageData,
  WebhookApps as WhAppsHook,
} from "../../hooksp/WebhooksHook";

import { addAlpha, copyTextToClipboard } from "../../utils/functions";
import { servicesURL } from "../../utils/constant";

function Index({ webhook }) {
  const router = useRouter();

  const { whName, setWhName, editWhName } = EditWebhookName(webhook);
  const { whColor, setWhColor, editWhColor } = EditWebhookColor(webhook);
  const { active, activateWebhook } = SetActiveWebhook(webhook);
  const { isPublic, publicWebhook } = SetPublicWebhook(webhook);
  const { deleteWebhook } = DeleteWebhook(webhook);

  const { isConnected } = WhAppsHook(webhook);

  const [openMsg, setOpenMsg] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openEditMsg, setOpenEditMsg] = useState(false);
  const [openChangeName, setOpenChangeName] = useState(false);
  const [openChangeData, setOpenChangeData] = useState(false);
  const [openChangeColor, setOpenChangeColor] = useState(false);
  const [openApps, setOpenApps] = useState(false);

  const [duplicateMsg, setDuplicateMsg] = useState(null);

  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState(null);

  const [urlcopy, setURLcopy] = useState("Click to copy webhook private URL!");
  const [msgcopy, setMsgcopy] = useState("Click to copy webhook message!");

  const [viewData, setViewData] = useState(false);

  useEffect(() => {
    if (webhook.messages?.length > 0) {
      const msgs = webhook.messages;
      setMessages(msgs);
      setMsg(msgs[0]);
    }
  }, [webhook]);

  //   console.log("messages ", msg, messages);

  const uniquePairs = new Set();
  const uniqueMessages = messages.filter((v) => {
    const val = getMessageData(v);
    // console.log(val);
    if (uniquePairs.has(val.pair)) {
      return false;
    } else {
      uniquePairs.add(val.pair);
      return true;
    }
  });

  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center">
        <Fragment>
          {!webhook.advanced && msg && (
            <Fragment>
              <Modal
                open={openMsg}
                close={() => {
                  setOpenMsg(false);
                  setDuplicateMsg(null);
                }}
                withHeader={true}
                title="New message"
              >
                <section className="w-full flex flex-col items-center">
                  <BasicWebhookForm
                    webhook={webhook}
                    close={() => {
                      setOpenMsg(false);
                      setDuplicateMsg(null);
                    }}
                    message={duplicateMsg}
                    to="add"
                  />
                </section>
              </Modal>
              <Modal
                open={openEditMsg}
                close={() => setOpenEditMsg(false)}
                withHeader={true}
                title={
                  <div className="flex items-center w-full">
                    <span className="">Edit message</span>
                    <div className="ml-2">
                      <SelectFull
                        options={messages}
                        defaultValue={msg}
                        value={msg}
                        setValue={(v) => {
                          setMsg(v);
                        }}
                        className="w-24"
                      />
                    </div>
                  </div>
                }
              >
                <section className="w-full flex flex-col items-center">
                  <BasicWebhookForm
                    webhook={webhook}
                    close={() => setOpenEditMsg(false)}
                    message={msg}
                    onDuplicate={() => {
                      setDuplicateMsg(msg);
                      setOpenEditMsg(false);
                      setOpenMsg(true);
                    }}
                    to="edit"
                  />
                </section>
              </Modal>
            </Fragment>
          )}

          <Modal
            open={openChangeData}
            close={() => setOpenChangeData(false)}
            withHeader={true}
            title="Edit webhook"
          >
            <section className="w-full flex flex-col items-center">
              <AdvancedWebhookForm
                webhook={webhook}
                close={() => setOpenChangeData(false)}
              />
            </section>
          </Modal>

          <Modal
            open={openApps}
            close={() => setOpenApps(false)}
            withHeader={true}
            title="Apps"
          >
            <section className="w-full  max-w-xs mx-auto">
              <WebhookApps webhook={webhook} close={() => setOpenApps(false)} />
            </section>
          </Modal>

          <EditModal
            withHeader={true}
            title="Change name"
            open={openChangeName}
            close={() => {
              setOpenChangeName(false);
            }}
            backclose={() => {
              setOpenChangeName(false);
            }}
            onSave={async () => {
              const r = await editWhName();
              if (r) setOpenChangeName(false);
            }}
          >
            <div className="mx-auto w-full max-w-xs">
              <Input
                name="Webhook name"
                className="mb-4 "
                type="text"
                placeholder="Name"
                value={whName}
                setValue={(v) => setWhName(v)}
                focus={openChangeName}
              />
            </div>
          </EditModal>

          <EditModal
            open={openChangeColor}
            close={() => setOpenChangeColor(false)}
            withHeader={true}
            title="Webhook color"
            onSave={async () => {
              const r = await editWhColor();
              if (r) setOpenChangeColor(false);
            }}
          >
            <ColorPicker
              className="max-w-xs mb-4"
              color={whColor}
              setColor={setWhColor}
            />
          </EditModal>

          <DeleteModal
            className=""
            title="Delete webhook"
            withHeader={true}
            open={openDel}
            close={() => {
              setOpenDel(false);
            }}
            backclose={() => {
              setOpenDel(false);
            }}
            onDelete={async () => {
              const r = await deleteWebhook();
              return r;
            }}
          >
            <Par className="mx-auto max-w-xs text-sm text-center mb-4">
              Are you sure you want to delete this webhook, all your data will
              be lost!
            </Par>
          </DeleteModal>

          {viewData && (
            <WideModal
              title={webhook?.name || "Loading..."}
              open={viewData}
              close={() => {
                window.history.pushState(
                  { urlPath: "/webhook" },
                  "",
                  "/webhook"
                );

                // window.history.back();
                setViewData(false);
              }}
              withHeader={true}
              className="max-w-[90vw] min-h-[90vh]"
            >
              <WebhookPage id={webhook.publicId} title={false} />
            </WideModal>
          )}

          <div
            style={{
              outlineColor: addAlpha(webhook.color, 0.3),
              backgroundColor: addAlpha(webhook.color, 0.06),
            }}
            className="w-full rounded outline outline-offset-2 outline-dashed outline-1 p-0"
          >
            <div className="py-2.5 px-2.5">
              <div className="flex items-start justify-between">
                <div className="">
                  <Label className="">{webhook.name} </Label>
                </div>
                <div className="flex items-center justify-center">
                  {webhook.publicId && (
                    <ButtonInfo
                      className="!h-6  mr-2.5"
                      helper="View webhook data."
                      onClick={() => {
                        window.history.pushState(
                          { urlPath: "/webhook/" + webhook.publicId },
                          "",
                          "/webhook/" + webhook.publicId
                        );
                        setViewData(true);
                      }}
                    >
                      <TbChartPie className="h-4 aspect-auto text-secondary" />
                    </ButtonInfo>
                  )}
                  <ButtonInfo
                    className="!h-6 "
                    helper={urlcopy}
                    onMouseLeave={() =>
                      setURLcopy("Click to copy webhook URL!")
                    }
                    onClick={() =>
                      copyTextToClipboard(
                        servicesURL.webhook + "/" + webhook.id,
                        () => setURLcopy("URL copied to clipboard!"),
                        () => newAlert("Webhooks URL copied", "error")
                      )
                    }
                  >
                    <ClipboardIcon className="h-4 aspect-auto text-info" />
                  </ButtonInfo>

                  <Dropdown
                    content={
                      <Fragment>
                        <DropdownButton onClick={() => setOpenApps(true)}>
                          Apps
                        </DropdownButton>
                        {webhook.advanced && (
                          <DropdownButton
                            onClick={() => setOpenChangeData(true)}
                          >
                            Edit webhook
                          </DropdownButton>
                        )}
                        {!webhook.advanced && (
                          <DropdownButton
                            onClick={() => setOpenChangeName(true)}
                          >
                            Change name
                          </DropdownButton>
                        )}
                        <DropdownButton
                          onClick={() => setOpenChangeColor(true)}
                        >
                          Change color
                        </DropdownButton>
                        <DropdownButton onClick={() => setOpenDel(true)}>
                          Delete
                        </DropdownButton>
                      </Fragment>
                    }
                    className="w-40 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 cursor-pointer text-text/40 ml-1 -mr-1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                      />
                    </svg>
                  </Dropdown>
                </div>
              </div>
              <div className="mt-2 flex items-center">
                <Label2 className="mr-3">Active</Label2>
                <Toggle
                  size="sm"
                  color="primary"
                  className=""
                  checked={active}
                  onChange={async () => {
                    const r = await activateWebhook();
                  }}
                />
              </div>

              <div className="mt-2 flex items-center">
                <Label2 className="mr-3">Public</Label2>
                <Toggle
                  size="sm"
                  color="primary"
                  className=""
                  checked={isPublic}
                  onChange={async () => {
                    const r = await publicWebhook();
                  }}
                />
              </div>
              {webhook.advanced && (
                <div className="mt-3 flex items-center">
                  <span className="text-xs bg-transparent border border-text/40 text-text font-semibold px-1.5 py-0 rounded-xl mr-1">
                    {webhook.pair}
                  </span>
                </div>
              )}
              {!webhook.advanced && (
                <Fragment>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <Label2>Messages</Label2>
                      <div className="flex items-center">
                        <Dropdown
                          className="w-40 "
                          content={
                            <Fragment>
                              <DropdownButton onClick={() => setOpenMsg(true)}>
                                New message
                              </DropdownButton>
                              {messages?.length > 0 && (
                                <DropdownButton
                                  onClick={() => setOpenEditMsg(true)}
                                >
                                  Edit messages
                                </DropdownButton>
                              )}
                            </Fragment>
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="aspect-auto h-5 cursor-pointer text-text/40 ml-1 -mr-1.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                            />
                          </svg>
                        </Dropdown>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center">
                      {messages?.length > 0 ? (
                        <Fragment>
                          <SelectFull
                            options={messages}
                            defaultValue={msg}
                            value={msg}
                            setValue={(v) => {
                              setMsg(v);
                            }}
                            className="mr-3"
                          />
                          <ButtonInfo
                            helper={msgcopy}
                            className="!h-7"
                            onMouseLeave={() =>
                              setMsgcopy("Click to copy webhook message!")
                            }
                            onClick={() =>
                              copyTextToClipboard(
                                msg.value,
                                () =>
                                  setMsgcopy("Message copied to clipboard!"),
                                () => newAlert("Message copied", "error")
                              )
                            }
                          >
                            <ClipboardCopyIcon className="h-4 aspect-auto text-info " />
                          </ButtonInfo>
                        </Fragment>
                      ) : (
                        <div className="py-1 mb-2">
                          <p className="text-xs">No message available!</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <div className="">
                      {Array.from(uniquePairs).map(
                        (v, i) =>
                          i < 3 && (
                            <span
                              key={i}
                              className="text-xs bg-transparent border border-text/40 text-text px-1.5 py-0 rounded-full mr-1"
                            >
                              {v}
                            </span>
                          )
                      )}
                    </div>
                  </div>
                </Fragment>
              )}
              <div className="mt-2 ">
                {isConnected ? (
                  <span className="text-xs text-success bg-transparent flex items-center py-0 ">
                    <svg
                      className="h-4 aspect-square "
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"></path>
                    </svg>
                    connected
                  </span>
                ) : (
                  <span className="text-xs text-error bg-transparent flex items-center py-0 ">
                    <svg
                      className="h-4 aspect-square "
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"></path>
                    </svg>
                    not connected
                    <span
                      onClick={() => setOpenApps(true)}
                      className="font-semibold ml-1 text-text border border-text/50 rounded cursor-pointer px-1"
                    >
                      connect an app
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    </Fragment>
  );
}

export default Index;
