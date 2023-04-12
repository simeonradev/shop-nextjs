import { useQuery } from "@tanstack/react-query";
import { productsKeys } from "../productsKeys";

export const useGetProducts = (userId) => {
  return useQuery(productsKeys.getProducts(userId));
};
