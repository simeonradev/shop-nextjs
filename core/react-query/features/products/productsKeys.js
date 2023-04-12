import { createQueryKeys } from "@lukemorales/query-key-factory";

export const productsKeys = createQueryKeys("allProducts", {
  getProducts: (userId) => {
    // console.log(userId);

    return {
      queryKey: [null],
      queryFn: async () => {
        const data = await fetch("/api/allProducts?");
        const jsonData = await data.json();
        return jsonData.products.products;
      },
    };
  },

  updateProduct: (payload) => {
    return {
      queryKey: [null],
      queryFn: async () => {
        const data = await fetch("/api/allProducts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const jsonData = await data.json();
        return jsonData;
      },
    };
  },

  deleteProduct: (payload) => {
    return {
      queryKey: [null],
      queryFn: async () => {
        const data = await fetch("/api/allProducts", {
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
