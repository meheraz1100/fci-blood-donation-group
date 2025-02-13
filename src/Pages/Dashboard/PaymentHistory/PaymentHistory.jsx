import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });
  console.log(payments);

  return (
    <div>
      <h1 className="text-4xl">Total Payments : {payments?.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => <tr key={payment._id}>
              <th>{index + 1}</th>
              <td>{payment.name}</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>)}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
