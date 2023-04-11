import React from "react";
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
