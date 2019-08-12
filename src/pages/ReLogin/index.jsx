import React, { Component } from 'react';
import Alert from 'react-s-alert';

import Image from '../../logo.png';
import ForgotPassword from './ForgotPassword';

class ReLogin extends Component {
	render() {
	  return (
      <div
					className="login-wrapper content content-full bg-white"
					style={{ maxWidth: '700px', paddingBottom: '60px' }}
				>
				<Alert stack={{limit: 3}} />				
					<div className="py-30 px-5 text-center">
						<img src={Image} style={{ maxWidth: '150px' }} />
						<h1 className="h2 font-w700 mt-50 mb-10">
							Welcome to Your Dashboard
						</h1>
						<h2 className="h4 font-w400 text-muted mb-0">Please Enter your Username</h2>
					</div>
					<div className="row justify-content-center px-5">
						<div className="col-sm-7 col-md-7 col-lg-7">
						<ForgotPassword history={this.props.history} />
						</div>
					</div>
				</div>
	  );
	}
}

export default ReLogin;
