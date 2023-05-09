import { useQuery } from "@tanstack/react-query";
import { shoppingCartKeys } from "../shoppingCartKeys";

export const useGetShoppingCart = (props) => {
  const queryResult = useQuery(shoppingCartKeys.getShoppingCart(props));
  return { ...queryResult, data: queryResult.data ?? [] };
};
