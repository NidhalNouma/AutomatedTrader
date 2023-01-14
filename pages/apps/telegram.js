import Sidenav from "../../Features/SideNav";
import { H1, H4 } from "../../Components/H";
import { ButtonText } from "../../Components/Button";
import { GetUserContext, GetFullUserContext } from "../../hooks/UserHook";
import { TelegramSteps } from "../../hooks/Telegram";
import { Input1 } from "../../Components/Input";
import MainWithHeader from "../../Features/mainLayout/MainWithHeader";
import { Steps } from "react-daisyui";

export default function help() {
  const { user } = GetUserContext();
  const { fullUser } = GetFullUserContext();
  const { step, nextStep, setStep, chatId, setChatId } =
    TelegramSteps(fullUser);

  return (
    <>
      <Sidenav cpath="telegram" />
      <MainWithHeader>
        <div className="flex justify-between">
          <H1>Telegram</H1>
          {/* <ButtonText
              onClick={(e) => {
                e.preventDefault();
                window.location = MT4EAPath;
              }}
            >
              download EA
            </ButtonText> */}
        </div>
        {/* <H4>Accounts</H4> */}
        <div className="w-full mt-8">
          <Steps className="w-full">
            <Steps.Step
              onClick={(e) => setStep(1)}
              color={step >= 1 && "secondary"}
            >
              Adding bot
            </Steps.Step>
            <Steps.Step
              color={step >= 2 && "secondary"}
              onClick={(e) => setStep(2)}
            >
              Copy chat ID
            </Steps.Step>
            <Steps.Step color={step >= 3 && "secondary"}>All done</Steps.Step>
            {/* <Steps.Step>Receive Product</Steps.Step> */}
          </Steps>
        </div>

        <div className="mt-10 w-full flex justify-center">
          {step === 1 && (
            <div className="text-center max-w-md bg-bga rounded-md p-3">
              <p className="text-center mb-4">
                Add AutomatedTraderT1_bot or click this link
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="mx-1 font-semibold underline"
                  href="https://t.me/AutomatedTraderT1_bot"
                >
                  t.me/AutomatedTraderT1_bot
                </a>
                and click start
              </p>
              <ButtonText onClick={nextStep}>Next</ButtonText>
            </div>
          )}

          {step === 2 && (
            <div className="text-center max-w-md bg-bga rounded-md p-3">
              <p className="text-center mb-1">
                Copy your chat id and past it bellow, then click next.
              </p>
              <Input1
                classNameInput="bg-bga"
                className=" mb-4 mx-auto"
                placeholder="Past your chat id here"
                value={chatId}
                setValue={setChatId}
              />
              <ButtonText onClick={nextStep}>Next</ButtonText>
            </div>
          )}

          {step === 3 && (
            <div className="text-center max-w-md bg-bga rounded-md p-3">
              <p className="text-center mb-1">
                All set you will start getting alert message to your telegram
                account.
              </p>
            </div>
          )}
        </div>
      </MainWithHeader>
    </>
  );
}
