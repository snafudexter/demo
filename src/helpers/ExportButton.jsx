import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import moment from "moment";
import Papa from "papaparse";

import { CSVLink } from "react-csv";

export default class ExportButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableExport: false,
      csvData: {}
    };
  }

  handleApproveTasks = () => {
    this.setState({ enableExport: true });

    // var csvData = Papa.unparse(this.props.tasks);
    // Papa.download(Papa.unparse(this.props.tasks), "data.csv");
    // Papa.download(Papa.parse(csv), "data.json");
    this.setState({ enableExport: true });
    // console.log(csv);
  };

  render() {
    return (
      <div>
        {/* <button
                type="button"
                className="btn btn-success float-right"
                onClick={this.handleApproveTasks}
                >
                  Download Report
              </button> */}
        <div>
          <CSVLink
            filename={"Report.csv"}
            className="btn btn-primary"
            target="_blank"
            data={getModedTask(this.props.tasks)}
            target="_blank"
          >
            Download Report
          </CSVLink>
        </div>
      </div>
    );
  }
}

const getModedTask = tasks => {
  let t = [];
  for (let a of tasks) {
    if ('bajajReviewDate' in a) {
      a["reviewDate"] = a.bajajReviewDate;
      delete a["bajajReviewDate"];
    }
    t.push(a);
  }
  return t;
};
