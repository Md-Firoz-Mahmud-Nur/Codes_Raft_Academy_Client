import React, { useEffect, useRef, useState } from "react";
import shaka from "shaka-player";

const ShakaPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function initPlayer() {
      const video = videoRef.current;
      const player = new shaka.Player(video);

      player.addEventListener("error", (event) => {
        console.error("Shaka error", event.detail);
        setError("Failed to load video");
        setLoading(false);
      });

      try {
        await player.load(src);
        console.log("Shaka video loaded");
        setLoading(false);
      } catch (err) {
        console.error("Shaka load error", err);
        setError("Failed to load video");
        setLoading(false);
      }
    }

    if (shaka.Player.isBrowserSupported()) {
      initPlayer();
    } else {
      setError("Browser not supported");
      setLoading(false);
    }
  }, [src]);

  if (error) {
    return (
      <div className="rounded-md bg-red-100 p-4 text-red-600">{error}</div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-lg bg-black">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70">
          <div className="animate-pulse text-sm text-white">Loading...</div>
        </div>
      )}
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
