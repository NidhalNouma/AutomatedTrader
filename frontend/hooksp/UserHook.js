import { useState, useEffect } from "react";
import {
  updateSubsciption as updateSub,
  updateUserData,
  updateProfilePicture,
  getUserByUserName,
  searchUsersByUserName,
} from "../lib/users";
import {
  getWebhooksByUserId,
  getUserWebhooksWithTrades,
} from "../lib/webhooks";
import { useUser } from "../contexts/UserContext";
import axios from "axios";

export const UpdateUserSubscription = () => {
  const { fullUser, setFullUser } = useUser();

  async function updateSubscription(newSubscription, customerId) {
    const r = await updateSub(
      fullUser.id,
      newSubscription.id,
      customerId,
      true,
      fullUser.subscriptionId
    );

    r["subscription"] = newSubscription;

    r["subObj"] = getPlanById(newSubscription);

    try {
      const updateKlavioEmail = await axios.post(
        "/api/klavio/update/" +
          fullUser.id +
          "?membership=" +
          r["subObj"].chargeBeeId
      );
    } catch (e) {
      console.log("API UPDATE KLAVIO PROFILE ", e);
    }

    console.log(r);
    setFullUser(r);
    return r;
  }

  return { updateSubscription };
};

export const UpdateUserSettings = () => {
  const { fullUser, getFullUser, setUser, user } = useUser();

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [tv, setTV] = useState("");
  const [twitter, setTwitter] = useState("");
  const [ytURL, setYtURL] = useState("");
  const [ytUsername, setYtUsername] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    if (fullUser) {
      setDisplayName(fullUser.displayName);
      setBio(fullUser.bio);
      setTV(fullUser.tradingview);
      setTwitter(fullUser.twitter);
      setYtURL(fullUser.youtubeURL);
      setYtUsername(fullUser.youtubeUsername);
      setWebsite(fullUser.website);
    }
  }, [fullUser]);

  const submit = async () => {
    const data = {
      bio: bio || "",
      displayName: displayName || "",
      tradingview: tv || "",
      twitter: twitter || "",
      youtubeURL: ytURL || "",
      youtubeUsername: ytUsername || "",
      website: website || "",
    };

    const r = await updateUserData(fullUser.id, data, false);
    if (r && !r.error) getFullUser(fullUser.id);
    return r;
  };

  async function updatePhotoURL(file) {
    const r = await uploadImg(user?.uid, file, "prifile");
    if (r) {
      let data = {
        photoURL: r,
      };
      const n = await updateProfilePicture(r);
      const m = await updateUserData(fullUser.id, data);
      setUser({ ...user, photoURL: r });
    }

    return m;
  }

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
    updatePhotoURL,
  };
};

export function UpdatePublicProfileSettings() {
  const { fullUser, setFullUser, getFullUser } = useUser();

  const [userName, setUserName] = useState(fullUser.userName || "");
  const [publicUser, setPublicUser] = useState(fullUser.public || false);

  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    const data = {
      public: publicUser || "",
    };

    if (userName && userName !== fullUser.userName)
      data.userName = userName.toLowerCase();

    const r = await updateUserData(fullUser.id, data, false);
    if (r?.error) setError(r.error);
    else if (r) getFullUser(fullUser.id);
    return r;
  };

  return { userName, setUserName, publicUser, setPublicUser, submit, error };
}

export const SearchUsersByDisplayName = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (username.length > 2)
      (async () => {
        const r = await searchUsersByUserName(username);
        // console.log(r);
        setUsers(r);
      })();
    else setUsers([]);
  }, [username]);

  return { users, username, setUsername };
};

export function PublicUser(userName) {
  const [user, setUser] = useState("loading ...");
  const [webhooks, setWebhooks] = useState("loading ...");

  async function getUserData() {
    const r = await getUserByUserName(userName);
    if (r && r.id && r.public) {
      setUser(r);
      const w = await getUserWebhooksWithTrades(r.id, true);
      setWebhooks(w);
    } else setUser(r);
  }

  useEffect(() => {
    if (userName) {
      getUserData();
    }
  }, [userName]);

  return { user, webhooks };
}
