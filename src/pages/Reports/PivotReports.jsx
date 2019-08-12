import React, { Component } from "react";
import CustomPivotReportsForm from "./CustomPivotReportsForm";
import TaskStatusCountWidget from "../Branding/Tasks/TaskStatusCountWidget";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import DesignersTableWrapper from "./AdSpotTableWrapper";
import PivotTableWrapper from "./PivotTableWrapper";
import { ApolloConsumer } from "react-apollo";
import { Query } from "react-apollo";

const mapPropsToOptions = state => {
  var cityId = [],
    typeId = [],
    categoryId = [],
    zoneId = [],
    clusterId = [];
  if (state.city)
    if (Array.isArray(state.city))
      cityId = state.city.map(val => {
        return val.value;
      });
    else cityId.push(state.city.value);

  if (state.type)
    if (Array.isArray(state.type))
      typeId = state.type.map(val => {
        return val.value;
      });
    else typeId.push(state.type.value);
  if (state.category)
    if (Array.isArray(state.category))
      categoryId = state.category.map(val => {
        return val.value;
      });
    else categoryId.push(state.category.value);
  if (state.zone)
    if (Array.isArray(state.zone))
      zoneId = state.zone.map(val => {
        return val.value;
      });
    else zoneId.push(state.zone.value);

  if (state.cluster)
    if (Array.isArray(state.cluster))
      clusterId = state.cluster.map(val => {
        return val.value;
      });
    else clusterId.push(state.cluster.value);

  const variables = {
    cityId: cityId,
    typeId: typeId,
    categoryId: categoryId,
    zoneId: zoneId,
    clusterId: clusterId,
    startDate: state.startDate,
    endDate: state.endDate
  };

  return { variables, skip: true, fetchPolicy: "cache-and-network" };
};

class PivotReports extends Component {
  renderTable(props) {
    if (props.filter) {
      if (props.filter.selectedOption === "pivot") {
        return <PivotTableWrapper filter={props.filter} />;
      } else {
        return <div />;
      }
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <div className="row gutters-tiny">
          <div className="block block-bordered block-rounded">
            <div className="block-header block-header-default border-b">
              <h3 className="block-title">Generate Pivot Reports</h3>
            </div>
            <div className="block-content pb-4 bg-white">
              <CustomPivotReportsForm
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
            <this.renderTable filter={this.state} />
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

const PIVOT_REPORT = gql`
  query(
    $cityId: [ID]
    $zoneId: [ID]
    $categoryId: [ID]
    $clusterId: [ID]
    $typeId: [ID]
    $startDate: DateTime
    $endDate: DateTime
    $flag: String
  ) {
    pivotReport(
      cityId: $cityId
      zoneId: $zoneId
      categoryId: $categoryId
      clusterId: $clusterId
      typeId: $typeId
      startDate: $startDate
      endDate: $endDate
      flag: $flag
    ) {
      pivots {
        adSpotsCount
        totalArea
        name
        cost
      }
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
  // graphql(PIVOT_REPORT, {
  //   props: ({ data }) => {
  //     if (!data.pivotReport) {
  //       return { loading: data.loading };
  //     }
  //     const pivots = data.pivotReport;

  //     return { loading: data.loading, pivots };
  //   },
  //   options: mapPropsToOptions
  // }),
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
)(PivotReports);
