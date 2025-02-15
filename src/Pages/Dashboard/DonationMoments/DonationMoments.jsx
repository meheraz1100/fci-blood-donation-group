import { useLoaderData } from "react-router-dom";

const DonationMoments = () => {

    const donationMoments = useLoaderData();

    return (
      <div>
          <h1 className="text-center text-3xl font-bold my-2">Blood Donation Moments</h1>
        <div className="m-4 grid grid-cols-2">
            {donationMoments.map((donationMoment) => (
                <div className="card bg-base-100 lg:w-96 shadow-xl" key={donationMoment._id}>
                <figure>
                  <img
                    src={donationMoment.image}
                    alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="text-base font-bold">নাম : {donationMoment.name}</h2>
                  <div>
                    <div className="badge text-xs badge-secondary badge-outline">রক্তের গ্রুপ : {donationMoment.bloodGroup}</div>
                    <div className="badge text-xs badge-accent badge-outline">{donationMoment.bloodCount} তম রক্তদান</div>
                    <div className="badge text-xs badge-outline">FCI ব্যাচ : {donationMoment.batchNo}</div>
                  </div>
                  <div className="card-actions justify-end">
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
};

export default DonationMoments;