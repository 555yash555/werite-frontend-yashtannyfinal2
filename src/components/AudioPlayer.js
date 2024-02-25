import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
  playerWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "20px",
    overflow: "hidden",
  },
  controlsWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  playPauseButton: {
    fontSize: 36,
  },
  volumeWrapper: {
    display: "flex",
    alignItems: "center",
  },
  volumeIcon: {
    fontSize: 24,
    marginRight: theme.spacing(1),
  },
  volumeSlider: {
    width: 100,
  },
}));

function AudioPlayer({ audio_url }) {
  const classes = useStyles();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  const handleVolumeChange = (event, newValue) => {
    audioRef.current.volume = newValue;
    setVolume(newValue);
  };

  return (
    <div className={classes.playerWrapper}>
      <audio ref={audioRef} src={audio_url} />
      <div className={classes.controlsWrapper}>
        <IconButton
          className={classes.playPauseButton}
          onClick={togglePlayPause}
        >
          {playing ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <div className={classes.volumeWrapper}>
          <IconButton onClick={toggleMute}>
            {muted ? <VolumeOffIcon className={classes.volumeIcon} /> : <VolumeUpIcon className={classes.volumeIcon} />}
          </IconButton>
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            aria-labelledby="continuous-slider"
            className={classes.volumeSlider}
          />
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
