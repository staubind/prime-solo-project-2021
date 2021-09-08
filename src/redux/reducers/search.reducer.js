const searchReducer = (state = [], action) => {
    switch (action.type) {
        // if we get a request from a saga to set the search list which we'll
        // use to display with the search component.
      case 'SET_SEARCH_REDUCER':
          console.log('what the client is getting back from the server after api call: ', action.payload.data.results);
        return action.payload.data.results;
      default:
        return state;
    }
  };
  

  export default searchReducer;
  