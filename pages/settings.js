import Sidenav from "../Features/SideNav";
import Header from "../Features/Header";

import { ButtonFile } from "../Components/Button";
import { H1, H3, Hi4 } from "../Components/H";
import { EditInput } from "../Components/Input";
import {
  GetUserContext,
  GetFullUserContext,
  UpdateUser,
} from "../hooks/UserHook";

import { uploadImg } from "../db/storage";
import { updateProfilePicture } from "../db/user";

export default function Settings() {
  const { user, setUser } = GetUserContext();
  const { fullUser, setFullUser } = GetFullUserContext();

  const { updateBio, updateTradingview, updateTwitter, updateWebsite } =
    UpdateUser();

  return (
    <>
      <Sidenav cpath="settings" />
      <div className="w-full flex flex-col">
        <Header />
        <div className="px-10 py-8">
          <H1>Settings</H1>
          <div className="mt-6 w-full flex">
            <div className="w-1/2 mx-auto">
              <div className="p-4 bg-accent rounded-xl">
                <H3 className="mb-4">Profile</H3>
                <div className="flex flex-col w-full items-center ">
                  <div className="flex flex-col items-center">
                    <img
                      src={user?.photoURL || "Images/profile.png"}
                      className="rounded-full w-20 h-20 border-4 border-text-h object-cover"
                    />
                    <ButtonFile
                      onSelect={async (e) => {
                        const r = await uploadImg(user?.uid, e.target.files[0]);
                        if (r) {
                          const nu = await updateProfilePicture(r);
                          setUser({ ...user, photoURL: r });
                        }
                      }}
                      uploadChildren={<div>Uploading ...</div>}
                      className="!text-secondary"
                    >
                      Update picture
                    </ButtonFile>
                  </div>
                  <div className="w-full max-w-xs">
                    <div className="w-xs my-1 pt-1 rounded bg-gray-700"></div>
                    {/* <Hi4 className="mt-3">{user?.email || "NA"}</Hi4> */}
                    <EditInput
                      className="px-3 mb-2"
                      name="Your Name"
                      text={user?.displayName}
                    ></EditInput>
                    <EditInput
                      className="px-3 mb-2"
                      name="Your Bio"
                      text={fullUser?.bio}
                      displayText="Fill your bio!"
                      isTextArea={true}
                      onEdit={async (v) => {
                        const r = await updateBio(user.uid, v);
                        if (r) setFullUser(r);
                      }}
                    ></EditInput>
                    <EditInput
                      className="px-3 mb-2"
                      name="TradingView Account"
                      text={fullUser?.tradingview}
                      displayText="Add your TradingView account!"
                      onEdit={async (v) => {
                        const r = await updateTradingview(user.uid, v);
                        if (r) setFullUser(r);
                      }}
                    ></EditInput>
                    <EditInput
                      className="px-3 mb-2"
                      name="Youtube Channel"
                      text={fullUser?.youtube}
                      displayText="Add your Youtube channel!"
                      onEdit={async (v) => {
                        const r = await updateYoutube(user.uid, v);
                        if (r) setFullUser(r);
                      }}
                    ></EditInput>
                    <EditInput
                      className="px-3 mb-2"
                      name="Twitter Account"
                      text={fullUser?.twitter}
                      displayText="Add your Twitter account!"
                      onEdit={async (v) => {
                        const r = await updateTwitter(user.uid, v);
                        if (r) setFullUser(r);
                      }}
                    ></EditInput>
                    <EditInput
                      className="px-3 mb-2"
                      name="Your Website"
                      text={fullUser?.website}
                      displayText="Add your own Website!"
                      onEdit={async (v) => {
                        const r = await updateWebsite(user.uid, v);
                        if (r) setFullUser(r);
                      }}
                    ></EditInput>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-accent rounded-xl">
                <H3 className="mb-4">Membership</H3>
                <div className="mt-4">
                  <Hi4 className="">
                    You have no active membership, click here to get one.
                  </Hi4>
                </div>
              </div>

              {/* <div className="mt-6 p-4 bg-bga rounded-xl">
                <H3 className="mb-4">Payment methods</H3>
                <div className="mt-4">
                  <Hi4 className="">
                    You have no valid payment method, click here to add one.
                  </Hi4>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
