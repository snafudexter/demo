import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';
import Alert from 'react-s-alert';

class ApprovalSentTasksToolbar extends Component {
  handlebajajReview = status => {
    if (this.props.selectedTasks.length === 0) {
      Alert.error('No Tasks Selected!', {
        position: 'top-right',
        effect: 'slide'
      });
      return;
    }

    let tasksArr = [];
    this
      .props
      .selectedTasks
      .map(task => {
        tasksArr.push(task.id);
      })
    this
      .props
      .bajajReview({
        variables: {
          status,
          tasksArr
        }
      })
      .then(response => {
        Alert.success(`${response.data.bajajReview.count} tasks ${status}.`, {
          position: 'top-right',
          effect: 'slide'
        });
        this
          .props
          .tasksRefetch();
      })
      .catch(error => {
        debugger;
        Alert.error('An error occured please try again later!', {
          position: 'top-right',
          effect: 'slide'
        });
      })
  };
  render() {
    if (this.props.loading) {
      return (
        <span className="float-right">Loading...</span>
      );
    }
    return (
      <div className="float-right">
        <button
          type="button"
          className="btn btn-sm btn-rounded btn-info ml-3 float-right"
          onClick={this.props.tasksRefetch}>
          <i className="fa fa-refresh mr-1"/>
          Refresh
        </button>
        <button
          type="button"
          className="btn btn-sm btn-rounded ml-3 btn-danger float-right"
          onClick={() => {this.handlebajajReview("REJECTED")}}>
          <i className="fa fa-close mr-1"/>
          Reject
        </button>
        <button
          type="button"
          className="btn btn-sm btn-rounded btn-success float-right"
          onClick={() => {this.handlebajajReview("APPROVED")}}>
          <i className="fa fa-check mr-1"/>
          Approve
        </button>

      </div>
    );
  }
}

const BAJAJ_REVIEW = gql `
  mutation bajajReview($tasksArr:[ID!]!,$status: String!) {
    bajajReview(tasksArr:$tasksArr,status:$status) {
      count
    }
  }
`;
export default compose(graphql(BAJAJ_REVIEW, {name: 'bajajReview'}) )(ApprovalSentTasksToolbar);

ApprovalSentTasksToolbar.propTypes = {};