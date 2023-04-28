import { useQueryClient, useMutation } from "@tanstack/react-query";
import { likedProductsKeys } from "../likedProductsKeys";

export const useDeleteLikedProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props) =>
      likedProductsKeys.deleteLikedProduct(props).queryFn(undefined),
    retry: 3,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: likedProductsKeys._def });
    },
  });
};
