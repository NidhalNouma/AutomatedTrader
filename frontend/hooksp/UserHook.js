import { useState, useEffect } from "react";
import {
  updateSubsciption as updateSub,
  updateUserData,
  updateProfilePicture,
} from "../lib/users";
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
  const { fullUser, setFullUser, setUser, user } = useUser();

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
    const r = await updateUserData(fullUser.id, data);
    if (r) setFullUser(r);
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
