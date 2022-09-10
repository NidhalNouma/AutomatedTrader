import { Fragment } from "react";
import moment from "moment";
import Sidenav from "../Features/SideNav";
import Header from "../Features/Header";

import { GetUserContext } from "../hooks/UserHook";
import { GetWebhookContext, getMessageData } from "../hooks/WebHook";
import { GetAlertsContext } from "../hooks/AlertsHook";

import { H1, H4, H6, Hi6 } from "../Components/H";
// import { ButtonP } from "../Components/Button";
import WebhooksItem from "../Features/WebhooksItem";

export default function Home() {
  const { user } = GetUserContext();
  const { webhooks } = GetWebhookContext();
  const { alertsHook } = GetAlertsContext();

  return (
    <>
      <Sidenav cpath="profile" />
      <div className="w-full flex flex-col">
        <Header />
        <div className="px-10 py-8 overflow-x-hidden">
          <div className="flex items-start">
            <div className="w-20 h-20 mr-4">
              <img
                src={user?.photoURL || "Images/profile.png"}
                className="rounded-full w-full h-full border-4 border-text-h object-cover"
              />
            </div>
            <H1>{user?.displayName || "NA"}</H1>
          </div>

          <div className="mt-6">
            <H4 className="">Webhooks Url&apos;s</H4>
            {webhooks?.length > 0 ? (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3">
                {webhooks
                  .map((v, i) => <WebhooksItem key={v.id} webhook={v} />)
                  .reverse()}
              </div>
            ) : (
              <div className="mt-3">
                <p>No available webhooks, click new to add a new one.</p>
              </div>
            )}
          </div>

          {alertsHook?.length > 0 && (
            <div className="mt-6">
              <H4 className="">Recent alerts</H4>
              <div className="bg-bga w-1/2 min-h-16 mt-2 rounded-xl">
                {alertsHook.map((v, i) =>
                  i < 10 ? (
                    <Fragment key={i}>
                      <div className="py-3 border-b-2 border-bgai mx-4 flex items-center justify-between">
                        <H6>
                          {v.webhookName}
                          <span className="ml-4 text-text-p px-2 py-1 rounded-lg border-2 ">
                            {getMessageData(v.message).pair}
                          </span>
                        </H6>
                        <Hi6>{moment(v.created_at.toDate()).fromNow()}</Hi6>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment></Fragment>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
