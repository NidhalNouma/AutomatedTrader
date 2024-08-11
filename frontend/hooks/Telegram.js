import { useState, useEffect } from "react";
import { updateUserTelegram } from "../db/user";

export function TelegramSteps(user) {
  console.log(user);
  const [step, setStep] = useState(user?.telegram?.length > 0 ? 3 : 1);
  const [chatId, setChatId] = useState("");

  useEffect(() => {
    if (user) setStep(user.telegram?.length > 0 ? 3 : 1);
  }, [user]);

  const nextStep = () => {
    if (step === 1) setStep(2);
    if (step === 2) {
      if (!chatId) return;
      updateUserTelegram(user.id, chatId);
      setStep(3);
    }
  };

  return { step, nextStep, setStep, chatId, setChatId };
}
