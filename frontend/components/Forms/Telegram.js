import { useEffect, Fragment } from "react";

import { Input } from "../ui/Input";
import { ButtonText } from "../ui/Button";

import { Error } from "../ui/Alerts";

import { AddTelegram as AddTelegramHook } from "../../hooksp/TelegramHook";

import { IoMdDoneAll } from "react-icons/io";
import { BiExit } from "react-icons/bi";
import { MdOutlineNavigateNext } from "react-icons/md";

export default function AddTelegram({ close }) {
  const {
    chatId,
    setChatId,
    setName,
    name,
    step,
    setStep,
    nextStep,
    error,
    save,
  } = AddTelegramHook();

  return (
    <Fragment>
      {step === 0 ? (
        <section className="w-full max-w-xs mx-auto">
          <p className="text-text text-base pb-3">
            Add AutomatedTrader by searching for it on Telegram or click this
            link:{" "}
            <a
              className="text-accent"
              href="t.me/AutomatedTrader_Bot"
              target="_blank"
            >
              t.me/AutomatedTrader_Bot
            </a>{" "}
            and click Start.
          </p>
          <div className=" mt-4 flex justify-around items-center">
            <ButtonText
              onClick={close}
              className="!text-text/80"
              icon={<BiExit className="h-4 aspect-auto rotate-180" />}
            >
              Back
            </ButtonText>
            <ButtonText
              className="text-accent/80"
              onClick={() => nextStep()}
              icon={<MdOutlineNavigateNext className="h-4 aspect-auto" />}
            >
              Next
            </ButtonText>
          </div>
        </section>
      ) : step === 1 ? (
        <section className="w-full max-w-xs mx-auto">
          <p className="text-text text-base pb-3">
            Copy your chat id and past it bellow, then click next.
          </p>
          <Input
            classNameInput="!outline-text/20"
            className="pb-3"
            name="Chat ID"
            placeholder="chat_id"
            value={chatId}
            setValue={setChatId}
          />
          {error && <Error className="my-2">{error}</Error>}
          <div className=" mt-4 flex justify-around items-center">
            <ButtonText
              onClick={() => setStep(0)}
              className="!text-text/80"
              icon={<BiExit className="h-4 aspect-auto rotate-180" />}
            >
              Back
            </ButtonText>
            <ButtonText
              className="text-accent/80"
              onClick={() => nextStep()}
              icon={<MdOutlineNavigateNext className="h-4 aspect-auto" />}
            >
              Next
            </ButtonText>
          </div>
        </section>
      ) : step === 2 ? (
        <section className="w-full max-w-xs mx-auto">
          <p className="text-text text-base pb-3">
            Give this chat a name and click save.
          </p>
          <Input
            classNameInput="!outline-text/20"
            className="pb-3"
            name="Name"
            placeholder="name"
            value={name}
            setValue={setName}
          />
          {error && <Error className="my-2">{error}</Error>}
          <div className=" mt-4 flex justify-around items-center">
            <ButtonText
              onClick={() => setStep(1)}
              className="!text-text/80"
              icon={<BiExit className="h-4 aspect-auto rotate-180" />}
            >
              Back
            </ButtonText>
            <ButtonText
              className="text-accent/80"
              onClick={async () => {
                const r = await save();
                if (!r) return;
                setStep(0);
                close();
              }}
              icon={<IoMdDoneAll className="h-4 aspect-auto" />}
            >
              Save
            </ButtonText>
          </div>
        </section>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
}
