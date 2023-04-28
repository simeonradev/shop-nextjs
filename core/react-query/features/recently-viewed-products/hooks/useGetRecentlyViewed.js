import { useQuery } from "@tanstack/react-query";
import { recentlyViewedKeys } from "../recentlyViewedKeys";

export const useGetRecentlyViewed = (props) => {
  const queryResult = useQuery(
    recentlyViewedKeys.getRecentlyViewedProducts(props)
  );
  return { ...queryResult, data: queryResult.data ?? [] };
};
