import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const EmployeeList = () => {
    const axiosSecure = useAxiosSecure()
    // eslint-disable-next-line
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
          const res = await axiosSecure.get("/users", {
            headers: {
              authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
          });
          return res.data;
        },
    });
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetch("https://fci-blood-donation-group.vercel.app/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  const handleVerify = (user) => {
    axiosSecure.patch(`/employees/verify/${user._id}`)
    .then(res => {
        console.log(res.data);
        if(res.data.modifiedCount > 0){
            refetch();
            toast.success(`${user.name} is now a Verified Employee`)
        }
    })
  }

  return (
    <div>
      <Helmet>
         <title>Employ Ease | Dashboard</title>
      </Helmet>
        <h1 className="text-4xl font-bold text-center my-6">All Employee</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Pay</th>
              <th>Action</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => <tr key={employee._id}>
              <th>{index + 1}</th>
              <td>{employee.name}</td>
              <td>{employee.email}</td>

              
              {employee.verify === 'false' ? <th><button className="btn-disabled" disabled>Pay</button></th> : <th className="btn btn-outline"><Link to={`payment/${employee._id}`}><button>Pay</button></Link></th>}


              <td>{employee.verify === 'false' ? <button className="btn btn-ghost" onClick={() => handleVerify(employee)}>Verify</button> : <button className="btn-disabled text-base font-bold">Verified</button>}</td>


              <td className="btn btn-ghost"><Link to={`employee-details/${employee._id}`}><button>{employee.name} Details</button></Link></td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
