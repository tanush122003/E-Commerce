export const cartReducer = (state, action) => 
{
    switch (action.type) 
    {
        case "POPULATE_PRODUCTS":
            return { ...state, products: action.payload }
        case "ADD_TO_CART":
            localStorage.setItem('cartItems', JSON.stringify([...state.cart, { ...action.payload.product, qty: 1,addedBy:action.payload.addedBy,totalledBy:action.payload.totalledBy }]))
            return { ...state, 
                cart: [...state.cart,
                    { ...action.payload.product, qty: 1,addedBy:action.payload.addedBy,totalledBy:action.payload.totalledBy }],
                    total: state.cart.reduce((acc, curr) => acc + Number(curr.price) * (curr.qty), 0),
                    totalledBy : action.payload.totalledBy,
                    addedBy:action.payload.addedBy
                }
        case "REMOVE_FROM_CART":
            localStorage.setItem('cartItems', JSON.stringify(state.cart.filter(c => c._id !== action.payload.product._id)))
            return {
                ...state,
                cart: state.cart.filter(c => c._id !== action.payload.product._id),
                total: state.cart.filter(c => c._id !== action.payload.product._id).reduce((acc, curr) => acc + Number(curr.price) * (curr.qty), 0),
                totalledBy : action.payload.totalledBy 
            }
        case "INCREMENT_QUANTITY":
            localStorage.setItem('cartItems', JSON.stringify(state.cart.filter(c => c._id === action.payload.id ? c.qty = action.payload.qty + 1 : c.qty)))
            return {
                ...state,
                cart: state.cart.filter(c => c._id === action.payload.id ? c.qty = action.payload.qty + 1 : c.qty),
                total: state.cart.reduce((acc, curr) => acc + Number(curr.price) * (curr.qty), 0),
                totalledBy : action.payload.addedBy 
            }
        case "DECREMENT_QUANTITY":
            localStorage.setItem('cartItems', JSON.stringify(state.cart.filter(c => c._id === action.payload.id ? c.qty = action.payload.qty - 1 : c.qty)))
            return {
                ...state,
                cart: state.cart.filter(c => c._id === action.payload.id ? c.qty = action.payload.qty - 1 : c.qty),
                total: state.cart.reduce((acc, curr) => acc + Number(curr.price) * (curr.qty), 0),
                totalledBy : action.payload.addedBy 

            }
        case "LOAD_CART_ITEMS_FROM_LOCALSTORAGE":
            return {
                ...state,
                cart: action.payload.products,
                total: action.payload.products.reduce((acc, curr) => acc + Number(curr.price) * (curr.qty), 0),
                totalledBy:action.payload.totalledBy 
            }
        case "REMOVE_ALL_CART_ITEMS":
            localStorage.setItem('cartItems',JSON.stringify(action.payload))
        return {
            ...state,
            cart : [],
         
        }
        default:

            return state
    }


}