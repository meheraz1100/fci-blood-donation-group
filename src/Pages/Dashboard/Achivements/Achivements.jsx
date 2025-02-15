import { useLoaderData } from "react-router-dom";

const Achivements = () => {

    const achivements = useLoaderData()
    console.log(achivements)

    return (
        <div className="m-4 grid gap-4">
            <h1 className="text-center text-4xl font-bold">Our Achivements</h1>
            {achivements.map((achivement) => (
                <div className="card bg-base-100 lg:w-96 shadow-xl" key={achivement._id}>
                <figure>
                  <img
                    src={achivement.image}
                    alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className=" font-bold">প্রদানকারী সংস্থা : {achivement.name}</h2>
                  <p>প্রদানের উপলক্ষ : {achivement.description}</p>
                  <div className="card-actions justify-start">
                    <button className="">পুরষ্কার প্রদানের তারিখ : {achivement.date}</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
    );
};

export default Achivements;