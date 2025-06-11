import React, { forwardRef, useImperativeHandle } from "react";

const EnrollModal = forwardRef((props, ref) => {
  const modalRef = React.useRef(null);

  useImperativeHandle(ref, () => ({
    openModal: () => modalRef.current?.showModal(),
    closeModal: () => modalRef.current?.close(),
  }));

  const handleFormSubmit = () => {
    console.log("form submit hit");
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <dialog
      ref={modalRef}
      className="w-full max-w-xl rounded-xl bg-gray-900 p-0 text-white shadow-xl"
    >
      <form
        id="enrollForm"
        action="https://formspree.io/f/myzjwvka"
        method="POST"
        className="space-y-4 p-6"
        // onsubmit="return handleFormSubmit(event)"
        onSubmit={() => {
          handleFormSubmit();
        }}
      >
        <div className="flex items-center justify-between border-b border-gray-700 pb-2">
          <h3 className="text-2xl font-bold text-cyan-400">
            Enroll in MERN Stack Course
          </h3>
          <button
            type="button"
            // onclick={()=> closeModal()}
            onClick={closeModal}
            className="text-xl text-gray-400 hover:text-white"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            required
            className="w-full rounded-lg bg-gray-800 p-3 text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full rounded-lg bg-gray-800 p-3 text-white"
          />
          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp Number (Optional)"
            className="w-full rounded-lg bg-gray-800 p-3 text-white"
          />
          <input
            type="text"
            name="location"
            placeholder="Location (City, District)"
            className="w-full rounded-lg bg-gray-800 p-3 text-white"
          />
          <input
            type="text"
            name="occupation"
            placeholder="Occupation (Student, Job, Freelance...)"
            className="w-full rounded-lg bg-gray-800 p-3 text-white"
          />

          <div>
            <label className="mb-1 block font-semibold">
              Choose Payment Method:
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              onchange="showPaymentDetails()"
              className="w-full rounded-lg bg-gray-800 p-3 text-white"
              required
            >
              <option value="" disabled selected>
                Select one
              </option>
              <option value="islami">Islami Bank</option>
              <option value="dutchbangla">Dutch Bangla Bank</option>
              <option value="bkash">bKash</option>
              <option value="rocket">Rocket</option>
              <option value="nogod">Nagad</option>
            </select>
          </div>

          <div
            id="paymentInfo"
            className="hidden rounded-lg bg-gray-800 p-3 text-sm text-cyan-300"
          ></div>

          <div id="transactionDetails" className="hidden space-y-4">
            <input
              type="text"
              name="transactionId"
              placeholder="Transaction ID / Reference Number"
              required
              className="w-full rounded-lg bg-gray-800 p-3 text-white"
            />
            <input
              type="text"
              name="senderAccountName"
              placeholder="Your Account Name (Sender)"
              required
              className="w-full rounded-lg bg-gray-800 p-3 text-white"
            />
            <input
              type="text"
              name="senderAccountNumber"
              placeholder="Your Account Number (Sender)"
              required
              className="w-full rounded-lg bg-gray-800 p-3 text-white"
            />
            <input
              type="text"
              name="paymentRef"
              placeholder="Additional Reference (Optional)"
              className="w-full rounded-lg bg-gray-800 p-3 text-white"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-700 pt-4">
          <button
            type="submit"
            className="rounded bg-cyan-500 px-5 py-2 font-semibold hover:bg-cyan-600"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="rounded border border-gray-600 px-5 py-2 hover:border-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
});

export default EnrollModal;
