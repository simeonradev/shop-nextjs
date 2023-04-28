import { useQueryClient, useMutation } from "@tanstack/react-query";
import { recentlyViewedKeys } from "../recentlyViewedKeys";

export const useDeleteRecentlyViewedProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props) =>
      recentlyViewedKeys.deleteRecentlyViewedProducts(props).queryFn(undefined),
    retry: 3,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recentlyViewedKeys._def });
    },
  });
};
