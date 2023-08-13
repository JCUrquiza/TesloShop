import { FC, PropsWithChildren, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '../../interfaces';

export interface CartState {
    cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
    cart: []
}

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE );

    const addProductToCart = (product: ICartProduct) => {

    }

    return (
        <CartContext.Provider value={{
            ...state,
            // Methods
            addProductToCart
        }}>
            { children }
        </CartContext.Provider>
    )
}


