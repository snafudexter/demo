import * as React from "react";

class ViewPrinterQuotation extends React.Component {
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

  checkNumberVal = val => {
    if (val === null || val === undefined) {
      return -1;
    }
    return val;
  };

  checkBooleanVal = val => {
    if (val === null || val === undefined) {
      return false;
    }
    return val;
  };

  renderHubRates = printerQuotInfo => {
    return (
      <div>
        <div className="block-content">
          <div className="form-group ">
            <div
              className="text-center"
              style={{ margin: "auto", fontSize: "16px" }}
            >
              {this.checkBooleanVal(printerQuotInfo.hubRecceRatePerShop) ? (
                <div>
                  Hub Recce Rate Per Shop :{" "}
                  {this.checkNumberVal(printerQuotInfo.hubRecceRate)}
                </div>
              ) : (
                <div>
                  Hub Recce Rate Per Sq. Ft. :{" "}
                  {this.checkNumberVal(printerQuotInfo.hubRecceRate)}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="block-content">
          <div className="form-group ">
            <div
              className="text-center"
              style={{ margin: "auto", fontSize: "16px" }}
            >
              Hub Transportation Rate/km. :{" "}
              {this.checkNumberVal(printerQuotInfo.hubTransportationRate)}
            </div>
          </div>
        </div>
        <div className="block-content">
          <div className="form-group ">
            <div
              className="text-center"
              style={{ margin: "auto", fontSize: "16px" }}
            >
              Hub Installation Rate :{" "}
              {this.checkNumberVal(printerQuotInfo.hubInstallationRate)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderNonHubRates = printerQuotInfo => {
    return (
      <div>
        <div className="block-content">
          <div className="form-group ">
            <div
              className="text-center"
              style={{ margin: "auto", fontSize: "16px" }}
            >
              {printerQuotInfo.recceRatePerShop ? (
                <div>Recce Rate Per Shop : {printerQuotInfo.recceRate}</div>
              ) : (
                <div>Recce Rate Per Sq. Ft. : {printerQuotInfo.recceRate}</div>
              )}
            </div>
          </div>
        </div>
        <div className="block-content">
          <div className="form-group ">
            <div
              className="text-center"
              style={{ margin: "auto", fontSize: "16px" }}
            >
              Transportation Rate/km. : {printerQuotInfo.transportationRate}
            </div>
          </div>
        </div>
        <div className="block-content">
          <div className="form-group ">
            <div
              className="text-center"
              style={{ margin: "auto", fontSize: "16px" }}
            >
              Installation Rate : {printerQuotInfo.installationRate}
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderPrinterQuotationInfoForm = printerQuotInfo => {
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
                        <h5
                          className="content-heading text-center"
                          style={{ margin: "auto" }}
                        >
                          <strong> Printer name </strong> :{" "}
                          {printerQuotInfo.printer.name}
                        </h5>
                      </div>
                    </div>
                    <div className="block-content">
                      <div className="form-group ">
                        <div
                          className="text-center"
                          style={{ margin: "auto", fontSize: "18px" }}
                        >
                          City : {printerQuotInfo.city.name}
                        </div>
                      </div>
                    </div>
                    <div className="block-content">
                      <div className="form-group ">
                        {this.renderMediasRates(printerQuotInfo.mediaRates)}
                      </div>
                    </div>
                    <div>{this.renderHubRates(printerQuotInfo)}</div>
                    <div>{this.renderNonHubRates(printerQuotInfo)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderPrinterQuotationInfo = printerQuotInfo => {
    return (
      <div>
        <div id="page-container" className="main-content-boxed">
          <div id="page-header" className="bg-gray-lighter">
            <div className="content p-0">
              <div className="content-header">
                <strong> Printer Quotation Information</strong>
              </div>
            </div>
          </div>
        </div>
        <div id="main-container">
          <div>{this.renderPrinterQuotationInfoForm(printerQuotInfo)}</div>
        </div>
      </div>
    );
  };

  render = () => {
    return (
      <div className="container">
        {this.renderPrinterQuotationInfo(this.props.printerQuotation)}
      </div>
    );
  };
}

export default ViewPrinterQuotation;
