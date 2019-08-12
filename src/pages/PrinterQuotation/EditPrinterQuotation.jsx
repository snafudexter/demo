import * as React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Select from "react-select";
import Alert from "react-s-alert";

const ALL_CITIES = gql`
  query allCities {
    allCities {
      id
      name
      state {
        id
        name
        zone {
          id
          name
        }
      }
      cluster {
        id
        name
      }
    }
  }
`;

const ALL_MEDIAS = gql`
  query allMedias {
    allMedias {
      id
      name
    }
  }
`;

const EDIT_PRINTER_QUOTATION = gql`
  mutation editPrinterQuotation(
    $printerQuotationId: ID!
    $cityId: ID!
    $mediaIdArray: [ID!]
    $mediaCostArray: [Float!]
    $installationRate: Float!
    $transportationRate: Float!
    $recceRate: Float!
    $recceRatePerShop: Boolean!
    $hubRecceRate: Float!
    $hubRecceRatePerShop: Boolean!
    $hubInstallationRate: Float!
    $hubTransportationRate: Float!
  ) {
    editPrinterQuotation(
      cityId: $cityId
      printerQuotationId: $printerQuotationId
      transportationRate: $transportationRate
      installationRate: $installationRate
      mediaIdArray: $mediaIdArray
      mediaCostArray: $mediaCostArray
      recceRate: $recceRate
      recceRatePerShop: $recceRatePerShop
      hubInstallationRate: $hubInstallationRate
      hubTransportationRate: $hubTransportationRate
      hubRecceRate: $hubRecceRate
      hubRecceRatePerShop: $hubRecceRatePerShop
    ) {
      id
      city {
        id
        name
      }
      printer {
        id
        name
      }
      mediaRates {
        id
        media {
          name
        }
        rate
      }
      installationRate
      transportationRate
      hubInstallationRate
      hubTransportationRate
      hubRecceRate
      hubRecceRatePerShop
      recceRate
      recceRatePerShop
    }
  }
`;

class EditPrinterQuotation extends React.Component {
  state = {
    selectedCityId: this.props.printerQuotation.city.id,
    selectedCity: this.props.printerQuotation.city.name,
    mediaCostArray: this.props.mediaRatesArr, // contains obj with format {id,name,cost}
    transportCost: this.props.printerQuotation.transportationRate,
    installationCost: this.props.printerQuotation.installationRate,
    recceRate: this.props.printerQuotation.recceRate,
    recceRatePerShop: this.props.printerQuotation.recceRatePerShop,
    showHubRates: false,
    hubRecceRate: this.props.hubRecceRate,
    hubRecceRatePerShop: this.props.hubRecceRatePerShop,
    hubTransportationCost: this.props.hubTransportationRate,
    hubInstallationCost: this.props.hubInstallationRate
  };

  PERSHOP = "Per Shop";
  PERSQFT = "Per Sq. Ft.";
  HUBPERSHOP = "Hub Per Shop";
  HUBPERSQFT = "Hub Per Sq. Ft.";
  HUBRATE = "Hub Rates";
  NONHUBRATE = "Non Hub Rates";

