import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';
import Alert from 'react-s-alert';

class InstallationToolbar extends Component {
  handleAssignDesigner = status => {
    if (this.props.selectedTasks.length === 0) {
      Alert.error('No Tasks Selected!', {
        position: 'top-right',
        effect: 'slide'
      });
      return;
    }
    if (!this.props.user) {
      Alert.error('No Design User Selected!', {
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
      .assignDesigner({
        variables: {
          designUserId: this.props.user.value,
          tasksArr
        }
      })
      .then(response => {
        Alert.success(`${response.data.assignDesigner.count} tasks ${status}.`, {
          position: 'top-right',
          effect: 'slide'
        });
        this
          .props
          .tasksRefetch();
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
        <div
          style={{
          'width': 150,
          'marginRight': '20px',
          'display': 'inline-block',
          'fontSize': 'initial',
          'position': 'relative',
          'top': -4
        }}>
          <Select
            name="name"
            placeholder="Designers"
            value={this.props.user}
            options={this.props.users}
            onChange={val => {
            this
              .props
              .setSelectedDesignUser(val);
          }}/>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-rounded btn-info ml-3 float-right"
          onClick={this.props.tasksRefetch}>
          <i className="fa fa-refresh mr-1"/>
          Refresh
        </button>
        <button
          type="button"
          className="btn btn-sm btn-rounded btn-success float-right"
          onClick={() => {
          this.handleAssignDesigner()
        }}>
          <i className="fa fa-check mr-1"/>
          Assign Designer
        </button>

      </div>
    );
  }
}
const USER_LIST = gql `
  query($role: String) {
    getUserList(role:$role) {
      id
      name
    }
  }
`;
const ASSIGN_DESIGNER = gql `
  mutation assignDesigner($designUserId:ID!,$tasksArr:[ID!]!) {
    assignDesigner(tasksArr:$tasksArr,designUserId:$designUserId) {
      count
    }
  }
`;
export default compose(graphql(ASSIGN_DESIGNER, {name: 'assignDesigner'}), graphql(USER_LIST, {
  props: ({data}) => {
    if (!data.getUserList) {
      return {loading: data.loading};
    }

    const users = data
      .getUserList
      .map(({id, name}) => ({value: id, label: name}));

    return {loading: data.loading, users};
  },
  options: {
    variables: {
      role: 'DESIGNER'
    },
    fetchPolicy: 'cache-and-network'
  }
}),)(InstallationToolbar);

InstallationToolbar.propTypes = {};