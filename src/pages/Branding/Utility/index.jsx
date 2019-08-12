import React, {Component} from 'react';
import CityList from './CityList';
import ClusterList from './ClusterList';
import StateList from './StateList';
import ZoneList from './ZoneList';
import TypeList from './TypeList';
import CategoryList from './CategoryList';
import StoreSearch from './StoreSearch';
import RemarkList from './RemarkList';

class Utility extends Component {
  render() {
    return (
      <div className="row">
        <StoreSearch />
        <RemarkList />
        <CityList />
        <StateList />
        <ClusterList />
        <ZoneList />
        <TypeList />
        <CategoryList />
      </div>
    )
  }
}

export default Utility;
