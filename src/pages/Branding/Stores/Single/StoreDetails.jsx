import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {graphql,compose} from 'react-apollo';
import gql from 'graphql-tag';
import Alert from 'react-s-alert';
import Modal from 'react-modal';

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.8)';
//import AreaCalc from './Area';
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

class StoreDetails extends Component {

  state={
        modalIsOpen: false,
      }
      openModal = () => {
    
        this.setState({modalIsOpen: true});
      }
      closeModal = () => {
        this.setState({modalIsOpen: false});
      }


   AreaCalc(param1,param2){
    return (param1*param2)/144;
}

deleteStore(){
  console.log(this.props.store[0].id)
  this.props.deletestore({
    variables: {
      id:this.props.store[0].id,
    },
  }).then((res) => {
      console.log('response is')
      console.log(res);
      Alert.success('Store Deleted!', {
        position: 'top-right',
        effect: 'slide'
      });
    //this.setState({data:res.data})
  })
    .catch((error) => {
      console.log(error);
    });
    setTimeout(()=>{window.location.href="/branding/store"},2000)
    
}

renderDeleteButton()
{
  if(this.props.user.role === 'ADMIN')
  {
    return ( <h2 className="content-heading">
    Delete Store
    <button className="btn btn-danger" style={{float:'right'}} onClick={this.openModal}>Delete Store</button>
    <Modal
       isOpen={this.state.modalIsOpen}
       onAfterOpen={this.afterOpenModal}
       onRequestClose={this.closeModal}
       style={customStyles}
       contentLabel="Add Ad Spot Modal">
       <div className="block mb-0">
         <div className="block-header block-header-default">
           <h3 className="block-title">Are you sure to delete</h3>
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
         
       </div>
       <div className="modal-footer mt-3">
         <button
           onClick={this.closeModal}
           type="button"
           className="btn btn-alt-secondary"
           data-dismiss="modal">Close</button>
         <button type="button" className="btn btn-alt-success" data-dismiss="modal" onClick={this.deleteStore.bind(this)}>
           OK! Delete
         </button>
       </div>
     </Modal>
    </h2>);
  }
  else
  {
    return null;
  }
}

  render() {
    return (
      <div className="container">
      <div className="row">
      <div className="col-md-12 col-xl-12">
        {this.renderDeleteButton()}
        <h2 className="content-heading">
          {/*<Link to={`/branding/store/${this.props.store.id}`} className="btn btn-sm btn-secondary float-right">
            View Store
    </Link>*/}
          Store Details
        </h2>
        <div className="block">
          <div className="block-content">
            <table className="table table-bordered table-vcenter">
              <tbody>
                <tr>
                  <td>
                    <strong>Dealer Code</strong>
                  </td>
                  <td>{this.props.store[0].dealerCode}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Name</strong>
                  </td>
                  <td>{this.props.store[0].dealerName}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Freshness</strong>
                  </td>
                  <td>
                    <span className="badge badge-primary">
                      <span>Fresh</span>
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>Category</strong>
                  </td>
                  <td>{this.props.store[0].category.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Address</strong>
                  </td>
                  <td>{this.props.store[0].dealerAddress}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Retailer Name</strong>
                  </td>
                    <td>{this.props.store[0].retailerName}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Cluster</strong>
                  </td>
                  <td>{this.props.store[0].city.cluster.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>State</strong>
                  </td>
                  <td>{this.props.store[0].city.state.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>City</strong>
                  </td>
                  <td>{this.props.store[0].city.name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
      </div>
     </div>
     <div className="row">
      <div className="col-md-12 col-xl-12">
        <div className="block">
         <div className="block-content">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-left">Action</th>
              <th className="text-center">Status</th>
              <th className="text-center">created At</th>
              <th className="text-center">Adspots Count</th>
              <th className="text-center">Area</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p className="font-w600 mb-5"><a className="btn btn-sm btn-secondary" style={{padding: '5px 9px'}}>View Tasks</a></p>
              </td>
              <td className="text-center">
                {this.props.store[0].tasks[0].status}
              </td>
              <td className="text-center">{moment(this.props.store[0].tasks[0].startDate).format('DD/MM/YYYY')}</td>
              <td className="text-center">{this.props.store[0].tasks[0].adSpots.length}</td>
              <td className="text-center">{this.AreaCalc(1,0)}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
        
      </div>
     </div>
    </div>
    )
  }
}

const DELETE_STORE= gql `
 mutation deletestore($id:ID!){
   deletestore(id:$id){
     id
   }
 }
`;

const ME_QUERY = gql `
  query {
      me {
        id
        name
        role
      }
  }
`;

export default compose(graphql(ME_QUERY,{
  props: ({data}) => {
    if (!data.me) {
      return {loading: data.loading};
    }
    console.log(data)
    return {loading: data.loading, user: data.me};
  },
  options: {
    fetchPolicy: 'cache-and-network'
  }
}),graphql(DELETE_STORE,{name:'deletestore'}))(StoreDetails)

//export default StoreDetails;
