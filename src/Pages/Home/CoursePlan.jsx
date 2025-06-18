import { useContext } from "react";

import AuthContext from "../../AuthContext";

const CoursePlan = () => {
  const { setIsEnrollModalOpen } = useContext(AuthContext);

  return (
    <section
      id="plans"
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 py-20 text-white"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-10 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-5xl font-extrabold text-transparent select-none">
          Course Plan
        </h2>
        <p className="mx-auto mb-14 max-w-xl text-lg leading-relaxed text-gray-400">
          One-time payment unlocks a full 6-month MERN stack course with
          lifetime access and continuous support—even while working on client
          projects or jobs.
        </p>

        <div
          className="mx-auto max-w-md transform rounded-3xl border border-gray-700 bg-gradient-to-tr from-gray-800 via-gray-900 to-gray-800 p-12 shadow-xl transition-transform hover:scale-[1.03] hover:shadow-cyan-600/30"
          role="region"
          aria-labelledby="plan-title"
        >
          <h3
            id="plan-title"
            className="mb-6 text-4xl font-extrabold tracking-tight text-teal-400 select-text"
          >
            5000 BDT
          </h3>
          <p className="mb-8 inline-block rounded-full bg-teal-700/90 px-4 py-1 text-sm font-semibold tracking-widest uppercase select-text">
            One-time Payment
          </p>

          <ul className="space-y-7 text-left text-gray-300">
            <li className="flex items-center space-x-5">
              <i className="fa-solid fa-clock animate-pulse-slow h-8 w-8 text-teal-400"></i>
              <span>6 months comprehensive MERN stack course</span>
            </li>

            <li className="flex items-center space-x-5">
              <i className="fa-solid fa-infinity animate-fade-in h-8 w-8 text-cyan-400"></i>
              <span>
                Lifetime access to all course materials and recordings
              </span>
            </li>

            <li className="flex items-center space-x-5">
              <i className="fa-solid fa-headset animate-pulse-slow h-8 w-8 text-teal-400"></i>
              <span>Continuous support during jobs & live client projects</span>
            </li>

            <li className="flex items-center space-x-5">
              <i className="fa-solid fa-clipboard-list animate-fade-in h-8 w-8 text-cyan-400"></i>
              <span>
                Assignments, quizzes, live & recorded classes included
              </span>
            </li>
          </ul>

          <a
            href="#enroll"
            onClick={() => setIsEnrollModalOpen(true)}
            className="focus:ring-opacity-50 mt-12 inline-block transform rounded-2xl bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 px-12 py-4 font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:from-teal-500 hover:via-cyan-500 hover:to-blue-600 focus:ring-4 focus:ring-cyan-400 focus:outline-none"
            role="button"
          >
            Enroll Now
          </a>
        </div>
      </div>

      <style>
        {`
      @keyframes pulse-slow {
        0%,
        100% {
          opacity: 1;
          transform: scale(1);
        }

        50% {
          opacity: 0.7;
          transform: scale(1.05);
        }
      }

      .animate-pulse-slow {
        animation: pulse-slow 3s ease-in-out infinite;
      }

      /* Fade in and out animation */
      @keyframes fade-in {
        0%,
        100% {
          opacity: 1;
        }

        50% {
          opacity: 0.6;
        }
      }

      .animate-fade-in {
        animation: fade-in 4s ease-in-out infinite;
      }
      `}
      </style>
    </section>
  );
};

export default CoursePlan;
