import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getCartItems, postChangeCart} from "../api/cartApi";
import {ICartItem} from "../interfaces/cartInterface";

export const getCartItemsAsync = createAsyncThunk('getCartItemAsync', () => {
    return getCartItems();
});

export const postChangeCartAsync = createAsyncThunk('postChangeCartAsync', (param: ICartItem) => {
    return postChangeCart(param);
});

export interface ICartItemList {
    cino: number;
    imageFile: string;
    pname: string;
    price: number;
    qty: number;
    pno: number;
}

const initialState: ICartItemList[] = [];

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCartItemsAsync.fulfilled, (state, action) => {
                console.log("getCartItemsAsync.fulfilled::: ", action.payload);
                return action.payload;
            })
            .addCase(postChangeCartAsync.fulfilled, (state, action) => {
                console.log("postChangeCartAsync.fulfilled::: ", action.payload);
                return action.payload;
            })
    }
});

export default cartSlice.reducer;
