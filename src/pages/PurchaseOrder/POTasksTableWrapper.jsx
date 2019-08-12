import React, { Component } from "react";
import gql from "graphql-tag";
import TasksTable from "../../components/Tables/TasksTable";
import TaskStatusFormatter from "../../components/Tables/TaskStatusFormatter";
import { Query } from "react-apollo";
import POPrinterQuotWrapper from "./POPrinterQuotWrapper";

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

const GET_PRINTER_QUOTATION = gql`
  query getPrinterQuotation($printerId: ID!) {
    getPrinterQuotation(printerId: $printerId) {
      id
      printer {
        name
      }
      city {
        id
        name
        lat
        lng
      }
      mediaRates {
        rate
        media {
          id
          name
        }
      }
      installationRate
      transportationRate
      recceRate
      recceRatePerShop
      hubTransportationRate
      hubInstallationRate
      hubRecceRate
      hubRecceRatePerShop
    }
  }
`;

class POTasksTableWrapper extends Component {
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
    console.log(tasks)
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

  checkPrinterQuotation = data => {
    if (data.getPrinterQuotation) {
      return true;
    }
    return false;
  };

  renderGetPrinterQuotations = () => {
    return (
      <Query
        query={GET_PRINTER_QUOTATION}
        variables={{ printerId: this.props.selectedPrinterId }}
      >
        {({ loading, error, data }) => {
          if (error) {
            return `Error!: ${error}`;
          }

          if (loading) {
            return <div>Loading...</div>;
          }

          if (data) {
            if (this.checkPrinterQuotation(data)) {
              return (
                <div style={{ margin: "auto" }}>
                  <POPrinterQuotWrapper
                    printerQuotation={data.getPrinterQuotation}
                    allTasks={this.props.allTasks}
                    selectedTasks={this.state.selectedTasks}
                    selectedCity={this.props.selectedCity}
                    selectedCityId={this.props.selectedCityId}
                    selectedCityLatLng={this.props.selectedCityLatLng}
                  />
                </div>
              );
            }
            return (
              <div className="content p-0">
                <div className="content-header">
                  <strong> Printer Quotation Does Not Exist</strong>
                </div>
              </div>
            );
          }

          return <div>Check your connection.</div>;
        }}
      </Query>
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
          <div>{this.renderGetPrinterQuotations()}</div>
        </div>
      </div>
    );
  }
}

export default POTasksTableWrapper;
