import { createContext, useContext, useState } from "react";
import { getUser } from "../db/user";

export const UserC = createContext(null);

export const UserCC = ({ children, value }) => {
  return <UserC.Provider value={value}>{children}</UserC.Provider>;
};

export const GetUserContext = () => useContext(UserC);

export const FullUserC = createContext(null);

export const FullUserCC = ({ children, value }) => {
  return <FullUserC.Provider value={value}>{children}</FullUserC.Provider>;
};

export const GetFullUserContext = () => useContext(FullUserC);

export const GetFullUser = () => {
  const [fullUser, setFullUser] = useState(null);

  const getFullUser = async (userId) => {
    if (!userId) return;
    const r = await getUser(userId);
    // console.log(r);
    setFullUser(r);
  };

  return { fullUser, setFullUser, getFullUser };
};
