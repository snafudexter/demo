// import React, { Component } from 'react'
import React from 'react';
import { Link } from 'react-router-dom';
import HeaderSubMenu from './HeaderSubMenu';
import TilesBlock from '../../components/TilesBlock';

const Header = props => (
	<header id="page-header">
		<div className="content-header">
			<div className="content-header-section">
				<div className="content-header-item mr-5">
					<Link to="/dashboard" className="link-effect font-w700" href="">
						{ /*<i className="si si-fire text-primary"></i>*/}
							<span className="font-size-xl text-dual-primary-dark"></span><span className="font-size-xl text-primary">Blaze<small> - Walia & Co</small></span>
					</Link>
				</div>
			</div>
			<HeaderSubMenu {...props} />
		</div>
		<div className="content">
		<div className="row gutters-tiny">
				<div className="col-12">
					<TilesBlock/>
				</div>
			</div>
			</div>
	</header>
);

export default Header;
