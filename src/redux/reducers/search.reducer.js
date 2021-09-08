const searchReducer = (state = [], action) => {
    switch (action.type) {
        // if we get a request from a saga to set the search list which we'll
        // use to display with the search component.
      case 'SET_SEARCH_REDUCER':
        return action.payload;
      default:
        return state;
    }
  };
  

  export default searchReducer;
  