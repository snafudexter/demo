import React, { Component } from 'react';
import CustomReportsForm from './CustomReportsForm';
import TaskStatusCountWidget from '../Branding/Tasks/TaskStatusCountWidget';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import DesignersTableWrapper from './AdSpotTableWrapper';
import TasksTableWrapper from './TasksTableWrapper';

import moment from 'moment'

class GeneralReports extends Component {
  state=
  {
    selectedOption: 'tasks',
    city: '',
		category: '',
		cluster: this.props.user.cluster ? [{label: this.props.user.cluster.name,value: this.props.user.cluster.id}] : [],
		zone:'',
		type: this.props.user.type ? [{label: this.props.user.type.name,value: this.props.user.type.id}] : [],
    table_type: '',
    campaign: ''
  }
  renderTable(props)
  {
    if(props.type===undefined || props.type===null)
    {
      return <div></div>;
    }
    else if(props.type === 'ad_spots')
    {
      return ( <DesignersTableWrapper filter={props.filter} />);
    }
    else{
    return ( <TasksTableWrapper filter={props.filter}/>);
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
			<div className="row gutters-tiny">
				<div className="block block-bordered block-rounded">
					<div className="block-header block-header-default border-b">
						<h3 className="block-title">Generate Custom Reports</h3>
					</div>
					<div className="block-content pb-4 bg-white">
					<CustomReportsForm data={this.props} generateReport={(val) => {this.setState(val)}} />
					</div>
				</div>
			</div>
        {/* <div className="row gutters-tiny">
          <div className="col-md-4">
            <div className="block">
              <div className="block-content block-content-full">
                <div className="row py-20">
                  <div className="col-6 text-right border-r">
                    <TaskStatusCountWidget sqfeet="21" label="Recce On" statusArr={['RECCE']} labelClass="warning" />
                  </div>
                  <div className="col-6">
                  <TaskStatusCountWidget sqfeet="819" label="Recce Done" statusArr={['RECCEDONE']} labelClass="reccedone" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="block">
              <div className="block-content block-content-full">
                <div className="row py-20">
                  <div className="col-6 text-right border-r">
                    <TaskStatusCountWidget sqfeet="21" label="Approval" statusArr={['APPROVAL']} labelClass="approval" />
                  </div>
                  <div className="col-6">
                  <TaskStatusCountWidget sqfeet="189" label="Approved" statusArr={['APPROVED','REJECTED']} labelClass="approved" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="block">
              <div className="block-content block-content-full">
                <div className="row py-20">
                  <div className="col-6 text-right border-r">
                  <TaskStatusCountWidget sqfeet="525" label="Designing" statusArr={['DESIGNING']} labelClass="designing" />
                  </div>
                  <div className="col-6">
                  <TaskStatusCountWidget sqfeet="147" label="Designed" statusArr={['DESIGNINGDONE']} labelClass="designed" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}


        <div className="row gutters-only">
          <div className="col-12">
           <this.renderTable type={this.state.selectedOption} filter={this.state}/>
          </div>
        </div>

      </div>
	  );
	}
}
//query to pull campaign list
const ME_QUERY = gql `
  query {
      me {
        id
        name
        role
        type
        {
          name
        }
        cluster
        {
          id
          name
        }
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

export default compose(graphql(ME_QUERY,{
  props: ({data}) => {
    if (!data.me) {
      return {loading: data.loading};
    }
    return {loading: data.loading, user: data.me};
  },
  options: {
    fetchPolicy: 'cache-and-network'
  }
}),graphql(CAMPAIGN_LIST, {
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
  }),graphql(CITIES_LIST, {
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

}))(GeneralReports);
