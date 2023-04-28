import { useQueryClient, useMutation } from "@tanstack/react-query";
import { shoppingCartKeys } from "../shoppingCartKeys";

export const useDeleteShoppingCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props) =>
      shoppingCartKeys.deleteShoppingCart(props).queryFn(undefined),
    retry: 3,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shoppingCartKeys._def });
    },
  });
};
