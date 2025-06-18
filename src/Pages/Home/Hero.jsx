import {
  FaBolt,
  FaCode,
  FaCss3,
  FaFire,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
  FaServer,
} from "react-icons/fa";
import AuthContext from "../../AuthContext";
import { useContext } from "react";

const Hero = () => {
  const { setIsEnrollModalOpen } = useContext(AuthContext);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-950 px-6 text-center text-white">
      <div className="absolute inset-0 z-0 bg-[url('https://media.licdn.com/dms/image/v2/D4E12AQGGBOMh72oC4w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1734475126370?e=2147483647&v=beta&t=cikzFHkOx0010MX55I82_NL2yZEjEjB_zJJ7BDlBgDg')] bg-cover opacity-20"></div>

      <div className="animate-bounce-slow absolute top-10 left-8 text-5xl text-orange-500 opacity-30">
        <FaHtml5></FaHtml5>
      </div>
      <div className="absolute top-24 right-8 animate-pulse text-5xl text-blue-500 opacity-30">
        <FaCss3></FaCss3>
      </div>
      <div className="animate-spin-slow absolute bottom-20 left-10 text-5xl text-yellow-400 opacity-30">
        <FaJs></FaJs>
      </div>
      <div className="absolute top-1/3 right-10 animate-bounce text-5xl text-cyan-400 opacity-30">
        <FaReact></FaReact>
      </div>
      <div className="animate-float absolute right-20 bottom-10 text-5xl text-green-400 opacity-30">
        <FaNodeJs></FaNodeJs>
      </div>
      <div className="animate-fade absolute top-[30%] left-1/4 text-5xl text-gray-400 opacity-20">
        <FaServer></FaServer>
      </div>
      <div className="animate-spin-slow absolute right-[25%] bottom-[30%] text-5xl text-yellow-300 opacity-30">
        <FaFire></FaFire>
      </div>
      <div className="absolute top-[70%] left-[45%] animate-pulse text-5xl text-fuchsia-500 opacity-30">
        <FaBolt></FaBolt>
      </div>
      <div className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-[12rem] text-gray-800 opacity-5">
        <FaCode></FaCode>{" "}
      </div>

      <div className="z-10">
        <h1 className="mb-6 text-4xl leading-tight font-extrabold md:text-6xl">
          Build Web Apps <span className="text-cyan-400">Like a Pro</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 md:text-xl">
          Learn MERN Stack development from scratch — HTML, Tailwind, React,
          Node.js, MongoDB, Firebase & more.
        </p>
        <div>
          <a
            href="#enroll"
            onClick={() => setIsEnrollModalOpen(true)}
            className="mr-3 transform rounded-xl bg-cyan-500 px-8 py-4 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-cyan-600"
          >
            Start Learning
          </a>
          <a
            href="#details"
            className="transform rounded-xl border border-gray-600 px-8 py-4 text-gray-300 transition-transform hover:scale-105 hover:border-white hover:text-white"
          >
            View Syllabus
          </a>
        </div>
      </div>
      <style>
        {`


      .animate-bounce-slow {
        animation: bounce 5s infinite;
      }

      .animate-spin-slow {
        animation: spin 15s linear infinite;
      }

      .animate-float {
        animation: float 8s ease-in-out infinite;
      }

      .animate-fade {
        animation: fadeInOut 6s ease-in-out infinite;
      }

      @keyframes float {
        0% {
          transform: translateY(0);
        }

        50% {
          transform: translateY(-20px);
        }

        100% {
          transform: translateY(0);
        }
      }

      @keyframes fadeInOut {
        0%,
        100% {
          opacity: 0.3;
        }

        50% {
          opacity: 0.7;
        }
      } `}
      </style>
    </section>
  );
};

export default Hero;
