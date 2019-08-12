import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class CsvTableItem extends Component {

	started = false;

	componentWillReceiveProps(nextProps)
	{
		if(nextProps.start===this.props.no)
		{
			if(!this.started){
				this.startBranding()
				this.started = true;
			}
		}
	}


	state = {
		dealercode: this.props.dealercode,
		name: this.props.dealername,
		address: this.props.dealeraddress,
		retailername: this.props.retailercontactperson,
		retailernumber: this.props.retailercontactno,
		asmname: this.props.asmname,
		asmnumber: this.props.asmmobile,
		categoryid: this.props.categoryid,
		cityid: this.props.cityid,
		cityname: this.props.city,
		categoryname: this.props.subcategory,
		message: "",
		error: false
	};
	startBranding = () => {
		
		let valid = true;
		if (
			this.state.address === '' ||
			this.state.name === '' ||
			isNaN(this.state.dealercode) ||
			!this.state.categoryid ||
			!this.state.cityid
		) {
			valid = false;
			this.props.onProgress( {status: false,
				selectedStore:{
					dealercode: Number(this.state.dealercode),
					dealername: this.state.name,
					dealeraddress: this.state.address,
					asmname: this.state.asmname,
					asmmobile: Number(this.state.asmnumber),
					retailercontactperson: this.state.retailername,
					retailercontactno: Number(this.state.retailernumber),
					subcategory: this.state.categoryname,
					city: this.state.cityname}})
					this.setState({message:"Check all fields!", error: true})
		}
		if (valid) {
			var d = new Date().getTime();
			this.props.startBranding({
				variables: {
					campaign: this.props.campaign.value ? this.props.campaign.value : '',
					dealerCode: Number(this.state.dealercode),
					dealerName: this.state.name,
					dealerAddress: this.state.address,
					asmName: this.state.asmname,
					asmNo: this.state.asmnumber,
					retailerName: this.state.retailername,
					retailerNo: this.state.retailernumber,
					categoryId: this.state.categoryid,
					cityId: this.state.cityid,
				},
			}).then(response => {
				d = new Date().getTime() - d;
				console.log('time passed since mutation call ' + d )
					this.setState({ message: 'Branding Started!' });
					this.props.onProgress( {status: true,
											selectedStore:	{
												dealercode: Number(this.state.dealercode),
												dealername: this.state.name,
												dealeraddress: this.state.address,
												asmname: this.state.asmname,
												asmmobile: Number(this.state.asmnumber),
												retailercontactperson: this.state.retailername,
												retailercontactno: Number(this.state.retailernumber),
												subcategory: this.state.categoryname,
												city: this.state.cityname}})
				}).catch((error) => {
					console.log(error)
					if(error.graphQLErrors[0]) {
						if(error.graphQLErrors[0].message === "Store Already Active") {
							this.props.onProgress( {status: true,
								selectedStore:	{
									dealercode: Number(this.state.dealercode),
									dealername: this.state.name,
									dealeraddress: this.state.address,
									asmname: this.state.asmname,
									asmmobile: Number(this.state.asmnumber),
									retailercontactperson: this.state.retailername,
									retailercontactno: Number(this.state.retailernumber),
									subcategory: this.state.categoryname,
									city: this.state.cityname}})
							this.setState({
								message: error.graphQLErrors[0].message,
								error: true
							});
						}else {
							this.props.onProgress( {status: false,
								selectedStore:	{
									dealercode: Number(this.state.dealercode),
									dealername: this.state.name,
									dealeraddress: this.state.address,
									asmname: this.state.asmname,
									asmmobile: Number(this.state.asmnumber),
									retailercontactperson: this.state.retailername,
									retailercontactno: Number(this.state.retailernumber),
									subcategory: this.state.categoryname,
									city: this.state.cityname}})
							this.setState({
								message: 'An error occurred!',
								error: true
							});
						}
					}
					else{
						this.setState({
							message: 'An error occurred!',
							error: true
						});
					}
        });
		}
		else{
			this.setState({
				message: 'Data not valid!',
				error: true
			});
		}
	};
	handleChangeCity = val => {
		if (val) {
			this.setState({ cityid: val.value, cityname: val.name });
		} else {
			this.setState({ cityid: null });
		}
	};
	handleChangeCategory = val => {
		if (val) {
			this.setState({ categoryid: val.value });
		} else {
			this.setState({ categoryid: null });
		}
	};
	handleChangeName = event => {
		this.setState({ name: event.target.value });
	};
	handleChangeAddress = event => {
		this.setState({ address: event.target.value });
	};
	handleChangeRetailerName = event => {
		this.setState({ retailername: event.target.value });
	};
	handleChangeRetailerNumber = event => {
		this.setState({ retailernumber: event.target.value });
	};
	handleChangeAsmName = event => {
		this.setState({ asmname: event.target.value });
	};
	handleChangeAsmNumber = event => {
		this.setState({ asmnumber: event.target.value });
	};
	renderBrandingButton = () => {
		const message = classNames({ 'zor-text-error': this.state.error });
		if(this.state.message === "") {
			return (
				<button
					className="btn btn-sm btn-rounded btn-success upload-action-btn"
					onClick={this.startBranding}
				>
        	Start Branding
      	</button>
			)
		} else {
			return (
				<strong style={{'color':'green'}} className={message}>
					{this.state.message}
				</strong>
			)
		}
	}


	renderCampaign()
	{
		if(this.props.campaign.label)
		{
			return (<strong >{this.props.campaign.label}</strong>);
		}
		else{
			return (<strong >None</strong>);
		}
	}



	render() {
		console.log(this.props)
		const error = this.state.error;
		return (
			<tr className="danger" >
				<td>{this.renderCampaign()}</td>
				<td>
					{this.renderBrandingButton()}
				</td>
				<th className="text-center">
					{this.props.dealercode ? (
						<input
							className={this.state.dealercode != '' ? 'form-control' : 'form-control is-invalid'}
							type="text"
							value={this.state.dealercode}
							disabled={true}
						/>
					) : (
						''
					)}
				</th>
				<td>
					{this.props.city ? (
						<Select
							name="city"
							placeholder="City"
							value={this.state.cityid}
							options={this.props.cities}
							onChange={val => {
								this.handleChangeCity(val);
							}}
						/>
					) : (
						''
					)}
				</td>
				<td>
					{this.props.categoryid ? (
						<Select
							name="category"
							placeholder="Category"
							value={this.state.categoryid}
							options={this.props.categories}
							onChange={val => {
								this.handleChangeCategory(val);
							}}
						/>
					) : (
						''
					)}
				</td>
				<td>
					{this.props.dealername ? (
						<input
							className={this.state.name != '' ? 'form-control' : 'form-control is-invalid'}
							type="text"
							value={this.state.name}
							onChange={this.handleChangeName}
						/>
					) : (
						''
					)}
				</td>
				<td>
					{this.props.dealeraddress ? (
						<input
							className={this.state.address != '' ? 'form-control' : 'form-control is-invalid'}
							type="text"
							value={this.state.address}
							onChange={this.handleChangeAddress}
						/>
					) : (
						''
					)}
				</td>
				<td>
					{this.props.retailercontactperson ? (
						<input
							type="text"
							className="form-control"
							value={this.state.retailername}
							onChange={this.handleChangeRetailerName}
						/>
					) : (
						''
					)}
				</td>
				<td>
					{this.props.retailercontactno ? (
						<input
							type="text"
							className="form-control"
							value={this.state.retailernumber}
							onChange={this.handleChangeRetailerNumber}
						/>
					) : (
						''
					)}
				</td>
				<td>
					{this.props.asmname ? (
						<input
							className="form-control"
							type="text"
							value={this.state.asmname}
							onChange={this.handleChangeAsmName}
						/>
					) : (
						''
					)}
				</td>
				<td>
					{this.props.asmmobile ? (
						<input
							className="form-control"
							type="text"
							value={this.state.asmnumber}
							onChange={this.handleChangeAsmNumber}
						/>
					) : (
						''
					)}
				</td>
			</tr>
		);
	}
}

const START_BRANDING = gql`
  mutation startBranding($campaign: ID, $dealerCode: Int!, $cityId: ID!, $categoryId: ID! $dealerName: String!, $dealerAddress: String!, $retailerName: String!, $retailerNo: String!, $asmName: String!, $asmNo: String!) {
  	startBranding(campaign: $campaign,dealerCode: $dealerCode, cityId: $cityId, categoryId:$categoryId dealerName: $dealerName, dealerAddress: $dealerAddress, retailerName: $retailerName, retailerNo: $retailerNo, asmName: $asmName, asmNo: $asmNo) {
    	id
  	}
	}
`;

export default compose(graphql(
  START_BRANDING,
  { name: 'startBranding' },
))(CsvTableItem);

CsvTableItem.propTypes = {
  startBranding: PropTypes.func.isRequired,
};
