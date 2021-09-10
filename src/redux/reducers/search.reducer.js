const searchReducer = (state = [], action) => {
    switch (action.type) {
        // if we get a request from a saga to set the search list which we'll
        // use to display with the search component.
      case 'SET_SEARCH_REDUCER':
          console.log('what the client is getting back from the server after api call: ', action.payload.data.results);
          // we need to append to each result whether or not for the user doing the search the has it in their cart - user_recipes = true/false
          // can be done on the server side - run a check through the db for
          // any matching spoonacular ids for that user

        return action.payload.data.results;
      case 'CLEAR_SEARCH':
        return []
      default:
        return state;
    }
  };
  
  export default searchReducer;
  