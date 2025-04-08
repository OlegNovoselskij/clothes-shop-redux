import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    id: string,
    title: string,
    price: number,
    quentity: number
}

type CartState = {
    items: CartItem[]
}

const initialState: CartState = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart(
            state, 
            action: PayloadAction<{ id:string, title: string, price: number }>
        ) {
            const itemIndex = state.items.findIndex((item) => item.id === action.payload.id)

            if(itemIndex >= 0) {
                state.items[itemIndex].quentity++;
            }else {
                state.items.push({ ...action.payload, quentity: 1 })
            }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            const itemIndex = state.items.findIndex((item) => item.id === action.payload)

            if(state.items[itemIndex].quentity === 1) {
                state.items.splice(itemIndex, 1);
            }else {
                state.items[itemIndex].quentity--;
            }
        }
    }
})

export const {addToCart, removeFromCart} = cartSlice.actions