const initialState = {
  currentPage: 'Home'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE': {
      return {
        ...state,
        currentPage: action.page
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;