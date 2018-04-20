import React, {Component} from 'react';
import {BarChart, Bar, CartesianGrid, ResponsiveContainer, XAxis, Tooltip} from 'recharts';
import {subMonths, format} from 'date-fns';

/* Custom tooltip if we need it */

const CustomTooltip = ({active, payload}) => {
  const background = {
    margin: 0,
    padding: 10,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    whiteSpace: 'nowrap',
  };
  const listStyle = {
    padding: 0,
    margin: 0
  }

  const itemStyle = {
    display: 'block',
    paddingTop: 4,
    paddingBottom: 4,
    color: '#8884d8',
  };

  if (active) {
    const {value, payload: {formattedDate}} = payload[0];
    return (
      <div className="custom-tooltip" style={background} >
        <ul className="custom-tooltip-item-list" style={listStyle}>
          <li className="custom-tooltip-item" style={itemStyle}>
            <span>{formattedDate}</span>
            <span>: </span>
            <span>{value} edits</span>
          </li>
        </ul>
      </div>
    );
  }
  return null;
}

export default class ReportsEditsChart extends Component {
  render() {
    const {timeBins} = this.props;

    // Get only the bins in the past 24 months
    const today = new Date();
    let data = {};
    for (let i = 0; i < 24; i++) {
      const date = subMonths(today, i);
      const key = format(date, 'YYYYMM');
      const dateReadable = format(date, 'MMM. YYYY');
      if (timeBins[key]) {
        data[key] = {'edits': timeBins[key], 'formattedDate': dateReadable};
      } else {
        data[key] = {'edits': 0, 'formattedDate': dateReadable};
      }
    }

    // Format for the bar chart
    data = Object.keys(data).map(key => {
      return { 'date': key, ...data[key]};
    });
    console.log(data);

    return (
      <BarChart height={300} width={600} data={data}>
        <Tooltip isAnimationActive={false} content={<CustomTooltip/>}/>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <Bar dataKey="edits" fill="#8884d8" fillOpacity={0.5} />
      </BarChart>
    )
  }
}