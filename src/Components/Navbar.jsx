import { href, Link, NavLink } from "react-router-dom";
import logo from "../assets/CodeRaft-Logo.png";
import { useContext, useRef } from "react";
import AuthContext from "../AuthContext";
import Loader from "./Loader";
import EnrollModal from "./EnrollModal";

const Navbar = () => {
  const { logout, user, setIsModalOpen, loading } = useContext(AuthContext);
  console.log(loading);

  const modalRef = useRef();

  const openModal = () => {
    modalRef.current?.openModal();
  };

  const links = [
    {
      to: "/",
      name: "Home",
    },
    {
      to: "/classes",
      name: "Classes",
    },
    {
      to: "/profile",
      name: "Profile",
    },
  ];

  const newLinks = [
    {
      href: "#",
      name: "Home",
    },
    {
      href: "#details",
      name: "Course Details",
    },
    {
      href: "#plans",
      name: "Plans",
    },
    {
      href: "#about",
      name: "About",
    },
    {
      href: "#contact",
      name: "Contact",
    },
  ];

  return (
    <>
      {/* new nav */}
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

              <a
                href="#enroll"
                onClick={() => openModal()}
                className="rounded-lg bg-cyan-500 px-4 py-2 text-white transition hover:bg-cyan-600"
              >
                Enroll
              </a>
              <div className="navbar-end gap-4">
                {loading ? (
                  <Loader></Loader>
                ) : user ? (
                  <>
                    <div
                      className="tooltip tooltip-left dropdown dropdown-end"
                      data-tip={
                        user.displayName
                          ? user.displayName
                          : "user name not found"
                      }
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        className="mr-2 size-10 rounded-full border-2 border-black"
                      >
                        <img
                          className="h-full w-full rounded-full object-cover"
                          alt=""
                          src={user.photoURL}
                        />
                      </div>
                      <ul
                        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 gap-4 p-2 shadow-sm"
                        tabIndex={0}
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
                            onClick={() => {
                              logout();
                            }}
                            to="/"
                            className="btn btn-outline border-2 bg-transparent hover:border-black"
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-outline border-2 bg-transparent text-xl hover:border-black"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>

            <div className="flex items-center md:hidden">
              <button
                id="mobileMenuBtn"
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div id="mobileMenu" className="hidden space-y-2 px-4 pb-4 md:hidden">
          <a href="#" className="block text-gray-300 hover:text-white">
            Home
          </a>
          <a href="#details" className="block text-gray-300 hover:text-white">
            Course Details
          </a>
          <a href="#plans" className="block text-gray-300 hover:text-white">
            Plans
          </a>
          <a href="#about" className="block text-gray-300 hover:text-white">
            About
          </a>
          <a href="#contact" className="block text-gray-300 hover:text-white">
            Contact
          </a>
          <a
            href="#enroll"
            onClick={() => openModal()}
            className="block rounded-lg bg-cyan-500 px-4 py-2 text-center text-white hover:bg-cyan-600"
          >
            Enroll
          </a>
        </div>
      </nav>
      <EnrollModal ref={modalRef} />
      {/* old nav */}
      {/* <div className="z-50 mt-24 border-b bg-[#00000042]">
        <div className="navbar sticky top-0 container mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {links.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      className={({ isActive }) =>
                        `block rounded-md p-2 text-lg ${
                          isActive
                            ? "border-b-2 border-[#0080ff] font-semibold text-black"
                            : "hover:text-white"
                        }`
                      }
                      to={link.to}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to="/"
              className="btn btn-ghost items-center p-0 text-xl md:flex"
            >
              <img className="h-10" src={logo} alt="" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:ml-20 lg:flex">
            <ul className="menu menu-horizontal rounded-2xl bg-transparent px-1">
              {links.map((link) => (
                <li key={link.name}>
                  <NavLink
                    className={({ isActive }) =>
                      `block rounded-md p-2 text-lg ${
                        isActive
                          ? "border-b-2 border-[#0080ff] font-semibold text-black"
                          : "hover:text-white"
                      }`
                    }
                    to={link.to}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Navbar;
