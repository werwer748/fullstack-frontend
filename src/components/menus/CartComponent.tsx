import React, {useEffect} from 'react';
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/CartItemComponent";

function CartComponent() {
    const {isLogin, loginState} = useCustomLogin();
    const {refreshCart, cartItems, changeCart } = useCustomCart();
    useEffect(() => {
        console.log('CartComponent useEffect');
        if (isLogin) {
            console.log('CartComponent isLogin');
            refreshCart();
        }
    }, [isLogin, refreshCart]);

    return (
        <div className={"w-full"}>
            {isLogin &&
                <div className="flex flex-col">
                    <div className="w-full flex">
                        <div className={"font-extrabold text-2xl w-4/5"}>{loginState.nickname}'s cart</div>
                        <div className="bg-orange-600 w-9 text-center text-white font-bold rounded-full m-1">
                            {cartItems.length}
                        </div>
                    </div>
                    <div>
                        <ul>
                            {cartItems.map(item => (
                                <CartItemComponent
                                    {...item}
                                    changeCart={changeCart}
                                    email={loginState.email}
                                    key={item.cino}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            }

        </div>
    );
}

export default CartComponent;