import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo'
import gql from 'graphql-tag'
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import UserList from './UserList';
import RouteWithProps from '../../helpers/RouteWithProps';

class AccountApproval extends Component {
	// renderSubPages = () => {
	// 	return this.props.route.routes.map((route, i) => <RouteWithProps key={i} route={route} />)
	// }
  render() {
    return (
			<UserList {...this.props}/>
    )
  }
}

export default AccountApproval;
