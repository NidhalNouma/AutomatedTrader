import React, { useState, Fragment } from "react";
import { Steps } from "react-daisyui";
import { ButtonText } from "../../Components/Button";
import { Hi3 } from "../../Components/H";

function Index() {
  const [step, setStep] = useState(1);

  function nextStep() {
    if (step >= 5) setStep(1);
    else setStep(step + 1);
  }

  return (
    <Fragment>
      <Hi3 className="font-semibold mt-0">
        Those are the steps to get started.
      </Hi3>
      <div className="w-full mt-8">
        <Steps className="w-full">
          <Steps.Step
            onClick={(e) => setStep(1)}
            color={step >= 1 && "secondary"}
          >
            {/* Create a webhook */}
          </Steps.Step>
          <Steps.Step
            color={step >= 2 && "secondary"}
            onClick={(e) => setStep(2)}
          >
            {/* Webhooks on TV */}
          </Steps.Step>
          <Steps.Step color={step >= 3 && "secondary"}>
            {/* Connect MT account */}
          </Steps.Step>
          <Steps.Step color={step >= 4 && "secondary"}>
            {/* Adding webhook to MT */}
          </Steps.Step>
          <Steps.Step color={step >= 5 && "secondary"}>
            {/* All set */}
          </Steps.Step>
        </Steps>
      </div>

      <div className="mt-10 w-full flex justify-center">
        {step === 1 && (
          <div className="text-center max-w-md bg-bg rounded-md p-3">
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
          <div className="text-center max-w-md bg-bg rounded-md p-3">
            <p className="text-center mb-1">
              Copy your chat id and past it bellow, then click next.
            </p>
            <ButtonText onClick={nextStep}>Next</ButtonText>
          </div>
        )}

        {step === 3 && (
          <div className="text-center max-w-md bg-bg rounded-md p-3">
            <p className="text-center mb-1">
              All set you will start getting alert message to your telegram
              account.
            </p>
            <ButtonText onClick={nextStep}>Next</ButtonText>
          </div>
        )}

        {step === 4 && (
          <div className="text-center max-w-md bg-bg rounded-md p-3">
            <p className="text-center mb-1">
              All set you will start getting alert message to your telegram
              account.
            </p>
            <ButtonText onClick={nextStep}>Next</ButtonText>
          </div>
        )}

        {step === 5 && (
          <div className="text-center max-w-md bg-bg rounded-md p-3">
            <p className="text-center mb-1">
              All set you will start getting alert message to your telegram
              account.
            </p>
            <ButtonText onClick={nextStep}>Next</ButtonText>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Index;
