import React from "react";
import Swal from "sweetalert2";

const Form = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mwpbozlo", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thanks for contacting us. We’ll get back to you shortly.",
          confirmButtonColor: "#06b6d4",
        });
        form.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Please try again or contact us through WhatsApp.",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (error) {
      console.log("error", error);
      Swal.fire({
        icon: "error",
        title: "Network Error!",
        text: "Check your internet connection and try again.",
        confirmButtonColor: "#ef4444",
      });
    }
  };
  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-6 py-20 text-white"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <h2 className="mb-6 bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 bg-clip-text text-5xl font-extrabold text-transparent">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-400">
            Have questions or need help enrolling? We’re just a message away.
            Send us a quick message and our team will reach out to you!
          </p>
        </div>

        <form
          id="contactForm"
          onSubmit={handleSubmit}
          className="w-full space-y-6 rounded-2xl bg-gray-800 p-8 shadow-2xl"
        >
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-300">
              WhatsApp Number (Optional)
            </label>
            <input
              type="text"
              name="whatsapp"
              className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white"
              placeholder="e.g. +8801XXXXXXXXX"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-300">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              required
              className="w-full resize-none rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="w-full transform rounded-xl bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 px-6 py-3 font-bold text-white transition-transform hover:scale-105 hover:from-teal-500 hover:to-blue-600"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
