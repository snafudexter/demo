import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Select from "react-select";
import { graphql, Query } from "react-apollo";
import gql from "graphql-tag";
import _ from "underscore";
import InstallationTableWrapper from './InstallationTableWrapper'

class CustomInstallationReportsForm extends React.Component {
    state= {
        selectedOption: "installation",
        campaign: ""
    }

    // componentWillReceiveProps(){
    // }

    render(){
        return(
            <div>
                <form>
                <div className="row block-content pb-4 bg-white">
                    <div className="col-4" style={{marginBottom: 30}}>
                        <label>Select Start Date:</label>
                        <DatePicker
                        className="mr-3"
                        selected={this.state.startDates}
                        onChange={(val) => {
                            var d = moment(val).format();
                            this.setState({ startDates: val });
                            this.setState({ startDate: d });
                        }}
                        />
                    </div>
                    <div className="col-4">
                        <label>Select End Date:</label>
                        <DatePicker
                        className="mr-3"
                        selected={this.state.endDates}
                        onChange={(val) => {
                            this.setState({ endDates: val });
                            var d = moment(val).format();
                            this.setState({ endDate: d });
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
                            value={this.state.type}
                            options={this.props.data.types}
                            onChange={val => {
                            this.setState({ type: val });
                            }}
                        />
                    </div>
                    <div className="col-4">
                        <button
                            className="btn btn-sm btn-rounded btn-success upload-action-btn dashboard-filter-btn"
                            onClick={e => {
                            e.preventDefault();
                            this.props.generateReport(this.state);
                        }}
                        >
                            Generate Reports
                        </button>
                    </div>
                </div>
                </form>
            </div>
        )
    }
}

export default CustomInstallationReportsForm;