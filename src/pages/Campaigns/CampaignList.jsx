import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import Modal from 'react-modal';
import Alert from 'react-s-alert';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import {NavLink} from 'react-router-dom';

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.2)';

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
    transform: 'translate(-50%, -50%)',
    height: 'auto',
    overflow: 'none'
  }
};

class CampaignList extends Component {
  state = {
    modalIsOpen: false
  }
  // state={ 	modalIsOpen: false, 	campname:this.props.campaign[0].name,
  // 	description:this.props.campaign[0].description,
  // 	startDate:this.props.campaign[0].startDate }

  openModal = (index) => {

    this.setState({modalIsOpen: true, currentCampaign: index});
  }
  closeModal = () => {
    this.setState({modalIsOpen: false});
  }
  //   // editCampaignDetail(){   // }
  handleFormSubmit() {
    if (this.props.user.role === 'ADMIN') {
      this
        .props
        .updateCampaignData({
          variables: {
            id: this.props.campaigns[this.state.currentCampaign].id,
            compDate: moment(this.state.compDate).format()
          }
        })
        .then((res) => {
          Alert.info('Success!', {
            position: 'top-right',
            effect: 'slide'
          });
          this.setState({data: res.data})
          this.closeModal();
        })
        .catch((error) => {
          Alert.error(error.message, {
            position: 'top-right',
            effect: 'slide'
          });
        });
    } else {
      this
        .props
        .updateCampaignData({
          variables: {
            id: this.props.campaigns[this.state.currentCampaign].id,
            name: this.state.campname,
            startDate: this.state.startDate,
            description: this.state.description
          }
        })
        .then((res) => {
          Alert.info('Success!', {
            position: 'top-right',
            effect: 'slide'
          });
          this.setState({data: res.data})
          this.closeModal();
        })
        .catch((error) => {
          Alert.error(error.message, {
            position: 'top-right',
            effect: 'slide'
          });
        });
    }
  }

  renderModal()
  {
    if (this.props.user.role === 'ADMIN') {
      return (
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add Completion Date">

          <div className="block mb-0">
            <div className="block-header block-header-default">
              <h3 className="block-title">Add Completion Date</h3>
              <div className="block-options">
                <button
                  onClick={this.closeModal}
                  type="button"
                  classNamye="btnreturn ()return ()-block-option"
                  data-dismiss="modal"
                  aria-label="Close">
                  <i className="si si-close"></i>
                </button>
              </div>
            </div>
            <div className="block-content">
              <form onsubmit="return false;">

                <div className="form-group">
                  <label>Completion Date:
                  </label>
                  <DatePicker
                    className="mr-3"
                    selected={this.state.compDate}
                    onChange={val => {
                    var d = moment(val).format();
                    this.setState({compDate: val});
                  }}/>
                </div>
              </form>
              {/*this.editCampaignDetail()*/}
            </div>
          </div>
          <div className="modal-footer mt-3">
            <button
              onClick={this.closeModal}
              type="button"
              className="btn btn-alt-secondary"
              data-dismiss="modal">Close</button>
            <button
              type="button"
              className="btn btn-alt-success"
              data-dismiss="modal"
              onClick={this
              .handleFormSubmit
              .bind(this)}>
              <i className="fa fa-plus mr-2"></i>
              Done
            </button>
          </div>
        </Modal>
      );
    } else {
      return (
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Edit Campaign">

          <div className="block mb-0">
            <div className="block-header block-header-default">
              <h3 className="block-title">Edit Campaign</h3>
              <div className="block-options">
                <button
                  onClick={this.closeModal}
                  type="button"
                  classNamye="btnreturn ()return ()-block-option"
                  data-dismiss="modal"
                  aria-label="Close">
                  <i className="si si-close"></i>
                </button>
              </div>
            </div>
            <div className="block-content">
              <form
                action="be_forms_elements_bootstrap.php"
                method="post"
                onsubmit="return false;">
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label" htmlFor="name">Campaign Name</label>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      value={this.state.campname}
                      onChange={e => {
                      this.setState({campname: e.target.value});
                    }}
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter Name.."/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label" htmlFor="Description">Description</label>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      value={this.state.description}
                      onChange={e => {
                      this.setState({description: e.target.value});
                    }}
                      className="form-control"
                      placeholder="Edit Description.."/>
                  </div>
                </div>

              </form>

            </div>
          </div>
          <div className="modal-footer mt-3">
            <button
              onClick={this.closeModal}
              type="button"
              className="btn btn-alt-secondary"
              data-dismiss="modal">Close</button>
            <button
              type="button"
              className="btn btn-alt-success"
              data-dismiss="modal"
              onClick={this
              .handleFormSubmit
              .bind(this)}>
              <i className="fa fa-plus mr-2"></i>
              Edit Campaign List
            </button>
          </div>
        </Modal>
      );
    }
  }

