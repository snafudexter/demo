import React, { Component } from "react";
import TasksTable from "../../components/Tables/TasksTable";
import TaskStatusFormatter from "../../components/Tables/TaskStatusFormatter";
import CostingCSVButton from "./CostingCSVButton";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    minWidth: 400,
    padding: 0,
    border: "none",
    borderRadius: 0,
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};


class CostingTasksTableWrapper extends Component {
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
        width: 115,
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
        name: "Bajaj Review Date",
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

  setSelectedTasks = tasks => {
   
    var selectedTasks = []

    for(var task of tasks)
    {
      var index = this.props.allTasks.findIndex(
        x => x.id === task.id
      )

      if(index != -1)
        selectedTasks.push(this.props.allTasks[index])
    }
    console.log(selectedTasks)
    this.setState({ selectedTasks });
  };
  
  renderTasksTable = () => {
    return (
      <div className="animated fadeIn">
        <TasksTable
          ads={true}
          columns={this.state.columns}
          setSelectedTasks={this.setSelectedTasks}
          tasks={this.props.allTasks}
        />
      </div>
    );
  };

  renderCostingCSVButton = () => {
    return (
      <div
        className="block-options"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        <CostingCSVButton
          allTasks={this.props.allTasks}
          selectedTasks={this.state.selectedTasks}
        />
      </div>
    );
  };

  render() {
    return (
      <div>
        <h2 className="content-heading">
          <small>List of all Tasks</small>
        </h2>
        <div>
          <div>{this.renderTasksTable()}</div>
        </div>
        <div>
          <div>{this.renderCostingCSVButton()}</div>
        </div>
      </div>
    );
  }
}

export default CostingTasksTableWrapper;
