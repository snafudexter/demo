import React, { Component } from 'react';
import Papa from 'papaparse';
import { CSVLink } from 'react-csv';
import Select from 'react-select';
class SampleCsvButton extends Component {
  state = {
		sampleCsv: [
			[
				'dealercode',
				'city',
				'subcategory',
				'dealername',
				'dealeraddress',
				'retailercontactperson',
				'retailercontactno',
				'asmname',
				'asmmobile',
			],
		],
		showCampaign: [],
		campaign: this.props.campaigns.filter(p => p.value === this.props.campId)[0]
	};

	componentDidMount()
	{

		this.props.changeCampaign(this.state.campaign)
	}
	

	render() {
	  return (

			<div style={{'display':'inlineBlock','float':'right','position':'relative','top':-10}}>

				<CSVLink
					filename={'Sample.csv'}
					className="btn btn-sm btn-rounded btn-primary float-right"
					target="_blank"
					data={this.state.sampleCsv}
					style={{"position":"relative","top":5}}
				>
					Download Sample CSV
				</CSVLink>
				<form className="form-inline" style={{ "fontSize" : 14, 'float': 'right' }}>
				<Select
						name="campaign"
						style={{'width':200, "height": "auto"}}
						className="mr-3"
						placeholder="Campaign"
						value= {
							this.state.campaign
						}
						options={this.props.campaigns}
						onChange={val => {
							this.setState({campaign: val});
							this.props.changeCampaign(val)
						}}/>

						</form>
						<div className="clear"></div>
		</div>
	  );
	}
}

export default SampleCsvButton;
