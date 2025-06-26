import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useVideoLinks = () => {
  const axiosPublic = useAxiosPublic();

  const { data: videoLinks = [], isLoading } = useQuery({
    queryKey: ["videoLinks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/videoLinks");
      return res.data;
    },
  });
  return { videoLinks, isLoading };
};

export default useVideoLinks;
