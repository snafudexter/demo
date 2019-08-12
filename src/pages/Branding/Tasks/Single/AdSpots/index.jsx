import React, {Component} from 'react';
import AddAdSpot from './AddAdSpot';
import AdSpotsList from './AdSpotsList';
import OldAdspot from './OldAdspot';
import NewAdspot from './NewAdspot';
import CompeteAdspot from './CompeteAdspot';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';

class AdSpots extends Component {
  render() {
    if (this.props.loading) {
      return (
        <div className="loader">
          <div></div>
        </div>
      );
    }
    return (
      <div className="animated fadeIn">
        <h2 className="content-heading">
          <AddAdSpot {...this.props}/>
          Ad Spots - Recce
        </h2>
        <AdSpotsList {...this.props}/>
        <h2 className="content-heading">
          Old Ad Spots
          <OldAdspot {...this.props}/>
        </h2>
        <h2 className="content-heading">
          Competition Ad Spots
          <CompeteAdspot {...this.props}/>
        </h2>
      </div>
    )
  }
}

export default AdSpots;
