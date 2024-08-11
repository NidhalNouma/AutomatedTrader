import { useState, useEffect } from "react";
import { updateUserTelegram } from "../db/user";
import { useUser } from "../contexts/UserContext";
import { useTelegram } from "../contexts/TelegramContext";
import {
  addTelegram,
  updateTelegramName,
  updateTelegramColor,
  deleteTelegram as deleteTel,
  activeTelegram,
} from "../lib/telegram";

export function AddTelegram() {
  const { user } = useUser();
  const { getTelegramChat } = useTelegram();

  const [chatId, setChatId] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  const nextStep = () => {
    setError("");
    if (step === 0) setStep(1);
    if (step === 1) {
      if (!chatId) {
        setError("Please enter your chat ID to connect to telegram.");
        return;
      }
      setStep(2);
    }
  };

  async function save() {
    setError("");

    if (!chatId) {
      setError("Please enter your chat ID to connect to telegram.");
      return;
    }
    if (!name) {
      setError("Please enter your chat name.");
      return;
    }

    const r = await addTelegram(name, chatId, user.uid);
    if (r) {
      const t = await getTelegramChat();
      return true;
    }
    return false;
  }

  return {
    chatId,
    setChatId,
    setName,
    name,
    step,
    setStep,
    nextStep,
    error,
    save,
  };
}

export function EditTelegramName(telegram) {
  const { user } = useUser();
  const { getTelegramChat, setTelegrams } = useTelegram();
  const [telegramName, setTelegramName] = useState(telegram?.name || "");
  const [error, setError] = useState("");

  async function editTelegramName() {
    if (!user || !telegram) {
      setError("Invalid data provided!");
      return;
    }
    const r = await updateTelegramName(user.uid, telegram.id, telegramName);
    if (r.length > 0) setTelegrams(r);
    return r;
  }

  return { telegramName, setTelegramName, editTelegramName, error };
}

export function EditTelegramColor(telegram) {
  const { user } = useUser();
  const { getTelegramChat, setTelegrams } = useTelegram();
  const [telegramColor, setTelegramColor] = useState(telegram?.color || "");
  const [error, setError] = useState("");

  async function editTelegramColor() {
    if (!user || !telegram) {
      setError("Invalid data provided!");
      return;
    }
    const r = await updateTelegramColor(user.uid, telegram.id, telegramColor);
    if (r.length > 0) setTelegrams(r);

    return r;
  }

  return { telegramColor, setTelegramColor, editTelegramColor, error };
}

export function DeleteTelegram(telegram) {
  const { user } = useUser();
  const { getTelegramChat, setTelegrams } = useTelegram();
  const [error, setError] = useState("");

  async function deleteTelegram() {
    if (!user || !telegram) {
      setError("Invalid data provided!");
      return;
    }
    const r = await deleteTel(telegram.id);
    await getTelegramChat();
    return r;
  }

  return { deleteTelegram, error };
}

export function SetActiveTelegram(telegram) {
  const { user } = useUser();
  const { getTelegramChat, setTelegrams } = useTelegram();
  const [active, setActive] = useState(telegram?.active || false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (telegram) setActive(telegram.active);
  }, [telegram]);

  async function activateTelegram() {
    if (!user || !telegram) {
      setError("Invalid data provided!");
      return;
    }
    const r = await activeTelegram(telegram.id, !active);
    // console.log(r);
    await getTelegramChat(user.uid);
    return r;
  }

  return { active, setActive, activateTelegram, error };
}
