import { debounce } from 'debounce';
import {LOADING, REPO_SEARCH, READY, ERROR} from '../constants';

const setLoadStart = () => ({ type: "SET_LOAD_START" })
const setLoadReady = () => ({ type: "SET_LOAD_READY" })
const setLoadError = (msg) => ({ type: "SET_LOAD_ERROR", msg })
const repoSearchMode = () => ({ type: "REPO_SEARCH_MODE" })
const setRepoList = (repos) => ({ type: "SET_REPO_LIST", repos })


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
