import { ICartProduct } from '../../interfaces';
import { CartState, ShippingAddress } from './';
// import { CartState } from './';

type CartActionType = 
| { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] }
| { type: '[Cart] - Update products in cart', payload: ICartProduct[] }
| { type: '[Cart] - Change cart quantity', payload: ICartProduct }
| { type: '[Cart] - Remove product in cart', payload: ICartProduct }
| { type: '[Cart] - LoadAddress From Cookies', payload: ShippingAddress }
| { type: '[Cart] - Update Address', payload: ShippingAddress }
| { type: '[Cart] - Update order summary', 
    payload: {
        numberOfItems: number,
        subTotal: number,
        tax: number,
        total: number
    }
}

export const cartReducer = ( state: CartState, action: CartActionType ): CartState => {

    switch (action.type) {
        case '[Cart] - LoadCart from cookies | storage':
            return {
                ...state,
                isLoaded: true,
                cart: [...action.payload]
            }
        case '[Cart] - Update products in cart':
            return {
                ...state,
                // Agregar el product Cart:
                cart: [...action.payload]
            }
        case '[Cart] - Change cart quantity':
            return {
                ...state,
                cart: state.cart.map( product => {
                    if ( product._id !== action.payload._id ) return product;
                    if ( product.size !== action.payload.size ) return product;
                    return action.payload
                })
            }
        case '[Cart] - Remove product in cart':
            return {
                ...state,
                // cart: state.cart.filter (product => !(product._id === action.payload._id && product.size === action.payload.size))
                // Otra forma de hacerlo:
                cart: state.cart.filter( product => {
                    if (product._id === action.payload._id) {
                        if ( product.size === action.payload.size ) return false;
                    }
                    return true;
                })
            }
        case '[Cart] - Update order summary':
            return {
                ...state,
                ...action.payload
            }
        case '[Cart] - Update Address':
        case '[Cart] - LoadAddress From Cookies':
            return {
                ...state,
                shippingAddress: action.payload
            }
        default:
            return state;
    }

}