  renderDeleteButton(id)
  {

    return (
      <button
        type="button"
        onClick={() => {
        this
          .props
          .deleteCampaign({variables: {
              id
            }})
          .then((res) => {
            Alert.info('Success!', {
              position: 'top-right',
              effect: 'slide'
            });
            this.props.refetchCampaigns();
          })
          .catch((error) => {
            Alert.error(error.message, {
              position: 'top-right',
              effect: 'slide'
            });
          });
      }}
        className="btn btn-sm btn-secondary js-tooltip-enabled"
        data-toggle="tooltip"
        title
        data-original-title="View Customer">
        <i className="si si-trash"></i>
      </button>
    );

  }

  renderButton(date, i, hist, id)
  {
    var curr = moment().subtract(3, 'day');
    var d = moment(date)

    if (this.props.user.role === 'ADMIN') {
      return (
        <div>

          <button
            type="button"
            onClick={() => {
            this.openModal(i)
          }}
            className="btn btn-sm btn-secondary js-tooltip-enabled"
            data-toggle="tooltip"
            title
            data-original-title="View Customer">
            Edit Details
          </button>

          <button
            type="button"
            onClick={() => {
            hist.push('/branding/upload/' + id)
          }}
            className="btn btn-sm btn-secondary js-tooltip-enabled"
            data-toggle="tooltip"
            title
            data-original-title="View Customer">
            Upload Stores
          </button>
          {this.renderModal()}

        </div>
      );
    }

    if (d > curr) {
      return (
        <div>

          <button
            type="button"
            onClick={() => {
            this.openModal(i)
          }}
            className="btn btn-sm btn-secondary js-tooltip-enabled"
            data-toggle="tooltip"
            title
            data-original-title="View Customer">
            Edit Details
          </button>

          <button
            type="button"
            onClick={() => {
            hist.push('/branding/upload/' + id)
          }}
            className="btn btn-sm btn-secondary js-tooltip-enabled"
            data-toggle="tooltip"
            title
            data-original-title="View Customer">
            Upload Stores
          </button>
          {this.renderModal()}

        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.props.loading) {
      return (
        <div>No Campaigns Active</div>
      );
    }
    console.log(this.props)
    return (
      <div>
        <div id="page-container" className="main-content-boxed">
          <div id="main-container">
            <div className="content">
              <div>
                <div className="row">
                  <div
                    className="block"
                    style={{
                    margin: '0 auto'
                  }}>
                    <div className="block-content">
                      <div>
                        <div className="container">
                          <div className="row">
                            <div className="col-sm-12">
                              <table
                                className="table table-bordered table-striped table-vcenter js-dataTable-full dataTable no-footer"
                                id="DataTables_Table_1"
                                role="grid"
                                aria-describedby="DataTables_Table_1_info">
                                <thead>
                                  <tr role="row">
                                    <th
                                      className="text-center"
                                      tabIndex={0}
                                      aria-controls="DataTables_Table_1"
                                      rowSpan={1}
                                      colSpan={1}/>
                                    <th
                                      className=""
                                      tabIndex={0}
                                      aria-controls="DataTables_Table_1"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Name: activate to sort column ascending">Campaign Name</th>
                                    <th
                                      className=""
                                      tabIndex={0}
                                      aria-controls="DataTables_Table_1"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Urgency: activate to sort column ascending">Urgency</th>
                                    <th
                                      className="d-none d-sm-table-cell"
                                      tabIndex={0}
                                      aria-controls="DataTables_Table_1"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Email: activate to sort column ascending">Description</th>
                                    <th
                                      className="d-none d-sm-table-cell"
                                      tabIndex={0}
                                      aria-controls="DataTables_Table_1"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Email: activate to sort column ascending">Type</th>
                                    <th
                                      className="d-none d-sm-table-cell"
                                      style={{
                                      width: '15%'
                                    }}
                                      tabIndex={0}
                                      aria-controls="DataTables_Table_1"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Access: activate to sort column ascending">Start Date</th>
                                    <th
                                      className="d-none d-sm-table-cell"
                                      style={{
                                      width: '15%'
                                    }}
                                      tabIndex={0}
                                      aria-controls="DataTables_Table_1"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Access: activate to sort column ascending">Completion Date</th>
                                    <th
                                      className="text-center sorting_disabled"
                                      style={{
                                      width: '30%'
                                    }}
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Profile">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this
                                    .props
                                    .campaigns
                                    .map((item, index) => <tr role="row" className="odd" key={index}>
                                      <td className="text-center sorting_1">{index+1}</td>
                                      <td className="font-w600">
                                        <NavLink to={'/dashboard/' + item.id}>
                                          {item.name}
                                        </NavLink>
                                      </td>
                                      <td className="font-w600">{(item.urgent)
                                          ? "URGENT"
                                          : ""}</td>
                                      <td className="d-none d-sm-table-cell">{item.description}</td>
                                      <td className="d-none d-sm-table-cell">{item.type.name}</td>
                                      <td className="d-none d-sm-table-cell">{moment(item.startDate).format('DD-MM-YYYY')}</td>
                                      <td className="d-none d-sm-table-cell">{(item.compDate)
                                          ? moment(item.compDate).format('DD-MM-YYYY')
                                          : 'NA'}</td>
                                      <td className="text-center">

                                        {this.renderModal()}

                                        {this.renderButton(item.createdAt, index, this.props.history, item.id)}
                                        {this.renderDeleteButton(item.id)}
                                      </td>
                                    </tr>)}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class CampaignListContainer extends Component {
  render() {
    if (this.props.loading) {
      return (
        <div className="loader">
          <div></div>
        </div>
      );
    }
    return (<CampaignList {...this.props}/>)
  }
}

//query to pull campaign list
const ME_QUERY = gql `
  query {
      me {
        id
        name
        role
      }
  }
`;

const CAMPAIGN_LIST = gql `
  query{
  allCampaigns{
    id
    name
    description
    createdAt
    compDate
    startDate
    type
    {
      name
    }
    urgent
  }
}`;

//mutation to edit campaign list

const EDIT_CAMPAIGN_DATA = gql `
 mutation updateCampaign($id:ID!,$name:String,$description:String, $compDate: DateTime){
  updateCampaign(id:$id,name:$name,description:$description, compDate: $compDate){
    id
    name
  }
}

`;

const DELETE_CAMPAIGN = gql `
mutation deleteCampaign($id: ID!){
  deleteCampaign(id: $id)
  {
    id
  }
}
`;

export default compose(graphql(DELETE_CAMPAIGN, {name: 'deleteCampaign'}), graphql(ME_QUERY, {
  props: ({data}) => {
    if (!data.me) {
      return {loading: data.loading};
    }
    return {loading: data.loading, user: data.me};
  },
  options: {
    fetchPolicy: 'cache-and-network'
  }
}), graphql(CAMPAIGN_LIST, {

  props: ({data}) => {
    if (!data.allCampaigns) {

      return {loading: data.loading};
    }
    const campaigns = data.allCampaigns;

    return {loading: data.loading, campaigns, refetchCampaigns: data.refetch};
  },
  options: {
    fetchPolicy: 'cache-and-network'
  }
}), graphql(EDIT_CAMPAIGN_DATA, {
  name: 'updateCampaignData'
},))(CampaignListContainer)
