import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();

  const { createUser, updateUserProfile } = useContext(AuthContext);
  // console.log(createUser)

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an url
    const image_file = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, image_file, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the user info data to the server with the imageURL
      const user = {
        name: data.name,
        designation: data.designation,
        salary: parseFloat(data.salary),
        email: data.email,
        bank_account_no: parseFloat(data.bank_account_no),
        image: res.data.data.display_url,
        role: "employee",
        verify: "false"
      };
      //
      const userRes = await axiosPublic.post("/users", user);
      console.log(userRes.data);
      if (userRes.data.insertedId) {
        // show success pop up
      }
    }
    console.log("with image url", res.data);

    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          console.log("user profile info update");
          // TODO : create user info in database
          const userInfo = {
            name: data.name,
            designation: data.designation,
            salary: parseFloat(data.salary),
            email: data.email,
            bank_account_no: data.bank_account_no,
            image: res.data.data.display_url,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user added to database");
              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "User Successfully Created!!!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
          navigate("/");
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <div>
      <Helmet>
        <title>EmployEase | Register</title>
      </Helmet>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    {...register("name", { required: true })}
                    name="name"
                    className="input input-bordered"
                  />
                  {errors.name && (
                    <span className="text-red-600">Name is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    {...register("email", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-600">Email is required</span>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Bank Account No.</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Bank Account No. "
                    name="bank_account_no"
                    {...register("bank_account_no", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-600">
                      Bank Account is required
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Salary</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Salary"
                    name="salary"
                    {...register("salary", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-600">Salary is required</span>
                  )}
                </div>
              </div>
              <div className="form-control w-full my-6">
                <div className="label">
                  <span className="label-text">Designation*</span>
                </div>
                <select
                  defaultValue="default"
                  {...register("designation", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option disabled value="default">
                    Select a Designation
                  </option>
                  <option value="sales_assistant">Sales Assistant</option>
                  <option value="social_media_executive">
                    Social Media executive
                  </option>
                  <option value="digital_marketer">Digital Marketer</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <p className=" text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className=" text-red-600">
                    Password must be 6 characters.
                  </p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className=" text-red-600">
                    Password must be under or equal in 20 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className=" text-red-600">
                    Password must have one uppercase one lowercase, one number
                    and one special character
                  </p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
                <div className="form-control w-full my-6">
                  <p>Upload Profile Picture</p>
                  <input
                    onChange={() => console.log(event.target)}
                    {...register("image", { required: true })}
                    type="file"
                    className="file-input w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <FcGoogle className="w-full btn btn-ghost"></FcGoogle>
            <p className="text-center pb-6">
              <small>
                Already Have an Account?
                <Link to="/login" className="text-xl text-orange-700">
                  Login Now
                </Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
