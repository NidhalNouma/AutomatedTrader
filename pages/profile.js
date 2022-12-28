import { Fragment, useState } from "react";
import { PlusIcon } from "@heroicons/react/solid";

import Sidenav from "../Features/SideNav";
import Header from "../Features/Header";
import ProfileSection from "../Features/ProfileSection";
import Alerts from "../Features/AlertsCom";

import { GetUserContext, GetFullUserContext } from "../hooks/UserHook";
import { GetWebhookContext, getMessageData } from "../hooks/WebHook";
import { GetAlertsContext } from "../hooks/AlertsHook";
import { GetMTAccountsContext } from "../hooks/MTAccounts";

import { H1, H4, H6, Hi6 } from "../Components/H";
import { ButtonP } from "../Components/Button";
import WebhooksItem from "../Features/WebhooksItem";

import { Modal1 } from "../Components/Modal";
import ManageWebhook from "../Features/ManageWebhook";

export default function Home() {
  const { user } = GetUserContext();
  const { fullUser } = GetFullUserContext();
  const { webhooks } = GetWebhookContext();
  const { alertsHook } = GetAlertsContext();
  const { mtAccounts } = GetMTAccountsContext();

  const [open, setOpen] = useState(false);

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
      <Sidenav cpath="profile" />
      <div className="w-full flex flex-col">
        <Header />
        <div className="px-5 md:px-10 py-8 overflow-x-hidden">
          <ProfileSection
            user={user}
            fullUser={fullUser}
            publicProfile={false}
          />
          <div className="mt-6">
            <div className="flex items-center justify-betweeni">
              <H4 className="">Webhooks</H4>
              <ButtonP
                endIcon={<PlusIcon className="h-3 w-3" />}
                className="ml-4"
                onClick={() => setOpen(true)}
              >
                <span className="text-xs">New</span>
              </ButtonP>
            </div>
            {webhooks?.length > 0 ? (
              <div className="p-2 mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-x-2 gap-y-4">
                {webhooks.map((v, i) => (
                  <Fragment key={v.id}>
                    <WebhooksItem
                      webhook={v}
                      user={user}
                      mtAccounts={mtAccounts}
                    />
                  </Fragment>
                ))}
              </div>
            ) : (
              <div className="mt-3">
                <p>No available webhooks, click new to add a new one.</p>
              </div>
            )}
          </div>
          <Alerts alertsHook={alertsHook} />
        </div>
      </div>
    </>
  );
}
