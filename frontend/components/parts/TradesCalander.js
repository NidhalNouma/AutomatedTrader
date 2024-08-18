import React, { useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { Modal1 } from "../../components/Modal";
import { Button } from "react-daisyui";

import { XIcon } from "@heroicons/react/solid";
import { H3 } from "../../components/H";

function CalendarTrades({ data, className }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDateChange = (date) => {
    setSelectedDate(date);
    // Custom action on date click
  };

  const [open, setOpen] = useState(null);

  return (
    <div
      className={`w-full outline-1 outile outline-dashed outline-text/10 rounded-lg ${className}`}
    >
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
          //   const y = date.getFullYear(),
          //     m = date.getMonth(),
          //     d = date.getDate();
          //   if (values[y] !== undefined) {
          //     if (values[y][m] !== undefined) {
          //       if (values[y][m][d] !== undefined) {
          //         setOpen(values[y][m][d].trades);
          //       }
          //     }
          //   }
        }}
        className="!w-full !bg-bgt !border-none rounded-xl py-6 px-4"
        tileClassName="!text-text/60 text-sm !hover:bg-bga !p-5"
        calendarType="US"
        onChange={onDateChange}
        value={selectedDate}
        // formatMonthYear={(locale, date) => format(date, "MMMM yyyy")}
        navigationLabel={({ data, label }) => (
          <span className="text-lg font-bold text-title/80">{label}</span>
        )}
        prevLabel={
          <button className="text-text/60 font-bold py-2 px-4 rounded">
            Previous
          </button>
        }
        nextLabel={
          <button className="text-text/60  font-bold py-2 px-4 rounded ">
            Next
          </button>
        }
        prev2Label={null} // Removes the default double left arrow (year navigation)
        next2Label={null} // Removes the default double right arrow (year navigation)
        tileContent={({ activeStartDate, date, view }) => {
          if (view === "month") {
            const dateString = moment(date).format("YYYY-MM-DD");
            const tradeEntry = data.find((trade) => trade.time === dateString);
            const tradeCount = tradeEntry ? tradeEntry.Trades.length : 0;
            let profit = tradeEntry
              ? tradeEntry.Trades.reduce((p, v) => v.profit + p, 0)
              : 0;

            return profit > 0 ? (
              <p className="text-profit font-semibold text-sm mt-0.5">
                ${profit.toFixed(1)}
              </p>
            ) : profit < 0 ? (
              <p className="text-loss font-semibold text-sm mt-0.5">
                ${profit.toFixed(1)}
              </p>
            ) : null;
          }
        }}
      />
    </div>
  );
}

export default CalendarTrades;

function TradeDetails({ data, close }) {
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
