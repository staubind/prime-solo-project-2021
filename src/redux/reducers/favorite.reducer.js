const favoriteReducer = (state = [], action)  => {
    switch(action.type) {
        case 'SET_FAVORITE_REDUCER':
            console.log('just now the reducer is being updated.')
            return action.payload;
        default:
            return state;
    }
}

export default favoriteReducer