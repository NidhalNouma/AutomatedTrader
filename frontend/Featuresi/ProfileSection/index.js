import React from "react";
import { useRouter } from "next/router";
import moment from "moment";
import { ButtonP } from "../../components/Button";
import { H1, H2 } from "../../components/H";
import {
  CalendarIcon,
  GlobeAltIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";

function Index({ user, fullUser, publicProfile }) {
  const router = useRouter();
  return (
    <div className="flex items-start px-0">
      <div className="w-16 h-16 mr-3">
        <img
          src={user?.photoURL || "Images/profile.png"}
          className="rounded-full w-full h-full border-2 border-text-h object-cover"
        />
      </div>
      <div className="">
        <div className="flex items-start">
          <H2>{fullUser?.displayName || "NA"}</H2>
          {!publicProfile && (
            <ButtonP
              className="ml-2 !p-0 hover:!bg-transparent !bg-transparent !border-primary !border-none "
              icon={<PencilAltIcon className="h-4 w-4 text-secondary" />}
              onClick={() => router.push("/settings")}
            ></ButtonP>
          )}
        </div>
        <p className="mb-1 text-sm font-normal">{fullUser?.bio}</p>
        <div className=" flex items-center text-text-p">
          <span className="text-xs flex item-center">
            <CalendarIcon className="w-4 h-4" />
            <span className="ml-1">
              Joined {moment(user?.metadata?.creationTime).fromNow()}
            </span>
          </span>

          {fullUser?.tradingview && (
            <a
              target="_blank"
              href={"https://www.tradingview.com/u/" + fullUser.tradingview}
              rel="noopener noreferrer"
              className="ml-4 flex items-center text-text-p"
            >
              <img src="/Images/TV.png" className="h-6 w-6 rounded" />
              <span className="ml-1 text-xs py-auto">
                {fullUser.tradingview}
              </span>
            </a>
          )}
          {fullUser?.twitter && (
            <a
              className="ml-4 flex items-center text-text-p"
              target="_blank"
              href={"https://twitter.com/" + fullUser.twitter}
              rel="noopener noreferrer"
            >
              <img src="/Images/TW.png" className="h-4 w-5 rounded" />
              <span className="ml-1 text-xs py-auto">{fullUser.twitter}</span>
            </a>
          )}

          {fullUser?.youtubeURL && (
            <a
              className="ml-4 flex items-center text-text-p"
              target="_blank"
              href={fullUser.youtubeURL}
              rel="noopener noreferrer"
            >
              <img src="/Images/YT.png" className="h-4 w-5 rounded" />
              <span className="ml-1 text-xs py-auto">
                {fullUser.youtubeUsername}
              </span>
            </a>
          )}

          {fullUser?.website && (
            <a
              className="ml-4 flex items-center text-text-p"
              target="_blank"
              href={fullUser.website}
              rel="noopener noreferrer"
            >
              <GlobeAltIcon className="h-5 w-5" />
              <span className="ml-1 text-xs py-auto">{fullUser.website}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
