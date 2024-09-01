import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { usePreset } from "../contexts/PresetsContext";

import { addPreset } from "../lib/presets";

export function NewPreset() {
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

  function getData() {
    let data = {
      type,
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
    if (!pair) {
      setError("Pair must be provided!");
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

  return {
    presetType,
    setPresetType,
    name,
    setName,
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
  };
}
