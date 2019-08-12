import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';
import Alert from 'react-s-alert';

class DesignOnToolbar extends Component {
  handleAssignDesigner = status => {
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
      .designingDone({
        variables: {
          tasksArr
        }
      })
      .then(response => {
        Alert.success('Success!', {
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
          Mark as Done
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
const DESIGNING_DONE = gql `
  mutation designingDone($tasksArr:[ID!]!) {
    designingDone(tasksArr:$tasksArr) {
      count
    }
  }
`;
export default compose(graphql(DESIGNING_DONE, {name: 'designingDone'}), graphql(USER_LIST, {
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
}),)(DesignOnToolbar);

DesignOnToolbar.propTypes = {};