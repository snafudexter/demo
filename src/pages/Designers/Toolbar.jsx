import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import Alert from "react-s-alert";
import * as XLSX from "xlsx";
import moment from "moment";

class Toolbar extends Component {
  ADSPOT_DOWNLOADED = "adspotDownloaded";
  ADSPOT_NOT_DOWNLOADED = "adspotNotDownloaded";
  ALL_ADSPOTS = "allAdspots";

  // will show only those adspots where design done is false,
  // and hopefully after mutation they are now set as true
  initiateXLSXDownload = () => {
    let tasks = this.props.selectedTasks;
    if (tasks.length <= 0) {
      Alert.error("No Adspots Selected! Cannot make CSV", {
        position: "top-right",
        effect: "slide"
      });
      return;
    }
    // // first we will make json array of only those adspots which have design done
    // // as false
    // const filteredAdspots = tasks.filter(task => {
    //   // console.log(task);
    //   return task.isDownloaded === "NO";
    // });
    // if (filteredAdspots.length <= 0) {
    //   Alert.error(
    //     "Could Not Export CSV. All Selected Adspot Design Already Done",
    //     {
    //       position: "top-right",
    //       effect: "slide"
    //     }
    //   );
    //   return;
    // }

    const workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(tasks);
    // for file name
    let username = this.props.username ? this.props.username : "N/A";
    let date = moment().format("DD/MM/YYYY");
    let fileName = `${date}/${username}`;
    // for file name ends
    XLSX.utils.book_append_sheet(workbook, worksheet, "DesignerAdspots");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  // here tasks are actually adspots
  handleAssignDesigner = () => {
    let tasks = this.props.selectedTasks;
    if (tasks.length === 0) {
      Alert.error("No Adspots Selected! Cannot Proceed Forward", {
        position: "top-right",
        effect: "slide"
      });
      return;
    }

    let tasksArr = [];
    tasks.map(task => {
      tasksArr.push(task.id);
    });

    // running mutaiton to mark adspot design done to true
    this.props
      .markAdSpotDownloaded({
        variables: {
          id: tasksArr
        }
      })
      .then(response => {
        // console.log(response);
        Alert.success(
          `${response.data.markAdSpotDownloaded.count} adspots marked as Downloaded!.`,
          {
            position: "top-right",
            effect: "slide"
          }
        );
        this.initiateXLSXDownload();
        this.props.tasksRefetch();
      })
      .catch(error => {
        // console.log(error);
        Alert.error("An error occured please try again later!", {
          position: "top-right",
          effect: "slide"
        });
      });
  };

  render() {
    if (this.props.loading) {
      return <span className="float-right">Loading...</span>;
    }

    return (
      <div>
        <div className="float-left" style={{ margin: "20px" }}>
          <button
            type="button"
            className="btn btn-sm btn-rounded btn-info ml-3 float-right"
            onClick={e => {
              e.preventDefault();
              this.props.setFilterType(this.ADSPOT_DOWNLOADED);
            }}
          >
            <i className="fa  mr-1" />
            DOWNLOADED
          </button>
          <button
            type="button"
            className="btn btn-sm btn-rounded btn-info ml-3 float-right"
            onClick={e => {
              e.preventDefault();
              this.props.setFilterType(this.ADSPOT_NOT_DOWNLOADED);
            }}
          >
            <i className="fa  mr-1" />
            NOT DOWNLOADED
          </button>
          <button
            type="button"
            className="btn btn-sm btn-rounded btn-info ml-3 float-right"
            onClick={e => {
              e.preventDefault();
              this.props.setFilterType(this.ALL_ADSPOTS);
            }}
          >
            <i className="fa  mr-1" />
            ALL
          </button>
        </div>
        <div className="float-right" style={{ margin: "20px" }}>
          <button
            type="button"
            className="btn btn-sm btn-rounded btn-success float-right"
            onClick={e => {
              e.preventDefault();
              this.handleAssignDesigner();
            }}
          >
            <i className="fa fa-check mr-1" />
             Download CSV
          </button>
        </div>
      </div>
    );
  }

}

const MARK_DOWNLOADED = gql`
  mutation markAdSpotDownloaded($id: [ID!]!) {
    markAdSpotDownloaded(id: $id) {
      count
    }
  }
`;
export default compose(graphql(MARK_DOWNLOADED, { name: "markAdSpotDownloaded" }))(Toolbar);

Toolbar.propTypes = {};
