import { useLoaderData } from "react-router-dom";

const EmployeeDetails = () => {
  const loadedData = useLoaderData();

  return (
    <div className="m-10">
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img className="w-40" src={loadedData?.image} alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title  capitalize">{loadedData?.name}</h2>
          <p>{loadedData?.email}</p>
          <p className="capitalize">Designation : {loadedData.designation}</p>
          <p>Salary ${loadedData.salary}</p>
          <p>Bank Account No.{loadedData.bank_account_no}</p>
          <div>
            {loadedData.verify === "true" ? (
              <div className="badge badge-accent">Verified Employee</div>
            ) : (
              <div className="badge badge-error gap-2">
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
                Please Verify {loadedData.name}
              </div>
            )}
          </div>
          <div className="badge badge-primary">{loadedData.role}</div>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
