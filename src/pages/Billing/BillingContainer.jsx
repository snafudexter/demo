import React, { Component } from "react";
import { Query } from "react-apollo";
import Select from "react-select";
import TasksTable from "../../components/Tables/TasksTable";
import TaskStatusFormatter from "../../components/Tables/TaskStatusFormatter";
import GenerateBillingCSV from "./GenerateBillingCSV";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ALL_CAMPAIGNS = gql`
  query allCampaigns {
    allCampaigns {
      id
      name
      createdAt
    }
  }
`;

const ALL_CLUSTERS = gql`
  query allClusters {
    allClusters {
      id
      name
    }
  }
`;

const ALL_TYPES = gql`
  query allTypes {
    allTypes {
      id
      name
    }
  }
`;

const GET_BILLING_FILTERED_TASKS = gql`
  query getBillingFilteredTasks(
    $statusArr: [String]
    $campaignid: ID!
    $typeid: ID!
    $clusterid: ID!
  ) {
    getBillingFilteredTasks(
      statusArr: $statusArr
      campaignid: $campaignid
      typeid: $typeid
      clusterid: $clusterid
    ) {
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
      bill{
        id
      }
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
`;

const ADD_BILL = gql`
  mutation addBill($taskIds: [ID!]!, $clusterName: String!, $campaignName: String! ) {
    addBill(taskIds: $taskIds,clusterName: $clusterName,campaignName: $campaignName) {
      id
      tasks {
        id
      }
      serialNo
      createdAt
    }
  }
`;

