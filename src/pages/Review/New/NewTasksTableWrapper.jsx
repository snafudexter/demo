import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom';
import NewTasksToolbar from './NewTasksToolbar';
import ExportButton from '../../../helpers/ExportButton'
import TasksTable from '../../../components/Tables/TasksTable';
import TaskStatusFormatter from '../../../components/Tables/TaskStatusFormatter';

class NewTasksTableWrapper extends Component {
  state = {
    selectedTasks: [],
    columns : [
      {
				key: 'action',
				name: 'Action',
        resizable: true,
        width: 115
      },{
        key: "campaign",
        name: "Campaign",
        filterable: true,
        width: 115
      },
			{
				key: 'city',
				name: 'City',
				filterable: true,
				resizable: true,
			},
      {
				key: 'dealerCode',
				name: 'Dealer Code',
				filterable: true,
				resizable: true,
      },
      {
				key: 'name',
				name: 'Dealer Name',
				filterable: true,
				resizable: true,
      },
      
      {
        key: 'status',
        name: 'Status',
        filterable: true,
        resizable: true,
        formatter: TaskStatusFormatter,
      },{
				key: 'address',
				name: 'Dealer Address',
				resizable: true,
				filterable: true,
				sortable: true,
			},{
				key: 'state',
				name: 'State',
				filterable: true,
      },
      
      {
				key: 'cluster',
				name: 'Cluster',
				resizable: true,
				filterable: true,
				sortable: true,
			},
      {
				key: 'type',
				name: 'Type',
				resizable: true,
				filterable: true,
				sortable: true,
      },{
				key: 'zone',
				name: 'Zone',
				resizable: true,
				filterable: true,
				sortable: true,
      },
      {
				key: 'category',
				name: 'Category',
				resizable: true,
				filterable: true,
				sortable: true,
			},
      {
        key: 'recceUser',
        name: 'Recce User',
        filterable: true,
        resizable: true,
      },
      {
				key: 'startDate',
				name: 'Receive Date',
				filterable: true,
        resizable: true,
        width: 100
      },
      {
				key: 'recceOnDate',
				name: 'Recce On Date',
				filterable: true,
        resizable: true,
        width: 100
			},
      {
				key: 'recceDoneDate',
				name: 'Recce Done Date',
				filterable: true,
        resizable: true,
        width: 100
      },
      {
				key: 'approvalSentDate',
				name: 'Approval Date',
				filterable: true,
        resizable: true,
        width: 100
			},
      {
				key: 'bajajReviewDate',
				name: 'Review Date',
				filterable: true,
        resizable: true,
        width: 100
			},
      {
				key: 'designOnDate',
				name: 'Designing On Date',
				filterable: true,
        resizable: true,
        width: 100
      },
      {
				key: 'designDoneDate',
				name: 'Designing Done Date',
				filterable: true,
        resizable: true,
        width: 100
			},
      {
				key: 'printOnDate',
				name: 'Print On Date',
				filterable: true,
        resizable: true,
        width: 100
			},
			{
				key: 'installedDate',
				name: 'Installation Date',
				filterable: true,
        resizable: true,
        width: 100
			}
		]
  };
  setSelectedRecceUser = val => {
    this.setState({user: val});
  }
  setSelectedTasks = tasks => {
    this.setState({selectedTasks: tasks});
  };
  renderTasksTable = () => {
    if (this.props.loading) {
      return (
        <div className="loader">
          <div></div>
        </div>
      );
    }
    return (
      <div className="animated fadeIn">
      <div className="block-options" style={{marginTop: 20, marginBottom: 20}}>
          {this.state.selectedTasks.length != 0 ? (
            <ExportButton
              showAlert={this.props.showAlert}
              tasks={this.state.selectedTasks}
              storeRefetch={this.props.storeRefetch}
              allTask={this.props.allTasks}
            />
          ) : (
            <button
                type="button"
                className="btn btn-secodary float-left"
                >
                  Download Report
              </button>
          )}
        </div>
        <TasksTable columns={this.state.columns} setSelectedTasks={this.setSelectedTasks} tasks={this.props.tasks}/>
      </div>
    )
  }
  render() {
    return (
      <div>
        <h2 className="content-heading">
          New <small>List of all New Tasks</small>
          <NewTasksToolbar
            user={this.state.user}
            setSelectedRecceUser={this.setSelectedRecceUser}
            tasksRefetch={this.props.tasksRefetch}
            selectedTasks={this.state.selectedTasks}/>
        </h2>
        {this.renderTasksTable()}
      </div>
    );
  }
}

const ALL_NEW_TASKS = gql `
  query($statusArr: [String]) {
    allTasks(statusArr: $statusArr) {
      id
      status
      startDate
      recceOnDate
      recceDoneDate
      approvalSentDate
      designOnDate
      designDoneDate
      printOnDate
      bajajReviewDate
      installedDate
      recceUser
      {
        name
      }
      campaign
      {
        name
      }
      store {
        dealerCode
        dealerName
        dealerAddress
        category {
          name
          type {
            name
          }
        }
        city {
          name
          cluster {
            name
          }
          state {
            name
            zone {
              name
            }
          }
        }
      }
    }
  }
`;

export default compose(graphql(ALL_NEW_TASKS, {
  props: ({data}) => {
    if (!data.allTasks) 
      return {loading: data.loading};
    
    return {loading: data.loading, tasks: data.allTasks, tasksRefetch: data.refetch};
  },
  options: {
    variables: {
      statusArr: ['NEW']
    },
    fetchPolicy: 'cache-and-network'
  }
}),)(NewTasksTableWrapper);

NewTasksTableWrapper.propTypes = {};