import { Fragment } from "react";
import { useRouter } from "next/router";
import { CalendarIcon } from "@heroicons/react/outline";

import moment from "moment";
import Sidenav from "../Features/SideNav";
import Header from "../Features/Header";

import { GetUserContext, GetFullUserContext } from "../hooks/UserHook";
import { GetWebhookContext, getMessageData } from "../hooks/WebHook";
import { GetAlertsContext } from "../hooks/AlertsHook";

import { H1, H4, H6, Hi6 } from "../Components/H";
import { ButtonP } from "../Components/Button";
import WebhooksItem from "../Features/WebhooksItem";

export default function Home() {
  const router = useRouter();
  const { user } = GetUserContext();
  const { fullUser } = GetFullUserContext();
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
            <div className="">
              <div className="flex items-end">
                <H1>{user?.displayName || "NA"}</H1>
                <ButtonP
                  onClick={() => router.push("/settings")}
                  className="ml-4 !rounded"
                >
                  Edit
                </ButtonP>
              </div>
              <p className="text-sm font-semibold">{fullUser?.bio}</p>
              <div className="mt-1">
                <span className="text-xs flex item-center">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="ml-1">
                    Joined {moment(user.metadata.creationTime).fromNow()}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <H4 className="">Webhooks Url&apos;s</H4>
            {webhooks?.length > 0 ? (
              <div className="p-2 mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-2">
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
              <div className="bg-bg w-1/2 mt-2 rounded-xl">
                {alertsHook.map((v, i) =>
                  i < 10 ? (
                    <div
                      key={i}
                      className={
                        "bg-bga p-1 mx-4 " + (10 - 1 === i ? "" : "pb-0")
                      }
                    >
                      <div className="bg-bg py-3 px-2 border-bgai flex items-center justify-between">
                        <H6>
                          {v.webhookName}
                          <span className="ml-4 text-text-p px-2 py-1 rounded-lg border-2 ">
                            {getMessageData(v.message).pair}
                          </span>
                        </H6>
                        <Hi6>{moment(v.created_at.toDate()).fromNow()}</Hi6>
                      </div>
                    </div>
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
