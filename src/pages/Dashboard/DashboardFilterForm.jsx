import React, { Component } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class DashboardFilterForm extends Component {
	state = {
		urgent: this.props.urgent,
		campaign: (this.props.campaignId)?this.props.data.campaigns.filter(p => p.value === this.props.campaignId)[0]:[],
		city: [],	
		category: [],
		cluster: this.props.user.cluster ? [{label: this.props.user.cluster.name,value: this.props.user.cluster.id}] : [],
		zone: [],
		type: this.props.user.type ? [{label: this.props.user.type.name,value: this.props.user.type.id}] : []
	};

	componentWillReceiveProps(nextProps)
	{
		this.setState({urgent: nextProps.urgent})
	}

	render() {
		console.log(this.props.user)
		return (
			<div>
					<form>
					<div className="form-group row items-push">
					<div className="col-4">
					<label>Select Campaign:</label>
					<Select
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
							disabled={(this.props.user.type)?true: false}
							name="type"
							multi={true}
							className="mr-3"
							placeholder="Type"
							// value={this.state.typeid}
							value={this.state.type}
							options={this.props.user.type ? [{label: this.props.user.type.name,value: this.props.user.type.id}] : this.props.data.types}
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
							disabled={(this.props.user.cluster)?true: false}
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
						<div className="col-4">
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
						</div>
						<div className="col-4">
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
						</div>
						<div className="col-2">

						<button
							className="btn btn-sm btn-rounded btn-success upload-action-btn dashboard-filter-btn"
							onClick={e => {
								e.preventDefault();
								this.props.loadUrgentStores();
							}}
						>
							{(this.state.urgent==='all')?"Urgent Stores":"All Stores"}
						</button>
						</div>

						<div className="col-2">

						<button
							className="btn btn-sm btn-rounded btn-success upload-action-btn dashboard-filter-btn"
							onClick={e => {
								e.preventDefault();
								this.props.generateReport(this.state);
							}}
						>
							Filter Stores
						</button>
						</div>

					</div>
				</form>
			</div>
		);
	}
}

export default DashboardFilterForm;
