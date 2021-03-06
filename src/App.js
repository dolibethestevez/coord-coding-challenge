import React, { Component } from 'react';
import axios from 'axios';
import Countdown from 'react-countdown-now';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      averageCommitTime: 0,
      lastCommit: 0,
      commitsLeft: 0,
      endTime: 0
    };
  }
  async componentDidMount() {
    const res = await axios.get(
      `https://api.staging.coord.co/codechallenge/commits`
    );
    const timestamps = res.data;
    // current time passed from the first commit to the last
    let secondsPassed = timestamps[0] - timestamps[timestamps.length - 1];
    // average time per commit
    let averageCommitTime = Math.floor(secondsPassed / timestamps.length);
    // how many commits are left
    let commitsLeft = 2000 - timestamps.length;
    // end time according to average commit time and commits left
    let endTime = timestamps[0] + averageCommitTime * commitsLeft;
    this.setState({
      commitsLeft,
      averageCommitTime,
      lastCommit: timestamps[0],
      endTime
    });
  }

  formatNumberLength(num, length) {
    let r = '' + num;
    while (r.length < length) {
      r += '0';
    }
    return Number(r);
  }

  render() {
    return (
      <div className="App">
        <h3>Hello!</h3>
        <Countdown date={this.formatNumberLength(this.state.endTime, 13)} />
      </div>
    );
  }
}

export default App;
