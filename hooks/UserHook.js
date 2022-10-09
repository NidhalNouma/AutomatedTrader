import { createContext, useContext, useState } from "react";
import { getUser, updateUserData } from "../db/user";

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

export const UpdateUser = () => {
  async function updateBio(id, bio) {
    const r = await updateUserData(id, "bio", bio);
    return r;
  }

  async function updateTradingview(id, data) {
    const r = await updateUserData(id, "tradingview", data);
    return r;
  }

  async function updateTwitter(id, data) {
    const r = await updateUserData(id, "twitter", data);
    return r;
  }

  async function updateYoutube(id, data) {
    const r = await updateUserData(id, "youtube", data);
    return r;
  }

  async function updateWebsite(id, data) {
    const r = await updateUserData(id, "website", data);
    return r;
  }

  return { updateBio, updateTradingview, updateTwitter, updateWebsite };
};
