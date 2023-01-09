import Sidenav from "../Features/SideNav";
import Header from "../Features/Header";

import { ButtonFile, ButtonP } from "../Components/Button";
import { H1, H3, Hi4 } from "../Components/H";
import { EditInput, Input1 } from "../Components/Input";
import {
  GetUserContext,
  GetFullUserContext,
  UpdateUser,
  UpdateUser1,
} from "../hooks/UserHook";

import { uploadImg } from "../db/storage";
import { updateProfilePicture } from "../db/user";

export default function Settings() {
  const { user, setUser } = GetUserContext();
  const { fullUser, setFullUser } = GetFullUserContext();

  const { updatePhotoURL } = UpdateUser1();

  const {
    displayName,
    setDisplayName,
    bio,
    setBio,
    tv,
    setTV,
    twitter,
    setTwitter,
    ytURL,
    setYtURL,
    ytUsername,
    setYtUsername,
    website,
    setWebsite,
    submit,
  } = UpdateUser(fullUser);

  return (
    <>
      <Sidenav cpath="settings" />
      <div className="w-full flex flex-col">
        <Header />
        <div className="px-10 py-6">
          <H1>Settings</H1>
          <div className="mt-6 w-full flex">
            <div className="w-1/2 mx-auto">
              <div className="p-4 bg-bg rounded-xl">
                <H3 className="mb-4">Profile</H3>
                <div className="flex flex-col w-full items-center ">
                  <div className="flex flex-col items-center">
                    <img
                      src={user?.photoURL || "Images/profile.png"}
                      className="rounded-full w-20 h-20 border-2 border-text-h object-cover"
                    />
                    <ButtonFile
                      onSelect={async (e) => {
                        const r = await uploadImg(user?.uid, e.target.files[0]);
                        if (r) {
                          const nu = await updateProfilePicture(r);
                          const nu1 = await updatePhotoURL(user?.uid, r);
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
                    <div className="w-xs my-1 pt-1 rounded bg-bga"></div>
                    {/* <Hi4 className="mt-3">{user?.email || "NA"}</Hi4> */}
                    <Input1
                      className="px-3 mb-2"
                      name="Your name"
                      type="text"
                      placeholder="Name"
                      value={displayName}
                      setValue={setDisplayName}
                    />

                    <Input1
                      className="px-3 mb-2"
                      name="Your Bio"
                      value={bio}
                      placeholder="Fill your bio!"
                      isTextArea={true}
                      setValue={setBio}
                    ></Input1>
                    <Input1
                      className="px-3 mb-2"
                      name="TradingView Account"
                      value={tv}
                      placeholder="Username"
                      setValue={setTV}
                    ></Input1>
                    <Input1
                      className="px-3 mb-2"
                      name="Twitter Account"
                      value={twitter}
                      placeholder="Username"
                      setValue={setTwitter}
                    ></Input1>

                    <Input1
                      className="px-3 mb-2"
                      name="Youtube Channel Link"
                      value={ytURL}
                      placeholder="https://www.youtube.com/channel/XXXXXXXXXXXXXXXXXXX"
                      setValue={setYtURL}
                    ></Input1>

                    <Input1
                      className="px-3 mb-2"
                      name="Youtube Username"
                      value={ytUsername}
                      placeholder="Username"
                      setValue={setYtUsername}
                    ></Input1>
                    <Input1
                      className="px-3 mb-2"
                      name="Your Website"
                      value={website}
                      placeholder="https://..."
                      setValue={setWebsite}
                    ></Input1>
                    <div className="w-full px-3 mt-8 flex justify-center">
                      <ButtonP
                        className="w-full"
                        onClick={async () => {
                          const r = await submit();
                          if (r) setFullUser(r);
                        }}
                      >
                        Save changes
                      </ButtonP>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-bg rounded-xl">
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
