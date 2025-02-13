import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProviders";

const WorkSheet = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    console.log(data);
        // send the worksheet to the server
        const worksheet = {
            task: data.task,
            hours_worked: data.hours_worked,
            date: data.date,
            employee_name: user?.displayName
        }

        const worksheetRes = await axiosPublic.post('/worksheet', worksheet);
        console.log(worksheetRes.data);
        if(worksheetRes.data.insertedId){
            // show the success pop up
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.task} is added to the worksheet.`,
                showConfirmButton: false,
                timer: 1500
            });
        }
  }
  const date = new Date()
  return (
    <div>
      <h1 className="text-4xl font-bold text-center">Worksheet</h1>

      <section className="p-6 m-8 bg-gray-800 dark:bg-gray-100 text-gray-50 dark:text-gray-900">
        <form onSubmit={handleSubmit(onSubmit)}
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-900 dark:bg-gray-50">
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3 text-black dark:text-white">
                <label htmlFor="firstname" className="text-sm ">
                  Tasks
                </label>
                <select
                  defaultValue="default"
                  {...register("task", { required: true })}
                  required
                  className="select select-bordered w-full"
                >
                  <option disabled value="default">
                    Select a category
                  </option>
                  <option value="Sales">Sales</option>
                  <option value="Support">Support</option>
                  <option value="Content">Content</option>
                  <option value="Paper-work">Paper-work</option>
                </select>
              </div>

              <div className="col-span-full sm:col-span-3">
                <label htmlFor="lastname" className="text-sm">
                  Hours Worked
                </label>
                <input
                  id="lastname"
                  type="number"
                  name="hours_worked"
                  placeholder="Hours Worked"
                  {...register("hours_worked", {required: true})}
                  required
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 dark:text-gray-50 focus:ring-teal-400 focus:dark:ring-teal-600 border-gray-700 dark:border-gray-300 p-4"
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="address" className="text-sm">
                  Date
                </label>
                <input
                  id="address"
                  type="date"
                  placeholder="Date"
                  defaultValue={date}
                  {...register("date", {required: true})}
                  required
                  name="date"
                  className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 dark:text-gray-50 focus:ring-teal-400 focus:dark:ring-teal-600 border-gray-700 dark:border-gray-300 p-4"
                />
              </div>
            </div>
          </fieldset>
          <input className="btn btn-primary" type="submit" value="Submit" />
        </form>
      </section>
    </div>
  );
};

export default WorkSheet;
