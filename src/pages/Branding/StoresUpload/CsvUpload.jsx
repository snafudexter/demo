import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Papa from 'papaparse';
import CsvTable from './CsvTable';
import { Line } from 'rc-progress'
import ExportButton from '../../../helpers/ExportButton'

var items = []
class CsvUpload extends Component {
	constructor(){
		super();
		this.state = {
			loading: false,
			stores: {},
			selectedStores: [],
			total: 0,
			done: -1,
			prog: 0
		}
	}



	progress = (val) =>
	{
		var pg = this.state.done;
		var selectedStores = this.state.selectedStores;

		if(val.status === true){

		}
		else{

			selectedStores.push(val.selectedStore);
		}

		if(pg < this.state.total)
			pg++;

		var prog = (pg/this.state.total) * 100;
		this.setState({selectedStores, done: pg,prog})
		
	}

  handleCsvUpload = e => {
		const self = this;
		Papa.parse(e.target.files[0], {
			header: true,
			complete(results, file) {
				let data = results.data;

				for(var i = 0; i < data.length; i++)
				{
					if(data[i].asmmobile)
						data[i].asmmobile.replace(/[^\d]/, '')

					if(data[i].dealercode)
					data[i].dealercode.replace(/[^\d]/, '')

					if(data[i].retailercontactno)
					data[i].retailercontactno.replace(/[^\d]/, '')
				}

				// Check for categories
				for (var i = 0; i < data.length; i++) {
					for (var index = 0; index < self.props.categories.length; index++) {
						if (data[i].subcategory) {
							if (
								self.props.categories[index].label.toLowerCase().indexOf(
									data[i].subcategory
										.toLowerCase()
										// .replace(/[^\w\-]+/g, '') // Remove all non-word chars
										.replace(/^\s\s*/, '') // Trim Space from start of text
                    .replace(/\s*$/, '') // Trim Space from end of text
								) != -1
							) {
								data[i].categoryid = self.props.categories[index].value;
							}
						}
					}
				}

				// Check for cities
				for (var i = 0; i < data.length; i++) {
					for (var index = 0; index < self.props.cities.length; index++) {
						if (data[i].city) {
							if (
								self.props.cities[index].label.toLowerCase() === (
									data[i].city
										.toLowerCase()
										.replace(/[^\w\-]+/g, '') // Remove all non-word chars
										.replace(/^-+/, '') // Trim - from start of text
										.replace(/-+$/, '') // Trim - from end of text
										.replace(/^\s\s*/, '') // Trim Space from start of text
                    .replace(/\s*$/, '')
								) 
							) {
								data[i].cityid = self.props.cities[index].value;
							}
						}
					}
				}

				// // Check for repeat tasks
				// for (var i = 0; i < data.length; i++) {
				// 	for (var index = 0; index < self.props.stores.length; index++) {
				// 		if (data[i].dealercode) {
				// 			if (
				// 				self.props.stores[index].dealerCode ===
				// 				Number(data[i].dealercode.replace(/^-+/, '').replace(/-+$/, ''))
				// 			) {
				// 				data[i].storeid = self.props.stores[index].id;
				// 				data[i].status = self.props.stores[index].status;
				// 			}
				// 		}
				// 	}
				// }

				self.setState({
					stores: data,
				});
			},
		});
	};
	async handleAutoStartBranding () {
		items = document.querySelectorAll(".upload-action-btn")
		this.setState({total: items.length,loading: true, done: 0})
		
	}
	renderAutoButton = () => {
		if(this.state.stores.length > 0){

			return (<button
				className="btn btn-sm btn-rounded btn-success"
				onClick={this.handleAutoStartBranding.bind(this)}
				disabled={this.state.loading}
				//style={{display:(this.state.loading)?'none':'inline-block'}}
			>

				{this.state.loading ? "Loading..." : "Start Branding All Stores"}
			</button>)

	}
	else{
		return null;
	}

	}
  renderCsvTable = () => {
    if ( this.state.stores.length > 0 ) {
      return (
				<div>
				<Line percent={this.state.prog}  strokeColor="#8BC34A" style={{margin: "10px"}}/>
				<div className="block-options" style={{marginTop: 20, marginBottom: 20}}>
          {this.state.prog == 100 ? (
            <ExportButton
              showAlert={this.props.showAlert}
              tasks={this.state.selectedTasks}
              storeRefetch={this.props.storeRefetch}
              allTask={this.props.allTasks}
            />
          ) : (
            <button
                type="button"
                className="btn btn-secodary float-left"
                >
                  Download Report
              </button>
          )}
        </div>
				
        <CsvTable
				start={this.state.done}
					onProgress={this.progress.bind(this)}
          stores={this.state.stores}
          cities={this.props.cities}
          categories={this.props.categories}
					campaign={this.props.campaign}
        />
				</div>
      )
    }
  }
	render() {
	  return (
      <div>
        <input
          type="file"
          accept=".csv"
          onChange={e => {
            this.handleCsvUpload(e);
          }}
          name="csvFile"
				/>
				{this.renderAutoButton()}
				{this.renderCsvTable()}
      </div>
	  );
	}
}

const ALL_CATEGORIES = gql`
  query allCategories {
    allCategories {
      id
      name
    }
  }
`;

const ALL_CITIES = gql`
  query allCities {
    allCities {
      id
      name
    }
  }
`;

export default compose(
  graphql(ALL_CATEGORIES, {
    props: ({ data }) => {
      if (!data.allCategories) return { loading: data.loading };

      const categories = data.allCategories.map(({ id, name }) => ({
        value: id,
        label: name,
      }));

      return { loading: data.loading, categories };
    },
    options: {
      fetchPolicy: 'cache-and-network',
    },
  }),
	graphql(ALL_CITIES, {
    props: ({ data }) => {
      if (!data.allCities) return { loading: data.loading };

      const cities = data.allCities.map(({ id, name }) => ({ value: id, label: name }));

      return { loading: data.loading, cities };
    },
    options: {
      fetchPolicy: 'cache-and-network',
    },
  }),
)(CsvUpload);
