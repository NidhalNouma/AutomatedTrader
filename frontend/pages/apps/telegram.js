import { Fragment, useState } from "react";
import { withAuth } from "../../contexts/UserContext";
import { Button, ButtonText } from "../../components/ui/Button";
import { SubTitle2, Par, Label, Label2 } from "../../components/ui/Text";
import { Toggle, Input } from "../../components/ui/Input";
import { MainLayoutWithHeader } from "../../components/layout/MainLayout";
import {
  ModalWithHeader,
  EditModal,
  DeleteModal,
  UpgradeModal,
} from "../../components/ui/Modal";
import { ColorPicker } from "../../components/ui/ColorPicker";
import { RectangleSkeleton } from "../../components/ui/Skeleton";
import { Dropdown, DropdownButton } from "../../components/ui/Dropdown";
import AddTelegram from "../../components/Forms/Telegram";

import { useTelegram } from "../../contexts/TelegramContext";
import { useUser } from "../../contexts/UserContext";
import {
  DeleteTelegram,
  EditTelegramColor,
  EditTelegramName,
  SetActiveTelegram,
} from "../../hooksp/TelegramHook";

import { PlusIcon } from "@heroicons/react/outline";
import { addAlpha } from "../../utils/functions";

function Telegram() {
  const { telegrams } = useTelegram();
  const { fullUser } = useUser();
  const [openNewAccount, setOpenNewAccount] = useState(false);

  return (
    <Fragment>
      <MainLayoutWithHeader
        page="telegram"
        title="Telegram"
        rightSection={
          fullUser?.hasAccessTo?.telegram > telegrams?.length ? (
            <ModalWithHeader
              close={openNewAccount}
              title="New Chat"
              trigger={
                <Button
                  className=" !bg-secondary !outline-secondary"
                  icon={<PlusIcon className="h-3.5 aspect-square" />}
                >
                  Chat
                </Button>
              }
            >
              <AddTelegram
                close={() => setOpenNewAccount(!openNewAccount)}
              ></AddTelegram>
            </ModalWithHeader>
          ) : (
            <UpgradeModal
              trigger={
                <Button
                  className=" !bg-secondary !outline-secondary"
                  icon={<PlusIcon className="h-3.5 aspect-square" />}
                >
                  Chat
                </Button>
              }
            ></UpgradeModal>
          )
        }
      >
        {telegrams !== null ? (
          <section className="">
            {telegrams?.length > 0 ? (
              <Fragment>
                <div className="mt-8 items-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 3xl:grid-cols-5 gap-x-6 gap-y-8">
                  {telegrams
                    .sort((a, b) => b.created_at - a.created_at)
                    .map((v, i) => (
                      <Fragment key={v.id}>
                        <TelegramItem telegram={v} />
                      </Fragment>
                    ))}
                </div>
              </Fragment>
            ) : (
              <div className="mt-3 w-full">
                <Par className="mt-8">No chat Availble. </Par>
              </div>
            )}
          </section>
        ) : (
          <section className="mt-8 max-h-[80vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 3xl:grid-cols-5 gap-x-6 gap-y-8">
            <RectangleSkeleton className="!h-28" />
            <RectangleSkeleton className="!h-28" />
            <RectangleSkeleton className="!h-28" />
            <RectangleSkeleton className="!h-28" />
          </section>
        )}
      </MainLayoutWithHeader>
    </Fragment>
  );
}

function TelegramItem({ telegram }) {
  const { telegramName, setTelegramName, editTelegramName } =
    EditTelegramName(telegram);
  const { telegramColor, setTelegramColor, editTelegramColor } =
    EditTelegramColor(telegram);
  const { deleteTelegram } = DeleteTelegram(telegram);
  const { active, activateTelegram } = SetActiveTelegram(telegram);

  const [openDel, setOpenDel] = useState(false);
  const [openChangeName, setOpenChangeName] = useState(false);
  const [openChangeColor, setOpenChangeColor] = useState(false);

  return (
    <Fragment>
      <EditModal
        withHeader={true}
        title="Change name"
        open={openChangeName}
        close={() => {
          setOpenChangeName(false);
        }}
        backclose={() => {
          setOpenChangeName(false);
        }}
        onSave={async () => {
          const r = await editTelegramName();
          if (r) setOpenChangeName(false);
        }}
      >
        <div className="mx-auto w-full max-w-xs">
          <Input
            name="Webhook name"
            className="mb-4 "
            type="text"
            placeholder="Name"
            value={telegramName}
            setValue={(v) => setTelegramName(v)}
            focus={openChangeName}
          />
        </div>
      </EditModal>

      <EditModal
        open={openChangeColor}
        close={() => setOpenChangeColor(false)}
        withHeader={true}
        title="Webhook color"
        onSave={async () => {
          const r = await editTelegramColor();
          if (r) setOpenChangeColor(false);
        }}
      >
        <ColorPicker
          className="max-w-xs mb-4"
          color={telegramColor}
          setColor={setTelegramColor}
        />
      </EditModal>

      <DeleteModal
        className=""
        title="Delete webhook"
        withHeader={true}
        open={openDel}
        close={() => {
          setOpenDel(false);
        }}
        backclose={() => {
          setOpenDel(false);
        }}
        onDelete={async () => {
          const r = await deleteTelegram();
          return r;
        }}
      >
        <Par className="mx-auto max-w-xs text-sm text-center mb-4">
          Are you sure you want to delete this webhook, all your data will be
          lost!
        </Par>
      </DeleteModal>

      <div
        style={{
          outlineColor: addAlpha(telegram.color, 0.3),
          backgroundColor: addAlpha(telegram.color, 0.06),
        }}
        className="w-full rounded outline outline-offset-2 outline-dashed outline-1 p-0"
      >
        <div className="py-2.5 px-2.5">
          <div className="flex items-start justify-between">
            <div className="">
              <Label className="">{telegram.name} </Label>
            </div>
            <div className="flex items-center justify-center">
              <Dropdown
                content={
                  <Fragment>
                    <DropdownButton onClick={() => setOpenChangeName(true)}>
                      Change name
                    </DropdownButton>
                    <DropdownButton onClick={() => setOpenChangeColor(true)}>
                      Change color
                    </DropdownButton>
                    <DropdownButton onClick={() => setOpenDel(true)}>
                      Delete
                    </DropdownButton>
                  </Fragment>
                }
                className="w-40 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 cursor-pointer text-text/40 ml-1 -mr-1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                  />
                </svg>
              </Dropdown>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Label2 className="mr-3">Active</Label2>
            <Toggle
              size="sm"
              color="primary"
              className=""
              checked={active}
              onChange={async () => {
                const r = await activateTelegram();
              }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default withAuth(Telegram);
