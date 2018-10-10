import {REPO_SEARCH, REPO_DETAIL, REPO_ISSUES, LOADING, READY, ERROR} from '../constants';

const initialState = {
  loadState: READY,
  errorDetail: null,
  mode: REPO_SEARCH,
  query: '',
  repos: [],
  repo: null,
  repoPath: '',
  issues: [],
  totalIssues: null,
  closedIssues: null
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

    case 'SET_REPO': {
      let repoPath = `${action.repo.owner.login}/${action.repo.name}`;
      return {
        ...state,
        repoPath,
        mode: REPO_DETAIL,
        query: repoPath,
        repo: action.repo
      }
    }

    case 'SET_ISSUE_LIST': {
      return {
        ...state,
        mode: REPO_ISSUES,
        issues: action.issues.items,
        totalIssues: action.issues.total_count,
        closedIssues: action.issues.total_count - state.repo.open_issues_count
      }
    }
    default:
      return state
  }
}

export default reducer;
