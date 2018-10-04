import React, { Component } from 'react';
import { debounce } from 'debounce';
import './App.css';

const READY = 0;
const LOADING = 1;
const ERROR = 1;

const REPO_SEARCH = 0;
const REPO_DETAIL = 1;
const REPO_ISSUES = 2;

class RepoListItem extends Component {
  render() {
    const { name, owner, description, onClick } = this.props;
    let repoPath = `${owner.login}/${name}`
    return <li title={description}>
      <a href={`#/${repoPath}`} onClick={onClick}>{repoPath}</a>
    </li>
  }
}

class RepoDetail extends Component {
  render() {
    const { name, html_url, owner, stargazers_count, watchers_count, forks_count, description, onClickIssues } = this.props;
    let repoPath = `${owner.login}/${name}`
    return <div>
      <a target="blank" href={html_url}>External Link</a>
      <h3>{owner.login}/{name}</h3>
      <p>{ description }</p>
      <p>Stars: { stargazers_count }</p>
      <p>Watchers: { watchers_count }</p>
      <p>Forks: { forks_count }</p>
      <a href={`#/${repoPath}/issues`} onClick={onClickIssues}>Issues</a>
    </div>
  }
}

class RepoIssues extends Component {
  render() {
    const { issues, total, closed, onClickFilter } = this.props;
    const open = total - closed;
    if (issues) {
      return <div>
        open: { open } closed: { closed } total: { total }
        <button onClick={()=>onClickFilter('')}>All</button>
        <button onClick={()=>onClickFilter('open')}>Open</button>
        <button onClick={()=>onClickFilter('closed')}>Closed</button>
        { issues.map((i)=><li key={i.id}>
          <a target="blank" href={i.html_url}>{i.title}</a>
        </li>) }
      </div>
    } else {
      return null
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      mode: REPO_SEARCH,
      repos: [],
      repo: null,
      repoPath: '',
      loadState: READY
    }
    this.executeQueryNow = ()=>{
      this.setState({ loadState: LOADING });
      let q = this.state.query.split(':')[0];
      this.setState({ mode: REPO_SEARCH, repos: [], repo: null });
      fetch(`https://api.github.com/search/repositories?q=${q}`)
        .then((resp) => resp.json())
        .then((data)=>{
          this.setState({ loadState: READY, repos: data.items });
        })
        .catch((err)=>{
          this.setState({ loadState: ERROR, errorDetail: err.stack });
        })
    }
    this.executeQuery = debounce(this.executeQueryNow, 500)
  }
  queryChanged(e) {
    let query = e.target.value;
    this.setState({ query });
    this.executeQuery();
  }
  selectRepo(repo) {
    let repoPath = `${repo.owner.login}/${repo.name}`
    this.setState({ mode: REPO_DETAIL, repoPath, query: repoPath, repo: repo })
  }
  repoIssues() {
    let repo = this.state.repo;
    let repoPath = this.state.repoPath;
    this.setState({ query: this.state.repoPath+':issues', loadState: LOADING })
    fetch(`https://api.github.com/search/issues?q=repo:${repoPath}+type:issue`)
      .then((resp) => resp.json())
      .then((data)=>{
        this.setState({ mode: REPO_ISSUES, loadState: READY,
          issues: data.items,
          totalIssues: data.total_count,
          closedIssues: data.total_count - repo.open_issues_count
        });
      })
      .catch((err)=>{
        this.setState({ loadState: ERROR, errorDetail: err.stack });
      })
  }
  filterIssues(state) {
    let split = this.state.query.split(':');
    if (split.length === 2 && state === '') return;
    else if (split.length > 2 && split[2] === state) return;
    let { repoPath } = this.state
    let suffix = '';
    let query = repoPath+':issues';
    if (state.length > 0) {
      suffix += '+state:'+state;
      query += ':'+state;
    }
    this.setState({ query, loadState: LOADING })
    fetch(`https://api.github.com/search/issues?q=repo:${repoPath}+type:issue${suffix}`)
      .then((resp) => resp.json())
      .then((data)=>{
        this.setState({ loadState: READY, issues: data.items });
      })
      .catch((err)=>{
        this.setState({ loadState: ERROR, errorDetail: err.stack });
      })
  }
  render() {
    return (
      <div className="App">
        <input type="text" style={{margin:'50px', width: '300px'}} placeholder="Search repositories..." value={this.state.query} onChange={(e)=>this.queryChanged(e)} />
        { this.renderBody() }
      </div>
    );
  }
  renderBody() {
    switch (this.state.loadState) {
      case LOADING:
        return <p>Loading...</p>
      case ERROR:
        return <pre>{this.state.errorDetail}</pre>
      case READY:
        return this.renderContent();
      default:
        return null
    }
  }
  renderContent() {
    switch (this.state.mode) {
      case REPO_SEARCH:
        return <ul>
          { this.state.repos.map((r)=><RepoListItem {...r} key={r.id} onClick={()=>this.selectRepo(r)}/>) }
        </ul>
      case REPO_DETAIL: 
        return <RepoDetail {...this.state.repo} onClickIssues={()=>this.repoIssues()} />
      case REPO_ISSUES: 
        return <RepoIssues issues={this.state.issues} total={this.state.totalIssues} closed={this.state.closedIssues} onClickFilter={(a)=>this.filterIssues(a)}/>
      default:
        return null
    }
  }
}

export default App;
