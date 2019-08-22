import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';


import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class SignUpForm extends Component {
  state = {
		name: '',
		loading: '',
		username: '',
		password: '',
		confirmPassword: ''
	};
  _formValidation = () => {
		let error = false;

		if (this.state.name === '') {
			Alert.error('Enter your Name!', {
				position: 'top-right',
				effect: 'slide',
			});
			error = true;
		}
		if (this.state.username === '') {
			Alert.error('Enter your Username!', {
				position: 'top-right',
				effect: 'slide',
			});
			error = true;
		}
		if (this.state.password === '' || this.state.password.length < 5) {
			Alert.error('Password must be more than 5 characters!', {
				position: 'top-right',
				effect: 'slide',
			});
			error = true;
		}
		if (this.state.password !== this.state.confirmPassword) {
			Alert.error('Passwords do not match!', {
				position: 'top-right',
				effect: 'slide',
			});
			error = true;
		}
		if (!error) {
			this._confirm();
		}
  };
  _confirm = async () => {

    this.setState({ loading: true });

    this.props.signupMutation({
      variables: {
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
      },
    }).then((res) => {

      localStorage.setItem('blaze-tata-auth-token',res.data.signup.token);
      // this.props.history.replace('/');
      window.location.href="/branding/view"

    })
      .catch((error) => {

        // TODO: Add a foreach for every error thrown just not the first one
        // Alert.error(error.graphQLErrors[0].message, {
        //   position: 'top-right',
        //   effect: 'slide',
        // });
        this.setState({ loading: false });
      });
	};
  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this._formValidation();
        }}
      >
        <div className="form-group row">
          <div className="col-12">
            <div
              className={classNames('form-material', 'floating', {
                open: this.state.name !== ''
              })}
            >
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                id="login-name"
                name="login-name"
              />
              <label htmlFor="login-name">Name</label>
            </div>
          </div>
        </div>
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
                open: this.state.confirmPassword !== ''
              })}
            >
              <input
                type="password"
                className="form-control"
                value={this.state.confirmPassword}
                onChange={e =>
                  this.setState({ confirmPassword: e.target.value })}
                id="login-confirmPassword"
                name="login-confirmPassword"
              />
              <label htmlFor="login-confirmPassword">
                Confirm Password
              </label>
            </div>
          </div>
        </div>
        <div
          className="form-group row gutters-tiny"
          style={{ marginTop: '40px' }}
        >
          <div className="col-12 mb-10">
            <button
              type="submit"
              className="btn btn-block btn-hero btn-noborder btn-rounded btn-alt-primary"
              style={{ cursor: 'pointer' }}
            >
              {this.state.loading ? (
                <i className="fa fa-cog fa-spin" />
              ) : (
                <span>
                  <i className="si si-login mr-10" /> Register
                </span>
              )}
            </button>
          </div>
          <div className="col-sm-6 mb-5">
            <Link
              to="/login"
              className="btn btn-block btn-noborder btn-rounded btn-alt-secondary"
            >
              <i className="fa fa-user text-muted mr-5" /> Already a
              User?
            </Link>
          </div>
          <div className="col-sm-6 mb-5">
            <a
              className="btn btn-block btn-noborder btn-rounded btn-alt-secondary"
              href="op_auth_reminder.html"
            >
              <i className="fa fa-warning text-muted mr-5" /> Contact
              Admin
            </a>
          </div>
        </div>
      </form>
    )
  }
}

const SIGNUP_MUTATION = gql`
  mutation signup($username: String!,$password: String!,$name: String!) {
    signup(username:$username, password: $password,name: $name) {
      token
    }
  }
`;

export default compose(graphql(
  SIGNUP_MUTATION,
  { name: 'signupMutation' },
))(SignUpForm);

SignUpForm.propTypes = {
  signupMutation: PropTypes.func.isRequired,
};
