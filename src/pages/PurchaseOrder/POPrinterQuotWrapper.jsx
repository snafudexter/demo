import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ExportCSVButton from "./ExportCSVButton";
import ViewPrinterQuotation from "../PrinterQuotation/ViewPrinterQuotation";

const PO_TOTAL_DIST = gql`
  query getPOTotalDistance(
    $sourceLat: Float!
    $sourceLng: Float!
    $destLat: Float!
    $destLng: Float!
  ) {
    getPOTotalDistance(
      sourceLat: $sourceLat
      sourceLng: $sourceLng
      destLat: $destLat
      destLng: $destLng
    )
  }
`;
class POPrinterQuotWrapper extends React.Component {
  state = {
    totalDistance: -1
  };

  totalDistanceFromDM = -1;

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

  renderInputTableBody = mediaRates => {
    const tr = (
      <tbody>
        {mediaRates.map((mediaRate, index) => {
          return (
            <tr key={index}>
              <td className="text-center">{mediaRate.media.name}</td>
              <td className="text-center">{mediaRate.rate}</td>
            </tr>
          );
        })}
      </tbody>
    );

    return tr;
  };

  renderMediasRates = medias => {
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

  getDistance = () => {
    if (this.totalDistanceFromDM >= 0) {
      return this.totalDistanceFromDM;
    }
    return this.state.totalDistance;
  };

  renderExportCSVButton = () => {
    return (
      <div
        className="block-options text-center"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        <ExportCSVButton
          allTasks={this.props.allTasks}
          selectedTasks={this.props.selectedTasks}
          printerQuotation={this.props.printerQuotation}
          totalDistance={this.getDistance()}
          selectedCity={this.props.selectedCity}
          selectedCityId={this.props.selectedCityId}
        />
      </div>
    );
  };

  renderPrinterQuotationInfo = () => {
    return (
      <div>
        <div id="page-container" className="main-content-boxed">
          <h2 className="content-heading">
            <small>Printer Quotation Information</small>
          </h2>
        </div>
        <div id="main-container">
          <div><ViewPrinterQuotation printerQuotation = {this.props.printerQuotation} /></div>
        </div>
        <div>{this.renderTotalPODistanceQuery()}</div>
      </div>
    );
  };

  renderTransportDistanceInput = () => {
    // if the  distance matrix distance is -1 which means the distnace wass not set
    // by api
    if (this.totalDistanceFromDM < 0) {
      return (
        <div>
          <label>Some Error Occured While Calculating Distance.</label>
          <br />
          <label>Please Enter Total Distance</label>
          <br />
          <input
            className="text-center"
            style={{ margin: "auto" }}
            type="number"
            placeholder="Enter Distance"
            value={this.state.totalDistance}
            onChange={e => {
              let val = Number(e.target.value);
              this.setState({ totalDistance: val });
            }}
          />
        </div>
      );
    } else {
      // id distance is greater thatn or equal to 0 use it
      return (
        <div>
          <label>Total Distance</label>
          <br />
          <label>
            Distance between {this.props.selectedCity} and{" "}
            {this.props.printerQuotation.city.name} is{" "}
            {this.totalDistanceFromDM}
          </label>
        </div>
      );
    }
  };

  renderTotalPODistanceQuery = () => {
    return (
      <Query
        query={PO_TOTAL_DIST}
        variables={{
          sourceLat: this.props.selectedCityLatLng.lat,
          sourceLng: this.props.selectedCityLatLng.lng,
          destLat: this.props.printerQuotation.city.lat,
          destLng: this.props.printerQuotation.city.lng
        }}
      >
        {({ loading, error, data }) => {
          if (error) {
            console.log(error);
          }

          if (loading) {
            console.log(loading);
          }

          if (data) {
            if (data.getPOTotalDistance) {
              this.totalDistanceFromDM = data.getPOTotalDistance;
              return <div>{this.renderDistanceInputViewAndExportButton()}</div>;
            }
          }
          // in some case we will still show the distance input field
          this.totalDistanceFromDM = -1;
          return <div>{this.renderDistanceInputViewAndExportButton()}</div>;
        }}
      </Query>
    );
  };

  renderDistanceInputViewAndExportButton = () => {
    return (
      <div>
        <div className="block-content">
          <div className="form-group ">
            <div
              className="text-center"
              style={{ margin: "auto", fontSize: "16px" }}
            >
              {this.renderTransportDistanceInput()}
            </div>
            <div>{this.renderExportCSVButton()}</div>
          </div>
        </div>
      </div>
    );
  };

  render = () => {
    return (
      <div className="container">
        <div>
          {this.renderPrinterQuotationInfo()}
        </div>
      </div>
    );
  };
}

export default POPrinterQuotWrapper;
