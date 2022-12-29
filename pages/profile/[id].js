import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { GetUserPage } from "../../hooks/UserHook";
import { GetWebhook } from "../../hooks/WebHook";
import { GetMTAccounts } from "../../hooks/MTAccounts";

import Header from "../../Features/Header";
import Sidenav from "../../Features/SideNav";
import ProfileSection from "../../Features/ProfileSection";
import { H1, H4, H6, Hi6 } from "../../Components/H";
import WebhooksItem from "../../Features/WebhooksItem";

function Profile({}) {
  const router = useRouter();
  const { id } = router.query;
  const { puser } = GetUserPage(id);
  const { webhooks, getAllWebhooks } = GetWebhook();
  const { mtAccounts, getAllMTAccountsWithoutListen } = GetMTAccounts();

  useEffect(() => {
    getAllWebhooks(id, true);
    getAllMTAccountsWithoutListen(id);
  }, [id]);

  return (
    <React.Fragment>
      <Sidenav />
      <div className="w-full flex flex-col">
        <Header />
        <div className="flex flex-col items-start justify-center px-5 py-6 md:px-10">
          <ProfileSection user={puser} fullUser={puser} publicProfile={true} />

          <div className="mt-6 w-full">
            <H4 className="">Webhooks</H4>
            {webhooks?.length > 0 ? (
              <div className="p-2 mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-x-2 gap-y-4">
                {webhooks
                  .map((v, i) => (
                    <WebhooksItem
                      key={v.id}
                      webhook={v}
                      forDisplay={true}
                      mtAccounts={mtAccounts}
                    />
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
