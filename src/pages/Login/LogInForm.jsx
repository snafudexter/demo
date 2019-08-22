import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';


import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class LogInForm extends Component {
  state = {
		username: '',
		password: '',
		loading: false
  };
  _formValidation = () => {
		this.setState({ loading: true });

		if (this.state.username === '') {
			Alert.error('Enter your Username!', {
				position: 'top-right',
				effect: 'slide',
			});
			this.setState({ loading: false });
		}
		if (this.state.password === '') {
			Alert.error('Enter your Password!', {
				position: 'top-right',
				effect: 'slide',
			});
			this.setState({ loading: false });
		}
		if (this.state.username !== '' && this.state.password !== '') {
			this.props.loginMutation({
        variables: {
          username: this.state.username,
          password: this.state.password,
        },
      }).then((res) => {
        localStorage.setItem('blaze-tata-auth-token',res.data.login.token);
        window.location.href="/dashboard"
        // this.props.history.replace('/branding/view');
      })
        .catch((error) => {
          // TODO: Add a foreach for every error thrown just not the first one
          Alert.error(error.graphQLErrors[0].message, {
            position: 'top-right',
            effect: 'slide',
          });
          this.setState({ loading: false });
        });
		}
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
        <div
          className="form-group row gutters-tiny"
          style={{ marginTop: '40px' }}
        >
          <div className="col-12 mb-10">
            <button
              type="submit"
              style={{ cursor: 'pointer' }}
              className="btn btn-block btn-hero btn-noborder btn-rounded btn-alt-primary"
            >
              {this.state.loading ? (
                <i className="fa fa-cog fa-spin" />
              ) : (
                <span>
                  <i className="si si-login mr-10" /> Sign In
                </span>
              )}
            </button>
          </div>
          <div className="col-sm-6 mb-5">
            <Link
              to="/signup"
              className="btn btn-block btn-noborder btn-rounded btn-alt-secondary"
            >
              <i className="fa fa-plus text-muted mr-5" /> New Account
            </Link>
          </div>
          <div className="col-sm-6 mb-5">
            <Link to="/forgotpassword"

            className="btn btn-block btn-noborder btn-rounded btn-alt-secondary"

            >
              <i className="fa fa-warning text-muted mr-5" /> Forgot
               Password
            </Link>
          </div>
        </div>
      </form>
    )
  }
}

const LOGIN_MUTATION = gql`
  mutation login($username: String!,$password: String!) {
    login(username:$username, password: $password) {
      token
    }
  }
`;

export default compose(graphql(
  LOGIN_MUTATION,
  { name: 'loginMutation' },
))(LogInForm);

LogInForm.propTypes = {
  loginMutation: PropTypes.func.isRequired,
};
