import { Link, NavLink } from "react-router-dom";
import logo from "../assets/CodeRaft-Logo.png";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider";

const Navbar = () => {
  const { logout, user, setIsModalOpen } = useContext(AuthContext);

  const signOut = () => {
    console.log("signOut hit");
  };
  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            `block rounded-md p-2 text-lg ${
              isActive
                ? "border-[#0080ff] border-b-2 font-semibold text-black"
                : "hover:text-white"
            }`
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `block rounded-md p-2 text-lg ${
              isActive
                ? "border-[#0080ff] border-b-2 font-semibold text-black"
                : "hover:text-white"
            }`
          }
          to="/classes"
        >
          Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `block rounded-md p-2 text-lg ${
              isActive
                ? "border-[#0080ff] border-b-2 font-semibold text-black"
                : "hover:text-white"
            }`
          }
          to="/profile"
        >
          Profile
        </NavLink>
      </li>

    </>
  );
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
              {links}
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
            {links}
          </ul>
        </div>
        <div className="navbar-end gap-4">
          {user ? (
            <>
              <div
                className="tooltip tooltip-bottom"
                data-tip={
                  user.displayName ? user.displayName : "user name not found"
                }
              >
                <div className="mr-2 size-10 rounded-full border-2 border-amber-500">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    alt=""
                    src={user.photoURL}
                  />
                </div>
              </div>
              <Link
                onClick={signOut}
                to="/"
                className="btn btn-outline border-2 bg-transparent text-xl"
              >
                Logout
              </Link>
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
