const cartReducer = (state = [], action)  => {
    switch(action.type) {
        case 'SET_CART_REDUCER':
            console.log('do we ever reach the cart reducer?')
            return action.payload;
        default:
            return state;
    }
}

export default cartReducer