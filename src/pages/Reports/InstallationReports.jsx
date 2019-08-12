import React, { Component } from "react";
import _ from "underscore";
import CustomInstallationReportsForm from './CustomInstallationReportsForm';
import InstallationTableWrapper from './InstallationTableWrapper'
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

class InstallationReports extends Component {

  formattedCampaign = [];

  renderTable(filter){
    if(filter.filter){
      if(filter.filter.selectedOption === "installation"){
        return <InstallationTableWrapper filter={filter} />
      }
      else {
        return <div />
      }
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        {this.props ? this.props.user.role === "ADMIN" ? 
        <div>
          <div className="column gutters-tiny">
            <div className="block block-bordered block-rounded">
              <div className="block-header block-header-default border-b">
                <h3 className="block-title">Generate Installation Reports</h3>
              </div>
              {
                this.props.types ?
                  <CustomInstallationReportsForm data={this.props} generateReport={val=>{
                    this.setState(val);}}/> :
                  <div>LOADING...</div>
              }
            </div>
            </div>
            <div className="row gutters-only">
            <div className="col-12">
              <this.renderTable filter={this.state} media={this.props.media}/>
            </div>
          </div>
        </div> : <div/> : <div/> }
      </div>
    );
  }
}

// const CAMPAIGN_LIST = gql`
//   query {
//     allCampaigns {
//       id
//       name
//     }
//   }
// `;

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

const ALL_MEDIA = gql `
    query {
    allMedias {
        id
        name
        }
    }
`;

const ALL_TYPES = gql`
      query{
        allTypes{
          id
          name
        }
      }`;

export default compose(
  graphql(ALL_MEDIA, {
    props: ({data}) => {
        if(!data.allMedias){
            return { loading: data.loading }
        }

        if(data.allMedias){
            return { loading: data.loading, media: data.allMedias }
        }
    },
    options: "cache-and-network"
  }),
  graphql(ME_QUERY,{
    props: ({data}) => {
      if (!data.me) {
        return {loading: data.loading};
      }
      return {loading: data.loading, user: data.me};
    },
    options: {
      fetchPolicy: 'cache-and-network'
    }
  }),
  graphql(ALL_TYPES, {
    props: ({data}) => {
        if(!data.allTypes){
            return { loading: data.loading }
        }

        if(data.allTypes){
          const types = data.allTypes.map(({id, name})=>({
            value: id, label: name
          }))
            return { loading: data.loading, types }
        }
    },
    options: "cache-and-network"
  // }),
  // graphql(CAMPAIGN_LIST, {
  //   props: ({data}) => {
  //     if(!data.allCampaigns) {
  //       return {loading: data.loading}
  //     }
  //     if(data.allCampaigns){
  //       const campaigns = data.allCampaigns.map(v => { return ({value: v.id, label: v.name})})
  //       return { loading: data.loading, campaigns: campaigns }
  //     }
  //   },
  //   options: {
  //     fetchPolicy: 'cache-and-network'
  //   }
  })
)(InstallationReports);
