import { Fragment } from "react";
import { useRouter } from "next/router";
import { CalendarIcon, GlobeAltIcon } from "@heroicons/react/outline";

import moment from "moment";
import Sidenav from "../Features/SideNav";
import Header from "../Features/Header";
import Alerts from "../Features/AlertsCom";

import { GetUserContext, GetFullUserContext } from "../hooks/UserHook";
import { GetWebhookContext, getMessageData } from "../hooks/WebHook";
import { GetAlertsContext } from "../hooks/AlertsHook";
import { GetMTAccountsContext } from "../hooks/MTAccounts";

import { H1, H4, H6, Hi6 } from "../Components/H";
import { ButtonP } from "../Components/Button";
import WebhooksItem from "../Features/WebhooksItem";

export default function Home() {
  const router = useRouter();
  const { user } = GetUserContext();
  const { fullUser } = GetFullUserContext();
  const { webhooks } = GetWebhookContext();
  const { alertsHook } = GetAlertsContext();
  const { mtAccounts } = GetMTAccountsContext();

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
                <H1>{fullUser?.displayName || "NA"}</H1>
                <ButtonP
                  onClick={() => router.push("/settings")}
                  className="ml-4 !rounded !bg-transparent !border-primary !border-2"
                >
                  Edit
                </ButtonP>
              </div>
              <p className="mt-1 text-sm font-semibold">{fullUser?.bio}</p>
              <div className=" flex items-center">
                <span className="text-xs flex item-center">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="ml-1">
                    Joined {moment(user?.metadata?.creationTime).fromNow()}
                  </span>
                </span>

                {fullUser?.tradingview && (
                  <a
                    target="_blank"
                    href={
                      "https://www.tradingview.com/u/" + fullUser.tradingview
                    }
                    rel="noopener noreferrer"
                    className="ml-4 flex items-center"
                  >
                    <img src="/Images/TV.png" className="h-6 w-6 rounded" />
                    <span className="ml-1 text-xs py-auto">
                      {fullUser.tradingview}
                    </span>
                  </a>
                )}
                {fullUser?.twitter && (
                  <a
                    className="ml-4 flex items-center"
                    target="_blank"
                    href={"https://twitter.com/" + fullUser.twitter}
                    rel="noopener noreferrer"
                  >
                    <img src="/Images/TW.png" className="h-4 w-5 rounded" />
                    <span className="ml-1 text-xs py-auto">
                      {fullUser.twitter}
                    </span>
                  </a>
                )}

                {fullUser?.youtubeURL && (
                  <a
                    className="ml-4 flex items-center"
                    target="_blank"
                    href={fullUser.youtubeURL}
                    rel="noopener noreferrer"
                  >
                    <img src="/Images/YT.png" className="h-4 w-5 rounded" />
                    <span className="ml-1 text-xs py-auto">
                      {fullUser.youtubeUsername}
                    </span>
                  </a>
                )}

                {fullUser?.website && (
                  <a
                    className="ml-4 flex items-center"
                    target="_blank"
                    href={fullUser.website}
                    rel="noopener noreferrer"
                  >
                    <GlobeAltIcon className="h-5 w-5" />
                    <span className="ml-1 text-xs py-auto">
                      {fullUser.website}
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <H4 className="">Webhooks</H4>
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
