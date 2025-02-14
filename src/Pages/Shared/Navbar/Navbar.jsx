import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
  const [isAdmin] = useAdmin();
  const { user, logOut } = useContext(AuthContext);
  // const [ isAdmin ] = useAdmin();

  const handleLogOut = () => {
    logOut().then(() => {});
    toast.success("log out success").catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      {user ? (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogOut}>Logout</button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </>
      )}
      {isAdmin && (
        <>
          <li>
            <Link to="/pending-volunteers">Pending Volunteers</Link>
          </li>
          <li>
            <Link to="/verified-volunteers">Verified Volunteers</Link>
          </li>
          <li>
            <Link to="/feedbacks">Feedback Messages</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      {/* Mobile view */}
      <div className="navbar bg-base-100">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className=" text-3xl text-black dark:text-white rounded-full">
                      <FaUserCircle title={user?.displayName} />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black dark:text-white"
                  >
                    {navOptions}
                  </ul>
                </div>
              ) : (
                <>
                  <div>
                    <Link
                      to="/all-volunteers"
                      className="btn btn-lg dark:btn-ghost mr-3"
                    >
                      <button>All Volunteers</button>
                    </Link>
                    <Link
                      to="/contact"
                      className="btn btn-lg dark:btn-ghost mr-3"
                    >
                      <button>Give Feedback</button>
                    </Link>
                    <Link to="/login" className="btn btn-lg  dark:btn-ghost">
                      <button>Start Donating</button>
                    </Link>
                  </div>
                </>
              )}
            </ul>
          </div>
          <a
            className="hidden lg:block lg:text-2xl text-xs font-bold tooltip tooltip-right"
            href="/"
            data-tip="Feni Computer Institute Blood Donation Group(FCI BDG)"
          >
            FCI BDG
          </a>
        </div>

        {/* desktop view */}
        <div className="navbar-center hidden lg:flex">
          <ul className="px-1">
            {user ? (
              <div className="">
                <ul
                  tabIndex={0}
                  className=" bg-base-100 lg:flex gap-5 rounded-box text-black dark:text-white"
                >
                  <Link
                    to="/all-volunteers"
                    className="btn btn-lg dark:btn-ghost mr-3"
                  >
                    <button>All Volunteers</button>
                  </Link>
                  <Link
                    to="/profile"
                    className="btn btn-lg dark:btn-ghost mr-3"
                  >
                    <button>My Profile</button>
                  </Link>
                  <Link to="/" className="btn btn-lg dark:btn-ghost mr-3">
                    <button onClick={handleLogOut}>Logout</button>
                  </Link>
                </ul>
              </div>
            ) : (
              <>
                <div>
                  <Link
                    to="/all-volunteers"
                    className="btn btn-lg dark:btn-ghost mr-3"
                  >
                    <button>All Volunteers</button>
                  </Link>
                  <Link
                    to="/contact"
                    className="btn btn-lg dark:btn-ghost mr-3"
                  >
                    <button>Give Feedback</button>
                  </Link>
                  <Link to="/login" className="btn btn-lg  dark:btn-ghost">
                    <button>Start Donating</button>
                  </Link>
                </div>
              </>
            )}
          </ul>
        </div>
        <div className=" lg:hidden">
          <div className="font-bold text-2xl">
            <button>FCI BDG Web</button>
          </div>
        </div>
      </div>

      {/* -------------------------------Garbage code-------------------------- */}

      {/* <div className="my-5">
        <div className="navbar bg-opacity-30 bg-base-100 text-white">
          <div className="flex-1">
            <a
              className="btn btn-ghost text-4xl text-black dark:text-white tooltip tooltip-right"
              data-tip="Feni Computer Institute Blood Donation Group(FCI BDG)"
              href="/"
            >
              FCI BDG
            </a>
          </div>
          <div className="flex-none">
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className=" text-3xl text-black dark:text-white rounded-full">
                    <FaUserCircle title={user?.displayName} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black dark:text-white"
                >
                  {navOptions}
                </ul>
              </div>
            ) : (
              <>
                <div>
                  {/* <Link to="/all-volunteers" className="btn btn-lg dark:btn-ghost mr-3"><button>All Volunteers</button></Link>
            <Link to="/contact" className="btn btn-lg dark:btn-ghost mr-3"><button>Give Feedback</button></Link>
            <Link to="/login" className="btn btn-lg dark:btn-ghost"><button>Start Donating</button></Link> */}
      {/* </div>
              </>
            )}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Navbar;
