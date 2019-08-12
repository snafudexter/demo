import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class ChangePasswordForm extends Component {
  state = {
		username: '',
		loading: false
  };

  sendEmail = () => {
		this.setState({ loading: true });

		if (this.state.password !== this.state.conf) {
			Alert.error('Passwords don\'t match', {
				position: 'top-right',
				effect: 'slide',
			});
			this.setState({ loading: false });
    }
    else{
      var d = {
        password: this.state.password,
        token: this.props.token
      }

      this.props.change_pass({variables: d})
      .then((response) =>{
        this.setState({ loading: false });
        Alert.info('Success', {
          position: 'top-right',
          effect: 'slide',
        });
        this.props.history.push('/login')
      })
      .catch((response) =>{
        this.setState({ loading: false });
        if(response.graphQLErrors[0]){
        Alert.error(response.graphQLErrors[0].message, {
          position: 'top-right',
          effect: 'slide',
        });
      }
      else
      {        
        Alert.error(response.message, {
          position: 'top-right',
          effect: 'slide',
        });
      }
      })
    }
  };
  
  
  render() {
    console.log(this.props)
    return (
      <form
      onSubmit={e => {
        e.preventDefault();
        this.sendEmail();
      }}
    >
      
      <div className="form-group row">
        <div className="col-12">
          <div
            className={classNames('form-material', 'floating', {
              open: this.state.password !== ''
            })}
          >
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={e =>
                this.setState({ password: e.target.value })}
                id="login-password"
                name="login-password"  
            />
            <label htmlFor="login-password">Password</label>
          </div>
              </div>
      </div>
      <div className="form-group row">
        <div className="col-12">
          <div
            className={classNames('form-material', 'floating', {
              open: this.state.conf !== ''
            })}
          >
            <input
              type="password"
              className="form-control"
              value={this.state.conf}
              onChange={e =>
                this.setState({ conf: e.target.value })}         
                id="conf-password"
                name="conf-password"       
            />
            <label htmlFor="conf-password">Confirm Password</label>
          </div>
        </div>
      </div>
      <div
        className="form-group row gutters-tiny"
        style={{ marginTop: '40px' }}
      >
        <div className="col-12 mb-10">
          <button
           //onClick={this.sendEmail.bind(this)}
            type="submit"
            style={{ cursor: 'pointer' }}
            className="btn btn-block btn-hero btn-noborder btn-rounded btn-alt-primary"
          >
            {this.state.loading ? (
              <i className="fa fa-cog fa-spin" />
            ) : (
              <span>
                <i className="si si-login mr-10" /> Update Password
              </span>
            )}
          </button>
        </div>
        
      </div>
    </form>
     
    )
  }
}


const CHANGEPASSWORD_MUTATION = gql`
mutation changeP($token: String!, $password: String!)
{
  changePassword(token: $token, password: $password)
  {
    count
  }
}`;


export default compose(graphql(CHANGEPASSWORD_MUTATION, {name: "change_pass"}))(ChangePasswordForm);

ChangePasswordForm.propTypes = {};
