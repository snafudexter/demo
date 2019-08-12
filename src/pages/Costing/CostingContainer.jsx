import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Select from "react-select";
import CostingTasksTableWrapper from "./CostingTasksTableWrapper";
import _ from "underscore";

const GET_ALL_TASKS = gql`
  query($statusArr: [String], $userid: ID!) {
    allTasks(statusArr: $statusArr, userid: $userid) {
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
      remark{
        name
      }
      printerUser {
        id
        name
      }
      campaign {
        id
        name
      }
      adSpots {
        id
        name
        height
        type
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
        remarks
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
          cluster {
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

class CostingContainer extends Component {
  state = {
    selectedCampaignId: "",
    selectedCampaignName: "",
    selectedZoneId: "",
    selectedZoneName: "",
    selectedCityId: "",
    selectedCityName: ""
  };

  allTaskFromQuery = [];
  campaignsFromTaskList = [];
  zonesFromTaskList = [];
  citiesFromTaskList = [];

  // city selector start
  getSelectedCity = () => {
    if (this.state.selectedCityId.length > 0) {
      return {
        value: this.state.selectedCityId,
        label: this.state.selectedCityName
      };
    }
    return null;
  };

  formatCityData = cities => {
    let data = [];
    for (let p of cities) {
      data.push({
        value: p.id,
        label: p.name
      });
    }

    return data;
  };

  renderCitiesSelect = () => {
    let cities = this.citiesFromTaskList;
    if (this.state.selectedZoneId.length <= 0) {
      return <div>Please Select A Zone First</div>;
    }
    if (cities.length <= 0) {
      return <div>COULD NOT GET CITIES. PLEASE CHECK YOUR CONNECTION</div>;
    }
    return (
      <div className="block-content">
        <div>
          <div style={{ width: "60%", margin: "auto" }}>
            <label>Select City </label>
            <Select
              name="city"
              placeholder="Select City"
              value={this.getSelectedCity()}
              options={this.formatCityData(cities)}
              onChange={val => {
                if (!val) {
                  this.setState({
                    selectedCityId: "",
                    selectedCityName: ""
                  });
                  return;
                }
                this.setState({
                  selectedCityId: val.value,
                  selectedCityName: val.label
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  };
  // city selector end

  // zone selector start
  getCitiesByZoneIdnCampaignId = zoneId => {
    let cities = [];

    for (let t of this.allTaskFromQuery) {
      if (t.campaign.id === this.state.selectedCampaignId) {
        if (t.store.city.state.zone.id === zoneId) {
          cities.push({
            id: t.store.city.id,
            name: t.store.city.name
          });
        }
      }
    }
    return _.uniq(cities, "id");
  };

  getSelectedZone = () => {
    if (this.state.selectedZoneId.length > 0) {
      return {
        value: this.state.selectedZoneId,
        label: this.state.selectedZoneName
      };
    }
    return null;
  };

  formatZonesData = zones => {
    let data = [];
    for (let p of zones) {
      data.push({
        value: p.id,
        label: p.name
      });
    }

    return data;
  };

  renderZoneSelect = () => {
    let zones = this.zonesFromTaskList;
    if (this.state.selectedCampaignId.length <= 0) {
      return <div>Please Select A Campaign First</div>;
    }
    if (zones.length <= 0) {
      return <div>COULD NOT GET ZONES. PLEASE CHECK YOUR CONNECTION</div>;
    }
    return (
      <div className="block-content">
        <div>
          <div style={{ width: "60%", margin: "auto" }}>
            <label>Select Zone</label>
            <Select
              name="zone"
              placeholder="Select Zone"
              value={this.getSelectedZone()}
              options={this.formatZonesData(zones)}
              onChange={val => {
                if (!val) {
                  this.setState({
                    selectedZoneId: "",
                    selectedZoneName: "",
                    selectedCityId: "",
                    selectedCityName: ""
                  });
                  this.citiesFromTaskList = [];
                  return;
                }
                this.citiesFromTaskList = this.getCitiesByZoneIdnCampaignId(
                  val.value
                );
                this.setState({
                  selectedZoneId: val.value,
                  selectedZoneName: val.label,
                  selectedCityId:"",
                  selectedCityName:""
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  };
  // zone selector end

  // campaign selector start
  getZonesByCampaignId = campaignId => {
    let zones = [];

    for (let t of this.allTaskFromQuery) {
      if (t.campaign.id === campaignId) {
        zones.push({
          id: t.store.city.state.zone.id,
          name: t.store.city.state.zone.name
        });
      }
    }
    return _.uniq(zones, "id");
  };

  getSelectedCampaign = () => {
    if (this.state.selectedCampaignId.length > 0) {
      return {
        value: this.state.selectedCampaignId,
        label: this.state.selectedCampaignName
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

  renderCampaignSelect = campaigns => {
    if (campaigns.length <= 0) {
      return <div>COULD NOT GET CAMPAIGNS. PLEASE CHECK YOUR CONNECTION</div>;
    }
    return (
      <div className="block-content">
        <div>
          <div style={{ width: "60%", margin: "auto" }}>
            <label>Select Campaign </label>
            <Select
              name="campaign"
              placeholder="Select Campaign"
              value={this.getSelectedCampaign()}
              options={this.formatCampaignData(campaigns)}
              onChange={val => {
                if (!val) {
                  this.setState({
                    selectedCampaignId: "",
                    selectedCampaignName: "",
                    selectedZoneId: "",
                    selectedZoneName: "",
                    selectedCityId: "",
                    selectedCityName: ""
                  });
                  this.zonesFromTaskList = [];
                  this.citiesFromTaskList = [];
                  return;
                }
                this.zonesFromTaskList = this.getZonesByCampaignId(val.value);
                this.setState({
                  selectedCampaignId: val.value,
                  selectedCampaignName: val.label,
                  selectedZoneId: "",
                  selectedZoneName: "",
                  selectedCityId: "",
                  selectedCityName: ""
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  };
  // campaign selector end

  getFormattedDataForSelector = tasks => {
    let campaigns = [];

    for (let t of tasks) {
      campaigns.push({
        id: t.campaign.id,
        name: t.campaign.name
      });
    }

    let data = {
      campaigns: _.uniq(campaigns, "id")
    };
    return data;
  };

  renderTasksQuery = () => {
    return (
      <Query
        query={GET_ALL_TASKS}
        variables={{
          statusArr: ["APPROVAL","APPROVED"],
          userid: ""
        }}
      >
        {({ loading, error, data }) => {
          if (error) {
            return `Error!: ${error}`;
          }

          if (loading) {
            return <div>Loading...</div>;
          }

          if (data) {
            // console.log(data);
            this.allTaskFromQuery = data.allTasks;
            let formattedData = this.getFormattedDataForSelector(data.allTasks);
            return (
              <div>
                <div>
                  <div className="row" style={{ height: "250px" }}>
                    <div className="col-4 text-center">
                      {this.renderCampaignSelect(formattedData.campaigns)}
                    </div>
                    <div className="col-4 text-center">
                      {this.renderZoneSelect()}
                    </div>
                    <div className="col-4 text-center">
                      {this.renderCitiesSelect()}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return <div>Check your connection.</div>;
        }}
      </Query>
    );
  };

  getTasks = (campaignId, zoneId, cityId) => {
    let tasks = [];
    for (let task of this.allTaskFromQuery) {
      if (task.campaign.id === campaignId) {
        if (cityId.length > 0) {
          // if selected city id exists filter with that to
          if (task.store.city.id === cityId) {
            if (task.store.city.state.zone.id === zoneId) {
              tasks.push(task);
            }
          }
        } else {
          // if selected city id doen't use it as filter
          if (task.store.city.state.zone.id === zoneId) {
            tasks.push(task);
          }
        }
      }
    }
    return tasks;
  };

  renderTasksTable = () => {
    // we need both campaign and zone to be selected
    if (
      !(
        this.state.selectedCampaignId.length && this.state.selectedZoneId.length
      )
    ) {
      return <div />;
    }

    let tasks = this.getTasks(
      this.state.selectedCampaignId,
      this.state.selectedZoneId,
      this.state.selectedCityId
    );

    if (tasks.length <= 0) {
      return <div className="text-center">No Task Found</div>;
    }

    return (
      <div>
        <div className="text-center" style={{ width: "70%", margin: "auto" }}>
          <CostingTasksTableWrapper allTasks={tasks} />
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <div id="page-container" className="main-content-boxed">
          <div id="main-container">
            <div className="content">
              <h2 className="content-heading">Costing Section</h2>
              <div>{this.renderTasksQuery()}</div>
            </div>
            <div>{this.renderTasksTable()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CostingContainer;
