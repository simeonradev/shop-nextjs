import { createQueryKeys } from "@lukemorales/query-key-factory";

export const recentlyViewedKeys = createQueryKeys("recentlyViewedProducts", {
  getRecentlyViewedProducts: ({ userId }) => {
    return {
      queryKey: [userId],
      queryFn: async () => {
        const data = await fetch(
          "/api/recentlyViewedProducts?" + new URLSearchParams({ userId })
        );
        const { recentlyViewedProducts } = await data.json();
        return recentlyViewedProducts;
      },
    };
  },

  updateRecentlyViewedProducts: (payload) => {
    return {
      queryKey: [null],
      queryFn: async () => {
        const data = await fetch("/api/recentlyViewedProducts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const jsonData = await data.json();
        return jsonData;
      },
    };
  },

  deleteRecentlyViewedProducts: (payload) => {
    return {
      queryKey: [null],
      queryFn: async () => {
        const data = await fetch("/api/recentlyViewedProducts", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const jsonData = await data.json();
        return jsonData;
      },
    };
  },
});
