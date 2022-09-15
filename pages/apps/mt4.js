import Sidenav from "../../Features/SideNav";
import Header from "../../Features/Header";
import { H1, H4 } from "../../Components/H";
import { GetUserContext } from "../../hooks/UserHook";
import { GetMTAccountsContext } from "../../hooks/MTAccounts";

import Mt4 from "../../Features/MTAccount/Mt4";

export default function help() {
  const { user } = GetUserContext();
  const { mtAccounts } = GetMTAccountsContext();
  return (
    <>
      <Sidenav cpath="mt4" />
      <div className="w-full flex flex-col">
        <Header />
        <div className="px-10 py-8">
          <H1>Metatrader 4</H1>
          <div className="my-4">
            <span className="">Your Id: {user?.uid}</span>
          </div>
          <H4>Accounts</H4>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3">
            {mtAccounts.map((v, i) => (
              <Mt4 key={v.id} account={v} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
