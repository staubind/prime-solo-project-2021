const detailReducer = (state = {}, action)  => {
    switch(action.type) {
        case 'SET_DETAIL_REDUCER':
            console.log('do we ever reach the detail reducer?')
            return action.payload;
        default:
            return state;
    }
}

export default detailReducer;