import React, { Component } from "react";
import { Query, graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import Select from "react-select";
import POTasksTableWrapper from "./POTasksTableWrapper";

const GET_USER_LIST = gql`
  query getUserList($role: String) {
    getUserList(role: $role) {
      id
      name
    }
  }
`;

const FILTERED_CAMPAIGN_LIST = gql`
  query getFilteredCampaigns($printerId: ID!, $statusArr: [String]) {
    getFilteredCampaigns(printerId: $printerId, statusArr: $statusArr) {
      id
      name
      task {
        id
        store {
          city {
            id
            name
            lat 
            lng
          }
        }
      }
    }
  }
`;

const GET_FILTERED_TASKS = gql`
  query($statusArr: [String], $userid: ID!, $campaignid: ID!, $cityid: ID!) {
    getFilteredTasks(
      statusArr: $statusArr
      userid: $userid
      campaignid: $campaignid
      cityid: $cityid
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
      campaign {
        id
        name
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
  }
`;

class PurchaseOrderContainer extends Component {
  state = {
    selectedPrinterId: "",
    selectedPrinter: "",
    selectedCityId: "",
    selectedCity: "",
    selectedCampaign: "",
    selectedCampaignId: ""
  };

  campaignCities = [];
  selectDivHeight = "250px";
  taskStatusArr = [
    "RECCEDONE",
    "APPROVAL",
    "APPROVED",
    "REJECTED",
    "DESIGNING",
    "DESIGNINGDONE",
    "PRINTING",
    "PRINTINGDONE",
    "INSTALLED",
    "COMPLETED"
  ];

  getSelectedPrinter = () => {
    if (this.state.selectedPrinterId.length > 0) {
      return {
        value: this.state.selectedPrinterId,
        label: this.state.selectedPrinter
      };
    }
    return null;
  };

  formatPrintersData = printers => {
    let data = [];
    for (let p of printers) {
      data.push({
        value: p.id,
        label: p.name
      });
    }

    return data;
  };

  renderPrinterSelect = printers => {
    if (printers.length <= 0) {
      return <div>COULD NOT GET PRINTERS. PLEASE CHECK YOUR CONNECTION</div>;
    }
    return (
      <div className="block-content">
        <div>
          <div style={{ width: "60%", margin: "auto" }}>
            <label>Select Printer </label>
            <Select
              name="printer"
              placeholder="Select Printer"
              value={this.getSelectedPrinter()}
              options={this.formatPrintersData(printers)}
              onChange={val => {
                if (!val) {
                  this.setState({
                    selectedPrinter: "",
                    selectedPrinterId: "",
                    selectedCampaignId: "",
                    selectedCampaign: ""
                  });
                  return;
                }
                this.setState({
                  selectedPrinterId: val.value,
                  selectedPrinter: val.label,
                  selectedCampaignId: "",
                  selectedCampaign: ""
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  renderAllPrintersQuery = () => {
    return (
      <Query query={GET_USER_LIST} variables={{ role: "PRINTER" }}>
        {({ loading, error, data }) => {
          if (error) {
            return `Error!: ${error}`;
          }

          if (loading) {
            return <div>Loading...</div>;
          }

          if (data) {
            return <div>{this.renderPrinterSelect(data.getUserList)}</div>;
          }

          return <div>Check your connection.</div>;
        }}
      </Query>
    );
  };

  getSelectedCityLatLng = selectedCityId => {
    for (let city of this.campaignCities) {
      if (city.cityId === selectedCityId) {
        return { lat: city.lat, lng: city.lng };
      }
    }
    return { lat: null, lng: null };
  };
  
  renderTasksQuery = () => {
    // console.log("campaign id "+this.state.selectedCampaignId);
    // console.log("city id "+this.state.selectedCityId);
    // console.log("printer id "+this.state.selectedPrinterId);
    return (
      <Query
        query={GET_FILTERED_TASKS}
        variables={{
          statusArr: this.taskStatusArr,
          userid: this.state.selectedPrinterId,
          campaignid: this.state.selectedCampaignId,
          cityid: this.state.selectedCityId
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
            if (data.getFilteredTasks) {
              if (data.getFilteredTasks.length <= 0) {
                return <div>COULD NOT FETCH TASKS</div>;
              }
              return (
                <div>
                  <POTasksTableWrapper
                    allTasks={data.getFilteredTasks}
                    selectedPrinterId={this.state.selectedPrinterId}
                    selectedCity={this.state.selectedCity}
                    selectedCityId =  {this.state.selectedCityId}
                    selectedCityLatLng={this.getSelectedCityLatLng(
                      this.state.selectedCityId
                    )}
                  />
                </div>
              );
            }
          }

          return <div>Some Problem Occurred.</div>;
        }}
      </Query>
    );
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

  setCampaignCities = (allCamp, campaignId) => {
    this.campaignCities = [];
    // iterating over all campaign
    for (let camp of allCamp) {
      // if same campaign as selected found
      if (camp.id === campaignId) {
        let tasks = camp.task;
        // iterating over all task in that campaign
        for (let t of tasks) {
          // foundOne used for keeping unique value
          let foundOne = false;
          let campCityId = t.store.city.id;
          let campCityName = t.store.city.name;
          let campCityLat = t.store.city.lat;
          let campCityLng = t.store.city.lng;
          // if campaign city already consist of that city
          // set founf one as true
          for (let city of this.campaignCities) {
            if (city.cityId === campCityId) {
              foundOne = true;
            }
          }
          // if foundOne is false then push the city in campaign cities
          if (!foundOne) {
            this.campaignCities.push({
              cityId: campCityId,
              cityName: campCityName,
              lat: campCityLat,
              lng: campCityLng
            });
          }
        }
      }
    }
  };

  renderCampaignsSelect = camp => {
    if (camp.length <= 0) {
      return <div>COULD NOT GET CAMPAIGNS.</div>;
    }

    return (
      <div className="block-content">
        <div>
          <div style={{ width: "60%", margin: "auto" }}>
            <label>Select Campaign </label>
            <Select
              name="Campaign"
              placeholder="Select Campaign"
              value={this.getSelectedCampaign()}
              options={this.formatCampaignData(camp)}
              onChange={val => {
                if (!val) {
                  this.setState({
                    selectedCampaign: "",
                    selectedCampaignId: "",
                    selectedCityId: "",
                    selectedCity: ""
                  });
                  this.campaignCities = [];
                  return;
                }
                // filtering cities specific to that campaign start
                this.setCampaignCities(camp, val.value);
                // filtering cities specific to that campaign end
                this.setState({
                  selectedCampaignId: val.value,
                  selectedCampaign: val.label,
                  selectedCityId: "",
                  selectedCity: ""
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  renderFilteredCampaigns = () => {
    if (this.state.selectedPrinterId.length <= 0) {
      return <div>SELECT A PRINTER FIRST</div>;
    }

    return (
      <Query
        query={FILTERED_CAMPAIGN_LIST}
        variables={{
          statusArr: this.taskStatusArr,
          printerId: this.state.selectedPrinterId
        }}
      >
        {({ loading, error, data }) => {
          if (error) {
            console.log(error);
            return <div>Some Error Ocurred</div>;
          }

          if (loading) {
            return <div>Loading...</div>;
          }

          if (data) {
            if (data.getFilteredCampaigns) {
              return (
                <div>
                  {this.renderCampaignsSelect(data.getFilteredCampaigns)}
                </div>
              );
            }
          }

          return <div>Check your connection.</div>;
        }}
      </Query>
    );
  };
  // for campaign select end

  // for city select start
  formatCitiesData = cities => {
    let data = [];
    for (let p of cities) {
      data.push({
        value: p.cityId,
        label: p.cityName
      });
    }

    return data;
  };

  getSelectedCity = () => {
    if (this.state.selectedCityId.length > 0) {
      return {
        value: this.state.selectedCityId,
        label: this.state.selectedCity
      };
    }
    return null;
  };

  renderCitySelect = () => {
    if (this.state.selectedCampaignId.length <= 0) {
      this.campaignCities = [];
      return <div>SELECT A CAMPAIGN FIRST</div>;
    }
    // getting cities of campaign start
    let cities = this.campaignCities;
    if (cities.length <= 0) {
      return <div>COULD NOT GET CITIES. PLEASE CHECK YOUR CONNECTION</div>;
    }
    // getting cities of campaign end
    return (
      <div className="block-content">
        <div>
          <div style={{ width: "60%", margin: "auto" }}>
            <label>Select City </label>
            <Select
              name="city"
              placeholder="Select City"
              value={this.getSelectedCity()}
              options={this.formatCitiesData(cities)}
              onChange={val => {
                if (!val) {
                  this.setState({
                    selectedCityId: "",
                    selectedCity: ""
                  });
                  return;
                }
                this.setState({
                  selectedCityId: val.value,
                  selectedCity: val.label
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  };
  // for city select end

  checkStatus = () => {
    if (
      this.state.selectedCampaignId.length &&
      this.state.selectedPrinterId.length &&
      this.state.selectedCityId.length
    ) {
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
              <h2 className="content-heading">Purchase Order Section</h2>
              <div>
                <div className="row" style={{ height: this.selectDivHeight }}>
                  <div className="col-4 text-center">
                    {this.renderAllPrintersQuery()}
                  </div>
                  <div className="col-4 text-center">
                    {this.renderFilteredCampaigns()}
                  </div>
                  <div className="col-4 text-center">
                    {this.renderCitySelect()}
                  </div>
                </div>

                <div>
                  {this.checkStatus() ? (
                    <div>
                      <div>{this.renderTasksQuery()}</div>
                    </div>
                  ) : (
                    <div />
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

export default PurchaseOrderContainer;
