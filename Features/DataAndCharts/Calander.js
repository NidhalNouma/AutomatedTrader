import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarTrades({ data }) {
  const [value, onChange] = useState(new Date());

  return (
    <div className="w-full">
      <Calendar
        className="!w-full !bg-bg !border-none rounded-xl py-6 px-4"
        tileClassName="text-text-p text-sm !hover:bg-bga !p-5"
        calendarType="US"
        onChange={onChange}
        value={value}
        tileContent={({ activeStartDate, date, view }) => {
          return view === "month" && date.getDay() === 4 ? (
            <p className="text-green-400 font-semibold mt-1">+50</p>
          ) : null;
        }}
      />
    </div>
  );
}

export default CalendarTrades;
