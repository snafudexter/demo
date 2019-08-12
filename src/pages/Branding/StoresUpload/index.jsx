import React, {Component} from 'react';
import SampleCsvButton from './SampleCsvButton';
import CsvUpload from './CsvUpload';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';

class StoresUpload extends Component {
	state={
		campaign: {}
	}
	changeCampaign(campaign)
	{
		if(campaign)
		{
			this.setState({campaign: campaign})
		}

	}
		render() {
			if (this.props.loading) {
				return (
					<div className="loader">

					</div>
				);
				}
				return (
						<div>
								<h2 className="content-heading">
										Upload Stores
										<SampleCsvButton campaigns={this.props.campaigns} campId={this.props.match.params.id} changeCampaign={this.changeCampaign.bind(this)}/>
								</h2>
								<CsvUpload campaign={this.state.campaign}/>
						</div>
				);
		}
}
const CAMPAIGN_LIST = gql `
query {
  allCampaigns
  {
    id
    name
  }
}`;

export default compose(graphql(CAMPAIGN_LIST, {
	props: ({data}) => {
	  if (!data.allCampaigns) {
		return {loading: data.loading};
	  }
	  const campaigns = data
		.allCampaigns.map(v => { return ({value: v.id, label: v.name})})

	  return {loading: data.loading, campaigns};
	},
	options: {
	  fetchPolicy: 'cache-and-network'
	}
  }))(StoresUpload);
