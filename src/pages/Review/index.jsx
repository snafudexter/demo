import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo';
import gql from 'graphql-tag';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import RouteWithProps from '../../helpers/RouteWithProps';

class Review extends Component {
	renderSubPages = () => {
		return this.props.route.routes.map((route, i) => <RouteWithProps key={i} route={route} />)
	}
	render() {
	  return (
      <div>
				<div id="page-container" className="main-content-boxed">
					<div id="page-header" className="bg-gray-lighter">
						<div className="content p-0">
							<div className="content-header">
								<ul className="nav-main-header">
                  <li>
                    <NavLink to="/review/new">New</NavLink>
									</li>
									<li>
                    <NavLink className="nav-submenu" to="/review/recceassigned">Recce</NavLink>
                    <ul>
											<li>
												<NavLink to="/review/recceassigned">Assigned Recce</NavLink>
                      </li>
                      <li>
                      <NavLink to="/review/reccecomplete">Recce Complete</NavLink>
                      </li>
									  </ul>
									</li>
									<li>
                  <NavLink className="nav-submenu" to="/review/approvalssent">Approvals</NavLink>
										<ul>
											<li>
											  <NavLink to="/review/approvalssent">Sent For Approval</NavLink>
                      </li>
                      <li>
                        <NavLink to="/review/approved">Approved Tasks</NavLink>
                      </li>
                      <li>
                        <NavLink to="/review/rejected">Rejected Tasks</NavLink>
											</li>
									  </ul>
                  </li>
                  <li>
                  <NavLink className="nav-submenu" to="/review/designing">Designing</NavLink>
										<ul>
                      <li>
											  <NavLink to="/review/assigneddesigner">Assigned Designer</NavLink>
                      </li>
											<li>
											  <NavLink to="/review/designingon">Designing On</NavLink>
                      </li>
                      <li>
												<NavLink to="/review/designingdone">Designing Done</NavLink>
                      </li>
									  </ul>
                  </li>
									<li>
                  <NavLink className="nav-submenu" to="/review/printing">Printing</NavLink>
										<ul>
											<li>
											  <NavLink to="/review/printingon">Printing</NavLink>
                      </li>
                      <li>
												<NavLink to="/review/printingreassign">Printing Reassign</NavLink>
                      </li>
                      <li>
												<NavLink to="/review/printingdone">Printing Done</NavLink>
                      </li>
									  </ul>
                  </li>
                  <li>
										<NavLink to="/review/installation">Installed</NavLink>
                  </li>
                  <li>
                    <NavLink className="nav-submenu" to="/review/completion">Completion</NavLink>
										<ul>
											<li>
											  <NavLink to="/review/completion/verify">Verify Completion</NavLink>
                      </li>
                      <li>
                      <NavLink to="/review/completion/completed">Completed</NavLink>
                      </li>
									  </ul>
									</li>
							  </ul>
                <ul className="nav-main-header">
                <li>
                      <a className="nav-submenu" data-toggle="nav-submenu" href="#"><i className="si si-support"></i>Help</a>
                      <ul>
                        <li>
                          <a href="bd_variations_hero_simple_1.php">Documentation</a>
                        </li>
                        <li>
                          <a href="bd_variations_hero_video_2.php">Contact Us</a>
                        </li>
                    </ul>
                  </li>
                  <li>
                    <a href="be_pages_dashboard.php"><i className="si si-action-undo"></i>Go Back</a>
                  </li>
                </ul>
						</div>
					</div>
				</div>
				<div id="main-container">
					<div className="content">
						{this.renderSubPages()}
					</div>
				</div>
			</div>
		</div>
	)}
}

const STORE_COUNT=gql `
query{
  getTaskCount(statusArr:["DESIGNINGDONE","INSTALLED","DESIGNING","NEW","RECCE","RECCEDONE","APPROVAL","APPROVED","REJECTED","PRINTING","PRINTINGDONE"]){
    count
  }
}

`;

export default compose(graphql(STORE_COUNT,{
	props: ({data}) => {
    if (!data.getTaskCount)
      return {loading: data.loading};

    return {loading: data.loading, showCount: data.getTaskCount,};
  },

})) (Review);

