import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
// import { useQuery } from "@tanstack/react-query";



const PendingVolunteers = () => {

    const axiosSecure = useAxiosSecure()
    
    
    const handleVerify = (volunteer) => {
        axiosSecure.put(`/volunteers/verify/${volunteer._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                
                toast.success(`${volunteer.name} is now a Verified Volunteer!!`)
            }
        })
      }

  const volunteers = useLoaderData();

  console.log(volunteers);
  return (
    <div>
      {volunteers.map((volunteer, index) => (
        <div className="overflow-x-auto" key={volunteer._id}>
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>FCI Batch</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>{index + 1}</th>
                <td>{volunteer.name}</td>
                <td>{volunteer.batchNo}</td>
                <td className="btn" onClick={() => handleVerify(volunteer)}>Verify</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default PendingVolunteers;
