const initialState = {
  currentPage: 'Home',
  loggedIn: false,
  auth: null,
  accounts: null,
  selectedAccount: null,
  hashtagSets: [],
  selectedSet: null,
  templates: [],
  selectedTemplate: null
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
    case 'UPDATE_AUTH_TOKEN': {
      return {
        ...state,
        auth: action.authToken
      }
    }
    case 'SET_ACCOUNTS': {
      return {
        ...state,
        accounts: action.accounts,
        selectedAccount: action.accounts[0]
      }
    }
    case 'UPDATE_SETS': {
      return {
        ...state,
        hashtagSets: action.sets,
      }
    }
    case 'SELECT_SET': {
      return {
        ...state,
        selectedSet: action.set,
      }
    }
    case 'ADD_SET': {
      return{
        ...state,
        sets: state.hashtagSets.concat( action.set )
      }
    }
    case 'UPDATE_SELECTED_SET_TITLE': {
      return{
        ...state,
        selectedSet: {...state.selectedSet, title: action.title}
      }
    }
    case 'UPDATE_TAGS': {
      return {
        ...state,
        selectedSet: {...state.selectedSet, hashtags: action.tags}
      };
    }
    case 'UPDATE_TEMPLATES': {
      return {
        ...state,
        templates: action.templates,
      }
    }
    case 'SELECT_TEMPLATE': {
      return {
        ...state,
        selectedTemplate: action.template,
      }
    }
    case 'ADD_TEMPLATE': {
      return{
        ...state,
        templates: state.templates.concat( action.template)
      }
    }
    case 'UPDATE_SELECTED_TEMPLATE_TITLE': {
      return{
        ...state,
        selectedTemplate: {...state.selectedTemplate, title: action.title}
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;