import { Link, NavLink } from "react-router-dom";
import logo from "../assets/CodeRaft-Logo.png";
import { useContext } from "react";
import AuthContext from "../AuthContext";
import Loader from "./Loader";

const Navbar = () => {
  const { logout, user, setIsModalOpen, loading } = useContext(AuthContext);
  console.log(loading);
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
  return (
    <div className="z-50 border-b bg-[#00000042]">
      <div className="navbar sticky top-0 container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
        <div className="navbar-end gap-4">
          {loading ? (
            <Loader></Loader>
          ) : user ? (
            <>
              <div
                className="tooltip tooltip-left dropdown dropdown-end"
                data-tip={
                  user.displayName ? user.displayName : "user name not found"
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
    </div>
  );
};

export default Navbar;
