import { createQueryKeys } from "@lukemorales/query-key-factory";

export const shoppingCartKeys = createQueryKeys("shoppingCart", {
  getShoppingCart: ({ userId }) => {
    return {
      queryKey: [userId],
      queryFn: async () => {
        const data = await fetch(
          "/api/shoppingCart?" + new URLSearchParams({ userId })
        );
        const { shoppingCart } = await data.json();
        return shoppingCart;
      },
    };
  },

  updateShoppingCart: (payload) => {
    return {
      queryKey: [null],
      queryFn: async () => {
        const data = await fetch("/api/shoppingCart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const jsonData = await data.json();
        return jsonData;
      },
    };
  },

  deleteShoppingCart: (payload) => {
    return {
      queryKey: [null],
      queryFn: async () => {
        const data = await fetch("/api/shoppingCart", {
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
