import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { typeToStr, GetWebhookContext } from "../../hooks/WebHook";
import { Modal1 } from "../../components/Modal";
import { Button } from "react-daisyui";

import { XIcon } from "@heroicons/react/solid";
import { H3 } from "../../components/H";

import { totalProfitPerTime } from "../../hooks/MTAccounts";

function CalendarTrades({ data }) {
  const [value, onChange] = useState(new Date());
  const values = totalProfitPerTime(data);

  const [open, setOpen] = useState(null);

  return (
    <div className="w-full border-y-4 border-y-bga">
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

      <Calendar
        onClickDay={(date) => {
          const y = date.getFullYear(),
            m = date.getMonth(),
            d = date.getDate();

          if (values[y] !== undefined) {
            if (values[y][m] !== undefined) {
              if (values[y][m][d] !== undefined) {
                setOpen(values[y][m][d].trades);
              }
            }
          }
        }}
        className="!w-full !bg-bgt !border-none rounded-xl py-6 px-4"
        tileClassName="text-text-p text-sm !hover:bg-bga !p-5"
        calendarType="US"
        onChange={onChange}
        value={value}
        tileContent={({ activeStartDate, date, view }) => {
          const y = date.getFullYear(),
            m = date.getMonth(),
            d = date.getDate();

          let r = null;

          if (values[y] !== undefined) {
            if (values[y][m] !== undefined) {
              if (values[y][m][d] !== undefined) {
                r = values[y][m][d].profit;
              }
            }
          }

          // console.log(r);

          return view === "month" && r > 0 ? (
            <p className="text-green-400 font-semibold mt-1">${r.toFixed(1)}</p>
          ) : view === "month" && r < 0 ? (
            <p className="text-red-400 font-semibold mt-1">${r.toFixed(1)}</p>
          ) : null;
        }}
      />
    </div>
  );
}

export default CalendarTrades;

function TradeDetails({ data, close }) {
  console.log(data);

  const { webhooks } = GetWebhookContext();
  const wh = webhooks.find((v) => v.id === data?.ID);
  // console.log(wh, data);
  const type = typeToStr(data?.type?.toString());

  return (
    <div className="">
      <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
        <div className="flex items-center">
          <H3 className="inline-block mr-2">Details</H3>
        </div>
        <Button
          size="sm"
          shape="circle"
          className=" bg-accenti"
          onClick={() => {
            close();
          }}
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="w-full px-10 mt-2 mb-4">
        {data?.length > 0 ? (
          data
            .sort((a, b) => {
              const pa = Number(a.profit).toFixed(2);
              const pb = Number(b.profit).toFixed(2);

              return pb - pa;
            })
            .map((v, i) => {
              const profit = (
                Number(v.profit) +
                Number(v.commission) +
                Number(v.swap)
              ).toFixed(2);
              return (
                <div key={i} className="flex items-center justify-between my-2">
                  <span className="text-xs font-bold text-text-p">
                    {v.symbol}
                  </span>
                  {/* <span className="text-xs font-bold text-text-p">{v.lot}</span> */}
                  <span
                    className={`text-sm text-text-h font-bold ${
                      profit > 0
                        ? "text-green-300"
                        : profit < 0
                        ? "text-red-400"
                        : ""
                    }`}
                  >
                    ${profit}
                  </span>
                </div>
              );
            })
        ) : (
          <div>No Available data!</div>
        )}
      </div>
    </div>
  );
}
