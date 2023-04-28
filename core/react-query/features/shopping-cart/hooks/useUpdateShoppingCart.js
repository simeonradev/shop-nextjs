import { useQueryClient, useMutation } from "@tanstack/react-query";
import { shoppingCartKeys } from "../shoppingCartKeys";

export const useUpdateShoppingCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props) =>
      shoppingCartKeys.updateShoppingCart(props).queryFn(undefined),
    retry: 3,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shoppingCartKeys._def });
    },
  });
};
