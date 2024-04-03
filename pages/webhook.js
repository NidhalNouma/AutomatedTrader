import { useState, useEffect, Fragment } from "react";
import Sidenav from "../Features/SideNav";

import { H1, H3 } from "../Components/H";
import { PlusIcon } from "@heroicons/react/outline";

import { ButtonP } from "../Components/Button";
import WebhooksItem from "../Features/WebhooksItem";
import { Modal1 } from "../Components/Modal";
import ManageWebhook from "../Features/ManageWebhookAPI";
import MainWithHeader from "../Features/mainLayout/MainWithHeader";

import { GetWebhookContext, getMessageData } from "../hooks/WebHook";
import { GetMTAPIAccountsContext } from "../hooks/MTAccountsApi";
import { GetUserContext, GetFullUserContext } from "../hooks/UserHook";

import UpgradeMsg from "../Features/UpgradeMsg";
import UpgradeWebhook from "../Features/UpgradeMsg/UpgradeWebhook";
import WebhooksWelcome from "../Features/WelcomeSection/Webhooks";

import { PlayVideoPopup } from "../Components/Video";
import { videosUrls } from "../utils/constant";

import { AiFillSetting } from "react-icons/ai";
import WhSettingsModal from "../Features/WebhooksItem/WhSettingModal";

export default function Webhook() {
  const { user } = GetUserContext();
  const { fullUser } = GetFullUserContext();
  const sub = fullUser?.subObj;
  const { webhooks } = GetWebhookContext();
  const { mtAPIAccounts } = GetMTAPIAccountsContext();
  const [open, setOpen] = useState(false);
  const [openUpg, setOpenUpg] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  const [advanced, setAdvanced] = useState([]);

  useEffect(() => {
    let r = [];
    for (let i = 0; i < webhooks.length; i++) {
      let e = webhooks[i];
      if (e.advanced) r.push(e);
    }

    setAdvanced(r);
  }, [webhooks]);

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

            <AiFillSetting
              onClick={() => setOpenSetting(true)}
              className="ml-3 stroke-4 cursor-pointer h-5 w-5 p-0.5 bg-text-p rounded-full text-bg"
            />
            {/* 
            {webhooks?.length > 0 && (
              <PlayVideoPopup
                className="aspect-video w-[100%] mx-auto rounded-xl border-0 border-text-p"
                src={videosUrls.webhooksAT}
              />
            )} */}
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
          {advanced.length > 0 && (
            <Fragment>
              <H3 className="font-bold">Advanced webhook</H3>
              <div className="p-2 mt-3 items-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-x-6 gap-y-8">
                {advanced
                  .sort((a, b) => b.created_at - a.created_at)
                  .map((v, i) => (
                    <Fragment key={v.id}>
                      <WebhooksItem
                        webhook={v}
                        user={user}
                        mtAccounts={mtAPIAccounts}
                      />
                    </Fragment>
                  ))}
                {/* {sub && sub.webhooks <= webhooks.length && <UpgradeWebhook />} */}
              </div>
            </Fragment>
          )}

          {webhooks?.length > 0 ? (
            <Fragment>
              {advanced.length > 0 && webhooks.length > advanced.length && (
                <H3 className="font-bold mt-8">Basic webhook</H3>
              )}
              <div className="p-2 mt-3 items-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-x-2 gap-y-4">
                {webhooks
                  .sort((a, b) => b.created_at - a.created_at)
                  .map(
                    (v, i) =>
                      !v.advanced && (
                        <Fragment key={v.id}>
                          <WebhooksItem
                            webhook={v}
                            user={user}
                            mtAccounts={mtAPIAccounts}
                          />
                        </Fragment>
                      )
                  )}
                {/* {sub && sub.webhooks <= webhooks.length && <UpgradeWebhook />} */}
              </div>
            </Fragment>
          ) : (
            <div className="mt-3 w-full">
              {/* <WebhooksWelcome sub={sub} /> */}
            </div>
          )}
        </div>

        <Modal1
          open={openSetting}
          close={() => {
            setOpenSetting(false);
          }}
        >
          <WhSettingsModal close={() => setOpenSetting(false)} />
        </Modal1>
      </MainWithHeader>
    </>
  );
}
