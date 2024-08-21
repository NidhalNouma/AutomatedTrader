import { Fragment, useState } from "react";
import { withAuth } from "../contexts/UserContext";
import { useRouter } from "next/router";

import { MainLayoutWithHeader } from "../components/layout/MainLayout";
import ProfileSection from "../components/parts/ProfileSection";

import { SubTitle2 } from "../components/ui/Text";

import { Button, ButtonText } from "../components/ui/Button";

import { useUser } from "../contexts/UserContext";
import { useWebhook } from "../contexts/WebhookContext";

import WebhookChart from "../components/parts/WebhookChart";

function Profile() {
  const router = useRouter();
  const { fullUser } = useUser();
  const { webhooks } = useWebhook();

  return (
    <Fragment>
      <MainLayoutWithHeader
        title="Profile"
        page="profile"
        rightSection={
          <div className="">
            <Button
              className="bg-transparent hover:bg-transparent text-title"
              onClick={() => router.push("/settings")}
            >
              Edit profile
            </Button>
            {fullUser?.userName && (
              <Button
                className="bg-secondary hover:bg-secondary ml-3"
                onClick={() => router.push("/u/" + fullUser?.userName)}
              >
                View public profile
              </Button>
            )}
          </div>
        }
      >
        <ProfilePage fullUser={fullUser} webhooks={webhooks} />
      </MainLayoutWithHeader>
    </Fragment>
  );
}

export default withAuth(Profile);

export function ProfilePage({ fullUser, webhooks }) {
  return (
    <div className="mt-6">
      <ProfileSection fullUser={fullUser} />
      <div className="mt-6">
        {/* <SubTitle2 className="">Webhooks</SubTitle2> */}
        {webhooks?.length > 0 ? (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-4">
            {webhooks.map((webhook, i) => (
              <Fragment key={webhook.id}>
                <WebhookChart webhook={webhook} />
              </Fragment>
            ))}
          </div>
        ) : (
          <div className="mt-3 text-text/80">
            <p>No available public webhooks.</p>
          </div>
        )}
      </div>
    </div>
  );
}
