import React from "react";
import { H4 } from "../../components/H";
import moment from "moment";

import { txtColorFromBg } from "../../utils/functions";
import tailwindConfig from "../../tailwind.config.js";

function Title({ user, webhook }) {
  const colors = tailwindConfig.theme.colors;
  const txtColor = txtColorFromBg(
    webhook?.color,
    colors["bgt"],
    colors["text-h"]
  );

  return (
    <div
      className="w-full flex items-center justify-between px-4 py-2 rounded-2xl border-[6px] bg-bg"
      style={{
        borderColor: webhook.color,
        backgroundColor: webhook.color,
      }}
    >
      <div className="">
        <H4 style={{ color: txtColor }}>{webhook.name}</H4>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 ">
          <img
            src={user?.photoURL || "/Images/profile.png"}
            className="rounded-full w-full h-full border-[1px] border-text-h object-cover"
          />
        </div>
        <span style={{ color: txtColor }} className="text-sm font-bold mt-1">
          {" "}
          {user.displayName}{" "}
        </span>
        <span style={{ color: txtColor }} className="text-xs font-bold mt-1">
          {moment(new Date(webhook.created_at.seconds * 1000)).fromNow()}{" "}
        </span>
      </div>
    </div>
  );
}

export default Title;
