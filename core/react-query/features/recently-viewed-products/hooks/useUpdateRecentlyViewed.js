import { useQueryClient, useMutation } from "@tanstack/react-query";
import { recentlyViewedKeys } from "../recentlyViewedKeys";

export const useUpdateRecentlyViewed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (props) =>
      recentlyViewedKeys.updateRecentlyViewedProducts(props).queryFn(undefined),
    retry: 3,
    onMutate: (props) => {
      queryClient.setQueryData(
        [...recentlyViewedKeys.getRecentlyViewedProducts._def, props.userId],
        (old) => (old.includes(props.id) ? old : [...old, props.id])
      );
    },
  });
};
