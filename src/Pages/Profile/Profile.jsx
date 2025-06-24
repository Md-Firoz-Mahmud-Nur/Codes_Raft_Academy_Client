import ShakaPlayer from "../../Components/ShakaPlayer";

const Profile = () => {
  return (
    <div className="bg-slate-200">
      <div className="container mx-auto flex items-center justify-center p-24">
        Profile
      </div>
      <div className="flex justify-center p-6">
        <ShakaPlayer src="https://codesraft.com/nur/testVideo/manifest.mpd"></ShakaPlayer>
      </div>
    </div>
  );
};

export default Profile;
