import { useEffect, useRef } from "react";
import shaka from "shaka-player/dist/shaka-player.ui";
import "shaka-player/dist/controls.css";

const ShakaPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const video = videoRef.current;
      const container = containerRef.current;

      if (!video || !container) {
        console.error("Video or container not available after delay");
        return;
      }

      shaka.polyfill.installAll();

      if (!shaka.Player.isBrowserSupported()) {
        console.error("Browser not supported!");
        return;
      }

      const player = new shaka.Player(video);

      const config = {
        controlPanelElements: [
          "play_pause",
          "mute",
          "volume",
          "time_and_duration",
          "spacer",
          "loop",
          "fullscreen",
          "overflow_menu",
        ],
        overflowMenuButtons: ["quality", "playback_rate"],
        addSeekBar: true,
        seekBarColors: {
          played: "rgb(2, 148, 249)",
          base: "rgb(255, 255, 255)",
        },
        qualityMarks: {
          1080: "HD",
        },
        playbackRates: [0.75, 1, 1.25, 1.5, 2],
      };

      const ui = new shaka.ui.Overlay(player, container, video);
      ui.configure(config);
      // container.focus();

      window.player = player;
      window.ui = ui;

      player
        .load(src)
        .then(() => console.log("The video has now been loaded!"))
        .catch((error) => {
          console.error("Error loading video", error);
        });
    });

    return () => {
      clearTimeout(timeout);
      window.player?.destroy();
      window.ui?.destroy();
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      // tabIndex={0}
      className="shaka-player-component"
      style={{ maxWidth: "100%", width: "100%" }}
    >
      <video
        ref={videoRef}
        id="video"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default ShakaPlayer;
