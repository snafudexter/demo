import React, { Component } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

class HeaderSubMenu extends Component {
	state = {
		dropDown: false
  };
  logout = () => {
    localStorage.removeItem('blaze-tata-auth-token');
    window.location.reload();
  }
	render() {
		const dropDown = classNames(
			'dropdown-menu',
			'dropdown-menu-right',
			'min-width-150',
			{
				show: this.state.dropDown
			}
		);
		return (
			<div className="content-header-section">
				<ul className="nav-main-header">
					<li>
						<a className="nav-submenu" data-toggle="nav-submenu" href="#">
							<i className="si si-layers"></i> Menu
						</a>
				<ul>
				{/*	<li>
						<NavLink to="/dashboard">
							<i className="si si-cup"></i> Dashboard
						</NavLink>
		</li>*/}
					{/*<li>
						<NavLink to="/campaigns">
							<i className="si si-picture"></i> Campaigns
						</NavLink>
					</li>*/}
					{/*<li>
						<NavLink to="/reports/general">
							<i className="si si-graph"></i> Reports
						</NavLink>
				</li>*/}
					{(this.props.user.role === 'ADMIN') ? (
						<li>
							<NavLink to="/review/new">
								<i className="si si-rocket"></i> Review
							</NavLink>
						</li>
					) : ""}
					{(this.props.user.role === 'DESIGNER') ? (
						<li>
							<NavLink to="/designers">
								<i className="si si-rocket"></i> DESIGNER
							</NavLink>
						</li>
					) : ""}
					{(this.props.user.role === 'ADMIN') ? (
						<li>
							<NavLink to="/utilities">
								<i className="si si-rocket"></i> Admin Utilities
							</NavLink>
						</li>
					) : ""}
					{/*
					{(this.props.user.role === 'BAJAJ') ? (
						<li>
							<NavLink to="/approvals">
								<i className="si si-rocket"></i> Approvals
							</NavLink>
						</li>
					) : ""}
				*/}
					{/*<li>
						<NavLink to="/invoicing">
							<i className="si si-wallet"></i> Invoicing
						</NavLink>
					</li>*/}
					<li>
						<NavLink to="/branding/tasks">
							<i className="si si-grid"></i> Archive
						</NavLink>
					</li>
					<li>
						<NavLink to="/account">
							<i className="si si-user"></i> Account
						</NavLink>
					</li>
					<li>
						<a href="mailto:rajesh.waliaandco@gmail.com">
							<i className="si si-key"></i> Help
						</a>
					</li>
					<li>
						<a
							href=""
							onClick={e => {
								e.preventDefault();
								this.logout();
							}}
						>
							<i className="si si-logout"></i> Logout
						</a>
					</li>
				</ul>
			</li>
		</ul>
		<button type="button" className="btn btn-circle btn-dual-secondary d-lg-none" data-toggle="layout" data-action="sidebar_toggle">
			Menu
			<i className="fa fa-navicon ml-5"></i>
		</button>
	</div>
)};
}

export default HeaderSubMenu;
