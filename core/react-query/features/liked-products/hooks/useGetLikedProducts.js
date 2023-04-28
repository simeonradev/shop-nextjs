import { useQuery } from "@tanstack/react-query";
import { likedProductsKeys } from "../likedProductsKeys";

export const useGetLikedProducts = (props) => {
  const queryResult = useQuery(likedProductsKeys.getLikedProducts(props));
  return { ...queryResult, data: queryResult.data ?? [] };
};
