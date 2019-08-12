import React, { Component } from "react";
import PrintersTableWrapper from "./PrintersTableWrapper";

class Printers extends Component {
  render() {
    return (
      <div>
        <div id="main-container">
          <div className="content">
            <div className="animated fadeIn">
            <PrintersTableWrapper {...this.props} />
              {/* {this.props.user.role === "PRINTER" ? (
                <PrintersTableWrapper {...this.props} />
              ) : null} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Printers;
