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
    <div
      data-shaka-player-container
      shaka-controls="true"
      className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-lg bg-black"
    >
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70">
          <div className="animate-pulse text-sm text-white">Loading...</div>
        </div>
      )}
      <video
        disablePictureInPicture
        disableRemotePlayback
        playsInline
        autoPlay
        ref={videoRef}
        width="100%"
        height="auto"
        controls
        className="h-full w-full"
      />
      <div className="shaka-controls-container" shown="true">
        <div className="shaka-scrim-container"></div>
        <div className="shaka-server-side-ad-container"></div>
        <div className="shaka-bottom-controls shaka-no-propagation">
          <div className="shaka-ad-controls shaka-hidden">
            <div className="shaka-ad-position shaka-hidden">
              <span className="shaka-ad-position-span"></span>
            </div>
            <div className="shaka-ad-counter">
              <span className="shaka-ad-counter-span"></span>
            </div>
            <div className="shaka-skip-ad-container">
              <div className="shaka-skip-ad-counter shaka-hidden"></div>
              <button
                type="button"
                className="shaka-skip-ad-button shaka-hidden shaka-no-propagation"
                disabled=""
              >
                Skip Ad
              </button>
            </div>
          </div>
          <div className="shaka-controls-button-panel shaka-show-controls-on-mouse-over shaka-tooltips-on">
            <button className="shaka-tooltip ml-3" aria-label="previous">
              <img
                src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='16'%20width='10'%20viewBox='0%200%20320%20512'%3e%3c!--!Font%20Awesome%20Free%206.5.1%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license/free%20Copyright%202023%20Fonticons,%20Inc.--%3e%3cpath%20opacity='1'%20fill='%23fff'%20d='M267.5%20440.6c9.5%207.9%2022.8%209.7%2034.1%204.4s18.4-16.6%2018.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1%204.4l-192%20160L64%20241V96c0-17.7-14.3-32-32-32S0%2078.3%200%2096V416c0%2017.7%2014.3%2032%2032%2032s32-14.3%2032-32V271l11.5%209.6%20192%20160z'/%3e%3c/svg%3e"
                alt="Previous"
                className="w-4"
              />
            </button>
            <button
              type="button"
              className="shaka-small-play-button material-icons-round shaka-tooltip"
              aria-label="Play"
            >
              play_arrow
            </button>
            <button className="shaka-tooltip" aria-label="next">
              <img
                src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20height='16'%20width='10'%20viewBox='0%200%20320%20512'%3e%3c!--!Font%20Awesome%20Free%206.5.1%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license/free%20Copyright%202023%20Fonticons,%20Inc.--%3e%3cpath%20opacity='1'%20fill='%23fff'%20d='M52.5%20440.6c-9.5%207.9-22.8%209.7-34.1%204.4S0%20428.4%200%20416V96C0%2083.6%207.2%2072.3%2018.4%2067s24.5-3.6%2034.1%204.4l192%20160L256%20241V96c0-17.7%2014.3-32%2032-32s32%2014.3%2032%2032V416c0%2017.7-14.3%2032-32%2032s-32-14.3-32-32V271l-11.5%209.6-192%20160z'/%3e%3c/svg%3e"
                alt="Previous"
                className="w-3.5"
              />
            </button>
            <button
              type="button"
              className="shaka-mute-button shaka-tooltip"
              aria-label="Mute"
            >
              <i className="material-icons-round">volume_up</i>
              <label className="shaka-overflow-button-label shaka-overflow-menu-only">
                <span>Mute</span>
                <span className="shaka-current-selection-span"></span>
              </label>
            </button>
            <div
              className="shaka-range-container shaka-volume-bar-container"
              style={{
                background:
                  "linear-gradient(to right, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0.54) 50%, rgba(255, 255, 255, 0.54) 100%)",
              }}
            >
              <input
                className="shaka-range-element shaka-volume-bar"
                type="range"
                step="any"
                min="0"
                max="100"
                aria-label="Volume"
              />
            </div>
            <button type="button" className="shaka-current-time" disabled="">
              1:34 / 2:00
            </button>
            <div className="shaka-spacer" aria-hidden="true"></div>
            <button
              className="material-icons-round shaka-rewind-ten-button shaka-tooltip"
              aria-label="Rewind 10s"
            >
              replay_10
            </button>
            <button
              className="material-icons-round shaka-forward-ten-button shaka-tooltip"
              aria-label="Forward 10s"
            >
              forward_10
            </button>
            <button
              type="button"
              className="shaka-loop-button shaka-tooltip"
              aria-label="Loop the current video"
            >
              <i className="material-icons-round">repeat</i>
              <label className="shaka-overflow-button-label shaka-overflow-menu-only">
                <span>Loop</span>
                <span className="shaka-current-selection-span">Off</span>
              </label>
            </button>
            <button
              type="button"
              className="shaka-pip-button shaka-tooltip shaka-hidden"
              aria-label="Enter Picture-in-Picture"
            >
              <i className="material-icons-round">picture_in_picture_alt</i>
              <label className="shaka-overflow-button-label shaka-overflow-menu-only">
                <span>Picture-in-Picture</span>
                <span className="shaka-current-selection-span">Off</span>
              </label>
            </button>
            <button className="shaka-tooltip" aria-label="theater mode">
              <img
                src="data:image/svg+xml,%3csvg%20width='22'%20height='16'%20viewBox='0%200%2022%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M19.25%2015.5H2.75C2.15326%2015.5%201.58097%2015.2629%201.15901%2014.841C0.737053%2014.419%200.5%2013.8467%200.5%2013.25V2.75C0.5%202.15326%200.737053%201.58097%201.15901%201.15901C1.58097%200.737053%202.15326%200.5%202.75%200.5H19.25C19.8467%200.5%2020.419%200.737053%2020.841%201.15901C21.2629%201.58097%2021.5%202.15326%2021.5%202.75V13.25C21.5%2013.8467%2021.2629%2014.419%2020.841%2014.841C20.419%2015.2629%2019.8467%2015.5%2019.25%2015.5ZM2.75%202C2.55109%202%202.36032%202.07902%202.21967%202.21967C2.07902%202.36032%202%202.55109%202%202.75V13.25C2%2013.4489%202.07902%2013.6397%202.21967%2013.7803C2.36032%2013.921%202.55109%2014%202.75%2014H19.25C19.4489%2014%2019.6397%2013.921%2019.7803%2013.7803C19.921%2013.6397%2020%2013.4489%2020%2013.25V2.75C20%202.55109%2019.921%202.36032%2019.7803%202.21967C19.6397%202.07902%2019.4489%202%2019.25%202H2.75Z'%20fill='white'/%3e%3c/svg%3e"
                alt="Theater Mode"
              />
            </button>
            <button
              type="button"
              className="shaka-fullscreen-button material-icons-round shaka-tooltip"
              aria-label="Full screen"
            >
              fullscreen
            </button>
            <button
              type="button"
              className="shaka-overflow-menu-button shaka-no-propagation material-icons-round shaka-tooltip"
              aria-label="More settings"
            >
              more_vert
            </button>
          </div>
          <div
            className="shaka-range-container shaka-seek-bar-container"
            style={{
              background:
                "linear-gradient(to right, rgb(2, 148, 249) 0%, rgb(2, 148, 249) 0%, rgb(2, 148, 249) 78.4824%, rgb(255, 255, 255) 78.4824%, rgb(255, 255, 255) 100%, rgba(255, 255, 255, 0.3) 100%);",
            }}
          >
            <div className="shaka-ad-markers"></div>
            <input
              className="shaka-range-element shaka-seek-bar shaka-no-propagation shaka-show-controls-on-mouse-over"
              type="range"
              step="any"
              min="0"
              max="120.93333435058594"
              aria-label="Seek"
            />
            <div
              id="shaka-player-ui-thumbnail-container"
              style={{ visibility: "hidden" }}
            >
              <img id="shaka-player-ui-thumbnail-image" draggable="false" />
              <div id="shaka-player-ui-thumbnail-time-container">
                <div id="shaka-player-ui-thumbnail-time"></div>
              </div>
            </div>
            <div
              id="shaka-player-ui-time-container"
              className="-top-[30px] left-[506.703px] h-5 w-auto"
            >
              1:36
            </div>
          </div>
        </div>
        <div className="shaka-overflow-menu shaka-no-propagation shaka-show-controls-on-mouse-over shaka-hidden">
          <button
            type="button"
            className="shaka-overflow-button shaka-playbackrate-button shaka-tooltip-status"
            aria-label="Playback speed"
            shaka-status="1.25x"
          >
            <i className="material-icons-round">slow_motion_video</i>
            <label className="shaka-overflow-button-label shaka-overflow-menu-only">
              <span>Playback speed</span>
              <span className="shaka-current-selection-span">1.25x</span>
            </label>
          </button>
          <button
            type="button"
            className="shaka-overflow-button shaka-resolution-button shaka-tooltip-status"
            shaka-status="720p"
            aria-label="Resolution"
          >
            <i className="material-icons-round">settings</i>
            <label className="shaka-overflow-button-label shaka-overflow-menu-only">
              <span>Resolution</span>
              <span className="shaka-current-selection-span">720p</span>
            </label>
          </button>
        </div>
        <div className="shaka-no-propagation shaka-show-controls-on-mouse-over shaka-settings-menu shaka-hidden shaka-playback-rates">
          <button
            type="button"
            className="shaka-back-to-overflow-button"
            aria-label="Back"
          >
            <i className="material-icons-round">arrow_back</i>
            <span>Playback speed</span>
          </button>
          <button type="button">
            <span>0.5x</span>
          </button>
          <button type="button">
            <span>0.75x</span>
          </button>
          <button type="button">
            <span>0.85x</span>
          </button>
          <button type="button">
            <span>1x</span>
          </button>
          <button type="button" aria-selected="true">
            <span className="shaka-chosen-item">1.25x</span>
            <i
              className="material-icons-round shaka-chosen-item"
              aria-hidden="true"
            >
              done
            </i>
          </button>
          <button type="button">
            <span>1.5x</span>
          </button>
          <button type="button">
            <span>1.75x</span>
          </button>
          <button type="button">
            <span>1.85x</span>
          </button>
          <button type="button">
            <span>2x</span>
          </button>
        </div>
        <div className="shaka-no-propagation shaka-show-controls-on-mouse-over shaka-settings-menu shaka-hidden shaka-resolutions">
          <button
            type="button"
            className="shaka-back-to-overflow-button"
            aria-label="Resolution"
          >
            <i className="material-icons-round">arrow_back</i>
            <span>Resolution</span>
          </button>
          <button
            type="button"
            className="explicit-resolution"
            aria-selected="true"
          >
            <span className="shaka-chosen-item">720p</span>
            <i
              className="material-icons-round shaka-chosen-item"
              aria-hidden="true"
            >
              done
            </i>
          </button>
          <button type="button" className="explicit-resolution">
            <span>480p</span>
          </button>
          <button type="button" className="explicit-resolution">
            <span>360p</span>
          </button>
          <button type="button" className="explicit-resolution">
            <span>240p</span>
          </button>
          <button type="button" className="shaka-enable-abr-button">
            <span className="shaka-auto-span">Auto</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShakaPlayer;
