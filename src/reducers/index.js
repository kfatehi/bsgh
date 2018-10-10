import {REPO_SEARCH, LOADING, READY, ERROR} from '../constants';

const initialState = {
  query: '',
  mode: REPO_SEARCH,
  repos: [],
  repo: null,
  repoPath: '',
  loadState: READY,
  errorDetail: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUERY':
      return {
        ...state,
        query: action.query
      }

    case 'SET_LOAD_START': 
      return {
        ...state,
        loadState: LOADING,
        errorDetail: null,
      }

    case 'SET_LOAD_READY': 
      return {
        ...state,
        loadState: READY
      }

    case 'SET_LOAD_ERROR': 
      return {
        ...state,
        loadState: ERROR,
        errorDetail: action.msg
      }

    case 'REPO_SEARCH_MODE': 
      return {
        ...state,
        mode: REPO_SEARCH,
        repos: [],
        repo: null
      }

    case 'SET_REPO_LIST':
      return {
        ...state,
        repos: action.repos
      }
    default:
      return state
  }
}

export default reducer;
