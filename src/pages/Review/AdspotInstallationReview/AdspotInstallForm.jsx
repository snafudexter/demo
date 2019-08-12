import React, { Component } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

class AdspotInstallForm extends Component {
  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };
  state = {
    selectedOption: "ad_spots",
    city: "",
    category: "",
    cluster: [],
    zone: "",
    type: [],
    table_type: "",
    campaign: ""
  };
  render() {
    return (
      <div>
        <form>
          <div className="form-group row items-push">
            <div className="col-4">
              <label>Select Campaign:</label>
              <Select
                multi={true}
                name="campaign"
                className="mr-3"
                placeholder="Campaign"
                value={this.state.campaign}
                options={this.props.data.campaigns}
                onChange={val => {
                  this.setState({ campaign: val });
                }}
              />
            </div>
            <div className="col-4">
              <label>Select City:</label>
              <Select
                multi={true}
                name="city"
                className="mr-3"
                placeholder="City"
                // value={this.state.cityid}
                value={this.state.city}
                options={this.props.data.cities}
                onChange={val => {
                  this.setState({ city: val });
                }}
              />
            </div>
            <div className="col-4">
              <label>Select Business Type:</label>
              <Select
                name="type"
                multi={true}
                className="mr-3"
                placeholder="Type"
                // value={this.state.typeid}
                value={this.state.type}
                options={this.props.data.types}
                onChange={val => {
                  this.setState({ type: val });
                }}
              />
            </div>
            <div className="col-4">
              <label>Select Category:</label>
              <Select
                name="category"
                multi={true}
                className="mr-3"
                placeholder="Category"
                // value={this.state.categoryid}
                value={this.state.category}
                options={this.props.data.categories}
                onChange={val => {
                  this.setState({ category: val });
                }}
              />
            </div>
            <div className="col-4">
              <label>Select Zone:</label>
              <Select
                name="zone"
                multi={true}
                className="mr-3"
                placeholder="Zone"
                // value={this.state.zoneid}
                value={this.state.zone}
                options={this.props.data.zones}
                onChange={val => {
                  this.setState({ zone: val });
                }}
              />
            </div>
            <div className="col-4">
              <label>Select Cluster:</label>
              <Select
                name="cluster"
                multi={true}
                className="mr-3"
                placeholder="Cluster"
                // value={this.state.clusterid}
                value={this.state.cluster}
                options={this.props.data.clusters}
                onChange={val => {
                  this.setState({ cluster: val });
                }}
              />
            </div>
            {/* <div className="col-4">
              <label>Select Start Date:</label>
              <DatePicker
                className="mr-3"
                selected={this.state.startDates}
                onChange={val => {
                  var d = moment(val).format();
                  this.setState({ startDates: val });
                  this.setState({ startDate: d });
                }}
              />
            </div> */}
            {/* <div className="col-4">
              <label>Select End Date:</label>
              <DatePicker
                className="mr-3"
                selected={this.state.endDates}
                onChange={val => {
                  this.setState({ endDates: val });
                  var d = moment(val).format();
                  this.setState({ endDate: d });
                }}
              />
            </div> */}
            {/* <div className="col-4">
              <label>Select Row Format:</label>
              <div className="radio" style={{ marginTop: 5 }}>
                <label className="mr-4">
                  <input
                    type="radio"
                    value="ad_spots"
                    checked={this.state.selectedOption === "ad_spots"}
                    onChange={this.handleOptionChange}
                  />{" "}
                  Ad Spots
                </label>
                <label>
                  <input
                    type="radio"
                    value="tasks"
                    checked={this.state.selectedOption === "tasks"}
                    onChange={this.handleOptionChange}
                  />{" "}
                  Tasks
                </label>
              </div>
            </div> */}
            <div className="col-4">
              <button
                className="btn btn-sm btn-rounded btn-success upload-action-btn dashboard-filter-btn"
                onClick={e => {
                  e.preventDefault();
                  this.props.generateReport(this.state);
                }}
              >
                Filter Adspots
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AdspotInstallForm;
