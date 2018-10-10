import React, { Component } from 'react';

export default class RepoDetail extends Component {
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
