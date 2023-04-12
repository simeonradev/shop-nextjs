import { useQueryClient, useMutation } from "@tanstack/react-query";
import { productsKeys } from "../productsKeys";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props) => productsKeys.updateProduct(props).queryFn(undefined),
    retry: 3,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productsKeys._def });
    },
  });
};
