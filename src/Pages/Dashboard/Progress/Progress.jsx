import { useLoaderData } from "react-router-dom";

const Progress = () => {
  const loadedWorksheet = useLoaderData();
  return (
    <div>
        <h1 className="text-center text-3xl font-bold mb-10">Progress</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Employee Name</th>
              <th>Hours Work</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loadedWorksheet.map((workSheet, index) => <tr key={workSheet._id}>
              <th>{index+1}</th>
              <td>{workSheet.task}</td>
              <td>{workSheet?.employee_name}</td>
              <td>{workSheet.hours_worked}</td>
              <td>{workSheet.date}</td>
            </tr>)}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Progress;
