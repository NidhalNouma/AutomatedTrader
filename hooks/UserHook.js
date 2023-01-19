import { createContext, useContext, useState, useEffect } from "react";
import {
  getUser,
  updateUserData,
  updateUserDatas,
  searchByDisplayName,
} from "../db/user";

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

  const getFullUser = async (userId, onComplete) => {
    if (!userId) return;
    const r = await getUser(userId);
    // console.log(r);
    setFullUser(r);
    onComplete();
  };

  return { fullUser, setFullUser, getFullUser };
};

export const UpdateUser = (fuser) => {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [tv, setTV] = useState("");
  const [twitter, setTwitter] = useState("");
  const [ytURL, setYtURL] = useState("");
  const [ytUsername, setYtUsername] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    if (fuser) {
      setDisplayName(fuser.displayName);
      setBio(fuser.bio);
      setTV(fuser.tradingview);
      setTwitter(fuser.twitter);
      setYtURL(fuser.youtubeURL);
      setYtUsername(fuser.youtubeUsername);
      setWebsite(fuser.website);
    }
  }, [fuser]);

  const submit = async () => {
    const d = {
      bio: bio || "",
      displayName: displayName || "",
      tradingview: tv || "",
      twitter: twitter || "",
      youtubeURL: ytURL || "",
      youtubeUsername: ytUsername || "",
      website: website || "",
    };
    const r = await updateUserDatas(fuser.id, d);
    return r;
  };

  return {
    displayName,
    setDisplayName,
    bio,
    setBio,
    tv,
    setTV,
    twitter,
    setTwitter,
    ytURL,
    setYtURL,
    ytUsername,
    setYtUsername,
    website,
    setWebsite,
    submit,
  };
};

export const UpdateUser1 = () => {
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

  async function updatePhotoURL(id, data) {
    const r = await updateUserData(id, "photoURL", data);
    return r;
  }

  return {
    updateBio,
    updateTradingview,
    updateTwitter,
    updateWebsite,
    updatePhotoURL,
  };
};

export const GetUserPage = (id) => {
  const [puser, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const r = await getUser(id);
      setUser(r);
    })();
  }, [id]);

  return { puser };
};

export const SearchByDisplayName = () => {
  const [displayName, setDisplayName] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (displayName.length > 3)
      (async () => {
        const r = await searchByDisplayName(displayName);
        setUsers(r);
      })();
    else setUsers([]);
  }, [displayName]);

  return { users, displayName, setDisplayName };
};
