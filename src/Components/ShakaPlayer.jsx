import { useEffect, useRef } from "react";
import shaka from "shaka-player/dist/shaka-player.ui";
import "shaka-player/dist/controls.css";

const ShakaPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    shaka.polyfill.installAll();

    if (!shaka.Player.isBrowserSupported()) {
      console.error("Browser not supported!");
      return;
    }
    const ui = new shaka.ui.Overlay(new shaka.Player(video), container, video);

    const controls = ui.getControls();
    const player = controls.getPlayer();

    window.player = player;
    window.ui = ui;

    player
      .load(src)
      .then(() => console.log("The video has now been loaded!"))
      .catch((error) => {
        console.error("Error loading video", error);
      });

    // Clean up on unmount
    return () => {
      player.destroy();
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className="shaka-player-component"
      data-shaka-player-container
      data-shaka-player-cast-receiver-id="07AEE832"
      style={{ maxWidth: "40em", width: "100%" }}
    >
      <video
        ref={videoRef}
        data-shaka-player
        id="video"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default ShakaPlayer;
