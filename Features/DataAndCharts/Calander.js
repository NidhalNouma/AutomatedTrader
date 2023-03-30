import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { totalProfitPerTime } from "../../hooks/MTAccounts";

function CalendarTrades({ data }) {
  const [value, onChange] = useState(new Date());
  const values = totalProfitPerTime(data);

  return (
    <div className="w-full">
      <Calendar
        className="!w-full !bg-bg !border-none rounded-xl py-6 px-4"
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

          console.log(r);

          return view === "month" && r > 0 ? (
            <p className="text-green-400 font-semibold mt-1">{r.toFixed(1)}</p>
          ) : view === "month" && r < 0 ? (
            <p className="text-red-400 font-semibold mt-1">{r.toFixed(1)}</p>
          ) : null;
        }}
      />
    </div>
  );
}

export default CalendarTrades;
