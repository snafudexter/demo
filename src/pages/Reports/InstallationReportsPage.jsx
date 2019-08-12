import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo'
import gql from 'graphql-tag'
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import RouteWithProps from '../../helpers/RouteWithProps';
import InstallationReports from './InstallationReports';

class InstallationReportsPage extends Component {
  render() {
    return (
		<div>
		<div id="page-container" className="main-content-boxed">
			<div id="page-header" className="bg-gray-lighter">
				<div className="content p-0">
					<div className="content-header">
						<ul className="nav-main-header">
						<li>
							<NavLink to="/generalreports"><i className="si si-graph"></i>General</NavLink>
						</li>
						<li>
							<NavLink to="/pivotreports"><i className="si si-bar-chart"></i>Pivot</NavLink>
						</li>
						<li>
							<NavLink to="/installationreports"><i className="si si-bar-chart"></i>Installation</NavLink>
						</li>
						<li>
							<NavLink to="/compmap"><i className="si si-bar-chart"></i>Competition</NavLink>
						</li>
						</ul>
				</div>
			</div>
		</div>

		<div id="main-container">
			<div className="content">
				<InstallationReports />
			</div>
		</div>

	</div>
</div>
    )
  }
}

export default InstallationReportsPage;
