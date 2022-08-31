import Sidenav from "../Features/SideNav";
import Header from "../Features/Header";

import { H1, H3, Hi4 } from "../Components/H";
import { GetUserContext } from "../hooks/UserHook";

export default function Settings() {
  const user = GetUserContext();
  return (
    <>
      <Sidenav cpath="settings" />
      <div className="w-full flex flex-col">
        <Header />
        <div className="px-10 py-8">
          <H1>Settings</H1>
          <div className="mt-6 w-full flex">
            <div className="w-1/2 mx-auto">
              <div className="p-4 bg-bga rounded-xl">
                <H3 className="mb-4">Profile</H3>
                <div className="flex flex-col w-full items-center ">
                  <img
                    src="https://api.lorem.space/image/face?hash=33791"
                    className="rounded-full w-20 h-20 border-4 border-text-h object-cover"
                  />
                  <div className="">
                    <Hi4 className="mt-3">{user?.displayName || "NA"}</Hi4>
                    <Hi4 className="mt-3">{user?.email || "NA"}</Hi4>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-bga rounded-xl">
                <H3 className="mb-4">Membership</H3>
                <div className="mt-4">
                  <Hi4 className="">
                    You have no active membership, click here to get one.
                  </Hi4>
                </div>
              </div>

              <div className="mt-6 p-4 bg-bga rounded-xl">
                <H3 className="mb-4">Payment methods</H3>
                <div className="mt-4">
                  <Hi4 className="">
                    You have no valid payment method, click here to add one.
                  </Hi4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
