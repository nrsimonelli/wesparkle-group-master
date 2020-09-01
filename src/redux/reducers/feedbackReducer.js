const feedbackReducer = (state = {}, action) => {

  console.log( 'in reducer! ')

    switch (action.type) {
      case 'SET_FEEDBACK':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default feedbackReducer;
  