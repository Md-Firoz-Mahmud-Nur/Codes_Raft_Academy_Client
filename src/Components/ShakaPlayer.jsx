import React, { useEffect, useRef, useState } from "react";
import shaka from "shaka-player";

const ShakaPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [playerRef, setPlayerRef] = useState(null);

  useEffect(() => {
    async function initPlayer() {
      const video = videoRef.current;
      const player = new shaka.Player(video);
      setPlayerRef(player); // Save player reference for manual control

      player.addEventListener("error", (event) => {
        console.error("Shaka error", event.detail);
        setError("Failed to load video");
        setLoading(false);
      });

      try {
        await player.load(src);
        const variantTracks = player.getVariantTracks();
        setTracks(variantTracks);
        video.addEventListener("playing", () => {
          console.log("Video started playing");
        });

        video.addEventListener("pause", () => {
          console.log("Video paused");
        });

        video.addEventListener("waiting", () => {
          console.log("Video buffering...");
        });

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
      {tracks.length > 0 &&
        (console.log("tracks.length", tracks.length),
        (
          <div className="flex flex-wrap gap-2 bg-gray-900 p-2 text-white">
            {tracks.map((t, idx) => (
              <button
                key={idx}
                className="rounded bg-gray-700 px-3 py-1 text-sm hover:bg-gray-600"
                onClick={() => {
                  playerRef.selectVariantTrack(t, true);
                  console.log("Selected quality:", t.height, "p");
                }}
              >
                {t.height}p
              </button>
            ))}
            <div>|</div>
            <button
              className="rounded bg-blue-600 px-3 py-1 text-sm hover:bg-blue-500"
              onClick={() => {
                playerRef.configure({ abr: { enabled: true } });
                console.log("Switched to Auto quality");
              }}
            >
              Auto
            </button>
          </div>
        ))}
    </div>
  );
};

export default ShakaPlayer;
