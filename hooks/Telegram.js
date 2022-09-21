import { useState } from "react";
import { updateUserTelegram } from "../db/user";

export function TelegramSteps(user) {
  const [step, setStep] = useState(1);
  const [chatId, setChatId] = useState("");

  const nextStep = () => {
    if (step === 1) setStep(2);
    if (step === 2) {
      if (!chatId) return;
      updateUserTelegram(user.uid, chatId);
      setStep(3);
    }
  };

  return { step, nextStep, setStep, chatId, setChatId };
}
