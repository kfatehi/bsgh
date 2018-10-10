import React, { Component } from 'react';
import * as Chart from "chart.js";

export default class PieChart extends Component {
  render() {
    return <div><canvas ref={(canvas)=>{
      if (canvas) {
        new Chart(canvas.getContext('2d')).Pie(this.props.data)
      }
    }}/></div>
  }
}
