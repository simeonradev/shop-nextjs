import { useQueryClient, useMutation } from "@tanstack/react-query";
import { likedProductsKeys } from "../likedProductsKeys";

export const useUpdateLikedProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props) =>
      likedProductsKeys.updateLikedProduct(props).queryFn(undefined),
    retry: 3,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: likedProductsKeys._def });
    },
  });
};
