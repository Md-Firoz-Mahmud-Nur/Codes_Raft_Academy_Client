import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import AuthContext from "../AuthContext";
import Loader from "./Loader";
import EnrollModal from "./EnrollModal";

const Navbar = () => {
  const { logout, user, setIsModalOpen, loading } = useContext(AuthContext);
  const modalRef = useRef();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const openModal = () => {
    modalRef.current?.openModal();
  };

  const newLinks = [
    { href: "#", name: "Home" },
    { href: "#details", name: "Course Details" },
    { href: "#plans", name: "Plans" },
    { href: "#about", name: "About" },
    { href: "#contact", name: "Contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-gray-800 bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <img
                src="https://codesraft.com/CodeRaft-Logo.png"
                alt="CodesRaft Logo"
                className="h-10"
              />
            </div>

            <div className="hidden items-center space-x-6 md:flex">
              {newLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 transition hover:text-white"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={openModal}
                className="rounded-lg bg-cyan-500 px-4 py-2 text-white transition hover:bg-cyan-600"
              >
                Enroll
              </button>

              <div>
                {loading ? (
                  <Loader />
                ) : user ? (
                  <div
                    className="tooltip tooltip-left dropdown dropdown-end"
                    data-tip={user.displayName || "User"}
                  >
                    <div
                      tabIndex={0}
                      role="button"
                      className="mr-2 size-10 rounded-full border-2 border-black"
                    >
                      <img
                        className="h-full w-full rounded-full object-cover"
                        src={user.photoURL}
                        alt="User"
                      />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 gap-4 p-2 shadow-sm"
                    >
                      <li>
                        <Link
                          to="/profile"
                          onClick={() => document.activeElement.blur()}
                          className="btn btn-outline border-2 bg-transparent hover:border-black"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/"
                          onClick={logout}
                          className="btn btn-outline border-2 bg-transparent hover:border-black"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    onClick={() => setIsModalOpen(true)}
                    className="transform rounded-lg border border-gray-600 px-4 py-2 text-gray-300 transition-transform hover:scale-105 hover:border-white hover:text-white"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>

            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMobileOpen && (
          <div className="space-y-2 px-4 pb-4 md:hidden">
            {newLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-gray-300 hover:text-white"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={openModal}
              className="block w-full rounded-lg bg-cyan-500 px-4 py-2 text-center text-white hover:bg-cyan-600"
            >
              Enroll
            </button>
          </div>
        )}
      </nav>

      <EnrollModal ref={modalRef} />
    </>
  );
};

export default Navbar;
