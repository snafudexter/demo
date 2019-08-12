import React, {Component} from 'react';
import StoresTableWrapper from './StoresTableWrapper';

class Stores extends Component {
		render() {
				return (
						<div>
								<h2 className="content-heading">
										Stores 
										<small>
												List of all stores</small>
								</h2>
								<div className="animated fadeIn">
										<StoresTableWrapper/>
								</div>
						</div>
				);
		}
}

export default Stores;
