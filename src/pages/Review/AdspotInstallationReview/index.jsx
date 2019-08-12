import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import ReviewAdSpotTableWrapper from "./ReviewAdspotTableWrapper";
import { Mutation } from "react-apollo";
import AdspotInstallForm from "./AdspotInstallForm";

const UPDATE_ADSPOT_INSTALLATION = gql`
  mutation updateAdspotInstallation($idArr: [ID], $installStatus: Boolean) {
    updateAdspotInstallation(idArr: $idArr, installStatus: $installStatus)
  }
`;

class GR extends Component {
  state = {
    selectedOption: "ad_spots",
    city: "",
    category: "",
    cluster: "",
    zone: "",
    type: [],
    table_type: "",
    campaign: ""
  };

  renderTable(props) {

    if (props.type === undefined || props.type === null) {
      return <div />;
    } else if (props.type === "ad_spots") {
      return (
        <ReviewAdSpotTableWrapper
          filter={props.filter}
          updateAdspotInstallation={props.updateAdspotInstallation}
        />
      );
    } else {
      return <div>Some Error Occured</div>;
    }
  }

  render() {
    if (this.props.loading) {
      return <div className="loader" />;
    }
    return (
      <div>
        <div className="row gutters-tiny">
          <div className="block block-bordered block-rounded col-12">
            <div className="block-header block-header-default border-b">
              <h3 className="block-title">Filter Adspots</h3>
            </div>
            <div className="block-content pb-4 bg-white">
              <AdspotInstallForm
                data={this.props}
                generateReport={val => {
                  this.setState(val);
                }}
              />
            </div>
          </div>
        </div>
        <div className="row gutters-only">
          <div className="col-12">
            <Mutation mutation={UPDATE_ADSPOT_INSTALLATION}>
              {(updateAdspotInstallation, { data }) => (
                <this.renderTable
                  type={this.state.selectedOption}
                  filter={this.state}
                  updateAdspotInstallation={updateAdspotInstallation}
                />
              )}
            </Mutation>
          </div>
        </div>
      </div>
    );
  }
}

//query to pull campaign list
const ME_QUERY = gql`
  query {
    me {
      id
      name
      role
      type {
        name
      }
      cluster {
        id
        name
      }
    }
  }
`;

const CAMPAIGN_LIST = gql`
  query {
    allCampaigns {
      id
      name
    }
  }
`;

const CITIES_LIST = gql`
  query {
    allCities {
      id
      name
    }
  }
`;

const TYPES_LIST = gql`
  query {
    allTypes {
      id
      name
    }
  }
`;

const ZONE_LIST = gql`
  query {
    allZones {
      id
      name
    }
  }
`;

const CLUSTER_IST = gql`
  query {
    allClusters {
      id
      name
    }
  }
`;

const CATEGORY_LIST = gql`
  query {
    allCategories {
      id
      name
    }
  }
`;

export default compose(
  graphql(ME_QUERY, {
    props: ({ data }) => {
      if (!data.me) {
        return { loading: data.loading };
      }
      return { loading: data.loading, user: data.me };
    },
    options: {
      fetchPolicy: "cache-and-network"
    }
  }),
  graphql(CAMPAIGN_LIST, {
    props: ({ data }) => {
      if (!data.allCampaigns) {
        return { loading: data.loading };
      }
      const campaigns = data.allCampaigns.map(v => {
        return { value: v.id, label: v.name };
      });

      return { loading: data.loading, campaigns };
    },
    options: {
      fetchPolicy: "cache-and-network"
    }
  }),
  graphql(CITIES_LIST, {
    props: ({ data }) => {
      if (!data.allCities) {
        return { loading: data.loading };
      }
      const cities = data.allCities.map(({ id, name }) => ({
        value: id,
        label: name
      }));

      return { loading: data.loading, cities };
    },
    options: {
      fetchPolicy: "cache-and-network"
    }
  }),
  graphql(TYPES_LIST, {
    props: ({ data }) => {
      if (!data.allTypes) {
        return { loading: data.loading };
      }
      const types = data.allTypes.map(({ id, name }) => ({
        value: id,
        label: name
      }));

      return { loading: data.loading, types };
    },
    options: {
      fetchPolicy: "cache-and-network"
    }
  }),
  graphql(ZONE_LIST, {
    props: ({ data }) => {
      if (!data.allZones) {
        return { loading: data.loading };
      }
      const zones = data.allZones.map(({ id, name }) => ({
        value: id,
        label: name
      }));

      return { loading: data.loading, zones };
    },
    options: {
      fetchPolicy: "cache-and-network"
    }
  }),
  graphql(CLUSTER_IST, {
    props: ({ data }) => {
      if (!data.allClusters) {
        return { loading: data.loading };
      }
      const clusters = data.allClusters.map(({ id, name }) => ({
        value: id,
        label: name
      }));

      return { loading: data.loading, clusters };
    },
    options: {
      fetchPolicy: "cache-and-network"
    }
  }),
  graphql(CATEGORY_LIST, {
    props: ({ data }) => {
      if (!data.allCategories) {
        return { loading: data.loading };
      }
      const categories = data.allCategories.map(({ id, name }) => ({
        value: id,
        label: name
      }));
      return { loading: data.loading, categories };
    },
    options: {
      fetchPolicy: "cache-and-network"
    }
  })
)(GR);
