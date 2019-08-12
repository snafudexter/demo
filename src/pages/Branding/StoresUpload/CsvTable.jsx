import React, { Component } from 'react';
import $ from 'jquery';
import sanitizeObjectKeys from '../../../helpers/sanitizeObjectKeys'
import CsvTableItem from './CsvTableItem';

class CsvTable extends Component {
  
  componentDidMount() {
    $('.zor-csv-table').css('height', $(window).height()-150);
  }
  storeItems = () => {
		if (this.props.stores) {
			if (this.props.stores.length > 0) {
				return this.props.stores.map((store, index) => {
          let sanitizedStore = sanitizeObjectKeys(store);
          if(sanitizedStore.dealercode != '') {
            return (
              <CsvTableItem
                onProgress={this.props.onProgress}
                key={index}
                start={this.props.start}
                no={index}
                cities={this.props.cities}
                categories={this.props.categories}
                campaign={this.props.campaign}
                {...sanitizedStore}
              />
              // <StoreCsvItem
              // 	key={index}
              // 	showAlert={this.props.showAlert}
              // 	cities={this.props.cities}
              // 	categories={this.props.categories}
              // 	{...this.state}
              // 	{...sanitizedStore}
              // />
            );
          }
				});
			}
		}
	};
  render() {
    return (
      <div>
        <table
          className="zor-csv-table table table-bordered table-vcenter text-center"
          style={{ overflowX: 'scroll', display: 'block', width: '100%', background: '#fff', marginTop: 30 }}
        >
          <thead>
            <tr>
            <th style={{ verticalAlign: 'middle', 'textAlign': 'center', minWidth: '180px' }}>Campaign</th>
              <th style={{ verticalAlign: 'middle', 'textAlign': 'center', minWidth: '180px' }}>Status</th>
              <th style={{ verticalAlign: 'middle', 'textAlign': 'center', minWidth: '150px' }}>Dealer Code</th>
              <th style={{ verticalAlign: 'middle', 'textAlign': 'center', minWidth: '150px' }}>City</th>
              <th style={{ verticalAlign: 'middle', 'textAlign': 'center', minWidth: '200px' }}>Sub Category</th>
              <th style={{ verticalAlign: 'middle', 'textAlign': 'center', minWidth: '220px' }}>Dealer Name</th>
              <th style={{ verticalAlign: 'middle', 'textAlign': 'center', minWidth: '350px' }}>Dealer Address</th>
              <th style={{ verticalAlign: 'middle', 'textAlign': 'center', minWidth: '180px' }}>Retailer Contact Person</th>
              <th style={{ verticalAlign: 'middle', 'textAlign': 'center', minWidth: '180px' }}>Retailer Contact No</th>
              <th style={{ verticalAlign: 'middle', 'textAlign': 'center', minWidth: '180px' }}>ASM Name</th>
              <th style={{ verticalAlign: 'middle', 'textAlign': 'center', minWidth: '180px' }}>ASM Mobile</th>
            </tr>
          </thead>
          <tbody className="font-w600">{this.storeItems()}</tbody>
        </table>
      </div>
    );
  }
}

export default CsvTable;
