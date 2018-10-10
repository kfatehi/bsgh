import React from 'react'
import { connect } from 'react-redux';
import {LOADING, ERROR, READY, REPO_SEARCH, REPO_DETAIL, REPO_ISSUES} from '../constants';
import RepoListItem from '../components/RepoListItem';
import RepoDetail from '../components/RepoDetail';
import RepoIssues from '../components/RepoIssues';
import * as actions from '../actions';

const Results = ({
  loadState,
  errorDetail,
  mode,
  repos,
  repo,
  issues,
  totalIssues,
  closedIssues,
  selectRepo,
  repoIssues,
  filterIssues
}) => {
  switch (loadState) {
    case LOADING:
      return <p>Loading...</p>
    case ERROR:
      return <pre>{errorDetail}</pre>
    case READY:
      switch (mode) {
        case REPO_SEARCH:
          return <ul>
            { repos.map((r)=><RepoListItem {...r} key={r.id} onClick={()=>selectRepo(r)}/>) }
          </ul>
        case REPO_DETAIL: 
          return <RepoDetail {...repo} onClickIssues={()=>repoIssues()} />
        case REPO_ISSUES: 
          return <RepoIssues issues={issues} total={totalIssues} closed={closedIssues} onClickFilter={(a)=>filterIssues(a)}/>
        default:
          return null
      }
    default:
      return null
  }
}

// This may seem a bit redundant, compared to something like {...state}
// but I think the improved verboseness improves traceability
const mapStateToProps = (state, ownProps) => ({
  loadState: state.loadState,
  errorDetail: state.errorDetail,
  mode: state.mode,
  repos: state.repos,
  repo: state.repo,
  issues: state.issues,
  totalIssues: state.totalIssues,
  closedIssues: state.closedIssues
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  selectRepo: (r)=>dispatch(actions.selectRepo(r)),
  repoIssues: ()=>dispatch(actions.repoIssues()),
  filterIssues: (a)=>dispatch(actions.filterIssues(a)),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Results)
