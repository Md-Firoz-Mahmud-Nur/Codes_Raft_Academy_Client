import React, { useRef } from "react";
import EnrollModal from "../../Components/EnrollModal";

const Hero = () => {
  const modalRef = useRef();

  const openModal = () => {
    modalRef.current?.openModal();
  };
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-950 px-6 text-center text-white">
      <div className="absolute inset-0 z-0 bg-[url('https://media.licdn.com/dms/image/v2/D4E12AQGGBOMh72oC4w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1734475126370?e=2147483647&v=beta&t=cikzFHkOx0010MX55I82_NL2yZEjEjB_zJJ7BDlBgDg')] bg-cover opacity-20"></div>

      <div className="animate-bounce-slow absolute top-10 left-8 text-5xl text-orange-500 opacity-30">
        <i className="fab fa-html5"></i>
      </div>
      <div className="absolute top-24 right-8 animate-pulse text-5xl text-blue-500 opacity-30">
        <i className="fab fa-css3-alt"></i>
      </div>
      <div className="animate-spin-slow absolute bottom-20 left-10 text-5xl text-yellow-400 opacity-30">
        <i className="fab fa-js"></i>
      </div>
      <div className="absolute top-1/3 right-10 animate-bounce text-5xl text-cyan-400 opacity-30">
        <i className="fab fa-react"></i>
      </div>
      <div className="animate-float absolute right-20 bottom-10 text-5xl text-green-400 opacity-30">
        <i className="fab fa-node-js"></i>
      </div>
      <div className="animate-fade absolute top-[30%] left-1/4 text-5xl text-gray-400 opacity-20">
        <i className="fas fa-server"></i>
      </div>
      <div className="animate-spin-slow absolute right-[25%] bottom-[30%] text-5xl text-yellow-300 opacity-30">
        <i className="fas fa-fire"></i>
      </div>
      <div className="absolute top-[70%] left-[45%] animate-pulse text-5xl text-fuchsia-500 opacity-30">
        <i className="fas fa-bolt"></i>
      </div>
      <div className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-[12rem] text-gray-800 opacity-5">
        <i className="fas fa-code"></i>
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
            onClick={() => openModal()}
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
      <EnrollModal ref={modalRef} />
    </section>
  );
};

export default Hero;
