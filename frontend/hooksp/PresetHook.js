import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { usePreset } from "../contexts/PresetsContext";

import {
  addPreset,
  deletePreset as deletePresetFn,
  updatePresetColor,
  updatePresetData,
} from "../lib/presets";

export function NewPreset(preset) {
  const { user } = useUser();
  const { getAllPresets } = usePreset();

  const orderTypes = [
    { value: "BUY", label: "Buy" },
    { value: "SELL", label: "Sell" },
    // { value: "Both", label: "Both" },
  ];

  const [error, setError] = useState("");

  const [presetType, setPresetType] = useState(0);

  const [name, setName] = useState("");
  const [pair, setPair] = useState("");
  const [type, setType] = useState(orderTypes[0]);

  const [usePositionPercentage, setUsePositionPercentage] = useState(true);
  const [useFixedPosition, setUseFixedPosition] = useState(true);
  const [positionValue, setPositionValue] = useState(2);
  const [positionValuePercentage, setPositionValuePercentage] = useState(1);

  const [useStopLoss, setUseStopLoss] = useState(true);
  const [stopLoss, setStopLoss] = useState("200.0");
  const [useTakeProfit, setUseTakeProfit] = useState(true);
  const [takeProfit, setTakeProfit] = useState("200.0");

  const [moveToBE, setMoveToBE] = useState(false);

  const [usePartialClose, setUsePartialClose] = useState(false);
  const [partialCloseValue, setPartialCloseValue] = useState(50);

  useEffect(() => {
    if (preset) {
      setName(preset.name);
      setPresetType(preset.type);
      setPair(preset.data?.pair);

      if (preset.data?.positionValue) {
        setUseFixedPosition(true);
        setPositionValue(preset.data.positionValue);
      } else {
        setUseFixedPosition(false);
      }
      if (preset.data?.positionValuePercentage) {
        setUsePositionPercentage(true);
        setPositionValue(preset.data?.positionValuePercentage);
      } else {
        setUsePositionPercentage(false);
      }

      if (preset.data?.stopLoss) {
        setUseStopLoss(true);
        setStopLoss(preset.data?.stopLoss);
      } else {
        setUseStopLoss(false);
      }
      if (preset.data?.takeProfit) {
        setUseTakeProfit(true);
        setTakeProfit(preset.data.takeProfit);
      } else {
        setUseTakeProfit(false);
      }

      if (preset.data?.partialCloseValue) {
        setUsePartialClose(true);
        setPartialCloseValue(preset.data?.partialCloseValue);
      } else {
        setUsePartialClose(false);
      }

      setMoveToBE(preset.data?.moveToBE || false);
    }
  }, [preset]);

  function getData() {
    let data = {
      type,
      pair,
      moveToBE,
    };
    if (useFixedPosition) data.positionValue = positionValue;
    if (usePositionPercentage)
      data.positionValuePercentage = positionValuePercentage;
    if (useStopLoss) data.stopLoss = stopLoss;
    if (useTakeProfit) data.takeProfit = takeProfit;
    if (usePartialClose) data.partialCloseValue = partialCloseValue;

    return data;
  }

  async function add() {
    if (!user?.uid) {
      setError("User ID must be provided!");
      return;
    }

    if (!name) {
      setError("Preset name must be provided!");
      return;
    }

    let data = getData();

    setError("");

    const r = await addPreset(name, presetType, data, user.uid);

    if (r) {
      await getAllPresets();
    }

    return r;
  }

  async function edit() {
    if (!user?.uid) {
      setError("User ID must be provided!");
      return;
    }

    if (!name) {
      setError("Preset name must be provided!");
      return;
    }

    if (!preset) {
      setError("Preset data must be provided!");
      return;
    }

    let data = getData();

    setError("");

    const r = await updatePresetData(preset.id, name, presetType, data);

    if (r) {
      await getAllPresets();
    }

    return r;
  }

  return {
    presetType,
    setPresetType,
    name,
    setName,
    pair,
    setPair,
    orderTypes,
    type,
    setType,
    usePositionPercentage,
    setUsePositionPercentage,
    useFixedPosition,
    setUseFixedPosition,
    positionValue,
    setPositionValue,
    positionValuePercentage,
    setPositionValuePercentage,
    useStopLoss,
    setUseStopLoss,
    stopLoss,
    setStopLoss,
    useTakeProfit,
    setUseTakeProfit,
    takeProfit,
    setTakeProfit,
    moveToBE,
    setMoveToBE,
    usePartialClose,
    setUsePartialClose,
    partialCloseValue,
    setPartialCloseValue,
    error,
    add,
    edit,
  };
}

export function EditPresetColor(preset) {
  const { user } = useUser();
  const { getAllPresets } = usePreset();
  const [presetColor, setPresetColor] = useState(preset?.color || "");
  const [error, setError] = useState("");

  async function editPresetColor() {
    if (!user || !preset) {
      setError("Invalid data provided!");
      return;
    }
    const r = await updatePresetColor(preset.id, presetColor);
    await getAllPresets();

    return r;
  }

  return { presetColor, setPresetColor, editPresetColor, error };
}

export function DeletePreset(preset) {
  const { user } = useUser();
  const { getAllPresets } = usePreset();
  const [error, setError] = useState("");

  async function deletePreset() {
    if (!user || !preset) {
      setError("Invalid data provided!");
      return;
    }
    const r = await deletePresetFn(preset.id);
    await getAllPresets(user.uid);
    return r;
  }

  return { deletePreset, error };
}
