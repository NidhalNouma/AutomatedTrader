import React, { useState } from "react";
import { ModalBig1 } from "./Modal";
import { AiFillPlayCircle } from "react-icons/ai";
import { Button } from "react-daisyui";

import "video-react/dist/video-react.css";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  BigPlayButton,
  PlayToggle,
} from "video-react";

function Video({ src, className }) {
  return (
    <div className={className}>
      <Player poster="">
        <source src={src} />

        <BigPlayButton position="center" className="bg-bg" />
        {/* <source src="http://mirrorblender.top-ix.org/movies/sintel-1024-surround.mp4" /> */}

        <ControlBar>
          <PlayToggle />
          <ReplayControl seconds={10} order={1.1} />
          <ForwardControl seconds={30} order={1.2} />
          <CurrentTimeDisplay order={4.1} />
          <TimeDivider order={4.2} />
          <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
          <VolumeMenuButton disabled />
        </ControlBar>
      </Player>
    </div>
  );
}

export default Video;

export function PlayVideoPopup({ src, className, pulse = false }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <ModalBig1 open={open} backclose={() => setOpen(false)}>
        <div className="p-4">
          <Video src={src} className={className} />
        </div>
      </ModalBig1>
      <Button
        className="!px-2 hover:scale-110 transform transition duration-500"
        onClick={() => setOpen(true)}
        variant="link"
        endIcon={
          pulse ? (
            <PlayPulse />
          ) : (
            <AiFillPlayCircle className="h-6 w-6 text-text-p" />
          )
        }
      ></Button>
    </div>
  );
}

function PlayPulse({ className }) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute top-0 left-0 right-0 bottom-0 h-6 w-6 bg-text-p brightness-50 z-0 rounded-full animate-pulse-1"></div>
      <AiFillPlayCircle className="h-6 w-6 text-text-p z-10 relative" />
    </div>
  );
}
