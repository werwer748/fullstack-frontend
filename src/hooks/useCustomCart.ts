import {useAppDispatch, useAppSelector} from "../store";
import {getCartItemsAsync, postChangeCartAsync} from "../slices/cartSlice";
import {ICartItem} from "../interfaces/cartInterface";
import {useCallback} from "react";

const useCustomCart = () => {
    const cartItems = useAppSelector(state => state.cartSlice);

    const dispatch = useAppDispatch();

    //! useCallback 빼니까 바로 무한 렌더링 ㅋㅋ
    const refreshCart = useCallback(() => {
        dispatch(getCartItemsAsync());
    }, [dispatch]);

    const changeCart = useCallback((param: ICartItem) => {
        dispatch(postChangeCartAsync(param));
    }, [dispatch]);

    return {cartItems, refreshCart, changeCart}
};

export default useCustomCart;