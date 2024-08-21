import React from "react";
import moment from "moment";

import { SubTitle, SubTitle2, Par } from "../ui/Text";

import {
  CalendarIcon,
  GlobeAltIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";

function Index({ fullUser }) {
  return (
    <div className="flex items-start px-0">
      <div className="w-40 sm:w-20 aspect-square mr-3">
        <img
          src={fullUser?.photoURL || "/Images/profile.png"}
          className="rounded-full w-full h-full border-1 border-text/30 object-cover"
        />
      </div>
      <div className="">
        <div className="flex items-start">
          <SubTitle2>{fullUser?.displayName || "NA"}</SubTitle2>
        </div>
        <Par className="mb-1 mt-0.5 text-sm font-normal ">{fullUser?.bio}</Par>
        <div className="  text-text/60">
          <span className="text-xs  item-center inline-flex mr-3">
            <CalendarIcon className="w-4 h-4" />
            <span className="ml-1">
              Joined {moment(fullUser?.created_at.seconds * 1000).fromNow()}
            </span>
          </span>

          {fullUser?.tradingview && (
            <a
              target="_blank"
              href={"https://www.tradingview.com/u/" + fullUser.tradingview}
              rel="noopener noreferrer"
              className="mr-3 inline-flex items-center hover:text-text"
            >
              <svg
                className="h-4 aspect-auto"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.8654 8.2789c0 1.3541-1.0978 2.4519-2.452 2.4519-1.354 0-2.4519-1.0978-2.4519-2.452 0-1.354 1.0978-2.4518 2.452-2.4518 1.3541 0 2.4519 1.0977 2.4519 2.4519zM9.75 6H0v4.9038h4.8462v7.2692H9.75Zm8.5962 0H24l-5.1058 12.173h-5.6538z"></path>
              </svg>
              <span className="ml-1 text-xs py-auto">
                {fullUser.tradingview}
              </span>
            </a>
          )}
          {fullUser?.twitter && (
            <a
              className="mr-3 inline-flex items-center hover:text-text"
              target="_blank"
              href={"https://twitter.com/" + fullUser.twitter}
              rel="noopener noreferrer"
            >
              <svg
                className="h-4 aspect-square"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
              </svg>

              <span className="ml-1 text-xs py-auto">{fullUser.twitter}</span>
            </a>
          )}

          {fullUser?.youtubeURL && (
            <a
              className="mr-3 inline-flex items-center hover:text-text"
              target="_blank"
              href={fullUser.youtubeURL}
              rel="noopener noreferrer"
            >
              <svg
                className="w-4 aspect-square"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 576 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
              </svg>
              <span className="ml-1 text-xs py-auto">
                {fullUser.youtubeUsername}
              </span>
            </a>
          )}

          {fullUser?.website && (
            <a
              className=" inline-flex items-center hover:text-text"
              target="_blank"
              href={fullUser.website}
              rel="noopener noreferrer"
            >
              <GlobeAltIcon className="h-4 aspect-auto" />
              <span className="ml-1 text-xs py-auto">
                {new URL(fullUser.website).hostname || "NA"}
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
