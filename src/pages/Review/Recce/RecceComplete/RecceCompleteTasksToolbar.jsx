import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import Alert from 'react-s-alert';

class RecceCompleteTasksToolbar extends Component {
  state={
    loading:false,
  }
  handleSendForApproval = () => {
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
      this.setState({loading:true})
    this
      .props
      .sendForApproval({
        variables: {
          tasksArr
        }
      })
      .then(response => {
        Alert.success(`${response.data.sendForApproval.count} tasks sent for approval`, {
          position: 'top-right',
          effect: 'slide'
        });
        this
          .props
          .tasksRefetch();
          this.setState({loading:false})
      })
      .catch(error => {
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
          className="btn btn-sm btn-rounded btn-primary ml-3 float-right"
          onClick={this.props.tasksRefetch}>
          <i className="fa fa-refresh mr-1"/>
          Refresh
        </button>
        <button
          type="button"
          disabled={this.state.loading}
          className="btn btn-sm btn-rounded btn-success float-right"
          onClick={this.handleSendForApproval}>
          <i className="fa fa-check mr-1"/>
          
          {this.state.loading?"Loading...":"Send for Approval"}
        </button>

      </div>
    );
  }
}
const SEND_FOR_APPROVAL = gql `
  mutation sendForApproval($tasksArr:[ID!]!) {
    sendForApproval(tasksArr:$tasksArr) {
      count
    }
  }
`;
export default compose(graphql(SEND_FOR_APPROVAL, {name: 'sendForApproval'}))(RecceCompleteTasksToolbar);

RecceCompleteTasksToolbar.propTypes = {};
