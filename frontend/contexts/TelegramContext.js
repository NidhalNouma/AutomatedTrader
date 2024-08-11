import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { getTelegramsByUserId } from "../lib/telegram";

const TelegramContext = createContext();

export function TelegramProvider({ children }) {
  const { user } = useUser();
  const [telegrams, setTelegrams] = useState(null);

  const getTelegramChat = async () => {
    let r = await getTelegramsByUserId(user.uid);

    setTelegrams(r);
  };

  useEffect(() => {
    if (user) {
      getTelegramChat();
    }
  }, [user]);

  return (
    <TelegramContext.Provider
      value={{ telegrams, setTelegrams, getTelegramChat }}
    >
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegram() {
  return useContext(TelegramContext);
}
