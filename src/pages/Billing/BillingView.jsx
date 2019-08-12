import React, { Component } from "react";
import { Query } from "react-apollo";
import Select from "react-select";
import moment from "moment";
import gql from "graphql-tag";
import TasksTable from "../Costing/CostingTasksTable";
import TaskStatusFormatter from "../../components/Tables/TaskStatusFormatter";
import { downloadFile } from "../../helpers/ExcelFileHandler";
import Alert from "react-s-alert";

const GET_ALL_BILLS = gql`
  query getAllBills {
    getAllBills {
      id
      serialNo
      createdAt
    }
  }
`;

const GET_BILL = gql`
  query getBill($billId: ID!) {
    getBill(billId: $billId) {
      id
      serialNo
      createdAt
      url
      key
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
          createdAt
        }
        printerUser {
          id
          name
        }
        adSpots {
          id
          name
          height
          width
          approved
          installed
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
              id
              name
            }
          }
          city {
            id
            name
            cluster {
              id
              name
            }
            state {
              id
              name
              zone {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;
class BillingView extends Component {
  state = {
    selectedBillId: "",
    selectedBill: ""
  };

  getSelectedBill = () => {
    if (this.state.selectedBillId.length > 0) {
      return {
        value: this.state.selectedBillId,
        label: this.state.selectedBill
      };
    }
    return null;
  };

  formatBillingData = bills => {
    let data = [];
    // serial number and date
    for (let b of bills) {
      let labelVal =
        " Bill No. " +
        b.serialNo +
        " -- Created At : " +
        moment(b.createdAt)
          .utcOffset("+5:30")
          .format("DD/MM/YYYY hh:mm a");
      data.push({
        value: b.id,
        label: labelVal
      });
    }

    return data;
  };

  renderBillingSelect = bills => {
    if (bills.length <= 0) {
      return <div>COULD NOT GET ANY BILLING. PLEASE CHECK YOUR CONNECTION</div>;
    }
    return (
      <div className="block-content">
        <div>
          <div style={{ width: "60%", margin: "auto" }}>
            <label>Select Bill</label>
            <Select
              name="bill"
              placeholder="Select Bill"
              value={this.getSelectedBill()}
              options={this.formatBillingData(bills)}
              onChange={val => {
                if (!val) {
                  this.setState({
                    selectedBill: "",
                    selectedBillId: ""
                  });
                  return;
                }
                this.setState({
                  selectedBillId: val.value,
                  selectedBill: val.label
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  renderAllBillingsquery = () => {
    return (
      <Query query={GET_ALL_BILLS}>
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
            if (data.getAllBills) {
              return <div>{this.renderBillingSelect(data.getAllBills)}</div>;
            }
          }

          return <div>Check your connection.</div>;
        }}
      </Query>
    );
  };

  checkStatus = () => {
    if (this.state.selectedBillId.length) {
      return true;
    }
    return false;
  };

  renderGetBillingQuery = () => {
    return (
      <Query query={GET_BILL} variables={{ billId: this.state.selectedBillId }}>
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
            if (data.getBill) {
              return (
                <div>
                  <BillingDownload
                    bill={data.getBill}
                    userId={this.props.user.id}
                  />
                  <BillingViewTaskTable allTasks={data.getBill.tasks} />
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
        <h2 className="content-heading">View Billing</h2>
        <div>
          <div className="row">
            <div className="col-12 text-center">
              {this.renderAllBillingsquery()}
            </div>
          </div>
          <div>
            {this.checkStatus() ? (
              <div>
                <div>{this.renderGetBillingQuery()}</div>
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

class BillingViewTaskTable extends React.Component {
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

class BillingDownload extends React.Component {
  render = () => {
    if (this.props.bill.url) {
      return (
        <div
          className="text-center font-w600 mb-5"
          style={{ marginTop: "40px" }}
        >
          <a
            className="btn btn-sm btn-secondary"
            href={this.props.bill.url}
            target="_blank"
          >
            Download Bill
          </a>
        </div>
      );
    }
    return (
      <div className="text-center font-w600 mb-5" style={{ marginTop: "40px" }}>
        Bill Not Found On Bucket
      </div>
    );
  };
}
export default BillingView;
