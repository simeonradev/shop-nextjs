import { useQueryClient, useMutation } from "@tanstack/react-query";
import { shoppingCartKeys } from "../shoppingCartKeys";

export const useAddNewToShoppingCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props) =>
      shoppingCartKeys.addNewToShoppingCart(props).queryFn(undefined),
    retry: 3,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shoppingCartKeys._def });
    },
  });
};
