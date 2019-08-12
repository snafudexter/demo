import React, { Component } from "react";
import { Query, graphql, compose } from "react-apollo";
import Select from "react-select";
import moment from "moment";
import gql from "graphql-tag";
import TasksTable from "./POTasksTable";
import TaskStatusFormatter from "../../components/Tables/TaskStatusFormatter";
import ViewPrinterQuotation from "../PrinterQuotation/ViewPrinterQuotation";

const GET_POS = gql`
  query getAllPurchaseOrders {
    getAllPurchaseOrders {
      id
      serialNo
      createdAt
    }
  }
`;

const GET_PO = gql`
  query getPurchaseOrder($poId: ID!) {
    getPurchaseOrder(poId: $poId) {
      id
      serialNo
      totalDistance
      key
      url
      tasks {
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
        campaign {
          id
          name
        }
        adSpots {
          id
          name
          height
          width
          media {
            id
            name
          }
          language {
            name
          }
          category {
            name
          }
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
            id
            name
            lat
            lng
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
      printerQuotation {
        id
        printer {
          id
          name
        }
        city {
          id
          name
        }
        mediaRates {
          media {
            id
            name
          }
          rate
        }
        transportationRate
        installationRate
        recceRate
        recceRatePerShop
        hubTransportationRate
        hubInstallationRate
        hubRecceRate
        hubRecceRatePerShop
      }
    }
  }
`;
class POView extends Component {
  state = {
    selectedPOId: "",
    selectedPO: ""
  };

  getSelectedPO = () => {
    if (this.state.selectedPOId.length > 0) {
      return {
        value: this.state.selectedPOId,
        label: this.state.selectedPO
      };
    }
    return null;
  };

  formatPOSData = pos => {
    let data = [];
    // serial number and date
    for (let p of pos) {
      let labelVal =
        " PO No. " +
        p.serialNo +
        " -- Created At : " +
        moment(p.createdAt)
          .utcOffset("+5:30")
          .format("DD/MM/YYYY hh:mm a");
      data.push({
        value: p.id,
        label: labelVal
      });
    }

    return data;
  };

  renderPOSelect = pos => {
    if (pos.length <= 0) {
      return <div>COULD NOT GET PO. PLEASE CHECK YOUR CONNECTION</div>;
    }
    return (
      <div className="block-content">
        <div>
          <div style={{ width: "60%", margin: "auto" }}>
            <label>Select PO</label>
            <Select
              name="po"
              placeholder="Select PO"
              value={this.getSelectedPO()}
              options={this.formatPOSData(pos)}
              onChange={val => {
                if (!val) {
                  this.setState({
                    selectedPO: "",
                    selectedPOId: ""
                  });
                  return;
                }
                this.setState({
                  selectedPOId: val.value,
                  selectedPO: val.label
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  renderAllPOsquery = () => {
    return (
      <Query query={GET_POS}>
        {({ loading, error, data }) => {
          if (error) {
            console.log(error);
            return <div>Some Error Occured.</div>;
          }

          if (loading) {
            return <div>Loading...</div>;
          }

          if (data) {
            // make a check here for null and empty data
            // console.log(data);
            if (data.getAllPurchaseOrders) {
              return (
                <div>{this.renderPOSelect(data.getAllPurchaseOrders)}</div>
              );
            }
          }

          return <div>Check your connection.</div>;
        }}
      </Query>
    );
  };

  checkStatus = () => {
    if (this.state.selectedPOId.length) {
      return true;
    }
    return false;
  };

  renderGetPOQuery = () => {
    return (
      <Query query={GET_PO} variables={{ poId: this.state.selectedPOId }}>
        {({ loading, error, data }) => {
          if (error) {
            console.log(error);
            return <div>Some Error Occured.</div>;
          }

          if (loading) {
            return <div>Loading...</div>;
          }

          if (data) {
            // make a check here for null and empty data
            // console.log(data);
            if (data.getPurchaseOrder) {
              return (
                <div>
                  <PODownload po={data.getPurchaseOrder} />
                  <POViewTaskTable allTasks={data.getPurchaseOrder.tasks} />;
                  <POViewPrinterQuotation
                    printerQuotation={data.getPurchaseOrder.printerQuotation}
                    totalDistance={data.getPurchaseOrder.totalDistance}
                  />
                </div>
              );
            }
          }

          return <div>Check your connection.</div>;
        }}
      </Query>
    );
  };

  render() {
    return (
      <div className="container">
        <h2 className="content-heading">View Purchase Order</h2>
        <div>
          <div className="row">
            <div className="col-12 text-center">{this.renderAllPOsquery()}</div>
          </div>
          <div>
            {this.checkStatus() ? (
              <div>
                <div>{this.renderGetPOQuery()}</div>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    );
  }
}

class POViewTaskTable extends React.Component {
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
      }
    ]
  };

  setSelectedTasks = tasks => {
    this.setState({ selectedTasks: tasks });
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

  render() {
    return (
      <div>
        <h2 className="content-heading">
          <small>List of all Tasks</small>
        </h2>
        <div>
          <div>{this.renderTasksTable()}</div>
        </div>
      </div>
    );
  }
}

class POViewPrinterQuotation extends React.Component {
  renderTotalDistanceView = printerQuotation => {
    return (
      <div className="block-content">
        <div className="form-group ">
          <div
            className="text-center"
            style={{ margin: "auto", fontSize: "16px" }}
          >
            <label>Total Distance is {this.props.totalDistance}</label>
          </div>
          <br />
        </div>
      </div>
    );
  };

  renderPrinterQuotationInfo = printerQuotInfo => {
    return (
      <div>
        <div id="page-container" className="main-content-boxed">
          <h2 className="content-heading">
            <small>Printer Quotation Information</small>
          </h2>
        </div>
        <div id="main-container">
          <div><ViewPrinterQuotation printerQuotation = {printerQuotInfo}/></div>
        </div>
        <div>{this.renderTotalDistanceView(printerQuotInfo)}</div>
      </div>
    );
  };

  render = () => {
    return (
      <div className="container">
        <div>
          {this.renderPrinterQuotationInfo(this.props.printerQuotation)}
        </div>
      </div>
    );
  };
}

class PODownload extends React.Component {
  render = () => {
    if (this.props.po.url) {
      return (
        <div
          className="text-center font-w600 mb-5"
          style={{ marginTop: "40px" }}
        >
          <a
            className="btn btn-sm btn-secondary"
            href={this.props.po.url}
            target="_blank"
          >
            Download PO
          </a>
        </div>
      );
    }
    return (
      <div className="text-center font-w600 mb-5" style={{ marginTop: "40px" }}>
        PO Not Found On Bucket
      </div>
    );
  };
}

export default POView;
