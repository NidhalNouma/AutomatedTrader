import { Fragment, useState } from "react";
import { PlusIcon } from "@heroicons/react/solid";

import Sidenav from "../Features/SideNav";
import ProfileSection from "../Features/ProfileSection";

import { GetUserContext, GetFullUserContext } from "../hooks/UserHook";
import { GetWebhookContext, getMessageData } from "../hooks/WebHook";
import { GetMTAccountsContext } from "../hooks/MTAccounts";

import { H1, H3, H6, Hi6 } from "../components/H";
import MainWithHeader from "../Features/mainLayout/MainWithHeader";
import WebhooksItem from "../components/parts/WebhookItem";

import { Modal1 } from "../components/Modal";
import ManageWebhook from "../Features/ManageWebhookAPI";

export default function Home() {
  const { user } = GetUserContext();
  const { fullUser } = GetFullUserContext();
  const { webhooks } = GetWebhookContext();
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
      <MainWithHeader>
        <ProfileSection user={user} fullUser={fullUser} publicProfile={false} />
        <div className="mt-6">
          <H3 className="">Webhooks</H3>
          {webhooks?.length > 0 ? (
            <div className="p-2 mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-x-2 gap-y-4">
              {webhooks.map(
                (v, i) =>
                  v.public && (
                    <Fragment key={v.id}>
                      <WebhooksItem
                        webhook={v}
                        user={user}
                        mtAccounts={mtAccounts}
                        forDisplay={true}
                      />
                    </Fragment>
                  )
              )}
            </div>
          ) : (
            <div className="mt-3">
              <p>No available public webhooks.</p>
            </div>
          )}
        </div>
      </MainWithHeader>
    </>
  );
}
