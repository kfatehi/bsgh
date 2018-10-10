import React, { Component } from 'react';
import PieChart from './PieChart';

export default class RepoIssues extends Component {
  render() {
    const { issues, total, closed, onClickFilter } = this.props;
    const open = total - closed;
    if (issues) {
      return <div>
        <PieChart data={[
          {
            label: "Open",
            value: open,
            color: 'red',
          },
          { 
            label: "Closed",
            value: closed,
            color: 'green',
          }
        ]} />
        <button onClick={()=>onClickFilter('')}>All</button>
        <button onClick={()=>onClickFilter('open')}>Open</button>
        <button onClick={()=>onClickFilter('closed')}>Closed</button>
        <ul>
          { issues.map((i)=><li key={i.id}>
            <a target="blank" href={i.html_url}>{i.title}</a>
          </li>) }
        </ul>
      </div>
    } else {
      return null
    }
  }
}

