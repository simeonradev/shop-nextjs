import { useQuery } from "@tanstack/react-query";
import { productsKeys } from "../productsKeys";

export const useGetProducts = (userId) => {
  const queryResult = useQuery(productsKeys.getProducts(userId));

  return { ...queryResult, data: queryResult.data ?? [] };
};
