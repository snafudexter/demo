import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo'
import gql from 'graphql-tag'
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import CampaignList from './CampaignList';
import RouteWithProps from '../../helpers/RouteWithProps';

class CampaignListPage extends Component {
	// renderSubPages = () => {
	// 	return this.props.route.routes.map((route, i) => <RouteWithProps key={i} route={route} />)
	// }
  render() {
    return (
			<div>
				<div id="page-container" className="main-content-boxed">
					<div id="page-header" className="bg-gray-lighter">
						<div className="content p-0">
							<div className="content-header">
								<strong>View Campaigns</strong>
				    </div>
			    </div>
		    </div>
				<div id="main-container">
					<div className="content">
						<CampaignList {...this.props}/>
					</div>
				</div>
			</div>
		</div>
    )
  }
}

export default CampaignListPage;
