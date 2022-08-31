import Sidenav from "../Features/SideNav";
import Header from "../Features/Header";

import { GetUserContext } from "../hooks/UserHook";

import { H1, H4, H6, Hi6 } from "../Components/H";
// import { ButtonP } from "../Components/Button";
import WebhooksItem from "../Features/WebhooksItem";

export default function Home() {
  const user = GetUserContext();

  return (
    <>
      <Sidenav cpath="profile" />
      <div className="w-full flex flex-col">
        <Header />
        <div className="px-10 py-8">
          <div className="flex items-start">
            <div className="w-20 h-20 mr-4">
              <img
                src={
                  // user?.photoURL ||
                  "https://api.lorem.space/image/face?hash=33791"
                }
                className="rounded-full w-full h-full border-4 border-text-h object-cover"
              />
            </div>
            <H1>{user?.displayName || "NA"}</H1>
          </div>

          <div className="mt-6">
            <H4 className="">Webhooks Url&apos;s</H4>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <WebhooksItem />
              <WebhooksItem />
            </div>
          </div>

          <div className="mt-6">
            <H4 className="">Recent alerts</H4>
            <div className="bg-bga w-1/2 min-h-16 mt-2 rounded-xl">
              <div className="py-3 border-b-2 border-bgai mx-4 flex items-center justify-between">
                <H6>Webhooks name alert</H6>
                <Hi6>6 min ago</Hi6>
              </div>
              <div className="py-3 border-b-2 border-bgai mx-4 flex items-center justify-between">
                <H6>Webhooks name alert</H6>
                <Hi6>9 min ago</Hi6>
              </div>
              <div className="py-3 border-b-2 border-bgai mx-4 flex items-center justify-between">
                <H6>Webhooks name alert</H6>
                <Hi6>1 hour ago</Hi6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
