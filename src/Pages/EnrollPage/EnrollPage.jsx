import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { FaRegCopy } from "react-icons/fa";
import AuthContext from "../../AuthContext";
import usePaymentNumbers from "../../Hooks/usePaymentInfo";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useIsEnrolled from "../../Hooks/useIsEnrolled";
import useReferralValidation from "../../Hooks/useReferralValidation";

const EnrollPage = () => {
  const { user } = useContext(AuthContext);
  const { isEnrolled } = useIsEnrolled(user?.email, true);
  const [referralCode, setReferralCode] = useState("");
  const { referralStatus, referralInfo, loading } =
    useReferralValidation(referralCode);
  const { paymentNumbers } = usePaymentNumbers(true);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [showTransactionFields, setShowTransactionFields] = useState(false);
  const axiosPublic = useAxiosPublic();

  const selectedPaymentInfo = paymentNumbers.find(
    (item) => item.method?.toLowerCase() === selectedMethod.toLowerCase(),
  );

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Copied to clipboard!",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  const handlePaymentChange = (e) => {
    setSelectedMethod(e.target.value);
    setShowTransactionFields(true);
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
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Enrollment Successful!",
          text: "We have received your information. We’ll contact you soon!",
        });
        form.reset();
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

  if (isEnrolled === "approved") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <h3 className="text-2xl font-bold text-cyan-400">
          You have already enrolled!
        </h3>
      </div>
    );
  }

  if (isEnrolled === "pending") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <h3 className="text-2xl font-bold text-yellow-400">
          Your request is pending admin approval!
        </h3>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 text-white md:p-10">
      <form
        className="mx-auto max-w-xl space-y-5 rounded-xl bg-gray-800 p-6 shadow-lg"
        onSubmit={handleFormSubmit}
      >
        <h2 className="mb-4 text-2xl font-bold text-cyan-400">
          Enroll in MERN Stack Course
        </h2>

        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          defaultValue={user?.displayName}
          readOnly
          required
          className="w-full rounded-lg bg-gray-700 p-3 text-white"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          defaultValue={user?.email}
          readOnly
          required
          className="w-full rounded-lg bg-gray-700 p-3 text-white"
        />
        <input
          type="text"
          name="whatsapp"
          placeholder="WhatsApp Number"
          className="w-full rounded-lg bg-gray-700 p-3 text-white"
        />
        <input
          type="text"
          name="location"
          placeholder="Location (City, District)"
          className="w-full rounded-lg bg-gray-700 p-3 text-white"
        />
        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          className="w-full rounded-lg bg-gray-700 p-3 text-white"
        />

        <select
          name="paymentMethod"
          defaultValue=""
          onChange={handlePaymentChange}
          className="w-full rounded-lg bg-gray-700 p-3 text-white"
          required
        >
          <option value="" disabled>
            Select Payment Method
          </option>
          <option value="Bkash">bKash</option>
          <option value="Nagad">Nagad</option>
          <option value="Rocket">Rocket</option>
          <option value="Dutch Bangla Bank">Dutch Bangla Bank</option>
        </select>

        {selectedPaymentInfo && (
          <div className="mt-2 rounded-lg bg-gray-700 p-3 text-sm text-cyan-300">
            Send {referralStatus === "valid" ? 5000 : 7500} BDT to{" "}
            {selectedPaymentInfo.method}:{" "}
            <span className="font-semibold">{selectedPaymentInfo.number}</span>{" "}
            <button
              type="button"
              onClick={() => handleCopy(selectedPaymentInfo.number)}
              className="ml-2 inline-block text-white"
            >
              <FaRegCopy />
            </button>
            {selectedPaymentInfo.AccountHolderName && (
              <>
                <br />
                A/C Holder: {selectedPaymentInfo.AccountHolderName}
                <br />
                Branch: {selectedPaymentInfo.branchName}
                <br />
                Routing No: {selectedPaymentInfo.RoutingNo}
                <br />
                SWIFT: {selectedPaymentInfo.SWIFTcode}
              </>
            )}
          </div>
        )}

        {showTransactionFields && (
          <>
            <input
              type="text"
              name="transactionId"
              placeholder="Transaction ID"
              required
              className="w-full rounded-lg bg-gray-700 p-3 text-white"
            />
            {selectedPaymentInfo?.AccountHolderName ? (
              <input
                type="text"
                name="senderAccountName"
                placeholder="Sender Account Name"
                required
                className="w-full rounded-lg bg-gray-700 p-3 text-white"
              />
            ) : (
              <input
                type="text"
                name="senderAccountNumber"
                placeholder="Sender Account Number"
                required
                className="w-full rounded-lg bg-gray-700 p-3 text-white"
              />
            )}

            <input
              type="text"
              name="paymentRef"
              placeholder="Referral Code (Optional)"
              className="w-full rounded-lg bg-gray-700 p-3 text-white"
              onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
            />
            {loading && (
              <p className="text-sm text-yellow-400">
                Checking referral code...
              </p>
            )}
            {referralStatus === "valid" && (
              <p className="text-sm text-green-400">
                Referral valid! {referralInfo?.name} referred you.
              </p>
            )}
            {referralStatus === "inactive" && (
              <p className="text-sm text-yellow-400">
                Referral code is not active.
              </p>
            )}
            {referralStatus === "invalid" && (
              <p className="text-sm text-red-400">Invalid referral code.</p>
            )}
          </>
        )}

        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-cyan-500 py-3 font-semibold text-white hover:bg-cyan-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EnrollPage;
