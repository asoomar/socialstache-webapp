const initialState = {
  currentPage: 'Home',
  loggedIn: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE': {
      return {
        ...state,
        currentPage: action.page
      }
    }
    case 'UPDATE_LOGIN_STATUS': {
      return {
        ...state,
        loggedIn: action.loggedIn
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;