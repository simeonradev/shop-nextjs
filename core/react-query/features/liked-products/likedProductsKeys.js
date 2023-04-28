import { createQueryKeys } from "@lukemorales/query-key-factory";

export const likedProductsKeys = createQueryKeys("likedProducts", {
  getLikedProducts: ({ userId }) => {
    return {
      queryKey: [userId],
      queryFn: async () => {
        const data = await fetch(
          "/api/likedProducts?" + new URLSearchParams({ userId })
        );
        const { likedProductsIds } = await data.json();
        return likedProductsIds;
      },
    };
  },

  updateLikedProduct: (payload) => {
    return {
      queryKey: [null],
      queryFn: async () => {
        const data = await fetch("/api/likedProducts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const jsonData = await data.json();
        return jsonData;
      },
    };
  },

  deleteLikedProduct: (payload) => {
    return {
      queryKey: [null],
      queryFn: async () => {
        const data = await fetch("/api/likedProducts", {
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
