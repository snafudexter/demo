import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';
import Alert from 'react-s-alert';
//import Button from 'react-bootstrap-button-loader';

class NewTasksToolbar extends Component {
  state={
    loading:false,
  }
  handleAssignRecce = () => {
    if (this.props.selectedTasks.length === 0) {
      Alert.error('No Tasks Selected!', {
        position: 'top-right',
        effect: 'slide'
      });
      return;
    }
    if (!this.props.user) {
      Alert.error('No Recce User Selected!', {
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
      .assignRecce({
        variables: {
          recceUserId: this.props.user.value,
          tasksArr
        }
      })
      .then(response => {
        Alert.success(`${response.data.assignRecce.count} tasks Assigned to user ${this.props.user.label}`, {
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
            placeholder="Recce Boys"
            value={this.props.user}
            options={this.props.users}
            onChange={val => {
            this
              .props
              .setSelectedRecceUser(val);
          }}/>
        </div>
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
          onClick={this.handleAssignRecce}>
          <i className="fa fa-check mr-1"/>
          {this.state.loading?"Loading..":"Start Recce"}
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
const ASSIGN_RECCE = gql `
  mutation assignRecce($recceUserId:ID!,$tasksArr:[ID!]!) {
    assignRecce(tasksArr:$tasksArr,recceUserId:$recceUserId) {
      count
    }
  }
`;
export default compose(graphql(ASSIGN_RECCE, {name: 'assignRecce'}), graphql(USER_LIST, {
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
      role: 'RECCE'
    },
    fetchPolicy: 'cache-and-network'
  }
}),)(NewTasksToolbar);

NewTasksToolbar.propTypes = {};