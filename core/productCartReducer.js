import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from "./actions";

const initialState = {
  productCartArray: [],
  hasFeatured: false,
  totalAdditions: 0,
  individualProductAdditionsArray: [],
};

export const productCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      const isItemInCart = state.productCartArray.find(
        (item) => item.id === action.data.id
      );

      let isDuplicated = 0;

      return {
        productCartArray: isItemInCart
          ? state.productCartArray.map((item) =>
              item.id === action.data.id
                ? { ...item, amount: item.amount + 1 }
                : item
            )
          : [...state.productCartArray, { ...action.data, amount: 1 }],

        hasFeatured:
          (state.productCartArray.find((item) => item.featured) === undefined
            ? false
            : true) || action.data.featured,

        totalAdditions: state.totalAdditions + 1,

        individualProductAdditionsArray: [
          ...state.individualProductAdditionsArray,
          {
            name: action.data.name,
            id: action.data.id,
            addToCartCounter: 1,
            removeFromCartCounter: 0,
          },
        ].reduce((previousValue, currentValue) => {
          if (
            isItemInCart &&
            currentValue.id === action.data.id &&
            (isDuplicated > 0 || currentValue.addToCartCounter > 1)
          ) {
            return [
              ...previousValue,
              {
                ...currentValue,
                addToCartCounter: currentValue.addToCartCounter + 1,
              },
            ];
          } else if (
            isItemInCart &&
            currentValue.id === action.data.id &&
            isDuplicated === 0
          ) {
            isDuplicated = isDuplicated + 1;

            return [...previousValue];
          } else {
            return [...previousValue, currentValue];
          }
        }, []),
      };

    case REMOVE_PRODUCT_FROM_CART:
      // Array that returns items in the shopping cart without the one that has been clicked
      // ( - ) last only if there were multiple of the same item
      //
      // const arrayWithoutRemovedItem = state.productCartArray.filter(
      //   (item) => item.id !== action.data || item.amount > 1
      // );

      return {
        ...state,
        productCartArray: state.productCartArray.reduce((acc, item) => {
          if (item.id === action.data) {
            if (item.amount === 1) return acc;
            return [...acc, { ...item, amount: item.amount - 1 }];
          } else {
            return [...acc, item];
          }
        }, []),

        hasFeatured:
          state.productCartArray.find(
            (item) =>
              item.featured && (item.id !== action.data || item.amount > 1)
          ) === undefined
            ? false
            : true,

        // individualProductAdditionsArray:
        //   state.individualProductAdditionsArray.reduce(
        //     (previousValue, currentValue) => {
        //       if (currentValue.id === action.data) {
        //         if (currentValue.addToCartCounter === 1) return previousValue;
        //         return [
        //           ...previousValue,
        //           {
        //             ...currentValue,
        //             addToCartCounter: currentValue.addToCartCounter - 1,
        //           },
        //         ];
        //       } else {
        //         return [...previousValue, currentValue];
        //       }
        //     },
        //     []
        //   ),

        individualProductAdditionsArray:
          state.individualProductAdditionsArray.reduce(
            (previousValue, currentValue) => {
              if (currentValue.id === action.data) {
                return [
                  ...previousValue,
                  {
                    ...currentValue,
                    removeFromCartCounter:
                      currentValue.removeFromCartCounter + 1,
                  },
                ];
              } else {
                return [...previousValue, currentValue];
              }
            },
            []
          ),
      };

    default:
      return state;
  }
};
