import {
  FaBriefcase,
  FaCalendarAlt,
  FaMapSigns,
  FaTasks,
} from "react-icons/fa";
import { FaCircleQuestion, FaLaptopCode } from "react-icons/fa6";
import AuthContext from "../../AuthContext";
import { useContext } from "react";

const CourseDetails = () => {
  const { setIsEnrollModalOpen } = useContext(AuthContext);

  return (
    <section
      id="details"
      className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-6 py-20 text-white"
    >
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-4 text-5xl font-extrabold text-cyan-400">
          Course Details
        </h2>
        <p className="mx-auto mb-16 max-w-3xl text-lg text-gray-400">
          Our 6-month beginner-friendly MERN Stack course takes you from zero to
          job-ready with real-world projects, expert guidance, and career
          support every step of the way.
        </p>

        <div className="grid gap-8 text-left md:grid-cols-3">
          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition hover:shadow-cyan-600/30">
            <div className="mb-4 text-3xl text-cyan-400">
              <FaMapSigns></FaMapSigns>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">12 Milestones</h3>
            <p className="text-sm text-gray-300">
              Each milestone builds a new skill — from HTML/CSS basics to
              full-stack projects with React, Node, and MongoDB.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition hover:shadow-cyan-600/30">
            <div className="mb-4 text-3xl text-cyan-400">
              <FaCalendarAlt></FaCalendarAlt>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">6 Months Long</h3>
            <p className="text-sm text-gray-300">
              3 recorded and 2 live classes weekly — perfect for
              working/studying individuals. Easy to follow at your own pace.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition hover:shadow-cyan-600/30">
            <div className="mb-4 text-3xl text-cyan-400">
              <FaLaptopCode></FaLaptopCode>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              12 Live Projects
            </h3>
            <p className="text-sm text-gray-300">
              Work on real-world projects including dashboards, authentication
              systems, and booking apps to build your portfolio.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition hover:shadow-cyan-600/30">
            <div className="mb-4 text-3xl text-cyan-400">
              <FaTasks></FaTasks>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              12 Assignments
            </h3>
            <p className="text-sm text-gray-300">
              Structured tasks after every milestone to solidify your learning
              with instructor feedback and guidance.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition hover:shadow-cyan-600/30">
            <div className="mb-4 text-3xl text-cyan-400">
              <FaCircleQuestion></FaCircleQuestion>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">12 Quizzes</h3>
            <p className="text-sm text-gray-300">
              Boost your understanding and track your progress with fun,
              interactive quizzes at every stage of the course.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 shadow-lg transition hover:shadow-cyan-600/30">
            <div className="mb-4 text-3xl text-cyan-400">
              <FaBriefcase></FaBriefcase>
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              Job Preparation
            </h3>
            <p className="text-sm text-gray-300">
              Mock interviews, portfolio reviews, resume help, and career
              guidance to confidently step into tech jobs or freelancing.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <a
            href="#enroll"
            onClick={() => setIsEnrollModalOpen(true)}
            className="transform rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 px-8 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:from-teal-500 hover:to-cyan-600"
          >
            Join the Course Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
