import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface value {
  name: string;
  price: number;
  image: string;
}
export interface defaultvalue {
  name: string;
  quantity: number;
  price: number;
  image: string;
}
export interface CounterState {
  card: defaultvalue[];
}
const LoadCardFromStorage = ():defaultvalue[]=>{
  if(typeof window !== "undefined"){
    const savedCart = localStorage.getItem('Local_marketplace_cart');
    return savedCart ? JSON.parse(savedCart) : []
  }
  return [];
}
const initialState: CounterState = {
  card: LoadCardFromStorage(),
};



export const shoppingcard = createSlice({
  name: "savedcarts",
  initialState,
  reducers: {
    addtocard: (state, action: PayloadAction<value>) => {
      const item = state.card.find(
        (item) => item?.name === action.payload.name,
      );
      if (item) {
        item.quantity += 1;
      } else {
        state.card.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("Local_marketplace_cart", JSON.stringify(state.card))
    },

    removefromcard: (state, action: PayloadAction<defaultvalue>) => {
      const index = state.card.findIndex(
        (item) => item.name === action.payload.name,
      );
      if (index !== -1) {
        state.card.splice(index, 1);
      }
      localStorage.setItem("Local_marketplace_cart", JSON.stringify(state.card))
    },
    addone: (state, action: PayloadAction<value>) => {
      const { name } = action.payload;
      const index = state.card.findIndex((item) => item.name === name);
      const item = state.card[index];
      item.quantity += 1;
      localStorage.setItem("Local_marketplace_cart", JSON.stringify(state.card))
    },
    removeone: (state, action: PayloadAction<value>) => {
      const { name } = action.payload;
      const item = state.card.find((item) => item.name === name);
      if (item) {
        if (item.quantity === 1) {
          state.card = state.card.filter((item) => !(item.name === name));
        } else item.quantity -= 1;
      }
      localStorage.setItem("Local_marketplace_cart", JSON.stringify(state.card))
    },
    clearcard:(state)=>{
      state.card = [];
      localStorage.removeItem('Local_marketplace_cart')
    }
  },
});

export const { removefromcard, addtocard, addone, removeone,clearcard } =
  shoppingcard.actions;
