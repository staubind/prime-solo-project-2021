const cartReducer = (state = [], action)  => {
    switch(action.type) {
        case 'SET_CART_REDUCER':
            return action.payload;
        default:
            return state;
    }
}

export default cartReducer