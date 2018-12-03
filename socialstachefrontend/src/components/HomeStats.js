import React, { Component } from 'react';

class HomeStats extends Component {
  render() {
    return (
      <div className={"statsContainer"}>
        <div className={"pageContainer"}>
          <div className={"statsTitle"}>A Look at the Statistics</div>
          <div className={"statRow"}>
            <div className={"statCell"}>
              <div className={"statValue"}>1B</div>
              <div className={"statName"}>active monthly Instagram users</div>
            </div>
            <div className={"statCell"}>
              <div className={"statValue"}>50B</div>
              <div className={"statName"}>photos shared daily</div>
            </div>
            <div className={"statCell"}>
              <div className={"statValue"}>4.2B</div>
              <div className={"statName"}>likes per day</div>
            </div>
          </div>

          <div className={"statRow"}>
            <div className={"statCell"}>
              <div className={"statValue"}>25M+</div>
              <div className={"statName"}>business profiles on Instagram</div>
            </div>
            <div className={"statCell"}>
              <div className={"statValue"}>78%</div>
              <div className={"statName"}>of influencers prefer Instagram for brand collabs</div>
            </div>
            <div className={"statCell"}>
              <div className={"statValue"}>80%</div>
              <div className={"statName"}>of Instagram users follow at least one business</div>
            </div>
          </div>

          <div className={"statRow"}>
            <div className={"statCell"}>
              <div className={"statValue"}>72%</div>
              <div className={"statName"}>of users have bought a product they saw on Instagram</div>
            </div>
            <div className={"statCell"}>
              <div className={"statValue"}>90%</div>
              <div className={"statName"}>of the top 100 brands are on Instagram</div>
            </div>
            <div className={"statCell"}>
              <div className={"statValue"}>12.4%</div>
              <div className={"statName"}>more engagement on posts with at least one hashtag</div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default HomeStats;
