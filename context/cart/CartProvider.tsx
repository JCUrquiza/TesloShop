import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
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

    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): []
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts })
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] })
        }
    }, [])
    
    // React recomienda que cada efecto haga sólo una tarea en espesífico:
    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart));
    }, [state.cart])

    useEffect(() => {

        // Por iteración se suman los elementos
        const numberOfItems = state.cart.reduce( (prev, current) => current.quantity + prev, 0 );
        const subTotal = state.cart.reduce( (prev, current) => (current.price * current.quantity) + prev, 0 );
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE) || 0;
        
        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1)
        }

    }, [state.cart])
    

    const addProductToCart = (product: ICartProduct) => {
        // Soluciones para agregar los productos al carrito de compras:
        //!Nivel 1
        // dispatch({ type: '[Cart] - Add Product', payload: product })

        //!Nivel 2
        // const productsInCart = state.cart.filter( p => p._id !== product._id && p.size !== product.size);
        // dispatch({ type: '[Cart] - Add Product', payload: [...productsInCart, product] })
        
        //!Nivel 3
        // Verificar si existe en el context producto con mismo id
        const productInCart = state.cart.some(p => p._id === product._id);
        if (!productInCart) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })
        
        const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size);
        if (!productInCartButDifferentSize) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

        // Acumular
        const updatedProducts = state.cart.map( p => {
            // Diferente producto, entonces pasa.
            if (p._id !== product._id) return p;
            // Diferente producto, entonces pasa.
            if (p.size !== product.size) return p;
            // Actualizando la cantidad:
            p.quantity += product.quantity;
            return p;
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts })
    }

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product })
    }

    const removeCartProduct = (product: ICartProduct) => {
        console.log(product);
        dispatch({ type: '[Cart] - Remove product in cart', payload: product })
        
    }

    return (
        <CartContext.Provider value={{
            ...state,
            // Methods
            addProductToCart,
            updateCartQuantity,
            removeCartProduct
        }}>
            { children }
        </CartContext.Provider>
    )
}


