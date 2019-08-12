import * as React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import Select from "react-select";
import Alert from "react-s-alert";
import PrinterQuotationPage from "./PrinterQuotationPage";
import EditPrinterQuotation from "./EditPrinterQuotation";

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
        id
        name
      }
      city{
        id
        name
      }
      mediaRates{
        media{
          id
          name
        }
        rate
      }
      transportationRate
      installationRate
      hubTransportationRate
      hubInstallationRate
      hubRecceRate
      hubRecceRatePerShop
      recceRate
      recceRatePerShop
    }
  }
`;

export default class PrinterQuotationContainer extends React.Component {
  state = {
    selectedPrinterId: "",
    selectedPrinter: ""
  };

  renderAddPrinterQuotationPage = () => {
    return (
      <div>
        <PrinterQuotationPage
          printerId={this.state.selectedPrinterId}
          printerName={this.state.selectedPrinter}
        />
      </div>
    );
  };

  checkNumberVal = (val) =>{
    if(val===null || val ===undefined){
      return -1
    }
    return val;
  }

  checkBooleanVal = (val) => {
    if(val === null || val === undefined){
      return false
    }
    return val;
  }

  renderEditPrinterQuotationPage = printerQuot => {
    if (!printerQuot.id) {
      return <div>Check Printer Quotation</div>;
    }
    let tempArr = [];
    for(let val of printerQuot.mediaRates){
      tempArr.push({
        id:val.media.id,
        name: val.media.name,
        cost: val.rate
      });
    }
    // rates, disstance can be zero and js takes 0 as false
    // this would cause problem now when we are updating datamodel and other field
    let hubRecceRate = this.checkNumberVal(printerQuot.hubRecceRate);
    let hubRecceRatePerShop = this.checkBooleanVal(printerQuot.hubRecceRatePerShop);
    let hubInstallationRate = this.checkNumberVal(printerQuot.hubInstallationRate);
    let hubTransportationRate = this.checkNumberVal(printerQuot.hubTransportationRate);
    return (
      <div>
        <EditPrinterQuotation
          printerId={this.state.selectedPrinterId}
          printerName={this.state.selectedPrinter}
          printerQuotation={printerQuot}
          hubRecceRate={hubRecceRate}
          hubRecceRatePerShop = {hubRecceRatePerShop}
          hubInstallationRate = {hubInstallationRate}
          hubTransportationRate = {hubTransportationRate}
          mediaRatesArr = {tempArr}
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
            // checking if object is empty
            // was causing problem after we were running edit mutation
            // data was coming empty
            if(Object.keys(data).length === 0){
              return <div/>;
            }
            if (this.checkPrinterQuotation(data)) {
              return (
                <div>
                  {this.renderEditPrinterQuotationPage(
                    data.getPrinterQuotation
                  )}
                </div>
              );
            }
            return <div>{this.renderAddPrinterQuotationPage()}</div>;
          }

          return <div>Check your connection.</div>;
        }}
      </Query>
    );
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

  getSelectedPrinter = () => {
    if (this.state.selectedPrinterId.length > 0) {
      return {
        value: this.state.selectedPrinterId,
        label: this.state.selectedPrinter
      };
    }
    return null;
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
