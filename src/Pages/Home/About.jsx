import React from "react";
import { FaAward, FaHeadset, FaLanguage, FaUserTie } from "react-icons/fa";
import { FaBugSlash, FaPeopleGroup } from "react-icons/fa6";

const About = () => {
  return (
    <section
      id="about"
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 py-20 text-white"
    >
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-10 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 bg-clip-text text-5xl font-extrabold text-transparent">
          Why Choose Us?
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-lg text-gray-400">
          We’re more than just a course. We’re your{" "}
          <span className="font-semibold text-teal-400">
            career launch team
          </span>
          . From 24/7 help to real interviews, we’re here to make sure you
          succeed—in both English and Bangla.
        </p>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition hover:shadow-cyan-600/30">
            <p className="flex items-center justify-center">
              <FaHeadset className="animate-pulse-slow mb-4 text-3xl text-teal-400"></FaHeadset>
            </p>

            <h3 className="mb-2 text-xl font-semibold">24/7 Live Support</h3>
            <p className="text-gray-400">
              We’re always here. Day or night, get instant help from our
              dedicated support team.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition hover:shadow-cyan-600/30">
            <p className="flex items-center justify-center">
              <FaBugSlash className="animate-fade-in mb-4 text-3xl text-cyan-400"></FaBugSlash>
            </p>
            <h3 className="mb-2 text-xl font-semibold">Error Solving</h3>
            <p className="text-gray-400">
              Stuck on something? Share your code, get help, and learn by fixing
              real-world issues.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition hover:shadow-cyan-600/30">
            <p className="flex items-center justify-center">
              <FaAward className="animate-pulse-slow mb-4 text-3xl text-blue-400"></FaAward>
            </p>

            <h3 className="mb-2 text-xl font-semibold">
              Extra Knowledge & Certificates
            </h3>
            <p className="text-gray-400">
              We guide you to free external resources and offer bonus
              certifications to power up your profile.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition hover:shadow-cyan-600/30">
            <p className="flex items-center justify-center">
              <FaPeopleGroup className="animate-fade-in mb-4 text-3xl text-green-400"></FaPeopleGroup>
            </p>

            <h3 className="mb-2 text-xl font-semibold">Large Support Team</h3>
            <p className="text-gray-400">
              You’ll never feel alone. Our expert mentors and support agents are
              just a message away.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition hover:shadow-cyan-600/30">
            <p className="flex items-center justify-center">
              <FaUserTie className="animate-pulse-slow mb-4 text-3xl text-purple-400"></FaUserTie>
            </p>

            <h3 className="mb-2 text-xl font-semibold">Mock Interview Team</h3>
            <p className="text-gray-400">
              We prepare you for the real thing with technical and HR mock
              interviews every month.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition hover:shadow-cyan-600/30">
            <p className="flex items-center justify-center">
              <FaLanguage className="animate-fade-in mb-4 text-3xl text-yellow-400"></FaLanguage>
            </p>

            <h3 className="mb-2 text-xl font-semibold">
              English & Bangla Support
            </h3>
            <p className="text-gray-400">
              Whether you prefer English or Bangla, we answer your questions,
              explain concepts, and guide your progress.
            </p>
          </div>
        </div>

        <p className="mx-auto mt-16 max-w-3xl text-lg text-gray-300">
          We’re here to help in
          <span className="font-semibold text-cyan-400">{" "}
            every way possible
          </span>
          — until you feel confident and job-ready. This isn’t just a course.
          It’s your launchpad.
        </p>
      </div>

      <style>
        {`
          @keyframes pulse-slow {
            0%, 100% {
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

          @keyframes fade-in {
            0%, 100% {
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

export default About;
