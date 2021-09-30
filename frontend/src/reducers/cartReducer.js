import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actionTypes/cartActions";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existsItem = state.cartItems.find((i) => i.product === item.product);
            if (existsItem) {
                return { ...state, cartItems: state.cartItems.map((x) => x.product === existsItem.product ? { ...item, qty: item.qty } : x) };
            } else {
                return { ...state, cartItems: [...state.cartItems, item] }
            }
        case CART_REMOVE_ITEM:
            return { ...state, cartItems: [...state.cartItems.filter((x) => x.product !== action.payload)] };
        default:
            return state
    }
}