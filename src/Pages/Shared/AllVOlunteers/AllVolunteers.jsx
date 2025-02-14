import { useLoaderData } from "react-router-dom";

const AllVolunteers = () => {
  const volunteers = useLoaderData();
  console.log(volunteers)

  return (
    <div className=" w-full grid md:grid-cols-2 p-4 lg:grid-cols-4 gap-2">
        {volunteers.map((volunteer) => (
            <div className="card card-compact bg-base-100 w-full shadow-xl" key={volunteer._id}>
            <figure>
              <img
                src={volunteer.image}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{volunteer.name}</h2>
              <p>FCI Batch No. : {volunteer.batchNo}</p>
              <div className="card-actions font-bold justify-end">
                <button className="">{volunteer.verify === 'true' ? "Verified" : "Unverified"}</button>
              </div>
            </div>
          </div>
        ))}
      
    </div>
  );
};

export default AllVolunteers;
