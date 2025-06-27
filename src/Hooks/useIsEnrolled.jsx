import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useIsEnrolled = (email, enabled = true) => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["isEnrolled", email],
    enabled: !!email && enabled,
    queryFn: async () => {
      const res = await axiosPublic.get(`/enrollments/check?email=${email}`);
      return res.data.enrolled;
    },
  });

  return { isEnrolled: data, isLoading, isError };
};

export default useIsEnrolled;
