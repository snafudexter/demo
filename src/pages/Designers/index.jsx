import React, { Component } from "react";

import DesignersTableWrapper from "./DesignersTableWrapper";

class Designers extends Component {
  render() {
    return (
      <div>
        <div id="main-container">
          <div className="content">
            <div className="animated fadeIn">
              <DesignersTableWrapper {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Designers;
