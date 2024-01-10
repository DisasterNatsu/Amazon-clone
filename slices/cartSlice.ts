import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Products {
  id: number;
  title: string;
  price: number;
  description: string;
  category?: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  hasPrime?: boolean;
}

interface ProdArray {
  items: Products[];
}

const initialState: ProdArray = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Products>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      let newCart = [...state.items];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as its not in cart`
        );
      }

      state.items = newCart;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

// Selectors- this is how we pull information form the global store

export const selectItems = (state: any) => state.cart.items;
export const selectTotal = (state: any) =>
  state.cart.items.reduce(
    (total: number, item: Products) => total + item.price,
    0
  );

export default cartSlice.reducer;
