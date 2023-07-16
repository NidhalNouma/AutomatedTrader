import React, { useState, Fragment, useEffect } from "react";
import {
  FcPositiveDynamic,
  FcNegativeDynamic,
  FcHighPriority,
  FcBearish,
  FcBullish,
} from "react-icons/fc";
import { H4, Hi4 } from "../../Components/H";
import { TradeDetails } from "./Table";
import { Modal1 } from "../../Components/Modal";

import BarLine from "./BarLine";

function BestWorseTrades({ data }) {
  const [open, setOpen] = useState(null);

  const [best, setBest] = useState(null);
  const [lots, setLots] = useState(0);
  const [longLots, setLongLots] = useState(0);
  const [worse, setWorse] = useState(null);
  const [strike, setStrike] = useState(null);
  const [tlong, setTLong] = useState(0);
  const [tShort, setTShort] = useState(0);
  const [tlongWin, setTLongWin] = useState(0);
  const [tShortWin, setTShortWin] = useState(0);
  const [commission, setCommission] = useState(0);

  useEffect(() => {
    let ib = null,
      iw = null,
      is = 0,
      cis = 0,
      comm = 0,
      short = 0,
      long = 0,
      shortWin = 0,
      longWin = 0,
      _longlots = 0,
      _lots = 0;

    for (let i = 0; i < data.length; i++) {
      let v = data[i];

      // console.log(v);

      if (v.type === "0") {
        long += 1;
        _longlots += Number(v.lot);
      } else if (v.type === "1") {
        short += 1;
      }

      _lots += Number(v.lot);
      comm += Number(v.commission);

      if (Number(v.profit) > 0) {
        if (v.type === "0") longWin += 1;
        else if (v.type === "1") shortWin += 1;

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

    // console.log(ib, iw);

    setBest(ib);
    setWorse(iw);
    setStrike(is);
    setLots(_lots);
    setLongLots(_longlots);
    setCommission(comm);
    setTShort(short);
    setTLong(long);
    setTShortWin(shortWin);
    setTLongWin(longWin);
  }, [data]);

  return (
    <Fragment>
      <Modal1
        open={!!open}
        close={() => {
          setOpen(null);
        }}
      >
        <TradeDetails
          data={open}
          close={() => {
            setOpen(null);
          }}
        />
        {/* <OpenTrade close={() => setOpen(false)} /> */}
      </Modal1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Sec title="Total Trades">
          <H4 className="text-text-h font-bold mr-6">{tlong + tShort || 0}</H4>
          <BarLine
            w1={(tlong / (tlong + tShort)) * 100}
            w2={(tShort / (tlong + tShort)) * 100}
            title1="Long"
            title2="Short"
          />
        </Sec>

        <Sec title="Win Trades">
          <H4 className="text-text-h font-bold  mr-6">
            {tlongWin + tShortWin}
          </H4>
          <BarLine
            w1={(tlongWin / (tlongWin + tShortWin)) * 100}
            w2={(tShortWin / (tlongWin + tShortWin)) * 100}
            title1="Long"
            title2="Short"
          />
        </Sec>

        <Sec title="Loss Trades">
          <H4 className="text-text-h font-bold">
            {tlong + tShort - tlongWin - tShortWin}
          </H4>
          <BarLine
            w1={
              ((tlong - tlongWin) / (tlong + tShort - tlongWin - tShortWin)) *
              100
            }
            w2={
              ((tShort - tShortWin) / (tlong + tShort - tlongWin - tShortWin)) *
              100
            }
            title1="Long"
            title2="Short"
          />
        </Sec>

        <Sec title="Total Lots">
          <H4 className="text-text-h font-bold mr-6">
            {Number(lots).toFixed(2) || 0}
          </H4>
          <BarLine
            w1={(longLots / lots) * 100}
            w2={((lots - longLots) / lots) * 100}
            title1="Long"
            title2="Short"
          />
        </Sec>

        <Sec title="Best trade" onClick={() => best && setOpen(best)}>
          <FcBullish class=" h-4 w-4 mr-2" />
          <H4 className="text-green-400">${best?.profit || 0}</H4>
        </Sec>

        <Sec title="Worse trade" onClick={() => worse && setOpen(worse)}>
          <FcBearish class=" h-4 w-4 mr-2" />
          <H4 className="text-red-400">${worse?.profit || 0}</H4>
        </Sec>

        <Sec title="Best Streak">
          <FcPositiveDynamic class=" h-4 w-4 mr-2" />
          <H4 className="text-text-h">{strike || 0}</H4>
        </Sec>

        <Sec title="Commissions">
          <FcHighPriority class=" h-4 w-4 mr-2" />
          <H4 className="text-red-400">
            ${Number(commission).toFixed(2) || 0}
          </H4>
        </Sec>
      </div>
    </Fragment>
  );
}

export default BestWorseTrades;

function Sec({ title, children, onClick }) {
  return (
    <div
      className={`p-5 bg-gradient-to-br from-bgt via-bg to-bg rounded-lg w-full ${
        onClick && "cursor-pointer"
      }`}
      onClick={onClick}
    >
      <Hi4 className="font-bold">{title}</Hi4>
      <div className="flex items-center">{children}</div>
    </div>
  );
}
