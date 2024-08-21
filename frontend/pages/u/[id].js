import { Fragment, useState } from "react";
import { useRouter } from "next/router";

import { MainLayout } from "../../components/layout/MainLayout";

import { ProfilePage } from "../profile";

import { PublicUser } from "../../hooksp/UserHook";

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;

  const { user, webhooks } = PublicUser(id);

  return (
    <Fragment>
      <MainLayout page="profile">
        <ProfilePage fullUser={user} webhooks={webhooks} />
      </MainLayout>
    </Fragment>
  );
}
