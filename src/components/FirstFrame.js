import React from "react";
import { Ffmpeg } from "react-ffmpeg";

function FirstFrame(props) {
  return (
    <Ffmpeg
      input={props.video_rec_url}
      output="poster.jpg"
      options="-vf select=eq(n\,0) -q:v 2"
      callback={(cmd) => console.log(cmd)}
    >
      <video poster="poster.jpg" controls>
        <source src={props?.video_rec_url} />
      </video>
    </Ffmpeg>
  );
}

export default FirstFrame;
