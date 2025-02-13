import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {

  const { signIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const f = location.state?.from?.pathname || "/";
  console.log("state in the location login", location.state);

  const handleLogin = (e) => {
    e.preventDefault();
    const from = e.target;
    const email = from.email.value;
    const password = from.password.value;
    console.log(email, password);
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "User Login Successfull",
        showClass: {
          popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
        },
        hideClass: {
          popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
        },
      });
      navigate(f, { replace: true });
    });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
    .then(result => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        image: result.user?.photoURL
      }
      axiosPublic.post('/users', userInfo)
      .then(res => {
        console.log(res.data)
        navigate('/')
      })
    })
  }

  return (
    <>
      <Helmet>
        <title>Employ Ease | Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center md:m-1/2 lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Progressively underwhelm error-free niche markets via end-to-end
                opportunities. Interactively enable equity invested web-readiness
                rather than excellent convergence. Assertively procrastinate user
                friendly manufactured products through best-of-breed testing
                procedures. Professionally orchestrate pandemic customer service
                via flexible web services. Distinctively engage clicks-and-mortar
                partnerships.
              </p>
            </div>
            <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100"> 
                <form className="card-body" onSubmit={handleLogin}>
                  {/* email */}
                  <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                  </div>
                  {/* password */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                      <input
                        type="password"
                        name="password"
                        placeholder="password"
                        className="input input-bordered"
                        required
                      />
                    <label className="label">
                      <a href="#" className="label-text-alt link link-hover">
                        Forgot password?
                      </a>
                    </label>
                  </div>

                  {/* submit */}
                  <div className="form-control mt-6">
                    <input
                      className="btn btn-primary"
                      type="submit"
                      value="Login"
                    />
                  </div>
                </form>
                <button onClick={handleGoogleSignIn}><FcGoogle className="w-full btn btn-ghost"></FcGoogle></button>
                <p className="text-center pb-6">
                  <small>
                    New Here?
                    <Link to="/signUp" className="text-xl text-orange-700">
                      Create an account
                    </Link>
                  </small>
                </p>
            </div>
        </div>

      </div>
    </>
  );
};

export default Login;
