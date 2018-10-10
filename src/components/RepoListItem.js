import React, { Component } from 'react';

export default class RepoListItem extends Component {
  render() {
    const { name, owner, description, onClick } = this.props;
    let repoPath = `${owner.login}/${name}`
    return <li title={description}>
      <a href={`#/${repoPath}`} onClick={onClick}>{repoPath}</a>
    </li>
  }
}
