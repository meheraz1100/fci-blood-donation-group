import { useLoaderData } from "react-router-dom";

const Messages = () => {
  const messages = useLoaderData()

  return (
    <div>
      <h1 className="text-5xl text-center">Messages</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => (<tr key={message._id}>
              <th>{index + 1}</th>
              <td>{message.name}</td>
              <td>{message.email}</td>
              <td>{message.message}</td>
            </tr>))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;