  formatCitiesData = cities => {
    let data = [];
    for (let p of cities) {
      data.push({
        value: p.id,
        label: p.name
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
  renderCitySelect = cities => {
    if (cities.length <= 0) {
      return <div>COULD NOT GET CITIES. PLEASE CHECK YOUR CONNECTION</div>;
    }
    return (
      <div>
        <div>
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
    );
  };

  renderAllCitiesQuery = () => {
    return (
      <Query query={ALL_CITIES}>
        {({ loading, error, data }) => {
          if (error) {
            return `Error!: ${error}`;
          }

          if (loading) {
            return <div>Loading...</div>;
          }

          if (data) {
            return <div>{this.renderCitySelect(data.allCities)}</div>;
          }

          return <div>Check your connection.</div>;
        }}
      </Query>
    );
  };

  handleInputTextChange = (mediaName, mediaId, e) => {
    let tempArray = this.state.mediaCostArray;
    // id media cost array consists contains element for particular id
    // splice that media, then add new data
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].id === mediaId) {
        tempArray.splice(i, 1);
      }
    }

    let mediaCost = Number(e.target.value);
    tempArray.push({
      id: mediaId,
      name: mediaName,
      cost: mediaCost
    });
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].cost <= 0) {
        tempArray.splice(i, 1);
      }
    }

    this.setState({ mediaCostArray: tempArray });
  };

  getMediaInputValue = mediaId => {
    let tempArray = this.state.mediaCostArray;
    for (let val of tempArray) {
      if (val.id === mediaId) {
        return val.cost + "";
      }
    }
    return "";
  };

  renderHeader = () => {
    let col = ["Media Name", "Cost/ft. sq."];
    const th = (
      <tr>
        {col.map((p, index) => {
          return (
            <th key={index} className="text-center">
              {p}
            </th>
          );
        })}
      </tr>
    );
    return th;
  };

  renderInputTableBody = medias => {
    const tr = (
      <tbody>
        {medias.map((media, index) => {
          return (
            <tr key={index}>
              <td className="text-center">{media.name}</td>
              <td className="text-center">
                {" "}
                <input
                  className="text-center"
                  style={{ margin: "auto" }}
                  type="number"
                  placeholder=" Enter Cost/ft. sq."
                  value={this.getMediaInputValue(media.id)}
                  onChange={e => {
                    this.handleInputTextChange(media.name, media.id, e);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    );

    return tr;
  };

  renderMediasInputTextRows = medias => {
    if (medias.length <= 0) {
      return <div>CANNOT GET MEDIAS. PLEASE CHECK YOUR CONNECTION</div>;
    }

    return (
      <div className="row gutters-only">
        <div className="col-12">
          <div className="block">
            <div>
              <table className="table table-vcenter">
                <thead>{this.renderHeader()}</thead>
                {this.renderInputTableBody(medias)}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderMediasQuery = () => {
    return (
      <Query query={ALL_MEDIAS}>
        {({ loading, error, data }) => {
          if (error) {
            console.log(error);
            return <div>Error</div>;
          }

          if (loading) {
            return <div>Loading...</div>;
          }

          if (data) {
            return <div>{this.renderMediasInputTextRows(data.allMedias)}</div>;
          }

          return <div>Check your connection.</div>;
        }}
      </Query>
    );
  };

  // -- HUB SELECTION START

  handleHubOptionChange = changeEvent => {
    if (changeEvent.target.value === this.HUBRATE) {
      this.setState({ showHubRates: true });
    } else {
      this.setState({ showHubRates: false });
    }
  };

  renderHubSelectOption = () => {
    return (
      <div className="text-center">
        <label>Select Hub/Non-Hub:</label>
        <div className="radio" style={{ marginTop: 5 }}>
          <label className="mr-4">
            <input
              type="radio"
              value={this.HUBRATE}
              checked={this.state.showHubRates}
              onChange={this.handleHubOptionChange}
            />{" "}
            Hub
          </label>
          <label>
            <input
              type="radio"
              value={this.NONHUBRATE}
              checked={!this.state.showHubRates}
              onChange={this.handleHubOptionChange}
            />{" "}
            Non Hub
          </label>
        </div>
      </div>
    );
  };

  // -- HUB SELECTION ENDS

  //    -- NON HUB FIELDS START
  //    ---- NON HUB TRANSPORTATION AND INSTALLATION START
  renderNonHubRateForm = () => {
    return (
      <div>
        <form>
          <div className="col-12 form-group text-center ">
            <label className="col-6">Non-Hub Transportation Rate/km.</label>
            <input
              className="text-center col-6"
              style={{ margin: "5px" }}
              type="number"
              placeholder="Enter Rate"
              value={this.state.transportCost}
              onChange={e => {
                let cost = Number(e.target.value);
                this.setState({ transportCost: cost });
              }}
            />
          </div>
        </form>
        <form>
          <div className="col-12 form-group text-center">
            <label className="col-6">Non-Hub Installation Rate</label>
            <input
              className="text-center col-6"
              style={{ margin: "5px" }}
              type="number"
              placeholder="Enter Rate"
              value={this.state.installationCost}
              onChange={e => {
                let cost = Number(e.target.value);
                this.setState({ installationCost: cost });
              }}
            />
          </div>
        </form>
      </div>
    );
  };
  //    ---- NON HUB TRANSPORTATION AND INSTALLATION END
  //         -- RECCE FOR NON HUB START
  handleOptionChange = changeEvent => {
    if (changeEvent.target.value === this.PERSHOP) {
      this.setState({ recceRatePerShop: true });
    } else {
      this.setState({ recceRatePerShop: false });
    }
  };

  renderRecceRateAndPerType = () => {
    return (
      <div>
        <div>
          <div className="text-center">
            <label>Select Non Hub Recce Type:</label>
            <div className="radio" style={{ marginTop: 5 }}>
              <label className="mr-4">
                <input
                  type="radio"
                  value={this.PERSHOP}
                  checked={this.state.recceRatePerShop}
                  onChange={this.handleOptionChange}
                />{" "}
                Per Shop
              </label>
              <label>
                <input
                  type="radio"
                  value={this.PERSQFT}
                  checked={!this.state.recceRatePerShop}
                  onChange={this.handleOptionChange}
                />{" "}
                Per Sq. Ft.
              </label>
            </div>
          </div>
        </div>
        <div>
          <form>
            <div className="col-12 form-group text-center ">
              <label className="col-6"> Recce Rate</label>
              <input
                className="text-center col-6"
                style={{ margin: "5px" }}
                type="number"
                placeholder="Enter Recce Rate"
                value={this.state.recceRate}
                onChange={e => {
                  let cost = Number(e.target.value);
                  this.setState({ recceRate: cost });
                }}
              />
            </div>
          </form>
        </div>
      </div>
    );
  };
  //            -- RECCE FOR NON HUB END
  // -- NON HUB FIELDS END

  //    -- HUB FIELDS START

  //    ---- HUB TRANSPORTATION AND INSTALLATION START
  renderHubRateForm = () => {
    return (
      <div>
        <form>
          <div className="col-12 form-group text-center ">
            <label className="col-6">Hub Transportation Rate/km.</label>
            <input
              className="text-center col-6"
              style={{ margin: "5px" }}
              type="number"
              placeholder="Enter Rate"
              value={this.state.hubTransportationCost}
              onChange={e => {
                let cost = Number(e.target.value);
                this.setState({ hubTransportationCost: cost });
              }}
            />
          </div>
        </form>
        <form>
          <div className="col-12 form-group text-center">
            <label className="col-6">Hub Installation Rate</label>
            <input
              className="text-center col-6"
              style={{ margin: "5px" }}
              type="number"
              placeholder="Enter Rate"
              value={this.state.hubInstallationCost}
              onChange={e => {
                let cost = Number(e.target.value);
                this.setState({ hubInstallationCost: cost });
              }}
            />
          </div>
        </form>
      </div>
    );
  };
  //    ---- HUB TRANSPORTATION AND INSTALLATION END

  //         -- RECCE FOR HUB START
  handleHubRecceOptionChange = changeEvent => {
    if (changeEvent.target.value === this.HUBPERSHOP) {
      this.setState({ hubRecceRatePerShop: true });
    } else {
      this.setState({ hubRecceRatePerShop: false });
    }
  };

  renderHubRecceRateAndPerType = () => {
    return (
      <div>
        <div>
          <div className="text-center">
            <label>Select Hub Recce Type:</label>
            <div className="radio" style={{ marginTop: 5 }}>
              <label className="mr-4">
                <input
                  type="radio"
                  value={this.HUBPERSHOP}
                  checked={this.state.hubRecceRatePerShop}
                  onChange={this.handleHubRecceOptionChange}
                />{" "}
                Per Shop
              </label>
              <label>
                <input
                  type="radio"
                  value={this.HUBPERSQFT}
                  checked={!this.state.hubRecceRatePerShop}
                  onChange={this.handleHubRecceOptionChange}
                />{" "}
                Per Sq. Ft.
              </label>
            </div>
          </div>
        </div>
        <div>
          <form>
            <div className="col-12 form-group text-center ">
              <label className="col-6">Recce Rate</label>
              <input
                className="text-center col-6"
                style={{ margin: "5px" }}
                type="number"
                placeholder="Enter Recce Rate"
                value={this.state.hubRecceRate}
                onChange={e => {
                  let cost = Number(e.target.value);
                  this.setState({ hubRecceRate: cost });
                }}
              />
            </div>
          </form>
        </div>
      </div>
    );
  };

  //          -- RECCE FOR HUB END

  //     -- HUB FIELD END

  renderTransAndInstallCost = () => {
    return (
      <div className="col-12 text-center" style={{ margin: "auto" }}>
        {this.state.showHubRates
          ? this.renderHubRateForm()
          : this.renderNonHubRateForm()}
      </div>
    );
  };

  renderSelectedRecceForm = () => {
    if (!this.state.showHubRates) {
      return (
        <div className="form-group ">
          <label htmlFor="example-nf-email">Enter Recce Rate and Type:</label>
          {this.renderRecceRateAndPerType()}
        </div>
      );
    }

    return (
      <div className="form-group ">
        <label htmlFor="example-nf-email">Enter Recce Rate and Type:</label>
        {this.renderHubRecceRateAndPerType()}
      </div>
    );
  };

  checkIfCostIsValid = cost => {
    if (cost < 0 || isNaN(cost)) {
      return false;
    }
    return true;
  };

  renderEditPrinterQuotationMutation = () => {
    return (
      <Mutation mutation={EDIT_PRINTER_QUOTATION}>
        {(editPrinterQuotation, { data }) => (
          <div className="modal-footer">
            <button
              className="btn btn-primary"
              style={{ margin: "auto" }}
              type="button"
              onClick={e => {
                e.preventDefault();
                //check if city is selected
                if (
                  this.state.selectedCity.length <= 0 ||
                  this.state.selectedCityId.length <= 0
                ) {
                  Alert.closeAll();
                  Alert.error("City not selected", {
                    position: "top-right",
                    effect: "slide"
                  });
                  return;
                }
                //check if printer is selected
                if (this.props.printerQuotation.id.length <= 0) {
                  Alert.closeAll();
                  Alert.error("Printer not selected", {
                    position: "top-right",
                    effect: "slide"
                  });
                  return;
                }

                // check if media cost array is empty
                if (this.state.mediaCostArray.length <= 0) {
                  Alert.closeAll();
                  Alert.error(`Please Add Cost for atleast one media`, {
                    position: "top-right",
                    effect: "slide"
                  });
                  return;
                }

                //check if atleast one media is there, also check if the cost is valid for all medias
                for (let val of this.state.mediaCostArray) {
                  if (!this.checkIfCostIsValid(val.cost)) {
                    Alert.closeAll();
                    Alert.error(`Check cost for ${val.name}`, {
                      position: "top-right",
                      effect: "slide"
                    });
                    return;
                  }
                }

                // recce rate and rate type check
                if (!this.checkIfCostIsValid(this.state.recceRate)) {
                  Alert.closeAll();
                  Alert.error(`Check Recce Rate`, {
                    position: "top-right",
                    effect: "slide"
                  });
                  return;
                }

                // hub recce rate and rate type check
                if (!this.checkIfCostIsValid(this.state.hubRecceRate)) {
                  Alert.closeAll();
                  Alert.error(`Check Hub Recce Rate`, {
                    position: "top-right",
                    effect: "slide"
                  });
                  return;
                }

                // check if transport cost and installation cost is valid
                if (!this.checkIfCostIsValid(this.state.transportCost)) {
                  Alert.closeAll();
                  Alert.error(`Check Transport Cost`, {
                    position: "top-right",
                    effect: "slide"
                  });
                  return;
                }

                if (!this.checkIfCostIsValid(this.state.installationCost)) {
                  Alert.closeAll();
                  Alert.error(`Check Installation Cost`, {
                    position: "top-right",
                    effect: "slide"
                  });
                  return;
                }

                if (
                  !this.checkIfCostIsValid(this.state.hubTransportationCost)
                ) {
                  Alert.closeAll();
                  Alert.error(`Check Hub Transport Cost`, {
                    position: "top-right",
                    effect: "slide"
                  });
                  return;
                }

                if (!this.checkIfCostIsValid(this.state.hubInstallationCost)) {
                  Alert.closeAll();
                  Alert.error(`Check Hub Installation Cost`, {
                    position: "top-right",
                    effect: "slide"
                  });
                  return;
                }

                let mediaIdArray = [];
                let mediaCostArray = [];
                for (let val of this.state.mediaCostArray) {
                  mediaIdArray.push(val.id);
                  mediaCostArray.push(val.cost);
                }
                editPrinterQuotation({
                  variables: {
                    cityId: this.state.selectedCityId,
                    printerQuotationId: this.props.printerQuotation.id,
                    installationRate: this.state.installationCost,
                    transportationRate: this.state.transportCost,
                    mediaIdArray: mediaIdArray,
                    mediaCostArray: mediaCostArray,
                    recceRate: this.state.recceRate,
                    recceRatePerShop: this.state.recceRatePerShop,
                    hubRecceRate: this.state.hubRecceRate,
                    hubRecceRatePerShop: this.state.hubRecceRatePerShop,
                    hubTransportationRate: this.state.hubTransportationCost,
                    hubInstallationRate: this.state.hubInstallationCost
                  }
                })
                  .then(resp => {
                    // console.log(resp);
                    Alert.closeAll();
                    Alert.success(
                      `Done!! Printer Quotation for ${
                        this.props.printerQuotation.printer.name
                      } Edited`,
                      {
                        position: "top-right",
                        effect: "slide"
                      }
                    );
                  })
                  .catch(err => {
                    console.log(err.message);
                    Alert.closeAll();
                    Alert.error(`Error occured : ${err.message}`, {
                      position: "top-right",
                      effect: "slide"
                    });
                  });
              }}
            >
              Edit
            </button>
          </div>
        )}
      </Mutation>
    );
  };

  renderEditPrinterQuotationForm = () => {
    return (
      <div>
        <div id="page-container" className="main-content-boxed">
          <div id="main-container">
            <div className="content">
              <div>
                <div className="row">
                  <div
                    className="block"
                    style={{ width: "70%", margin: "0 auto" }}
                  >
                    <div className="block-content">
                      <div className="form-group ">
                        <label htmlFor="example-nf-email">Select City:</label>
                        {this.renderAllCitiesQuery()}
                      </div>
                    </div>
                    <div className="block-content">
                      <div className="form-group ">
                        <label htmlFor="example-nf-email">
                          Enter Media Rates:
                        </label>
                        {this.renderMediasQuery()}
                      </div>
                    </div>
                    <div className="block-content">
                      <div className="form-group ">
                        {this.renderHubSelectOption()}
                      </div>
                    </div>
                    <div className="block-content">
                      {this.renderSelectedRecceForm()}
                    </div>
                    <div className="block-content">
                      <div className="form-group ">
                        <label htmlFor="example-nf-email">
                          Enter Other Rates:
                        </label>
                        {this.renderTransAndInstallCost()}
                      </div>
                    </div>
                    <div className="form-group">
                      <div>{this.renderEditPrinterQuotationMutation()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render = () => {
    console.log(this.props.printerQuotation);
    return (
      <div>
        <div>
          <div id="page-container" className="main-content-boxed">
            <div id="page-header" className="bg-gray-lighter">
              <div className="content p-0">
                <div className="content-header">
                  <strong>Edit Printer Quotation </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="main-container">
          <div>{this.renderEditPrinterQuotationForm()}</div>
        </div>
      </div>
    );
  };
}

export default EditPrinterQuotation;
