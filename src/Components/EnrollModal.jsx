import { useContext, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "../AuthContext";

const EnrollModal = () => {
  const { isEnrollModalOpen, setIsEnrollModalOpen, user } =
    useContext(AuthContext);

  const [selectedMethod, setSelectedMethod] = useState("");
  const [showTransactionFields, setShowTransactionFields] = useState(false);

  const handlePaymentChange = (e) => {
    const method = e.target.value;
    setSelectedMethod(method);
    setShowTransactionFields(!!paymentDetailsMap[method]);
  };

  const paymentDetailsMap = {
    islami: {
      info: "Send 5000 BDT to Islami Bank A/C: 1234567890123",
    },
    dutchbangla: {
      info: "Send 5000 BDT to Dutch Bangla Bank A/C: 10123456789",
    },
    bkash: {
      info: "Send 5000 BDT to bKash: 017XXXXXXXX",
    },
    rocket: {
      info: "Send 5000 BDT to Rocket: 018XXXXXXXX",
    },
    nogod: {
      info: "Send 5000 BDT to Nagad: 019XXXXXXXX",
    },
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Enrollment Successful!",
            text: "We have received your information. We’ll contact you soon!",
          });
          form.reset();
          closeModal();
        } else {
          throw new Error("Submission failed");
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again.",
        });
      });
  };

  const closeModal = () => {
    setIsEnrollModalOpen(false);
  };

  return (
    <>
      {isEnrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/25 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-xl bg-gray-900 p-0 text-white shadow-xl">
            <form
              id="enrollForm"
              action="https://formspree.io/f/myzjwvka"
              method="POST"
              className="space-y-4 p-6"
              onSubmit={handleFormSubmit}
            >
              <div className="flex items-center justify-between border-b border-gray-700 pb-2">
                <h3 className="text-2xl font-bold text-cyan-400">
                  Enroll in MERN Stack Course
                </h3>
                <button
                  type="button"
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
                  defaultValue={user?.displayName}
                  readOnly
                  required
                  className="w-full rounded-lg bg-gray-800 p-3 text-white"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  defaultValue={user?.email}
                  readOnly
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
                    name="paymentMethod"
                    defaultValue=""
                    onChange={handlePaymentChange}
                    className="w-full rounded-lg bg-gray-800 p-3 text-white"
                    required
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option value="islami">Islami Bank</option>
                    <option value="dutchbangla">Dutch Bangla Bank</option>
                    <option value="bkash">bKash</option>
                    <option value="rocket">Rocket</option>
                    <option value="nogod">Nagad</option>
                  </select>
                  {selectedMethod && (
                    <div className="mt-4 rounded-lg bg-gray-800 p-3 text-sm text-cyan-300">
                      {paymentDetailsMap[selectedMethod].info}
                    </div>
                  )}
                  {showTransactionFields && (
                    <div className="mt-4 space-y-4">
                      <input
                        type="text"
                        name="transactionId"
                        placeholder="Transaction ID"
                        required
                        className="w-full rounded-lg bg-gray-800 p-3 text-white"
                      />
                      <input
                        type="text"
                        name="senderAccountNumber"
                        placeholder="Sender Account Number"
                        required
                        className="w-full rounded-lg bg-gray-800 p-3 text-white"
                      />
                      <input
                        type="text"
                        name="paymentRef"
                        placeholder="Referral Code"
                        className="w-full rounded-lg bg-gray-800 p-3 text-white"
                      />
                    </div>
                  )}
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
          </div>
        </div>
      )}
    </>
  );
};

export default EnrollModal;
