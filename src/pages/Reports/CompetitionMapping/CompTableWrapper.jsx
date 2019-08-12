import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import ExportButton from "../../../helpers/ExportButton";
import PivotTable from "..//PivotTable";
import CompMapTable from "./CompMapTable";

const mapPropsToOptions = props => {
  var cityId = [],
    typeId = [],
    categoryId = [],
    zoneId = [],
    clusterId = [],
    campaignId = [];
  var variables;
  if (props.filter) {
    if (Array.isArray(props.filter.campaign))
      campaignId = props.filter.campaign.map(val => {
        if (val) {
          return val.value;
        }
      });
    else campaignId.push(props.filter.campaign.value);

    if (Array.isArray(props.filter.city))
      cityId = props.filter.city.map(val => {
        if (val) {
          return val.value;
        }
      });
    else cityId.push(props.filter.city.value);

    if (props.filter.type)
      if (Array.isArray(props.filter.type))
        typeId = props.filter.type.map(val => {
          if (val) {
            return val.value;
          }
        });
      else typeId.push(props.filter.type.value);

    if (props.filter.category)
      if (Array.isArray(props.filter.category))
        categoryId = props.filter.category.map(val => {
          if (val) {
            return val.value;
          }
        });
      else categoryId.push(props.filter.category.value);

    if (props.filter.zone)
      if (Array.isArray(props.filter.zone))
        zoneId = props.filter.zone.map(val => {
          if (val) {
            return val.value;
          }
        });
      else zoneId.push(props.filter.zone.value);

    if (props.filter.cluster)
      if (Array.isArray(props.filter.cluster))
        clusterId = props.filter.cluster.map(val => {
          if (val) {
            return val.value;
          }
        });
      else clusterId.push(props.filter.cluster.value);

    variables = {
      campaignId: campaignId,
      cityId: cityId,
      typeId: typeId,
      categoryId: categoryId,
      zoneId: zoneId,
      clusterId: clusterId,
      startDate: props.filter.startDate,
      endDate: props.filter.endDate
    };
  }

  return { variables, fetchPolicy: "cache-and-network" };
};

class CompTableWrapper extends Component {
  state = {
    selectedTasks: [],
    columns: [
      {
        key: "dealerCode",
        name: "Dealer Code",
        resizable: true,
        width: 115,
        filterable: true
      },
      {
        key: "dealerAddress",
        name: "Dealer Address",
        resizable: true,
        filterable: true
      },
      {
        key: "adspotCount",
        name: "Comp Adspot Nos.",
        resizable: true,
        width: 115,
        filterable: true
      },
      {
        key: "adspotName",
        name: "Comp Adspot Names",
        resizable: true,
        width: 300,
        filterable: true
      }
    ]
  };

  setSelectedTasks = tasks => {
    this.setState({ selectedTasks: tasks });
  };

  renderTable = props => {
    if (props.tasks)
      if (props.tasks.length > 0) {
        return (
          <CompMapTable
            tasks={props.tasks}
            columns={props.columns}
            setSelectedTasks={props.setSelectedTasks}
          />
        );
      } else <div />;
  };

  render = () => {
    if (this.props.loading) {
      return (
        <div className="loader">
          <div />
        </div>
      );
    }

    if (this.props.stores) {
      return (
        <div>
          <div
            className="block-options"
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            {this.state.selectedTasks.length != 0 ? (
              <ExportButton
                showAlert={this.props.showAlert}
                tasks={this.state.selectedTasks}
                storeRefetch={this.props.storeRefetch}
                allTask={this.props.stores}
              />
            ) : (
              <button type="button" className="btn btn-secodary float-left">
                Download Report
              </button>
            )}
          </div>
          <this.renderTable
            columns={this.state.columns}
            tasks={this.props.stores}
            setSelectedTasks={this.setSelectedTasks}
          />
        </div>
      );
    }
  };
}

const COMPETITION = gql`
  query competitionMapping(
    $campaignId: [ID]
    $cityId: [ID]
    $zoneId: [ID]
    $categoryId: [ID]
    $clusterId: [ID]
    $typeId: [ID]
    $startDate: DateTime
    $endDate: DateTime
  ) {
    competitionMapping(
      campaignId: $campaignId
      cityId: $cityId
      zoneId: $zoneId
      categoryId: $categoryId
      clusterId: $clusterId
      typeId: $typeId
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      dealerCode
      dealerAddress
      tasks {
        adSpots {
          id
          type
          name
        }
      }
    }
  }
`;

export default compose(
  graphql(COMPETITION, {
    props: ({ data }) => {
      let stores = [];
      if (data.competitionMapping) {
        stores = data.competitionMapping;
      }
      return { loading: data.loading, stores, storeRefetch: data.refetch };
    },
    options: mapPropsToOptions
  })
)(CompTableWrapper);

CompTableWrapper.propTypes = {};
