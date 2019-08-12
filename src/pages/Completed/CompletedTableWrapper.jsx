import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom';
import CompletedToolbar from './CompletedToolbar';
import ExportButton from '../../helpers/ExportButton'
import TasksTable from '../../components/Tables/TasksTable';
import TaskStatusFormatter from '../../components/Tables/TaskStatusFormatter';

class CompletedTableWrapper extends Component {
  state = {
    selectedTasks: [],
    columns : [
			{
				key: 'action',
				name: 'Action',
        resizable: true,
        width: 115
      },
      {
				key: 'campaign',
				name: 'Campaign',
				filterable: true,
				resizable: true,
      },
      {
				key: 'billed',
				name: 'Billed',
				filterable: true,
				resizable: true,
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
      },
      {
        key: 'installCertImage',
        name: 'Installation Certificate',
        filterable: true,
        resizable: true
      },
      {
				key: 'address',
				name: 'Dealer Address',
				resizable: true,
				filterable: true,
				sortable: true,
			},
			{
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
			},
			{
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
				name: 'Bajaj Review Date',
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
  setSelectedDesignUser = val => {
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

  componentWillReceiveProps(nexProps)
  {
    if(nexProps.user)
    if (nexProps.user.role=='ADMIN') {
      let found = false;
      let columns = this.state.columns;
      for (let col of columns) {
        if (col.name === "Printer User") {
          found = true;
        }
      }
      if(!found)
      {
        columns.splice(2, 0, {
          key: "printerUser",
          name: "Printer User",
          resizable: true,
          filterable: true,
          width: 100
        });
        this.setState({columns})
      }
      
    }
  }

  render() {
    return (
      <div>
        <h2 className="content-heading">
          Completed Section <small>List of all Completed Tasks</small>
          
        </h2>
        {this.renderTasksTable()}
      </div>
    );
  }
}

const ALL_COMPLETED = gql `
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
      installCertImage{
        id
        name
      }
      bill{
        id  
      }
      campaign {
        id
        name
      }
      printerUser {
        id
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

const USER_QUERY = gql`
      query userQuery {
        me {
          id
          username
          name
          role
          type {
            id
            name
          }
          cluster {
            id
            name
          }
        }
      }
    `;

export default compose(
  graphql(USER_QUERY,{
    props: ({ data }) => {
      if (!data.me) return { loading: data.loading };

      return {
        user: data.me,
        loading: data.loading
      };
    },
    options: {
      fetchPolicy: "cache-and-network"
    }
  }),
  graphql(ALL_COMPLETED, {
  props: ({data}) => {
    if (!data.allTasks) 
      return {loading: data.loading};
    
    return {loading: data.loading, tasks: data.allTasks, tasksRefetch: data.refetch};
  },
  options: {
    variables: {
      statusArr: ['COMPLETED']
    },
    fetchPolicy: 'cache-and-network'
  }
}),)(CompletedTableWrapper);

CompletedTableWrapper.propTypes = {};