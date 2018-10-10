import { debounce } from 'debounce';

const setLoadStart = () => ({ type: "SET_LOAD_START" })
const setLoadReady = () => ({ type: "SET_LOAD_READY" })
const setLoadError = (msg) => ({ type: "SET_LOAD_ERROR", msg })
const repoSearchMode = () => ({ type: "REPO_SEARCH_MODE" })
const setRepoList = (repos) => ({ type: "SET_REPO_LIST", repos })
const setIssueList = (issues) => ({ type: "SET_ISSUE_LIST", issues })


const executeQueryNow = (dispatch, { query })=>{
  dispatch(setLoadStart())
  let q = query.split(':')[0];
  dispatch(repoSearchMode())
  fetch(`https://api.github.com/search/repositories?q=${q}`)
    .then((resp) => resp.json())
    .then((data)=>{
      dispatch(setLoadReady())
      dispatch(setRepoList(data.items))
    })
    .catch((err)=>{
      dispatch(setLoadError(err.stack))
    })
}

const debouncedExecuteQuery = debounce(executeQueryNow, 500)

const setQuery = query => ({ type: 'SET_QUERY', query })

export const executeQuery = (query) => (dispatch, getState) => {
  dispatch(setQuery(query))
  debouncedExecuteQuery(dispatch, getState())
}

export const selectRepo = (repo) => ({ type: "SET_REPO", repo })

export const repoIssues = () => (dispatch, getState) => {
  const { repoPath } = getState();
  dispatch(setLoadStart())
  dispatch(setQuery(repoPath+':issues'))
  fetch(`https://api.github.com/search/issues?q=repo:${repoPath}+type:issue`)
    .then((resp) => resp.json())
    .then((data)=>{
      dispatch(setLoadReady())
      dispatch(setIssueList(data))
    })
    .catch((err)=>{
      dispatch(setLoadError(err.stack))
    })
}

export const filterIssues = (filterState) => (dispatch, getState) => {
  let { query, repoPath } = getState();
  let split = query.split(':');
  if (split.length === 2 && filterState === '') return;
  else if (split.length > 2 && split[2] === filterState) return;
  let suffix = '';
  query = repoPath+':issues';
  if (filterState.length > 0) {
    suffix += '+state:'+filterState;
    query += ':'+filterState;
  }
  dispatch(setLoadStart())
  dispatch(setQuery(query))
  fetch(`https://api.github.com/search/issues?q=repo:${repoPath}+type:issue${suffix}`)
    .then((resp) => resp.json())
    .then((data)=>{
      dispatch(setLoadReady())
      dispatch(setIssueList(data))
    })
    .catch((err)=>{
      dispatch(setLoadError(err.stack))
    })
}
