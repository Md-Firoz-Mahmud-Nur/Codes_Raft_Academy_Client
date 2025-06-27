import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePaymentNumbers = (enabled = true) => {
  const axiosPublic = useAxiosPublic();

  const { data: paymentNumbers = [], isLoading } = useQuery({
    queryKey: ["paymentNumbers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/paymentNumber");
      return res.data;
    },
    enabled,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return { paymentNumbers, isLoading };
};

export default usePaymentNumbers;
