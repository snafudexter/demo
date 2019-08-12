import React, {Component} from 'react';
import {graphql,compose} from 'react-apollo';
import gql from 'graphql-tag';
import Modal from 'react-modal';
import Alert from 'react-s-alert';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

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

class UserList extends Component{
  state = {
    modalIsOpen: false,
    role: '',
    type: '',
    currentId: '',
    cluster: ''
  }
	

    openModal = async (item) =>  {
      
      await this.setState({modalIsOpen: true, role:{label: item.role, value: item.role},currentId: item.id, type: (item.type)?{label:item.type.name, value:item.type.id}:null, cluster: (item.cluster)?{label:item.cluster.name, value:item.cluster.id}:null});
      
    }
    
	closeModal = () => {
	    this.setState({modalIsOpen: false});
    }
    
	  handleFormSubmit(){
        var valid = true;
        if(this.state.role==='')
        {
            Alert.error('Select Role', {
                position: 'top-right',
                effect: 'slide'
              });
              valid = false;
        }
        
        var d = {};
        if(this.state.role.value==='BAJAJ')
        {
          d = {
              id:this.state.currentId,
              role: this.state.role.value,
              typeId:(this.state.type)?this.state.type.value:null,
              clusterId:(this.state.cluster)?this.state.cluster.value: null
            }
        }
        else{
            d = {
              id:this.state.currentId,
              role: this.state.role.value,
          }
        }

        if(valid){
          this.props.approveUser({
              variables: d,
          }).then((res) => {
      Alert.info('Success!', {
        position: 'top-right',
        effect: 'slide'
      });
      this.setState({type: '', role: '', currentId: ''})
      this.props.refetchUser();
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
      
        return (<Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Assign Role">
  
    <div className="block mb-0">
      <div className="block-header block-header-default">
        <h3 className="block-title">Assign Role</h3>
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

          <div className="col-12">
			<label>Select Business Type:</label>
			<Select
				name="type"
                
				className="mr-3"
				placeholder="Type"
				// value={this.state.typeid}
				value={this.state.role}
				options=
                    {[
                        { value: 'BAJAJ', label: 'BAJAJ' },
                        { value: 'RECCE', label: 'RECCE' },
                        { value: 'DESIGNER', label: 'DESIGNER' },
                        { value: 'PRINTER', label: 'PRINTER' },
                    ]}
            
				onChange={val => {
					this.setState({ role: val });
				}}
			/>
			</div>
          
          <div className="col-12">
			<label>Select Business Type:</label>
			<Select
				name="type"
                disabled={(this.state.role.label==='BAJAJ')?false: true}
				className="mr-3"
				placeholder="Type"
				// value={this.state.typeid}
				value={(this.state.role.label==='BAJAJ')?this.state.type:"none"}
				options={this.props.types}
				onChange={val => {
					this.setState({ type: val });
				}}
			/>
			</div>
      <div className="col-12">
			<label>Select Cluster:</label>
			<Select
				name="type"
                disabled={(this.state.role.label==='BAJAJ')?false: true}
				className="mr-3"
				placeholder="Type"
				// value={this.state.typeid}
				value={(this.state.role.label==='BAJAJ')?this.state.cluster:"none"}
				options={this.props.clusters}
				onChange={val => {
					this.setState({ cluster: val });
				}}
			/>
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
      <button type="button" className="btn btn-alt-success" data-dismiss="modal" onClick={this.handleFormSubmit.bind(this)}>
        <i className="fa fa-plus mr-2"></i>
        Approve
      </button>
    </div>
  </Modal>);
    }

    renderButton(id)
    {
        return (

            <button type="button" onClick={() => {this.openModal(id)}}
            className="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="tooltip" title data-original-title="View Customer">
            Edit Role
            </button>
            );
    }



	render(){


		if (this.props.loading) {
      return (
        <div>No one needs your approval!</div>
      );
    }
		return(
      <div id="page-container" className="main-content-boxed">
        <div id="main-container">
         <div className="content">
          
           <div className="row">
           <div className="block" style={{margin:'0 auto'}}>
           <div className="block-content">
	
          <div className="container">
			<div className="row">
			<div className="col-md-12">
				<table className="table table-bordered table-striped table-vcenter js-dataTable-full dataTable no-footer" id="DataTables_Table_1" role="grid" aria-describedby="DataTables_Table_1_info">
					<thead>
						<tr role="row">
							<th className="text-center" tabIndex={0} aria-controls="DataTables_Table_1" rowSpan={1} colSpan={1} />
							<th className=""  tabIndex={0} aria-controls="DataTables_Table_1" rowSpan={1} colSpan={1} aria-label="Name: activate to sort column ascending">Name</th>
							<th className="d-none d-md-table-cell"  tabIndex={0} aria-controls="DataTables_Table_1" rowSpan={1} colSpan={1} aria-label="Username: activate to sort column ascending">Username</th>
              <th className="d-none d-md-table-cell" tabIndex={0} aria-controls="DataTables_Table_1" rowSpan={1} colSpan={1} aria-label="Role: activate to sort column ascending">Role </th>
              <th className="d-none d-md-table-cell" tabIndex={0} aria-controls="DataTables_Table_1" rowSpan={1} colSpan={1} aria-label="Type: activate to sort column ascending">Type </th>
              <th className="d-none d-md-table-cell" tabIndex={0} aria-controls="DataTables_Table_1" rowSpan={1} colSpan={1} aria-label="Cluster: activate to sort column ascending">Cluster </th>
              <th className="text-center sorting_disabled" style={{width: '15%'}} rowSpan={1} colSpan={1} aria-label="Profile">Action</th>
						</tr>
					</thead>
					<tbody>
						{this.props.users.map((item,index)=>
						    <tr role="row" className="odd" key={index}>
							<td className="text-center sorting_1">{index+1}</td>
							<td className="font-w600">{item.name}</td>
							<td className="d-none d-sm-table-cell">{item.username}</td>
              <td className="d-none d-sm-table-cell">{item.role}</td>
              <td className="d-none d-sm-table-cell">{(item.type)?item.type.name:""}</td>
              <td className="d-none d-sm-table-cell">{(item.cluster)?item.cluster.name:""}</td>
							<td className="text-center">
                                {this.renderModal()}
                                {this.renderButton(item)}
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
		)
	}
}

const USER_LIST = gql`
query getUserList{
    getUserList{
        id
        name
        username
        role
        email
        type
        {
          id
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

const TYPES_LIST = gql `
  query {
    allTypes {
      id
      name
    }
  }
`;

const CLUSTER_LIST = gql `
  query {
    allClusters {
      id
      name
    }
  }
`;

const APPROVE_MUTATION = gql`
mutation approveUser($id: ID!, $role: String!, $typeId: ID, $clusterId: ID)
{
    approveUser(id: $id, typeId: $typeId, role: $role, clusterId: $clusterId)
    {
        id
    }
}
`;

export default compose(graphql(APPROVE_MUTATION,{name:"approveUser"}),graphql(TYPES_LIST,{

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
  
  }),graphql(CLUSTER_LIST,{

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
  
  }),
    graphql(USER_LIST, {
      props: ({ data }) => {
          
        if (!data.getUserList){ return { loading: data.loading } };
        
        return { loading: data.loading, users: data.getUserList , refetchUser: data.refetch};
      },
      options: {
        fetchPolicy: 'cache-and-network',
      },
    }),
    
  )(UserList);
  
  UserList.propTypes = {};
