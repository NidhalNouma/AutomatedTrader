import { useState, Fragment } from "react";

import { withAuth } from "../contexts/UserContext";

import { MainLayoutWithHeader } from "../components/layout/MainLayout";
import { Button, ButtonFile, ButtonText } from "../components/ui/Button";
import { SubTitle2, Par, Label } from "../components/ui/Text";
import { Input, ToggleInline } from "../components/ui/Input";
import { DeleteModal } from "../components/ui/Modal";
import { Dropdown, DropdownButton } from "../components/ui/Dropdown";
import { Error } from "../components/ui/Alerts";

import {
  UpdateUserSettings,
  UpdatePublicProfileSettings,
} from "../hooksp/UserHook";
import { useUser } from "../contexts/UserContext";

import { SignOut } from "../hooksp/AuthHook";

function Settings() {
  const { user, fullUser } = useUser();
  const { signOut } = SignOut();

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
    updatePhotoURL,
  } = UpdateUserSettings();

  const {
    userName,
    setUserName,
    publicUser,
    setPublicUser,
    submit: submitPublic,
    error: publicError,
  } = UpdatePublicProfileSettings();

  const [openDel, setOpenDel] = useState(false);

  // console.log(fullUser);

  return (
    <Fragment>
      <MainLayoutWithHeader title="Settings" page="settings">
        <div className="w-full md:w-1/2 mx-auto mt-6">
          <div className="p-4 bg-bg/40 rounded-lg backdrop-blur-xl">
            <SubTitle2 className="mb-4">Profile</SubTitle2>
            <div className="flex flex-col w-full items-center ">
              <div className="flex flex-col items-center">
                <img
                  src={user?.photoURL || "/Images/profile.png"}
                  className="rounded-full w-20 h-20 border-2 border-text/20 object-cover"
                />
                <ButtonFile
                  onSelect={async (e) => {
                    await updatePhotoURL(e.target.files[0]);
                  }}
                  uploadChildren={<div>Uploading ...</div>}
                  className="!text-secondary"
                >
                  Update picture
                </ButtonFile>
              </div>
              <div className="w-full max-w-xs">
                <div className="w-xs my-1 pt-1 rounded bg-bga"></div>
                <Input
                  className=" mb-2"
                  classNameInput="!outline-text/20"
                  name="Your name"
                  type="text"
                  placeholder="Name"
                  value={displayName}
                  setValue={setDisplayName}
                />

                <Input
                  className=" mb-2"
                  classNameInput="!outline-text/20"
                  name="Your Bio"
                  value={bio}
                  placeholder="Fill your bio!"
                  isTextArea={true}
                  setValue={setBio}
                ></Input>
                <Input
                  className=" mb-2"
                  classNameInput="!outline-text/20"
                  name="TradingView Account"
                  value={tv}
                  placeholder="Username"
                  setValue={setTV}
                ></Input>
                <Input
                  className=" mb-2"
                  classNameInput="!outline-text/20"
                  name="Twitter Account"
                  value={twitter}
                  placeholder="Username"
                  setValue={setTwitter}
                ></Input>

                <Input
                  className="mb-2"
                  classNameInput="!outline-text/20"
                  name="Youtube Channel Link"
                  value={ytURL}
                  placeholder="https://www.youtube.com/channel/XXXXXXXXXXXXXXXXXXX"
                  setValue={setYtURL}
                ></Input>

                <Input
                  className="mb-2"
                  classNameInput="!outline-text/20"
                  name="Youtube Username"
                  value={ytUsername}
                  placeholder="Username"
                  setValue={setYtUsername}
                ></Input>
                <Input
                  className="mb-2"
                  classNameInput="!outline-text/20"
                  name="Your Website"
                  value={website}
                  placeholder="https://..."
                  setValue={setWebsite}
                ></Input>
                <div className="w-full mt-8 flex justify-center">
                  <Button
                    className="w-full"
                    onClick={async () => {
                      const r = await submit();
                    }}
                  >
                    Save changes
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-bg/40 rounded-lg backdrop-blur-xl">
            <SubTitle2 className="mb-4">Public profile</SubTitle2>
            <div className="flex flex-col w-full items-center">
              <Input
                className="mb-2"
                classNameInput="!outline-text/20"
                name="User Name"
                value={userName}
                placeholder="@username"
                setValue={(v) => setUserName(v.toLowerCase())}
              ></Input>
              <div className="mb-2 mt-1 w-full mx-auto max-w-xs">
                <ToggleInline
                  className=""
                  name="Public"
                  checked={publicUser}
                  onChange={() => setPublicUser(!publicUser)}
                />
              </div>
              {publicError && (
                <Error className="mx-auto max-w-xs mb-4">{publicError}</Error>
              )}
              <div className="w-full mt-2 flex justify-center max-w-xs">
                <Button
                  className="w-full"
                  onClick={async () => {
                    const r = await submitPublic();
                  }}
                >
                  Save changes
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-bg/40 rounded-lg backdrop-blur-xl">
            <SubTitle2 className="mb-4">Membership</SubTitle2>
            <div className="mt-4">
              {fullUser?.hasAccessTo ? (
                <div className="bg-accent px-3 py-2 rounded-lg flex justify-between items-center max-w-xs mx-auto">
                  <Label className="!text-bg">
                    {fullUser?.hasAccessTo.name}
                    {fullUser.subscription?.status && (
                      <span className="text-text-h ml-2 text-sm font-normal px-2 py-1 bg-bg rounded-full">
                        {fullUser.subscription?.status}
                      </span>
                    )}
                  </Label>
                  {fullUser.subscription?.status && (
                    <Dropdown
                      content={
                        <DropdownButton onClick={() => setOpenDel(true)}>
                          <span className="text-error text-sm font-bold">
                            Cancel
                          </span>
                        </DropdownButton>
                      }
                    >
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
                    </Dropdown>
                  )}
                </div>
              ) : (
                <Par className="">
                  You have no active membership, click here to get one.
                </Par>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <ButtonText
              className="text-text/80 !text-sm"
              onClick={async () => signOut()}
            >
              Sign out
            </ButtonText>
          </div>
        </div>
      </MainLayoutWithHeader>

      <DeleteModal
        open={openDel}
        close={() => {
          setOpenDel(false);
        }}
        withHeader={true}
        title="Cancel membership"
        deleteBtnText="Agree"
        onDelete={async () => {
          // const r = await DeleteMTAccount(userId, account.id);
          // setMTAccounts(r);
        }}
      >
        <Par className="px-8">
          Are you sure you want to cancel your membership, once you agree you
          will no longer have access to our services!
        </Par>
      </DeleteModal>
    </Fragment>
  );
}

export default withAuth(Settings);
