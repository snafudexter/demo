import React, { Component } from 'react';
import {graphql,compose} from 'react-apollo'
import gql from 'graphql-tag'
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import RouteWithProps from '../../helpers/RouteWithProps';

class Branding extends Component {
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
                    <NavLink to="/branding/stores"><i className="si si-basket-loaded"></i>Stores</NavLink>
									</li>
									<li>
										<NavLink to="/branding/tasks"><i className="si si-picture"></i>Tasks</NavLink>
									</li>
							  </ul>
                <ul className="nav-main-header">
                <li>
                      <a className="nav-submenu" data-toggle="nav-submenu" href="#"><i className="si si-support"></i>Help</a>
                      <ul>

                        <li>
                          <a href="bd_variations_hero_video_2.php">Contact Us</a>
                        </li>
                    </ul>
                  </li>
                  <li>
										<a href="javascript:void(0)" onClick={this.props.history.goBack}>
											<i className="si si-action-undo"></i>
											Go Back
										</a>
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
	)
}
}

export default Branding;
