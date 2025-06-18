import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useContext } from "react";
import AuthContext from "../AuthContext";

const Footer = () => {
  const { setIsEnrollModalOpen } = useContext(AuthContext);

  return (
    <>
      <footer className="border-t border-gray-800 bg-gray-900 px-6 py-10 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 text-center md:grid-cols-3 md:text-left">
          <div className="space-y-4">
            <img
              src="https://codesraft.com/CodeRaft-Logo-Dark.png"
              alt="CodesRaft Logo"
              className="mx-auto h-12 md:mx-0"
            />
            <p className="text-sm text-gray-400">
              Empowering future developers through real projects, strong
              mentorship, and community support.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold text-cyan-400">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="transition hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#details" className="transition hover:text-white">
                  Course Details
                </a>
              </li>
              <li>
                <a href="#plans" className="transition hover:text-white">
                  Plans
                </a>
              </li>
              <li>
                <a
                  href="#enroll"
                  onClick={() => setIsEnrollModalOpen(true)}
                  className="transition hover:text-white"
                >
                  Enroll
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="mb-3 text-lg font-semibold text-cyan-400">
              Connect with Us
            </h3>
            <div className="flex justify-center space-x-4 text-xl text-gray-400 md:justify-start">
              <a
                href="https://facebook.com/codesraft"
                target="_blank"
                className="hover:text-blue-500"
              >
                <FaFacebookF></FaFacebookF>
              </a>
              <a
                href="https://linkedin.com/company/codesraft"
                target="_blank"
                className="hover:text-blue-400"
              >
                <FaLinkedinIn></FaLinkedinIn>
              </a>
              <a
                href="https://x.com/codesraft"
                target="_blank"
                className="hover:text-white"
              >
                <FaXTwitter></FaXTwitter>
              </a>
              <a
                href="https://youtube.com/@codesraft"
                target="_blank"
                className="hover:text-red-500"
              >
                <FaYoutube></FaYoutube>
              </a>
              <a
                href="https://wa.me/8801234567890"
                target="_blank"
                className="hover:text-green-400"
              >
                <FaWhatsapp></FaWhatsapp>
              </a>
            </div>
          </div>
        </div>
        <p className="mt-10 mb-5 text-center text-sm text-gray-500">
          &copy; 2025{" "}
          <span className="font-semibold text-white">CodesRaft</span>. All
          rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
