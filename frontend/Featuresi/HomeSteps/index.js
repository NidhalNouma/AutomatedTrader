import React, { useState, Fragment, useEffect } from "react";
import { Steps } from "react-daisyui";
import { ButtonText } from "../../components/ui/Button";
import { SubTitle2 as Hi3, SubTitle2 as H3 } from "../../components/ui/Text";

import { PlayVideoPopup } from "../../components/Video";
import { videosUrls } from "../../utils/constant";

function Index() {
  const [step, setStep] = useState(
    Number(localStorage.getItem("homeStep")) || 1
  );

  function nextStep() {
    if (step >= 5) setStep(1);
    else setStep(step + 1);
  }

  function prevStep() {
    if (step <= 1) setStep(1);
    else setStep(step - 1);
  }

  useEffect(() => {
    localStorage.setItem("homeStep", step);
  }, [step]);

  return (
    <Fragment>
      <Hi3 className="font-semibold mt-0">
        These are the steps to get started.
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
          <StepCom
            title="Create a webhook"
            nextStep={nextStep}
            videoSrc={videosUrls.webhooksAT}
          >
            <p className="text-center mb-1">
              The first step is creating a webhook. navigate to the webhook page
              and create your first webhook.
            </p>
          </StepCom>
        )}

        {step === 2 && (
          <StepCom
            title="Connect webhook with tradingview"
            nextStep={nextStep}
            prevStep={prevStep}
            videoSrc={videosUrls.webhooksTradingView}
          >
            <p className="text-center mb-1">
              The second step is to connect your webhook to tradingview to start
              receiving alerts.
            </p>
          </StepCom>
        )}

        {step === 3 && (
          <StepCom
            title="Add a metatrader account"
            nextStep={nextStep}
            prevStep={prevStep}
            videoSrc={videosUrls.metatraderAddAccount}
          >
            <p className="text-center mb-1">
              Next is adding a metatrader account to do that you need to
              download our EA. navigate to the MT4 page to get your account
              ready.
            </p>
          </StepCom>
        )}

        {step === 4 && (
          <StepCom
            title="Enable webhooks on the metatrader account"
            nextStep={nextStep}
            prevStep={prevStep}
            videoSrc={videosUrls.metatraderAddWebhooks}
          >
            <p className="text-center mb-1">
              After adding your metatrader accounts you need to enable which
              webhooks you want to use on them.
            </p>
          </StepCom>
        )}

        {step === 5 && (
          <StepCom
            title="You're ALL set!"
            // nextStep={nextStep}
            prevStep={prevStep}
            // videoSrc={videosUrls.metatraderAddWebhooks}
          >
            <p className="text-center mb-1">
              After doing all the previous steos now you are ready to go. All
              the webhooks alerts will be fire on the alerts page as well as on
              your metatrader accounts that you added.
            </p>
          </StepCom>
        )}
      </div>
    </Fragment>
  );
}

export default Index;

function StepCom({ children, title, nextStep, prevStep, videoSrc }) {
  return (
    <div className="text-center max-w-md bg-bg rounded-md px-6 py-4">
      <H3 className="flex items-center text-bold justify-center mb-2">
        {title}
        {videoSrc && <PlayVideoPopup src={videoSrc} pulse={true} />}
      </H3>
      {children}
      <div className="mt-3 flex px-3">
        {prevStep && (
          <ButtonText className="mr-aut !text-secondary" onClick={prevStep}>
            Prev
          </ButtonText>
        )}
        {nextStep && (
          <ButtonText className="ml-auto" onClick={nextStep}>
            Next
          </ButtonText>
        )}
      </div>
    </div>
  );
}
