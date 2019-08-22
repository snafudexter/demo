import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import PrintingReassignToolbar from "./PrintingReassignToolBar";
import ExportButton from "../../helpers/ExportButton";
import TasksTable from "../../components/Tables/TasksTable";
import TaskStatusFormatter from "../../components/Tables/TaskStatusFormatter";

class PrintingReassignTableWrapper extends Component {
  state = {
    selectedTasks: [],
    columns: [
      {
        key: "action",
        name: "Action",
        resizable: true,
        width: 115
      },
      {
        key: "campaign",
        name: "Campaign",
        filterable: true,
        resizable: true
      },
      {
        key: "city",
        name: "City",
        filterable: true,
        resizable: true
      },
      {
        key: "dealerCode",
        name: "Dealer Code",
        filterable: true,
        resizable: true
      },
      {
        key: "name",
        name: "Dealer Name",
        filterable: true,
        resizable: true
      },
      {
        key: "status",
        name: "Status",
        filterable: true,
        resizable: true,
        formatter: TaskStatusFormatter
      },

      {
        key: "address",
        name: "Dealer Address",
        resizable: true,
        filterable: true,
        sortable: true
      },

      {
        key: "state",
        name: "State",
        filterable: true
      },
      {
        key: "cluster",
        name: "Cluster",
        resizable: true,
        filterable: true,
        sortable: true
      },
      {
        key: "type",
        name: "Type",
        resizable: true,
        filterable: true,
        sortable: true
      },
      {
        key: "zone",
        name: "Zone",
        resizable: true,
        filterable: true,
        sortable: true
      },
      {
        key: "category",
        name: "Category",
        resizable: true,
        filterable: true,
        sortable: true
      },
      {
        key: "startDate",
        name: "Receive Date",
        filterable: true,
        resizable: true,
        width: 100
      },
      {
        key: "recceOnDate",
        name: "Recce On Date",
        filterable: true,
        resizable: true,
        width: 100
      },
      {
        key: "recceDoneDate",
        name: "Recce Done Date",
        filterable: true,
        resizable: true,
        width: 100
      },
      {
        key: "approvalSentDate",
        name: "Approval Date",
        filterable: true,
        resizable: true,
        width: 100
      },
      {
        key: "bajajReviewDate",
        name: "Review Date",
        filterable: true,
        resizable: true,
        width: 100
      },
      {
        key: "designOnDate",
        name: "Designing On Date",
        filterable: true,
        resizable: true,
        width: 100
      },
      {
        key: "designDoneDate",
        name: "Designing Done Date",
        filterable: true,
        resizable: true,
        width: 100
      },
      {
        key: "printOnDate",
        name: "Print On Date",
        filterable: true,
        resizable: true,
        width: 100
      },
      {
        key: "installedDate",
        name: "Installation Date",
        filterable: true,
        resizable: true,
        width: 100
      }
    ]
  };
  setSelectedDesignUser = val => {
    this.setState({ user: val });
  };
  setSelectedTasks = tasks => {
    this.setState({ selectedTasks: tasks });
  };
  renderTasksTable = () => {
    if (this.props.loading) {
      return (
        <div className="loader">
          <div />
        </div>
      );
    }
    return (
      <div className="animated fadeIn">
        <div
          className="block-options"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          {this.state.selectedTasks.length != 0 ? (
            <ExportButton
              showAlert={this.props.showAlert}
              tasks={this.state.selectedTasks}
              storeRefetch={this.props.storeRefetch}
              allTask={this.props.allTasks}
            />
          ) : (
            <button type="button" className="btn btn-secodary float-left">
              Download Report
            </button>
          )}
        </div>
        <TasksTable
          columns={this.state.columns}
          setSelectedTasks={this.setSelectedTasks}
          tasks={this.props.tasks}
        />
      </div>
    );
  };

  componentWillReceiveProps = nextProps => {
    // console.log(nextProps);
    if (nextProps.userQuery) {
      if (nextProps.userQuery.me.role == "ADMIN") {
        let found = false;
        let columns = this.state.columns;
        for (let col of columns) {
          if (col.name === "Printer User") {
            found = true;
          }
        }
        if (!found) {
          columns.splice(2, 0, {
            key: "printerUser",
            name: "Printer User",
            resizable: true,
            filterable: true,
            width: 100
          });
          this.setState({ columns });
        }
      }
    }
  };

  roleCheck() {
    if (this.props.userQuery.me.role == "ADMIN") {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div>
        <h2 className="content-heading">
          Printing Reassign Section <small>List of all Printing Tasks</small>
          <PrintingReassignToolbar
            user={this.state.user}
            setSelectedDesignUser={this.setSelectedDesignUser}
            tasksRefetch={this.props.tasksRefetch}
            selectedTasks={this.state.selectedTasks}
          />
        </h2>
        {this.renderTasksTable()}
      </div>
    );
  }
}

const ALL_PRINTING = gql`
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
      printerUser {
        id
        name
      }
      campaign {
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
  graphql(USER_QUERY, { name: "userQuery" }),
  graphql(ALL_PRINTING, {
    props: ({ data }) => {
      if (!data.allTasks) return { loading: data.loading };

      return {
        loading: data.loading,
        tasks: data.allTasks,
        tasksRefetch: data.refetch
      };
    },
    options: {
      variables: {
        statusArr: ["PRINTING"]
      },
      fetchPolicy: "cache-and-network"
    }
  })
)(PrintingReassignTableWrapper);

PrintingReassignTableWrapper.propTypes = {};
