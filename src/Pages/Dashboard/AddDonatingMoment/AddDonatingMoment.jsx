import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Providers/AuthProviders";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddDonatingMoment = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
    const axiosPublic = useAxiosPublic();

    const { createUser, updateUserProfile } = useContext(AuthContext);

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
              batchNo: data.batchNo,
              bloodGroup: data.bloodGroup,
              image: res.data.data.display_url,
              bloodCount: data.bloodCount,
            };
            //
            const userRes = await axiosPublic.post("/donating-moments", user);
            console.log(userRes.data);
            if (userRes.data.insertedId) {
              // show success pop up
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your Donating Moments Added!!!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
            navigate('/')
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
                  bloodGroup: data.bloodGroup,
                  bloodCount: data.bloodCount,
                  image: res.data.data.display_url,
                };
                axiosPublic.post("/donating-moments", userInfo).then((res) => {
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
            <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="lg:flex gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">আপনার নাম লিখুন</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
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
                    <span className="label-text">কত তম রক্তদান? (১, ২, ৩ এভাবে  লিখুন)</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    name="bloodCount"
                    {...register("bloodCount", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.bloodCount && (
                    <span className="text-red-600">Blood count is required</span>
                  )}
                </div>
              </div>
            
              <div className="form-control w-full my-6">
                <div className="label">
                  <span className="label-text">FCI ব্যাচ সিলেক্ট করুন</span>
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
                  <span className="label-text">রক্তের গ্রুপ সিলেক্ট করুন</span>
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
                <div className="form-control w-full my-6">
                  <p>রক্তদানের মুহুর্তের ছবি দিন।</p>
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
                  value="Submit"
                />
              </div>
            </form>
        </div>
    );
};

export default AddDonatingMoment;