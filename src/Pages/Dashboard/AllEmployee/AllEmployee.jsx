import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { IoWarning } from "react-icons/io5";
import { toast } from "react-toastify";

const AllEmployee = () => {
  const axiosSecure = useAxiosSecure();
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

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
      //   Swal.fire({
      //     title: "Deleted!",
      //     text: "Your file has been deleted.",
      //     icon: "success"
      //   });
      axiosSecure.delete(`/users/${user._id}`)
      .then(res => {
          if(res.data.deletedCount > 0){
              refetch()
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
              });
          }
      })
    }
  });
  }

  
  const unableToDeleteAdmin = () => {
    toast.warn('You cannot Fire a admin');
  }

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`)
    .then(res => {
      console.log(res.data);
      if(res.data.modifiedCount > 0){
        refetch()
        toast.success(`${user.name} is now an admin`)
      }
    })
  }

  const handleMakeHr = (user) => {
    axiosSecure.patch(`/users/hr/${user._id}`)
    .then(res => {
      console.log(res.data);
      if(res.data.modifiedCount > 0){
        refetch()
        toast.success(`${user.name} is now a HR`)
      }
    })
  }


  return (
    <div className="dark:text-white text-black">
      <div className="flex justify-evenly my-8 ">
        <h2 className="text-4xl">All Employee: </h2>
        <h2 className="text-4xl">Total Employee: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
              <th>Fire</th>
              <th>Verify Status</th>
            </tr>
          </thead>
          <tbody>
            {
                users.map((user, index) => <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.designation}</td>
                    <td>{user.email}</td>
                    <td className="uppercase">{user.role}</td>
                    {
                    user.role === 'admin' ? <td>Admin</td> : <td>Admin</td>
                    &&
                    user.role === 'hr' ? <td className="btn"><button onClick={() => handleMakeAdmin(user)}>Make Admin</button></td> : <td></td>
                    &&
                    user.role === 'employee' ? <td className="btn"><button onClick={() => handleMakeHr(user)}>Make HR</button></td> : <td></td>
                    }
                    {user.role === 'admin' ? <td className="text-2xl text-red-600"><button onClick={unableToDeleteAdmin}><IoWarning /></button></td> : <td className="text-xl text-red-600 font-bold"><button onClick={() => handleDelete(user)}>Fire</button></td>}
                    {
                      user.verify === 'true' ? <div className="badge badge-accent">Verified</div> : <div className="badge badge-error gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-4 h-4 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                      Not Verified
                    </div>
                    }
                  </tr>)
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployee;
