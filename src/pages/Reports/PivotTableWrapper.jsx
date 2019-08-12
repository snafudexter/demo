import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import ExportButton from '../../helpers/ExportButton'

import PivotTable from './PivotTable';
import TaskStatusFormatter from '../../components/Tables/TaskStatusFormatter';
import TaskCountWidget from './TaskCountWidget';

const mapPropsToOptions = (props) => {
  var cityId = [], typeId = [], categoryId = [], zoneId = [], clusterId = [], campaignId = [];
  var variables;
  if(props.filter){

  if(Array.isArray(props.filter.campaign))
    campaignId = props.filter.campaign.map((val)=>{
      return val.value;
    })
  else
    campaignId.push(props.filter.campaign.value);

  if(Array.isArray(props.filter.city))
    cityId = props.filter.city.map((val)=>{
      return val.value;
    })
  else
    cityId.push(props.filter.city.value);

    if(props.filter.type)
  if(Array.isArray(props.filter.type))
    typeId = props.filter.type.map((val)=>{
    return val.value;
  })
  else
    typeId.push(props.filter.type.value);


    if(props.filter.category)
  if(Array.isArray(props.filter.category))
    categoryId = props.filter.category.map((val)=>{
    return val.value;
  })
  else
    categoryId.push(props.filter.category.value);

    if(props.filter.zone)
  if(Array.isArray(props.filter.zone))
    zoneId = props.filter.zone.map((val)=>{
    return val.value;
  })
  else
    zoneId.push(props.filter.zone.value);

    if(props.filter.cluster)
  if(Array.isArray(props.filter.cluster))
    clusterId = props.filter.cluster.map((val)=>{
    return val.value;
  })
  else
    clusterId.push(props.filter.cluster.value);



  variables = {
    campaignId: campaignId,
    cityId: cityId,
    typeId: typeId,
    categoryId: categoryId,
    zoneId: zoneId,
    clusterId: clusterId,
    startDate: props.filter.startDate,
    endDate: props.filter.endDate,
    key: props.filter.flag.value
  }}

  return {variables,fetchPolicy: 'cache-and-network'};
};

var recce = 0, approval = 0, approved = 0, designing = 0, printing = 0, installed = 0;
var reccesqfeet = 0, approvalsqfeet = 0, approvedsqfeet = 0, designingsqfeet = 0, printingsqfeet = 0, installedsqfeet = 0;

class PivotTableWrapper extends Component {
  state = {
    selectedTasks: [],
    columns : [
			{
				key: 'name',
				name: 'Name',
        resizable: true,
        width: 115
      },
      {
        key: 'storeCount',
        name: 'Store Count',
        resizable: true,
      },
      {
				key: 'adSpotsCount',
				name: 'No of Ad Spots',
				resizable: true,
      },
      {
        key: 'total_area',
        name: 'Total Area',
        resizable: true,
      },
      {
        key: 'cost',
        name: 'Costing',
        resizable: true,
      }
		]
  }


	render() {
    if (this.props.loading) {
      return (
        <div className="loader"><div></div></div>
      );
    }

		return (
      <div>
<div className="block-options" style={{marginTop: 20, marginBottom: 20}}>
          {this.props.pivots.length != 0 ? (
            <ExportButton
              showAlert={this.props.showAlert}
              tasks={this.props.pivots}
              storeRefetch={this.props.storeRefetch}
              allTask={this.props.pivots}
            />
          ) : (
            <button
                type="button"
                className="btn btn-secodary float-left"
                >
                  Download Report
              </button>
          )}
        </div>
      <PivotTable columns={this.state.columns} setSelectedTasks={this.setSelectedTasks} tasks={this.props.pivots} />
      </div>
		);
	}
}


const PIVOT_REPORT = gql`
query($campaignId: [ID], $cityId: [ID], $zoneId: [ID], $categoryId: [ID], $clusterId: [ID], $typeId: [ID], $startDate: DateTime, $endDate: DateTime, $key: String)
{
  pivotReport(campaignId: $campaignId, cityId: $cityId, zoneId: $zoneId, categoryId: $categoryId, clusterId: $clusterId, typeId: $typeId, startDate: $startDate, endDate: $endDate, key: $key)
  {
    pivots {
      storeCount
      adSpotsCount
      totalArea
      name
      cost
    }
  }
}
`;

export default compose(
graphql(PIVOT_REPORT,{

    props: ({data}) => {
      if (!data.pivotReport) {
        return {loading: data.loading};
      }
      const pivots = data.pivotReport.pivots

      return {loading: data.loading, pivots};
    },
    options: mapPropsToOptions


  })
)(PivotTableWrapper);

PivotTableWrapper.propTypes = {};
