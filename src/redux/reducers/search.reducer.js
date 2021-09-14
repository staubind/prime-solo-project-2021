const searchReducer = (state = [], action) => {
    switch (action.type) {
        // if we get a request from a saga to set the search list which we'll
        // use to display with the search component.
      case 'SET_SEARCH_REDUCER':
          // console.log('what the client is getting back from the server after api call: ', action.payload.data.results);
          // we need to append to each result whether or not for the user doing the search the has it in their cart - user_recipes = true/false
          // can be done on the server side - run a check through the db for
          // any matching spoonacular ids for that user

        return action.payload.data;
      case 'UPDATE_SEARCH_REDUCER':
        // console.log('recipe id we are looking for is: ', action.payload.recipeId); // typeof reveals payload is string
        let newState = [...state]
        // find the index of the search item
        let index = newState.findIndex(recipe => recipe.id === Number(action.payload.recipeId))
        // update the isCurrent attribute
        // console.log('index is: ', index);
        // console.log(`starting isCurrent value is state[${index}].isCurrent: `, state[index].isCurrent);
        newState[index].isCurrent = action.payload.isCurrent
        // console.log(`ending newState[${index}].isCurrent value is: `, newState[index].isCurrent)

        // return the object
        return newState
      case 'UPDATE_FAVORITE':
        // console.log('recipe id we are looking for is: ', action.payload.recipeId); // typeof reveals payload is string
        newState = [...state]
        index = newState.findIndex(recipe => recipe.id === Number(action.payload.recipeId))
        // console.log('index is: ', index);
        // console.log(`starting isFavorite value is state[${index}].isFavorite: `, state[index].isFavorite);
        newState[index].isFavorite = action.payload.isFavorite
        // console.log(`ending newState[${index}].isFavorite value is: `, newState[index].isFavorite)
        return newState;
      case 'CLEAR_SEARCH':
        return []
      default:
        return state;
    }
  };
  
  export default searchReducer;
  