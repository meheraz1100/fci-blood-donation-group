import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
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
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
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
    </>
  );

  return (
    <>
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
                    <Link to="/login" className="btn btn-lg dark:btn-ghost">
                      <button>Start Donating</button>
                    </Link>
                  </div>
                </>
              )}
            </ul>
          </div>
          <a
            className="btn btn-ghost text-xl tooltip tooltip-right"
            href="/"
            data-tip="Feni Computer Institute Blood Donation Group(FCI BDG)"
          >
            FCI BDG
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
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
                  <Link to="/login" className="btn btn-lg dark:btn-ghost">
                    <button>Start Donating</button>
                  </Link>
                </div>
              </>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
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
