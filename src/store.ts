import {configureStore} from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
    reducer: {
        loginSlice,
        cartSlice
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;