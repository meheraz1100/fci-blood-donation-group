import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProviders";
import { useContext } from "react";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddAchivement = () => {

    const { createUser, updateUserProfile } = useContext(AuthContext);
    const {register, reset, handleSubmit} = useForm();
    const axiosPublic = useAxiosPublic();
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
          const prizeData = {
            name: data.name,
            description: data.description,
            date: data.date,
            image: res.data.data.display_url,
          };
          //
          const userRes = await axiosPublic.post("/achivements", prizeData);
          console.log(userRes.data);
          if (userRes.data.insertedId) {
            // show success pop up
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Achivement Added!!!",
              showConfirmButton: false,
              timer: 1500,
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
                    description: data.description,
                    date: data.date,
                    image: res.data.data.display_url,
                  };
                  axiosPublic.post("/achivements", userInfo).then((res) => {
                    if (res.data.insertedId) {
                      console.log("user added to database");
                      reset();
                      Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Data Successfully Created!!!",
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
    <div className="m-4">
        <h1 className="text-4xl font-bold text-center">Add an Achivement</h1>
      <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="lg:flex gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">পুরষ্কার কোন প্রতিষ্ঠান হতে পেয়েছেন?</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    {...register("name", { required: true })}
                    name="name"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">কোন কারণে পুরষ্কার লাভ করেছেন?</span>
                  </label>
                  <input
                    type=""
                    placeholder=""
                    name="description"
                    {...register("description", { required: true })}
                    className="input input-bordered"
                  />
                </div>
              </div>
              <div className="lg:flex gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">পুরষ্কার পাওয়ার তারিখ লিখুন।</span>
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    name="date"
                    {...register("date", { required: true })}
                    className="input input-bordered"
                  />
                </div>
              </div>
              <div className="form-control">
                
                <div className="form-control w-full my-6">
                  <p>পুরস্কারের ছবি দিন</p>
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

export default AddAchivement;
