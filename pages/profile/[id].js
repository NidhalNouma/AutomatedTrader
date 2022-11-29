import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GetUserPage } from "../../hooks/UserHook";
import { GetWebhook } from "../../hooks/WebHook";
import { CalendarIcon, GlobeAltIcon } from "@heroicons/react/outline";

import Header from "../../Features/Header";
import Sidenav from "../../Features/SideNav";
import { H1, H4, H6, Hi6 } from "../../Components/H";
import WebhooksItem from "../../Features/WebhooksItem";
import moment from "moment";

// import { ButtonP } from "../Components/Button";

function Profile({}) {
  const router = useRouter();
  const { id } = router.query;
  const { puser } = GetUserPage(id);
  const { webhooks, getAllWebhooks } = GetWebhook();

  useEffect(() => {
    getAllWebhooks(id, true);
  }, [id]);

  return (
    <React.Fragment>
      <Sidenav />
      <div className="w-full flex flex-col">
        <Header />
        <div className="flex flex-col items-start justify-center m-8">
          <div className="">
            <div className="flex items-start">
              <div className="w-20 h-20 mr-4">
                <img
                  src={puser?.photoURL || "/Images/profile.png"}
                  className="rounded-full w-full h-full border-4 border-text-h object-cover"
                />
              </div>
              <div className="">
                <div className="flex items-end">
                  <H1>{puser?.displayName || "NA"}</H1>
                  {/* <ButtonP
                onClick={() => router.push("/settings")}
                className="ml-4 !rounded !bg-transparent !border-primary !border-2"
              >
                Edit
              </ButtonP> */}
                </div>
                <p className="mt-1 text-sm font-semibold">{puser?.bio}</p>
                <div className=" flex items-center">
                  <span className="text-xs flex item-center">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="ml-1">
                      Joined {moment(puser?.metadata?.creationTime).fromNow()}
                    </span>
                  </span>

                  {puser?.tradingview && (
                    <a
                      target="_blank"
                      href={
                        "https://www.tradingview.com/u/" + puser.tradingview
                      }
                      rel="noopener noreferrer"
                      className="ml-4 flex items-center"
                    >
                      <img src="/Images/TV.png" className="h-6 w-6 rounded" />
                      <span className="ml-1 text-xs py-auto">
                        {puser.tradingview}
                      </span>
                    </a>
                  )}
                  {puser?.twitter && (
                    <a
                      className="ml-4 flex items-center"
                      target="_blank"
                      href={"https://twitter.com/" + puser.twitter}
                      rel="noopener noreferrer"
                    >
                      <img src="/Images/TW.png" className="h-4 w-5 rounded" />
                      <span className="ml-1 text-xs py-auto">
                        {puser.twitter}
                      </span>
                    </a>
                  )}

                  {puser?.youtubeURL && (
                    <a
                      className="ml-4 flex items-center"
                      target="_blank"
                      href={puser.youtubeURL}
                      rel="noopener noreferrer"
                    >
                      <img src="/Images/YT.png" className="h-4 w-5 rounded" />
                      <span className="ml-1 text-xs py-auto">
                        {puser.youtubeUsername}
                      </span>
                    </a>
                  )}

                  {puser?.website && (
                    <a
                      className="ml-4 flex items-center"
                      target="_blank"
                      href={puser.website}
                      rel="noopener noreferrer"
                    >
                      <GlobeAltIcon className="h-5 w-5" />
                      <span className="ml-1 text-xs py-auto">
                        {puser.website}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <H4 className="">Webhooks</H4>
            {webhooks?.length > 0 ? (
              <div className="p-2 mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-2">
                {webhooks
                  .map((v, i) => (
                    <WebhooksItem key={v.id} webhook={v} forDisplay={true} />
                  ))
                  .reverse()}
              </div>
            ) : (
              <div className="mt-3">
                <p>No available webhooks, click new to add a new one.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Profile;
