import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
// import { FcGoogle } from "react-icons/fc";
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
        email: data.email,
        phone_number: parseFloat(data.phone_number),
        batchNo: data.batchNo,
        bloodGroup: data.bloodGroup,
        image: res.data.data.display_url,
        password: data.password,
        role: "volunteer",
        verify: "false",
      };
      //
      const userRes = await axiosPublic.post("/volunteers", user);
      console.log(userRes.data);
      if (userRes.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Successfully Created!!! Login Now!!",
          showConfirmButton: false,
          timer: 3000,
        });
      }
      navigate("/");
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
            batchNo: data.batchNo,
            email: data.email,
            bloodGroup: data.bloodGroup,
            phone_number: data.phone_number,
            image: res.data.data.display_url,
          };
          axiosPublic.post("/volunteers", userInfo).then((res) => {
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
        <title>FCI BDG | Register</title>
      </Helmet>

      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
            <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="lg:flex gap-4">
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
              <div className="lg:flex gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone Number</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Phone Number"
                    name="phone_number"
                    {...register("phone_number", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-600">
                      Phone Number is required
                    </span>
                  )}
                </div>

                {/* <div className="form-control">
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
                </div> */}
              </div>
              <div className="form-control w-full my-6">
                <div className="label">
                  <span className="label-text">FCI Batch</span>
                </div>
                <select
                  defaultValue="default"
                  {...register("batchNo", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option disabled value="default">
                    Select Your Batch No.
                  </option>
                  <option value="Non FCI'an">I am not a FCI Student</option>
                  <option value="1">1st</option>
                  <option value="2">2nd</option>
                  <option value="3">3rd</option>
                  <option value="4">4th</option>
                  <option value="5">5th</option>
                  <option value="6">6th</option>
                  <option value="7">7th</option>
                  <option value="8">8th</option>
                  <option value="9">9th</option>
                  <option value="10">10th</option>
                  <option value="11">11th</option>
                  <option value="12">12th</option>
                  <option value="13">13th</option>
                  <option value="14">14th</option>
                  <option value="15">15th</option>
                  <option value="16">16th</option>
                  <option value="17">17th</option>
                  <option value="18">18th</option>
                  <option value="19">19th</option>
                  <option value="20">20th</option>
                  <option value="21">21st</option>
                </select>
              </div>

              <div className="form-control w-full my-6">
                <div className="label">
                  <span className="label-text">Blood Group</span>
                </div>
                <select
                  defaultValue="default"
                  {...register("bloodGroup", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option disabled value="default">
                    Select Your Blood Group
                  </option>
                  <option value="A+">A+</option>
                  <option value="O+">O+</option>
                  <option value="B+">B+</option>
                  <option value="AB+">AB+</option>
                  <option value="A-">A-</option>
                  <option value="O-">O-</option>
                  <option value="B-">B-</option>
                  <option value="AB-">AB-</option>
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
                  className="btn btn-primary text-white"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            {/* <FcGoogle className="w-full btn btn-ghost"></FcGoogle> */}
            <p className="text-center pb-6">
              <small>
                Already Have an Account?
                <Link to="/login" className="text-xl text-orange-700">
                  Login Now
                </Link>
              </small>
            </p>
            <div className="text-center">
              <Link to="/">
                <button className="btn btn-wide btn-info text-white m-3">
                  Go Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
