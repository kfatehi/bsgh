import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
  }
  queryChanged(e) {
    let query = e.target.value;
    this.setState({ query });
  }
  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.query} onChange={(e)=>this.queryChanged(e)} />
      </div>
    );
  }
}

export default App;
