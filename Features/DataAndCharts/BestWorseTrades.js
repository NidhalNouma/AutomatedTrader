import React, { useState, Fragment, useEffect } from "react";
import {
  FcPositiveDynamic,
  FcNegativeDynamic,
  FcHighPriority,
  FcBearish,
  FcBullish,
} from "react-icons/fc";
import { H4, Hi4 } from "../../Components/H";

function BestWorseTrades({ data }) {
  const [best, setBest] = useState(null);
  const [lots, setLots] = useState(0);
  const [worse, setWorse] = useState(null);
  const [strike, setStrike] = useState(null);
  const [tlong, setTLong] = useState(0);
  const [tShort, setTShort] = useState(0);
  const [commission, setCommission] = useState(0);

  useEffect(() => {
    let ib = null,
      iw = null,
      is = 0,
      cis = 0,
      comm = 0,
      short = 0,
      long = 0,
      _lots = 0;

    for (let i = 0; i < data.length; i++) {
      let v = data[i];

      console.log(v);

      if (v.type === "0") long += 1;
      else if (v.type === "1") short += 1;

      _lots += Number(v.lot);
      comm += Number(v.commission);

      if (Number(v.profit) > 0) {
        cis = cis + 1;
        if (cis > is) is = cis;
      } else cis = 0;

      if (
        Number(v.profit) > 0 &&
        (Number(v.profit) > Number(ib?.profit) || ib == null)
      ) {
        ib = v;
      } else if (
        Number(v.profit) < 0 &&
        (-Number(v.profit) > -Number(iw?.profit) || iw == null)
      ) {
        iw = v;
      }
    }

    setBest(ib);
    setWorse(iw);
    setStrike(is);
    setLots(_lots);
    setCommission(comm);
    setTShort(short);
    setTLong(long);
  }, [data]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Sec title="Total Trades">
        <H4 className="text-text-h font-bold">{tlong + tShort || 0}</H4>
      </Sec>

      <Sec title="Total Lots">
        <H4 className="text-text-h font-bold">
          {Number(lots).toFixed(2) || 0}
        </H4>
      </Sec>

      <Sec title="Long Won">
        <H4 className="text-text-h font-bold">
          ({tlong} /
          <span className="font-normal text-sm">{tlong + tShort}</span>){" "}
          {Number((tlong / (tShort + tlong)) * 100).toFixed(1)}%
        </H4>
      </Sec>

      <Sec title="Short Won">
        <H4 className="text-text-h font-bold">
          ({tShort} /
          <span className="font-normal text-sm">{tlong + tShort}</span>){" "}
          {Number((tShort / (tShort + tlong)) * 100).toFixed(1)}%
        </H4>
      </Sec>

      <Sec title="Best trade">
        <FcBullish class=" h-4 w-4 mr-2" />
        <H4 className="text-green-400">${best?.profit || 0}</H4>
      </Sec>

      <Sec title="Worse trade">
        <FcBearish class=" h-4 w-4 mr-2" />
        <H4 className="text-red-400">${worse?.profit || 0}</H4>
      </Sec>

      <Sec title="Best Streak">
        <FcPositiveDynamic class=" h-4 w-4 mr-2" />
        <H4 className="text-text-h">{strike || 0}</H4>
      </Sec>

      <Sec title="Commissions">
        <FcHighPriority class=" h-4 w-4 mr-2" />
        <H4 className="text-red-400">${Number(commission).toFixed(2) || 0}</H4>
      </Sec>
    </div>
  );
}

export default BestWorseTrades;

function Sec({ title, children }) {
  return (
    <div className="p-5 bg-bg rounded-lg w-full">
      <Hi4 className="font-bold">{title}</Hi4>
      <div className="flex items-center">{children}</div>
    </div>
  );
}
