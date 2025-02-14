import { useLoaderData } from "react-router-dom";

const Feedback = () => {

    const feedbacks = useLoaderData()

    return (
        <div className="gap-2 m-2">
            <h1 className="text-center font-bold text-4xl">Feedbacks</h1>
            {feedbacks.map((feedback) => (
                <div className="card bg-base-100 lg:w-96 shadow-xl" key={feedback._id}>
                <div className="card-body">
                  <h2 className="card-title">{feedback.name}</h2>
                  <p>{feedback.message}</p>
                  <div className="card-actions justify-end">
                  </div>
                </div>
              </div>
            ))}
        </div>
    );
};

export default Feedback;