import { useState } from "react";
import useVideoLinks from "../../Hooks/useVideoLinks";

const Classes = () => {
  const { videoLinks } = useVideoLinks();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-center text-4xl font-extrabold text-transparent">
          My Classes & Milestones
        </h2>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Vertical Tabs */}
          <div
            role="tablist"
            className="tabs tabs-lift tabs-vertical hidden w-full flex-row md:block md:max-w-min md:flex-col"
          >
            {Array.from({ length: 12 }, (_, index) => (
              <a
                key={index}
                role="tab"
                className={`tab text-nowrap transition-all duration-200 ${activeTab === index ? "tab-active text-gray-800 [--tab-bg:#0ff] [--tab-border-color:#000]" : "!text-white hover:text-cyan-300"}`}
                onClick={() => setActiveTab(index)}
              >
                Milestone {index + 1}
              </a>
            ))}
          </div>

          {/* Scrollable Horizontal Tabs */}
          <div className="overflow-x-auto md:hidden">
            <div className="tabs tabs-lift flex min-w-max gap-2 whitespace-nowrap">
              {Array.from({ length: 12 }, (_, index) => (
                <button
                  key={index}
                  role="tab"
                  onClick={() => setActiveTab(index)}
                  className={`tab transition-all duration-200 ${
                    activeTab === index
                      ? "tab-active text-gray-800 [--tab-bg:#0ff] [--tab-border-color:#000]"
                      : "!text-white hover:text-cyan-300"
                  }`}
                >
                  Milestone {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Video Player */}
          <div className="flex-1 rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold text-cyan-400">
              Milestone {activeTab + 1}
            </h3>

            {videoLinks?.[activeTab]?.videoLink ? (
              <div className="player-wrapper aspect-video">
                <iframe
                  width="100%"
                  src={videoLinks[activeTab].videoLink}
                  title={`Milestone ${activeTab + 1} Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="aspect-video w-full rounded-lg shadow-md"
                ></iframe>
              </div>
            ) : (
              <p className="text-gray-400">
                No video available for this milestone.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Classes;
