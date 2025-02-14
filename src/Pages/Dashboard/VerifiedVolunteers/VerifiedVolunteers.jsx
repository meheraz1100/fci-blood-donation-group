import { useLoaderData } from "react-router-dom";

const VerifiedVolunteers = () => {

    const volunteers = useLoaderData()

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {volunteers.map((volunteer) => (
                <div className="card card-compact bg-base-100 lg:w-96 shadow-xl" key={volunteer._id}>
                <figure>
                  <img
                    className="w-25"
                    src={volunteer.image}
                    alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{volunteer.name}</h2>
                  <p>FCI Batch : {volunteer.batchNo}</p>
                  <p>Blood Group : {volunteer?.bloodGroup}</p>
                  <div className="card-actions justify-end">
                  </div>
                </div>
              </div>
            ))}
        </div>
    );
};

export default VerifiedVolunteers;