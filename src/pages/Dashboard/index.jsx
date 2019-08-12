import React, {Component} from 'react';
import DashboardFilterForm from './DashboardFilterForm';
import {graphql, compose} from 'react-apollo';
import TasksTableWrapper from './TasksTableWrapper'
import gql from 'graphql-tag';

class Dashboard extends Component {
	state={
		urgent:"all",
		showFilter: false,
    city: [],
		category: [],
		cluster: this.props.user.cluster ? [{label: this.props.user.cluster.name,value: this.props.user.cluster.id}] : [],
		zone:[],
		type: this.props.user.type ? [{label: this.props.user.type.name,value: this.props.user.type.id}] : [],
		table_type: [],
		campaign: [],
	}

	componentDidMount = () => {
		// If user is PRINTER, then redirect him to printers page
		// Putting this clause here, because this page render gets called after executing
		// many queries. Which won't be required if we are PRINTER
    if (this.props.user.role === "PRINTER") {
      this.props.history.replace("/printers");
    }
	};
	
	renderDashboardFilterForm = () => {
		if (this.state.showFilter) {
			return (
				<div className="block-content pb-4 bg-white" style={{"height": "auto"}}>
					<DashboardFilterForm campaignId={this.props.match.params.id} urgent={this.state.urgent} user={this.props.user} data={this.props} loadUrgentStores={()=>{if(this.state.urgent==='all'){this.setState({urgent:'only'})}else{this.setState({urgent:'all'})}}} generateReport={(val) => {this.setState(val)}} />
				</div>
			)
		}
	}

	async filterContent(name, e){

		if(name==='cluster')
		 await this.setState({cluster: this.props.clusters.filter(p => p.value===e), type: []})			
		else
			await this.setState({type: this.props.types.filter(p => p.value===e), cluster:[]})	


	}
		render() {
				return (
						<div>
								<div id="page-container" className="main-content-boxed">
										<div id="main-container">
												<div className="content">
												
												<div className="row gutters-tiny">
													<div className="block block-bordered block-rounded" style={{"width":"100%"}}>
														<div className="block-header block-header-default border-b">
															<h3 className="block-title"> Filter Stores</h3>
															<div className="block-options">
																<button type="button" onClick={() => { this.setState({ showFilter: !this.state.showFilter }) }} className="btn btn-sm btn-secondary">Toggle Filter</button>
															</div>
														</div>
															{this.renderDashboardFilterForm()}
													</div>
												</div>
												
													<div className="row gutters-only">
															<div className="col-12">
																<TasksTableWrapper types={this.props.types} clusters={this.props.clusters} filterContent={this.filterContent.bind(this)} campaignId={this.props.match.params.id} filter={this.state} user={this.props.user} history={this.props.history}/>
															</div>
													</div>
												</div>
										</div>
								</div>
						</div>
				)
		}
}

const CITIES_LIST = gql `
  query {
    allCities {
      id
      name
    }
  }
`;

const TYPES_LIST = gql `
  query {
    allTypes {
      id
      name
    }
  }
`;

const CAMPAIGN_LIST = gql `
query {
  allCampaigns
  {
    id
    name
  }
}`;

const ZONE_LIST = gql `
  query {
    allZones {
      id
      name
    }
  }
`;


const CLUSTER_IST = gql `
  query {
    allClusters {
      id
      name
    }
  }
`;

const CATEGORY_LIST = gql `
  query {
    allCategories {
      id
      name
    }
  }
`;

const FETCH_USER=gql `
 query{
	 me{
		 role
		 name
		 
	 }
 }
`;


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
	}),
	graphql(CITIES_LIST, {
	props: ({data}) => {
	  if (!data.allCities) {
		return {loading: data.loading};
	  }
	  const cities = data
		.allCities
		.map(({id, name}) => ({value: id, label: name}));

	  return {loading: data.loading, cities};
	},
	options: {
	  fetchPolicy: 'cache-and-network'
	}
  }), graphql(TYPES_LIST,{

	props: ({data}) => {
	  if (!data.allTypes) {
		return {loading: data.loading};
	  }
	  const types = data
		.allTypes
		.map(({id, name}) => ({value: id, label: name}));

	  return {loading: data.loading, types};
	},
	options: {
	  fetchPolicy: 'cache-and-network'
	}

  }), graphql(ZONE_LIST,{

	props: ({data}) => {
	  if (!data.allZones) {
		return {loading: data.loading};
	  }
	  const zones = data
		.allZones
		.map(({id, name}) => ({value: id, label: name}));

	  return {loading: data.loading, zones};
	},
	options: {
	  fetchPolicy: 'cache-and-network'
	}

  }), graphql(CLUSTER_IST,{

	props: ({data}) => {
	  if (!data.allClusters) {
		return {loading: data.loading};
	  }
	  const clusters = data
		.allClusters
		.map(({id, name}) => ({value: id, label: name}));

	  return {loading: data.loading, clusters};
	},
	options: {
	  fetchPolicy: 'cache-and-network'
	}

  }), graphql(CATEGORY_LIST,{

	props: ({data}) => {
	  if (!data.allCategories) {
		return {loading: data.loading};
	  }
	  const categories = data
		.allCategories
		.map(({id, name}) => ({value: id, label: name}));

	  return {loading: data.loading, categories};
	},
	options: {
	  fetchPolicy: 'cache-and-network'
	}

  }))(Dashboard);

