import { toast } from "react-toastify";

const ContactUs = () => {

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const newMessage = {name, email, message}

    console.log(newMessage)

    fetch('https://employ-ease2.vercel.app/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newMessage)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.insertedId){
        toast.success('Message Sent success')
      }
      form.reset();
    })
  }

  return (
    <div>
      <h1 className="text-center text-7xl font-bold text-white mb-3">Feedback Form</h1>
    <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-gray-800 dark:bg-gray-100 text-gray-100 dark:text-gray-800">
      <div className="flex flex-col justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
            Send Us Your Valuable Feedback
          </h2>
          <div className="text-gray-400 dark:text-gray-600">
             
          </div>
        </div>
        <img src="assets/svg/doodle.svg" alt="" className="p-6 h-52 md:h-64" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="text-sm">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder=""
            className="w-full p-3 rounded bg-gray-800 dark:bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full p-3 rounded bg-gray-800 dark:bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="message" className="text-sm">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="3"
            className="w-full p-3 rounded bg-gray-800 dark:bg-gray-100"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-teal-400 dark:bg-teal-600 text-gray-900 dark:text-gray-50"
        >
          Send Message
        </button>
      </form>
    </div>
    </div>
  );
};

export default ContactUs;
