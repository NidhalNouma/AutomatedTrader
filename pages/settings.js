import { useState } from "react";
import Sidenav from "../Features/SideNav";
import MainWithHeader from "../Features/mainLayout/MainWithHeader";
import { Button, Dropdown } from "react-daisyui";

import { ButtonFile, ButtonP } from "../Components/Button";
import { H1, H3, Hi4, H5 } from "../Components/H";
import { EditInput, Input1 } from "../Components/Input";

import { Modal1 } from "../Components/Modal";
import { DeleteMessage } from "../Components/ModalMsg";

import {
  GetUserContext,
  GetFullUserContext,
  UpdateUser,
  UpdateUser1,
} from "../hooks/UserHook";
import { SignOut } from "../hooks/SignHook";

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

  const [openDel, setOpenDel] = useState(false);

  return (
    <>
      <Sidenav cpath="settings" />
      <MainWithHeader>
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
                {fullUser.subscription && fullUser.subObj ? (
                  <div className="bg-accent px-3 py-2 rounded-lg flex justify-between items-center">
                    <Hi4 className="!text-bg">
                      {fullUser.subObj.name}
                      <span className="text-text-h ml-2 text-sm font-normal px-2 py-1 bg-bg rounded-full">
                        {fullUser.subscription?.status}
                      </span>
                    </Hi4>

                    <Dropdown vertical="end" horizontal="center">
                      {/* <Dropdown.Toggle className="h-4 w-4">i</Dropdown.Toggle> */}
                      {/* <Button className=""> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer text-bg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                        />
                      </svg>
                      <Dropdown.Menu
                        className="w-40 bg-bg shadow-2xl shadow-bg"
                        // style={{ backgroundColor: account.color }}
                      >
                        <Dropdown.Item onClick={() => setOpenDel(true)}>
                          <span className="text-error text-sm font-bold">
                            Cancel
                          </span>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                ) : (
                  <Hi4 className="">
                    You have no active membership, click here to get one.
                  </Hi4>
                )}
              </div>
            </div>

            <div className="mt-6 p-4 bg-bg rounded-xl">
              <H3 className="mb-4">Telegram</H3>
              <div className="mt-4">
                <Hi4 className="">
                  You have no active membership, click here to get one and link
                  your telegram account.
                </Hi4>
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <ButtonP
                className="!border-none hover:!bg-transparent !bg-transparent !text-sm"
                variant="link"
                onClick={async () => SignOut()}
              >
                Sign out
              </ButtonP>
            </div>
          </div>
        </div>
      </MainWithHeader>

      <Modal1
        open={openDel}
        close={() => {
          setOpenDel(false);
        }}
        backclose={() => {
          setOpenDel(false);
        }}
      >
        <DeleteMessage
          btnDelText="Agree"
          close={() => setOpenDel(false)}
          title="Cancel membership"
          onDelete={async () => {
            // const r = await DeleteMTAccount(userId, account.id);
            // setMTAccounts(r);
          }}
        >
          <H5 className="px-8">
            Are you sure you want to cancel your membership, once you agree you
            will no longer have access to our services!
          </H5>
        </DeleteMessage>
      </Modal1>
    </>
  );
}
