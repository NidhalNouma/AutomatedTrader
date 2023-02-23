import lifetime from "./data.json";
import { pricingList } from "../utils/pricing";

export default function checkLifeTime(email) {
  const data = lifetime;
  console.log(email, data);

  for (let i = 0; i < data.length; i++) {
    const v = data[i];
    if (v.Email === email) {
      const bb = pricingList.annual["Basic plan"];
      return { ...bb, name: "Basic plan", no: 0, time: "yearly" };
    }
  }
  return null;
}
