import { useState, Fragment } from "react";
import Sidenav from "../Features/SideNav";
import Header from "../Features/Header";

import { H1 } from "../Components/H";
import { PlusIcon } from "@heroicons/react/outline";

import { ButtonP } from "../Components/Button";
import WebhooksItem from "../Features/WebhooksItem";
import { Modal1 } from "../Components/Modal";
import ManageWebhook from "../Features/ManageWebhook";

import { GetWebhookContext, getMessageData } from "../hooks/WebHook";
import { GetMTAccountsContext } from "../hooks/MTAccounts";
import { GetUserContext, GetFullUserContext } from "../hooks/UserHook";

export default function Webhook() {
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
      <Sidenav cpath="webhook" />
      <div className="w-full flex flex-col">
        <Header />
        <div className="px-10 py-6">
          <div className="flex justify-between items-center">
            <H1>Webhooks</H1>
            <ButtonP
              className="" // !bg-transparent !px-1 !rounded !border-b-[4px] border-primary "
              onClick={() => setOpen(true)}
              icon={<PlusIcon className="h-4 w-4" />}
            >
              New
            </ButtonP>
          </div>
          <div className="mt-6">
            {webhooks?.length > 0 ? (
              <div className="p-2 mt-3 items-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-x-2 gap-y-4">
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
            {/* <section className="container mx-auto flex flex-wrap">
              <Pricing title="Standard" />
              <Pricing title="Pro" />
              <Pricing title="Primium" />
            </section> */}
          </div>
        </div>
      </div>
    </>
  );
}
