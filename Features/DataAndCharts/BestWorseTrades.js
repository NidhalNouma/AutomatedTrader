import React, { useState, Fragment, useEffect } from "react";
import { H4 } from "../../Components/H";

function BestWorseTrades({ data }) {
  const [best, setBest] = useState(null);
  const [worse, setWorse] = useState(null);
  const [strike, setStrike] = useState(null);

  useEffect(() => {
    let ib,
      iw,
      is = 0,
      cis = 0;

    for (let i = 0; i < data.length; i++) {
      let v = data[i];

      if (v.profit > 0) {
        cis = cis + 1;
        if (cis > is) is = cis;
      } else cis = 0;

      if (v.profit > 0 && (v.profit > ib?.profit || !ib)) {
        ib = v;
      } else if (v.profit < 0 && (-v.profit > -iw?.profit || !iw)) {
        iw = v;
      }
    }

    setBest(ib);
    setWorse(iw);
    setStrike(is);
  }, [data]);

  return (
    <div className="flex w-full">
      <div className="p-5 bg-bg rounded-lg w-full mr-2">
        <H4 className="font-bold">Best trade</H4>
        <H4 className="text-green-400">${best?.profit || 0}</H4>
      </div>
      <div className="p-5 bg-bg rounded-lg w-full mr-2">
        <H4 className="font-bold">Worse trade</H4>
        <H4 className="text-red-400">${worse?.profit || 0}</H4>
      </div>
      <div className="p-5 bg-bg rounded-lg w-full mr-2">
        <H4 className="font-bold">Best Streak</H4>
        <H4 className="text-text-h">{strike || 0}</H4>
      </div>
    </div>
  );
}

export default BestWorseTrades;
