import Sidenav from "../Features/SideNav";
import MainWithHeader from "../Features/mainLayout/MainWithHeader";

import { GetUserContext, GetFullUserContext } from "../hooks/UserHook";

import { Hi2 } from "../Components/H";

export default function Home() {
  const { user } = GetUserContext();
  const { fullUser } = GetFullUserContext();

  return (
    <>
      <Sidenav cpath="home" />
      <MainWithHeader>
        <Hi2 className="font-bold">
          Welcome, <span className="text-text-h">{fullUser.displayName}</span>
        </Hi2>
      </MainWithHeader>
    </>
  );
}
