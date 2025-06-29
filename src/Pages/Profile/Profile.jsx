import { useContext } from "react";
import useIsEnrolled from "../../Hooks/useIsEnrolled";
import AuthContext from "../../AuthContext";
import ShakaPlayer from "../../Components/ShakaPlayer";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  const {
    isEnrolled,
    enrollmentData,
    loading: enrollLoading,
  } = useIsEnrolled();

  if (loading || enrollLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <span className="loading loading-spinner loading-lg text-cyan-400"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        {/* Profile Card */}
        <div className="mb-12 rounded-2xl border border-gray-700 bg-gray-800 p-8 shadow-lg">
          <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:text-left">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="mb-6 h-32 w-32 rounded-full border-4 border-cyan-500 object-cover shadow-md md:mr-8 md:mb-0"
            />
            <div>
              <h2 className="text-3xl font-bold text-white">
                {user?.displayName || "Unnamed User"}
              </h2>
              <p className="text-gray-400">{user?.email}</p>

              <div className="mt-4 text-sm text-gray-300">
                <p>
                  <span className="font-semibold text-cyan-400">
                    Enrollment Status:
                  </span>{" "}
                  {isEnrolled ? (
                    <span className="font-semibold text-green-400">
                      Enrolled ✅
                    </span>
                  ) : (
                    <span className="font-semibold text-red-400">
                      Not Enrolled ❌
                    </span>
                  )}
                </p>

                {isEnrolled && (
                  <div className="mt-3 space-y-2 rounded-lg bg-gray-900 p-4 text-sm text-gray-300 shadow-inner">
                    <p>
                      <span className="font-semibold text-cyan-400">
                        Course:
                      </span>{" "}
                      {enrollmentData?.courseTitle || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold text-cyan-400">
                        Enrolled At:
                      </span>{" "}
                      {new Date(
                        enrollmentData?.enrolledAt,
                      ).toLocaleDateString() || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold text-cyan-400">
                        Progress:
                      </span>{" "}
                      {enrollmentData?.progress || "0%"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
          <h3 className="mb-4 text-center text-2xl font-semibold text-cyan-400">
            Course Preview Video
          </h3>
          <div className="overflow-hidden rounded-lg">
            {/* <ShakaPlayer
              src="https://codesraft.com/nur/testVideo/manifest.mpd"
              autoPlay={false}
              width="100%"
              className="rounded"
            /> */}
            <iframe
              width="100%"
              className="aspect-video"
              src="https://www.youtube-nocookie.com/embed/ykw9FjBDaf8?si=_UhVqRHQUQbplHuN"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
