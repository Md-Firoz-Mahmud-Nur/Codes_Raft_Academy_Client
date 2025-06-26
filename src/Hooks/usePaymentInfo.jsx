import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePaymentNumbers = () => {
  const axiosPublic = useAxiosPublic();

  const { data: paymentNumbers = [], isLoading } = useQuery({
    queryKey: ["paymentNumbers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/paymentNumber");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
  return { paymentNumbers, isLoading };
};

export default usePaymentNumbers;
