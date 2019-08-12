import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Modal from 'react-modal';
import Alert from 'react-s-alert';


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

class AccountForm extends Component {

  state={
    modalIsOpen: false,
    name:this.props.user.name,
    email:this.props.user.email,
    mobile:this.props.user.mobile,
    oldpass: '',
    newpass: '',
    confpass:''
    
  }

  changePassword = () =>{

    var valid = true;
    if(this.state.oldpass === '')
    {
      Alert.error('Enter Old Password!', {
        position: 'top-right',
        effect: 'slide'
      });
      valid = false;
    }

    if(this.state.newpass === '')
    {
      Alert.error('Enter New Password!', {
        position: 'top-right',
        effect: 'slide'
      });
      valid = false;
    }

    if(this.state.confpass === '')
    {
      Alert.error('Enter Confirm Password!', {
        position: 'top-right',
        effect: 'slide'
      });
      valid = false;
    }

    if(this.state.newpass !== this.state.confpass)
    {
      Alert.error('Passwords don\'t match!', {
        position: 'top-right',
        effect: 'slide'
      });
      valid = false;
    }

    if(valid)
    {
      var d = {
        newPassword: this.state.newpass,
        oldPassword: this.state.oldpass,
        username: this.props.user.username
      }
      this.props.updateUserPassword({variables: d})
      .then(resp => {
        Alert.info('Success', {
          position: 'top-right',
          effect: 'slide'
        });
        this.closeModal();
        this.setState({oldpass: '',
        newpass: '',
        confpass:''})
      })
      .catch(error => {
        if(error.graphQLErrors[0]) {
          Alert.error(error.graphQLErrors[0].message, {
            position: 'top-right',
            effect: 'slide'
          });
        }
        else{
          Alert.error(error.message, {
            position: 'top-right',
            effect: 'slide'
          });

        }
      })
    }


  }

  openModal = () =>  {

		this.setState({modalIsOpen: true});
    }
    
    
	  closeModal = () => {
		this.setState({modalIsOpen: false});
    }
    

  updateInfo = () => {
    console.log('called')
    this.props.updateUserData({
      variables: {
        id:this.props.user.id,
        name: this.props.user.name,
        email: this.state.email,
        mobile:this.state.mobile,
      },
    })
    .then((res) => {
      console.log('success')
      Alert.info('Success!', {
          position: 'top-right',
          effect: 'slide'
        });
        console.log('refetching')
        this.props.refetchUser();
    })
    .catch((error) => {
      console.log('error')
        Alert.error(error, {
          position: 'top-right',
          effect: 'slide'
        });
      });
  }
  handleName(e){
    this.setState({name:e.target.value})
  }
  render() {
    return (
      <div>
        <div id="page-container" className="main-content-boxed">
          <div id="main-container">
           <div className="content">
            <div>
             <div className="row">
             <div className="block" style={{width:'70%',margin:'0 auto'}}>
             <div className="block-content">
               <form >
               <div className="form-group ">
               <label htmlFor="example-nf-email">Name</label>
               <input className="form-control" value={this.state.name}  onChange={this.handleName.bind(this)} placeholder="Enter Name.." />
               </div>
                 <div className="form-group ">
                   <label htmlFor="example-nf-email">Email</label>
                   <input type="email" className="form-control" value={this.state.email} onChange={e => this.setState({email:e.target.value})} placeholder="Enter Email.." />
                 </div>
                 <div className="form-group">
                   <label htmlFor="example-nf-email">Mobile No</label>
                   <input className="form-control" value={this.state.mobile} onChange={e=>this.setState({mobile:e.target.value})}  placeholder="Enter Mobile No.." />
                 </div>
                 <div className="form-group">
                   <button type="button" onClick={this.updateInfo.bind(this)} className="btn btn-alt-success">Submit</button>
                 </div>
                 <div className="form-group">
                   <button onClick={()=>this.setState({modalIsOpen: true})} className="btn btn-alt-success">Change Password</button>
                 </div>
               </form>
                  <Modal
                      isOpen={this.state.modalIsOpen}
                      onAfterOpen={this.afterOpenModal}
                      onRequestClose={this.closeModal}
                      style={customStyles}
                      contentLabel="Change Password">

              <div className="block mb-0">
                <div className="block-header block-header-default">
                  <h3 className="block-title">Change Password</h3>
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
                      <div className="col-lg-12">
                        <input
                          type="password"
                          value={this.state.oldpass}
                          onChange={e => {
                          this.setState({oldpass: e.target.value});
                        }}
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Old Password.."/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-lg-12">
                        <input
                          type="password"
                          value={this.state.newpass}
                          onChange={e => {
                          this.setState({newpass: e.target.value});
                        }}
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="New Password..."/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-lg-12">
                        <input
                          type="password"
                          value={this.state.confpass}
                          onChange={e => {
                          this.setState({confpass: e.target.value});
                        }}
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder="Cofirm New Password.."/>
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
                <button type="button" className="btn btn-alt-success" data-dismiss="modal" onClick={this.changePassword.bind(this)}>
                  <i className="fa fa-plus mr-2"></i>
                  Change Password
                </button>
              </div>
            </Modal>
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

class AccountFormContainer extends Component {
  render() {
    if (this.props.loading) {
      return (
        <div className="loader"><div></div></div>
      );
    }
      return (
        <AccountForm {...this.props} />
      )
    }
}

//query to pull logged user detail

const USER_QUERY = gql`
  query userQuery {
    me {
      id
      name
      email
      mobile
      username
    }
  }
`;

//mutation to change data
const ACCOUNT_MUTATION=gql `
  mutation updateUserData($id: ID!,$name: String, $email: String, $mobile: String){
  updateUserData(id: $id, name:$name,email:$email,mobile:$mobile){
    id
   name
   email
   mobile
  }
}
`;

//mutation to change data
const CHANGE_PASSWORD_MUTATION=gql `
  mutation updateUserPassword($username: String!, $oldPassword: String!, $newPassword: String!){
    updateUserPassword(username: $username, oldPassword: $oldPassword, newPassword: $newPassword){
    id
  }
}
`;


const options = { fetchPolicy: 'network-only' };

export default compose(graphql(USER_QUERY, {
  props: ({ data }) => {
    if (!data.me) return { loading: data.loading };
    return {
      user: data.me,
      refetchUser: data.refetch
    };
  },
  options,
}),
(graphql( 
  ACCOUNT_MUTATION,
  { name: 'updateUserData' },
)),
graphql(
  CHANGE_PASSWORD_MUTATION,
  { name: 'updateUserPassword' },
)
)(AccountFormContainer);
