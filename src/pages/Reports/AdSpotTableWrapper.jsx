import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import Modal from 'react-modal';
import TaskCountWidget from './TaskCountWidget';
import {Link} from 'react-router-dom';
import AdSpotTable from '../../components/Tables/AdSpotTable'
import ExportButton from '../../helpers/ExportButton'
import TaskStatusFormatter from '../../components/Tables/TaskStatusFormatter';

var total_area = 0;

const mapPropsToOptions = (props) => {
    var cityId = [], typeId = [], categoryId = [], zoneId = [], clusterId = [], campaignId = [];

    if(Array.isArray(props.filter.city))
      cityId = props.filter.city.map((val)=>{
        return val.value;
      })
    else
      cityId.push(props.filter.city.value);

    if(Array.isArray(props.filter.campaign))
    campaignId = props.filter.campaign.map((val)=>{
        return val.value;
      })
    else
    campaignId.push(props.filter.campaign.value);

    if(Array.isArray(props.filter.type))
      typeId = props.filter.type.map((val)=>{
      return val.value;
    })
    else
      typeId.push(props.filter.type.value);

    if(Array.isArray(props.filter.category))
      categoryId = props.filter.category.map((val)=>{
      return val.value;
    })
    else
      categoryId.push(props.filter.category.value);

    if(Array.isArray(props.filter.zone))
      zoneId = props.filter.zone.map((val)=>{
      return val.value;
    })
    else
      zoneId.push(props.filter.zone.value);

    if(Array.isArray(props.filter.cluster))
      clusterId = props.filter.cluster.map((val)=>{
      return val.value;
    })
    else
      clusterId.push(props.filter.cluster.value);

    const variables = {
      campaignId: campaignId,
      cityId: cityId,
      typeId: typeId,
      categoryId: categoryId,
      zoneId: zoneId,
      clusterId: clusterId,
      startDate: props.filter.startDate,
      endDate: props.filter.endDate
    };
    return {variables,fetchPolicy: 'cache-and-network'};
  };


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      minWidth: 400,
      padding: 0,
      border: 'none',
      borderRadius: 0,
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  const customImageStyle = {

    content:
    {
        width: '50%',
        height: '50%'
    }

  };

class AdSpotTableWrapper extends Component {
  state = {
    selectedTasks: [],
    columns : [

      {
				key: 'action',
				name: 'Action',
        resizable: true,
        width: 115
      },{
				key: 'campaign',
				name: 'Campaign',
        resizable: true,
        width: 115
      },{
  key: 'dealerCity',
  name: 'City',
  width: 115,
  filterable: true
},

			
      {
        key: 'dealerCode',
        name: 'Dealer Code',
        width: 100,
        filterable: true,
        resizable: true,
},
{
  key: 'dealerName',
  name: 'Store Name',
  width: 150
},

{
  key: 'dealerAddress',
  name: 'Address',
  width: 150
},


      {
          key: 'width',
          name: 'Width',
          width: 115
      },
      {
        key: 'height',
        name: 'Height',
        width: 115
    },

    {
        key: 'area',
        name: 'Area',
        width: 115
    },

    {
        key: 'media',
        name: 'Media',
        width: 115,
        filterable: true
    },

    {
        key: 'category',
        name: 'Category',
        width: 115,
        filterable: true
    },

    {
        key: 'remarks',
        name: 'Remarks',
        width: 115
    },


		]
  };
  closeModal = () => {
    this.setState({modalIsOpen: false});
  }
  openModal = (value) => {
    this.setState({modalIsOpen: true, image:value.image});
  }
  setSelectedRecceUser = val => {
    this.setState({user: val});
  }
  setSelectedTasks = tasks => {
    this.setState({selectedTasks: tasks});
  };

  count(){
    total_area= 0;
    if(this.props.tasks)
    for(var task of this.props.tasks)
    {
      total_area += parseFloat(task.area);
    }
  }

  renderTasksTable = () => {
    if (this.props.loading){
      return (
        <div className="loader">
          <div></div>
        </div>
      );
    }

    this.count();
    return (

        <div>

        <div className="row gutters-tiny">
        <TaskCountWidget sqfeet={total_area} taskCount={this.props.tasks.length} label="Ad Spots" type="Ad Spts" />
        </div>

      <div className="animated fadeIn">
      <div className="block-options" style={{marginTop: 20, marginBottom: 20}}>
          {this.state.selectedTasks.length != 0 ? (
            <ExportButton
              showAlert={this.props.showAlert}
              tasks={this.state.selectedTasks}
              storeRefetch={this.props.storeRefetch}
              allTask={this.props.allTasks}
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
        <AdSpotTable columns={this.state.columns} setSelectedTasks={this.setSelectedTasks} tasks={this.props.tasks} openModalCallback={this.openModal}/>
      </div>
        </div>

    )
  }
  render() {
    return (
      <div>
        {this.renderTasksTable()}
        <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add Ad Spot Modal">
          <div className="block mb-0">
            <div className="block-header block-header-default">
              <h3 className="block-title">Add Ad Spot</h3>
              <div className="block-options">
                <button
                  onClick={this.closeModal}
                  type="button"
                  className="btn-block-option"
                  data-dismiss="modal"
                  aria-label="Close">
                  <i className="si si-close"></i>
                </button>
              </div>
            </div>
            <div className="block-content">

             <img src={this.state.image} style={{height: '50%', width: '50%'}} />
            </div>
          </div>
          <div className="modal-footer mt-3">
            <button
              onClick={this.closeModal}
              type="button"
              className="btn btn-alt-secondary"
              data-dismiss="modal">Close</button>

          </div>
        </Modal>
        </div>

      </div>
    );
  }
}

const ALL_RECCE_ASSIGNED_TASKS = gql `
  query vanillaReportAdSpots($campaignId: [ID], $cityId: [ID], $zoneId: [ID], $typeId: [ID], $clusterId: [ID], $categoryId: [ID], $startDate: DateTime, $endDate: DateTime) {
    vanillaReportAdSpots(campaignId: $campaignId, cityId: $cityId, zoneId: $zoneId, typeId: $typeId, clusterId: $clusterId, categoryId: $categoryId, startDate: $startDate, endDate: $endDate){
        adSpots {
          id
          name
          width
          height
          area
          media
          category
          remarks
          campaign
          dealerName
          dealerCode
          dealerAddress
          dealerCity
          image
          type
        }
    }
  }
`;

export default compose(graphql(ALL_RECCE_ASSIGNED_TASKS, {
  props: ({data}) => {
    console.log('data')
    console.log(data)
    if (!data.vanillaReportAdSpots)
      return {loading: data.loading};

    return {loading: data.loading, tasks: data.vanillaReportAdSpots.adSpots, tasksRefetch: data.refetch};
  },
  options:mapPropsToOptions
}),)(AdSpotTableWrapper);

AdSpotTableWrapper.propTypes = {};