class BillingContainer extends Component {
  state = {
    selectedCampaignId: "",
    selectedCampaign: "",
    selectedClusterId: "",
    selectedCluster: "",
    selectedType: "",
    selectedTypeId: "",
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
				key: 'billed',
				name: 'Billed',
				filterable: true,
				resizable: true,
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

  taskStatusArr = ["COMPLETED"];
  // from blaze app
  CDTypeId = "cj764cbfb1efc0134m0lmdk7n";
  // CDTypeIdLocal = "cjojv9aov002n08959d8ww7p4";

  allTasks = [];
  setSelectedTasks = tasks => {
   
    var selectedTasks = []

    for(var task of tasks)
    {
      var index = this.allTasks.findIndex(
        x => x.id === task.id
      )

      if(index != -1)
        selectedTasks.push(this.allTasks[index])
    }
    console.log(selectedTasks)
    this.setState({ selectedTasks });
  };

  // for campaign select start
  getSelectedCampaign = () => {
    if (this.state.selectedCampaignId.length > 0) {
      return {
        value: this.state.selectedCampaignId,
        label: this.state.selectedCampaign
      };
    }
    return null;
  };

  formatCampaignData = campaigns => {
    let data = [];
    for (let p of campaigns) {
      data.push({
        value: p.id,
        label: p.name
      });
    }

    return data;
  };

  renderCampaignsSelect = camp => {
    if (camp.length <= 0) {
      return <div>COULD NOT GET CAMPAIGNS.</div>;
    }

    return (
      <div>
        <div>
          <div style={{ width: "60%", margin: "auto" }}>
            <label>Select Campaign</label>
            <Select
              name="Campaign"
              placeholder="Select Campaign"
              value={this.getSelectedCampaign()}
              options={this.formatCampaignData(camp)}
              onChange={val => {
                if (!val) {
                  this.setState({
                    selectedCampaign: "",
                    selectedCampaignId: ""
                  });
                  return;
                }
                this.setState({
                  selectedCampaignId: val.value,
                  selectedCampaign: val.label
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  renderCampaignsQuery = () => {
    return (
      <Query query={ALL_CAMPAIGNS}>
        {({ loading, error, data }) => {
          if (error) {
            console.log(error);
            return <div>Some Error Ocurred</div>;
          }

          if (loading) {
            return <div>Loading...</div>;
          }

          if (data) {
            if (data.allCampaigns) {
              return <div>{this.renderCampaignsSelect(data.allCampaigns)}</div>;
            }
          }

          return <div>Check your connection.</div>;
        }}
      </Query>
    );
  };
  // for campaign select end

  // for type select start
  getSelectedType = () => {
    if (this.state.selectedTypeId.length > 0) {
      return {
        value: this.state.selectedTypeId,
        label: this.state.selectedType
      };
    }
    return null;
  };

  formatTypesData = types => {
    let data = [];
    for (let p of types) {
      data.push({
        value: p.id,
        label: p.name
      });
    }

    return data;
  };

  renderTypesSelect = types => {
    if (types.length <= 0) {
      return <div>COULD NOT GET TYPES.</div>;
    }

    return (
      <div>
        <div>
          <div style={{ width: "60%", margin: "auto" }}>
            <label>Select Type</label>
            <Select
              name="Type"
              placeholder="Select Type"
              value={this.getSelectedType()}
              options={this.formatTypesData(types)}
              onChange={val => {
                if (!val) {
                  this.setState({
                    selectedType: "",
                    selectedTypeId: "",
                    selectedCluster: "",
                    selectedClusterId: ""
                  });
                  return;
                }
                this.setState({
                  selectedTypeId: val.value,
                  selectedType: val.label,
                  selectedCluster: "",
                  selectedClusterId: ""
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  renderTypesQuery = () => {
    return (
      <Query query={ALL_TYPES}>
        {({ loading, error, data }) => {
          if (error) {
            console.log(error);
            return <div>Some Error Ocurred</div>;
          }
          if (loading) {
            return <div>Loading...</div>;
          }
          if (data) {
            // console.log(data);
            if (data.allTypes) {
              return <div>{this.renderTypesSelect(data.allTypes)}</div>;
            }
          }
          return <div>Check your connection.</div>;
        }}
      </Query>
    );
  };
  // for types select end

  // for cluster select start
  getSelectedCluster = () => {
    if (this.state.selectedClusterId.length > 0) {
      return {
        value: this.state.selectedClusterId,
        label: this.state.selectedCluster
      };
    }
    return null;
  };

  formatClusterData = clusters => {
    let data = [];
    for (let p of clusters) {
      data.push({
        value: p.id,
        label: p.name
      });
    }

    return data;
  };

  renderClusterSelect = cluster => {
    if (cluster.length <= 0) {
      return <div>COULD NOT GET CLUSTERS.</div>;
    }

    return (
      <div>
        <div>
          <div style={{ width: "60%", margin: "auto" }}>
            <label>Select Cluster</label>
            <Select
              name="Cluster"
              placeholder="Select Cluster"
              value={this.getSelectedCluster()}
              options={this.formatClusterData(cluster)}
              onChange={val => {
                if (!val) {
                  this.setState({
                    selectedCluster: "",
                    selectedClusterId: ""
                  });
                  return;
                }
                this.setState({
                  selectedClusterId: val.value,
                  selectedCluster: val.label
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  renderClustersQuery = () => {
    return (
      <Query query={ALL_CLUSTERS}>
        {({ loading, error, data }) => {
          if (error) {
            console.log(error);
            return <div>Some Error Ocurred</div>;
          }

          if (loading) {
            return <div>Loading...</div>;
          }

          if (data) {
            if (data.allClusters) {
              return <div>{this.renderClusterSelect(data.allClusters)}</div>;
            }
          }

          return <div>Check your connection.</div>;
        }}
      </Query>
    );
  };
  // for cluster select end

  checkStatus = () => {
    const selectedTypeId = this.state.selectedTypeId;
    const selectedCampaignId = this.state.selectedCampaignId;
    const selectedClusterId = this.state.selectedClusterId;

    if (selectedTypeId === this.CDTypeId) {
      if (
        selectedTypeId.length &&
        selectedCampaignId.length &&
        selectedClusterId.length
      ) {
        return true;
      }
      return false;
    }

    if (selectedCampaignId.length && selectedTypeId.length) {
      return true;
    }

    return false;
  };

  renderGenerateBillingCSV = allTasks => {
    return (
      <Mutation mutation={ADD_BILL}>
        {(addBill, { data }) => (
          <div
            className="block-options"
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            <GenerateBillingCSV
              allTasks={allTasks}
              selectedTasks={this.state.selectedTasks}
              campaign={this.state.selectedCampaign}
              cluster={this.state.selectedCluster}
              type={this.state.selectedType}
              addBill = {addBill}
              userId = {this.props.user.id}
            />
          </div>
        )}
      </Mutation>
    );
  };

  renderTasksQuery = () => {
    return (
      <Query
        query={GET_BILLING_FILTERED_TASKS}
        variables={{
          statusArr: this.taskStatusArr,
          campaignid: this.state.selectedCampaignId,
          typeid: this.state.selectedTypeId,
          clusterid: this.state.selectedClusterId
        }}
      >
        {({ loading, error, data }) => {
          if (error) {
            console.log(error);
            return <div>Some Error Ocurred.</div>;
          }

          if (loading) {
            return <div>Loading...</div>;
          }

          if (data) {
            // console.log(data);
            if (data.getBillingFilteredTasks) {
              if (data.getBillingFilteredTasks.length <= 0) {
                return <div>COULD NOT FETCH TASKS</div>;
              }

              this.allTasks = data.getBillingFilteredTasks;

              return (
                <div className="animated fadeIn">
                  <h2 className="content-heading">
                    <small>List of all Tasks</small>
                  </h2>
                  <div>
                    <TasksTable
                      ads={true}
                      columns={this.state.columns}
                      setSelectedTasks={this.setSelectedTasks}
                      tasks={data.getBillingFilteredTasks}
                    />
                  </div>
                  <div>
                    {this.renderGenerateBillingCSV(
                      data.getBillingFilteredTasks
                    )}
                  </div>
                </div>
              );
            }
          }

          return <div>Some Problem Occurred.</div>;
        }}
      </Query>
    );
  };

  checkStatusForClusterSelect = () => {
    if (this.state.selectedTypeId === this.CDTypeId) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <div>
        <div id="page-container" className="main-content-boxed">
          <div id="main-container">
            <div className="content">
              <h2 className="content-heading">Billing Section</h2>
              <div>
                <div
                  className="row"
                  style={{ height: "200px", margin: "auto" }}
                >
                  <div className="col-4 text-center">
                    {this.renderCampaignsQuery()}
                  </div>
                  <div className="col-4 text-center">
                    {this.renderTypesQuery()}
                  </div>
                  <div className="col-4 text-center">
                    {this.checkStatusForClusterSelect() ? (
                      this.renderClustersQuery()
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
                <div>
                  {this.checkStatus() ? (
                    <div>
                      <div>{this.renderTasksQuery()}</div>
                    </div>
                  ) : (
                    <div>Please select campaign , type and/or cluster</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BillingContainer;
