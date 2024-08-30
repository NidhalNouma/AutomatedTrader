import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { getPresetsByUserId } from "../lib/presets";

const PresetsContext = createContext();

export function PresetsProvider({ children }) {
  const { user } = useUser();
  const [presets, setPresets] = useState(null);

  const getAllPresets = async () => {
    let userId = user.uid;
    if (!userId) return;
    let r = await getPresetsByUserId(userId);
    // console.log(r);
    if (r.length > 0)
      r = r.sort((a, b) => b?.created_at.seconds - a?.created_at.seconds);
    setPresets(r);
  };

  useEffect(() => {
    if (user) {
      getAllPresets();
    }
  }, [user]);

  return (
    <PresetsContext.Provider value={{ presets, getAllPresets }}>
      {children}
    </PresetsContext.Provider>
  );
}

export function usePreset() {
  return useContext(PresetsContext);
}
