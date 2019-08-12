import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';



import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class ForgotPassword extends Component {
  state = {
		username: '',
		loading: false
  };

  
  sendEmail = () => {
		this.setState({ loading: true });

		if (this.state.username === '') {
			Alert.error('Enter your Username!', {
				position: 'top-right',
				effect: 'slide',
			});
			this.setState({ loading: false });
    }
    else{
      var d = {
        username: this.state.username
      }

      this.props.forgot_pass({variables: d})
      .then((response) =>{
        this.setState({ loading: false });
        Alert.info('Check your email!', {
          position: 'top-right',
          effect: 'slide',
        });
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
                open: this.state.username !== ''
              })}
            >
              <input
                type="text"
                className="form-control"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
                id="login-username"
                name="login-username"
              />
              <label htmlFor="login-username">Username</label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          {/*<div className="col-12">
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
                </div>*/}
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
                  <i className="si si-login mr-10" /> Send Password
                </span>
              )}
            </button>
          </div>
        
        </div>
      </form>
    )
  }
}

const FORGOT_MUTATION =  gql`
mutation finduser($username:String!)
{
  findUser(username: $username)
  {
    count
  }
}`;



export default compose(graphql(FORGOT_MUTATION, {name: "forgot_pass"}))(ForgotPassword);

ForgotPassword.propTypes = {};
