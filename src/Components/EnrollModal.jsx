import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "../AuthContext";
import usePaymentNumbers from "../Hooks/usePaymentInfo";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { FaRegCopy } from "react-icons/fa";
import useIsEnrolled from "../Hooks/useIsEnrolled";

const EnrollModal = () => {
  const { isEnrollModalOpen, setIsEnrollModalOpen, user } =
    useContext(AuthContext);

  const { isEnrolled } = useIsEnrolled(user?.email, isEnrollModalOpen);

  const [shouldFetch, setShouldFetch] = useState(false);

  // Trigger fetch only once when modal is opened
  useEffect(() => {
    if (isEnrollModalOpen) {
      setShouldFetch(true);
    }
  }, [isEnrollModalOpen]);

  const { paymentNumbers } = usePaymentNumbers(shouldFetch);
  const [selectedMethod, setSelectedMethod] = useState("");
  const axiosPublic = useAxiosPublic();

  const [showTransactionFields, setShowTransactionFields] = useState(false);

  const handlePaymentChange = (e) => {
    const method = e.target.value;
    setSelectedMethod(method);
    setShowTransactionFields(true);
  };

  const selectedPaymentInfo = paymentNumbers.find(
    (item) => item.method?.toLowerCase() === selectedMethod.toLowerCase(),
  );

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Copied to clipboard!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Failed to copy!",
          text: "Please try manually.",
        });
      });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const formData = {
      fullname: form.fullname.value,
      email: form.email.value,
      whatsapp: form.whatsapp.value,
      location: form.location.value,
      occupation: form.occupation.value,
      paymentMethod: form.paymentMethod.value,
      transactionId: form.transactionId?.value,
      senderAccountName: form.senderAccountName?.value,
      senderAccountNumber: form.senderAccountNumber?.value,
      paymentRef: form.paymentRef?.value,
      status: false,
      role: "student",
    };

    try {
      const res = await axiosPublic.post("/enrollments", formData);
      console.log("response", res);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Enrollment Successful!",
          text: "We have received your information. We’ll contact you soon!",
        });
        form.reset();
        closeModal();
      } else {
        throw new Error("Insertion failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
      });
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsEnrollModalOpen(false);
  };

  return (
    <>
      {isEnrollModalOpen &&
        (!isEnrolled ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/25 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-xl bg-gray-900 p-0 text-white shadow-xl">
              <div className="flex items-center justify-between border-b border-gray-700 p-6">
                <h3 className="text-2xl font-bold text-cyan-400">
                  You are already enrolled!
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-xl text-gray-400 hover:text-white"
                >
                  &times;
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/25 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-xl bg-gray-900 p-0 text-white shadow-xl">
              <form
                id="enrollForm"
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
                    placeholder="WhatsApp Number (Easy Communication)"
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
                      <option value="Bkash">bKash</option>
                      <option value="Nagad">Nagad</option>
                      <option value="Rocket">Rocket</option>
                      <option value="Dutch Bangla Bank">
                        Dutch Bangla Bank
                      </option>
                    </select>

                    {selectedPaymentInfo && (
                      <div className="mt-4 rounded-lg bg-gray-800 p-3 text-sm text-cyan-300">
                        {selectedPaymentInfo.method && (
                          <>
                            Send money 5000 BDT to {selectedPaymentInfo.method}:{" "}
                            <span className="rounded-lg border border-gray-300 bg-gray-600 px-2 py-1">
                              <span className="font-semibold">
                                {selectedPaymentInfo.number}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopy(selectedPaymentInfo.number)
                                }
                                className="rounded pl-2"
                              >
                                <FaRegCopy />
                              </button>
                            </span>
                            {selectedPaymentInfo?.AccountHolderName && (
                              <>
                                <br />
                                A/C Holder:{" "}
                                {selectedPaymentInfo.AccountHolderName}
                                <br />
                                Branch: {selectedPaymentInfo.branchName}
                                <br />
                                Routing No: {selectedPaymentInfo.RoutingNo}
                                <br />
                                SWIFT code: {selectedPaymentInfo.SWIFTcode}
                              </>
                            )}
                          </>
                        )}
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
                        {selectedPaymentInfo?.AccountHolderName ? (
                          <input
                            type="text"
                            name="senderAccountName"
                            placeholder="Sender Account Name"
                            required
                            className="w-full rounded-lg bg-gray-800 p-3 text-white"
                          />
                        ) : (
                          <input
                            type="text"
                            name="senderAccountNumber"
                            placeholder="Sender Account Number"
                            required
                            className="w-full rounded-lg bg-gray-800 p-3 text-white"
                          />
                        )}

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
        ))}
    </>
  );
};

export default EnrollModal;
