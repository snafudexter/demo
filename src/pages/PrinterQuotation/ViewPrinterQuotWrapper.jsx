import * as React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Select from "react-select";
import ViewPrinterQuotation from "./ViewPrinterQuotation";

const GET_USER_LIST = gql`
  query getUserList($role: String) {
    getUserList(role: $role) {
      id
      name
    }
  }
`;

const GET_PRINTER_QUOTATION = gql`
  query getPrinterQuotation($printerId: ID!) {
    getPrinterQuotation(printerId: $printerId) {
      id
      printer {
        name
      }
      city {
        name
      }
      mediaRates {
        rate
        media {
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

class ViewPrinterQuotWrapper extends React.Component {
  state = {
    selectedPrinterId: "",
    selectedPrinter: ""
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
        variables={{ printerId: this.state.selectedPrinterId }}
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
                  <ViewPrinterQuotation
                    printerQuotation={data.getPrinterQuotation}
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
      <div>
        <div>
          <h2 className="content-heading">
            {this.state.selectedPrinterId <= 0
              ? `Please select a Printer`
              : `Selected Printer : ${this.state.selectedPrinter}`}
          </h2>
          <div style={{ width: "60%", margin: "auto" }}>
            <Select
              name="printer"
              placeholder="Select Printer"
              value={this.getSelectedPrinter()}
              options={this.formatPrintersData(printers)}
              onChange={val => {
                if (!val) {
                  this.setState({
                    selectedPrinter: "",
                    selectedPrinterId: ""
                  });
                  return;
                }
                this.setState({
                  selectedPrinterId: val.value,
                  selectedPrinter: val.label
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

  render = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            {this.renderAllPrintersQuery()}
          </div>
        </div>
        <div>
          {this.state.selectedPrinterId.length <= 0 ? (
            <div />
          ) : (
            this.renderGetPrinterQuotations()
          )}
        </div>
      </div>
    );
  };
}

export default ViewPrinterQuotWrapper;
