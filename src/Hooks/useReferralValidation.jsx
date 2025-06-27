import { useState, useEffect } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useReferralValidation = (referralCode) => {
  const axiosPublic = useAxiosPublic();

  const [referralStatus, setReferralStatus] = useState(null);
  const [referralInfo, setReferralInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const validateCode = async () => {
      if (referralCode.length !== 8) {
        setReferralStatus(null);
        setReferralInfo(null);
        return;
      }

      try {
        setLoading(true);
        const res = await axiosPublic.get(`/verifyReferral/${referralCode}`);

        if (res.data.success) {
          setReferralInfo(res.data.referral);
          setReferralStatus("valid");
        }
      } catch (err) {
        if (err.response?.status === 403) {
          setReferralStatus("inactive");
        } else {
          setReferralStatus("invalid");
        }
        setReferralInfo(null);
      } finally {
        setLoading(false);
      }
    };

    validateCode();
  }, [referralCode, axiosPublic]);

  return { referralStatus, referralInfo, loading };
};

export default useReferralValidation;
