import  { useEffect, useRef } from "react";
import shaka from "shaka-player";

const ShakaPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Init shaka player when component mounts
    function initPlayer() {
      const video = videoRef.current;
      const player = new shaka.Player(video);

      // Listen for error events.
      player.addEventListener("error", onErrorEvent);

      // Try to load the manifest.
      player
        .load(src)
        .then(() => console.log("The video has been loaded!"))
        .catch(onError); // onError is executed if the load fails.
    }

    function onErrorEvent(event) {
      onError(event.detail);
    }

    function onError(error) {
      console.error("Error code", error.code, "object", error);
    }

    // Initialize the player
    if (shaka.Player.isBrowserSupported()) {
      initPlayer();
    } else {
      console.error("Shaka Player is not supported in this browser.");
    }
  }, [src]);

  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-lg bg-black">
      <video
        ref={videoRef}
        width="100%"
        height="auto"
        controls
        autoPlay
        className="h-full w-full"
      />
    </div>
  );
};

export default ShakaPlayer;
