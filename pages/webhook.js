import { useState, Fragment } from "react";
import Sidenav from "../Features/SideNav";

import { H1 } from "../Components/H";
import { PlusIcon } from "@heroicons/react/outline";

import { ButtonP } from "../Components/Button";
import WebhooksItem from "../Features/WebhooksItem";
import { Modal1 } from "../Components/Modal";
import ManageWebhook from "../Features/ManageWebhook";
import MainWithHeader from "../Features/mainLayout/MainWithHeader";

import { GetWebhookContext, getMessageData } from "../hooks/WebHook";
import { GetMTAccountsContext } from "../hooks/MTAccounts";
import { GetUserContext, GetFullUserContext } from "../hooks/UserHook";

import UpgradeMsg from "../Features/UpgradeMsg";
import UpgradeWebhook from "../Features/UpgradeMsg/UpgradeWebhook";
import WebhooksWelcome from "../Features/WelcomeSection/Webhooks";

import { PlayVideoPopup } from "../Components/Video";
import { videosUrls } from "../utils/constant";

export default function Webhook() {
  const { user } = GetUserContext();
  const { fullUser } = GetFullUserContext();
  const sub = fullUser?.subObj;
  const { webhooks } = GetWebhookContext();
  const { mtAccounts } = GetMTAccountsContext();
  const [open, setOpen] = useState(false);
  const [openUpg, setOpenUpg] = useState(false);

  // console.log("wh Mt", mtAccounts);

  return (
    <>
      <Modal1
        open={open}
        close={() => {
          setOpen(false);
        }}
      >
        <ManageWebhook close={() => setOpen(false)} />
      </Modal1>
      <UpgradeMsg open={openUpg} close={() => setOpenUpg(false)}></UpgradeMsg>

      <Sidenav cpath="webhook" />
      <MainWithHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <H1>Webhooks</H1>

            {webhooks?.length > 0 && (
              <PlayVideoPopup
                className="aspect-video w-[100%] mx-auto rounded-xl border-0 border-text-p"
                src={videosUrls.webhooksAT}
              />
            )}
          </div>
          <ButtonP
            className="" // !bg-transparent !px-1 !rounded !border-b-[4px] border-primary "
            onClick={() => {
              if (sub && sub.webhooks > webhooks.length) setOpen(true);
              else setOpenUpg(true);
            }}
            icon={<PlusIcon className="h-4 w-4" />}
          >
            New
          </ButtonP>
        </div>
        <div className="mt-6">
          {webhooks?.length > 0 ? (
            <div className="p-2 mt-3 items-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-x-2 gap-y-4">
              {webhooks
                .sort((a, b) => b.created_at - a.created_at)
                .map((v, i) => (
                  <Fragment key={v.id}>
                    <WebhooksItem
                      webhook={v}
                      user={user}
                      mtAccounts={mtAccounts}
                    />
                  </Fragment>
                ))}
              {sub && sub.webhooks <= webhooks.length && <UpgradeWebhook />}
            </div>
          ) : (
            <div className="mt-3 w-full">
              <WebhooksWelcome sub={sub} />
            </div>
          )}
        </div>
      </MainWithHeader>
    </>
  );
}
