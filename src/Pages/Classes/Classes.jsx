import useVideoLinks from "../../Hooks/useVideoLinks";

const Classes = () => {
  const { videoLinks } = useVideoLinks();

  return (
    <div className="bg-slate-200">
      <div className="container mx-auto flex items-center justify-center p-24">
        My Classes
      </div>
      <div className="flex justify-center p-6">
        <div
          className="player-wrapper"
          style={{ maxWidth: "720px", margin: "auto" }}
        >
          <iframe
            width="720"
            height="360"
            src={videoLinks[0]?.videoLink}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Classes;
