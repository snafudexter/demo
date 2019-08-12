import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';

const mapPropsToOptions = ({statusArr}) => {
  const variables = {
    statusArr
  };
  return {variables, fetchPolicy: 'cache-and-network'};
};

class TaskStatusCountWidget extends Component {
  render() {
    if (this.props.loading) {
      return (
        <div className="loader"><div></div></div>
      );
    }
    return (
      <div>
        <div className={`font-size-h3 font-w600 text-${this.props.labelClass}`}>{this.props.taskCount}  <span style={{"fontSize":15}}> / {Math.round(this.props.squareFeetCount * 100) / 100} Sq.Ft</span></div>
        <div className="font-size-sm font-w600 text-uppercase text-muted">{this.props.label}</div>
      </div>
    )
  }
}

const TASK_COUNT = gql `
  query($statusArr: [String]) {
    getTaskCount(statusArr:$statusArr) {
      count
    }
  }
`;

const SHOW_SQUARE_FEET= gql `
 query($statusArr: [String]){
  getTaskTotalAdSpotArea(statusArr:$statusArr) {
    sqrFt
  }
}

`;

export default compose(graphql(TASK_COUNT, {
  props: ({data}) => {
    if (!data.getTaskCount) {
      return {loading: data.loading};
    }

    return {loading: data.loading, taskCount: data.getTaskCount.count};
  },
  options: mapPropsToOptions
}),
(graphql(SHOW_SQUARE_FEET, {
  props: ({data}) => {
    if (!data.getTaskTotalAdSpotArea) {
      return {loading: data.loading};
    }

    return {loading: data.loading, squareFeetCount:data.getTaskTotalAdSpotArea.sqrFt};
  },
  options: mapPropsToOptions
})
))(TaskStatusCountWidget);

TaskStatusCountWidget.propTypes = {};
