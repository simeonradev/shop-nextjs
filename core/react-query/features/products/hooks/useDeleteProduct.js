import { useQueryClient, useMutation } from "@tanstack/react-query";
import { productsKeys } from "../productsKeys";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props) => productsKeys.deleteProduct(props).queryFn(undefined),
    retry: 3,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsKeys._def });
    },
  });
};
