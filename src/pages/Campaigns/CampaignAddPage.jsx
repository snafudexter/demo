import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo'
import gql from 'graphql-tag'
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import CampaignForm from './CampaignForm';
import RouteWithProps from '../../helpers/RouteWithProps';

class CampaignAddPage extends Component {

  render() {
    return (
			<div>
				<div id="page-container" className="main-content-boxed">
					<div id="page-header" className="bg-gray-lighter">
						<div className="content p-0">
							<div className="content-header">
								<strong>Create Campaign</strong>
				    </div>
			    </div>
		    </div>
				<div id="main-container">
					<div className="content">
						<CampaignForm {...this.props}/>
					</div>
				</div>
			</div>
		</div>
    )
  }
}

export default CampaignAddPage;
