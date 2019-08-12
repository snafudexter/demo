import React, { Component } from 'react';
import {
	Editors,
	Formatters,
	Data,
	Toolbar,
	Filters,
	ToolsPanel,
	Menu,
	Draggable,
} from 'react-data-grid-addons';
import ReactDataGrid from 'react-data-grid';

var Selectors = Data.Selectors;

class StoresTable extends Component {
  state = {
		rows: this.props.stores,
		// rowl: 'this.props.allStores',
		selectedIndexes: [],
		tableHeight: 500,
		columns: [
			{
				key: 'action',
				name: 'Action',
				width: 115
			},
			{
				key: 'dealerCode',
				name: 'Dealer Code',
				filterable: true,
				resizable: true,
			},
			{
				key: 'fresh',
				name: 'Timeline',
				filterable: true,
				sortable: true,
				width: 70
			},
			{
				key: 'dealerName',
				name: 'Dealer Name',
				filterable: true,
				resizable: true,
				width: 120
			},
			{
				key: 'city',
				name: 'City',
				filterable: true,
				resizable: true,
			},
			{
				key: 'state',
				name: 'State',
				filterable: true,
			},
			{
				key: 'dealerAddress',
				name: 'Dealer Address',
				resizable: true,
				filterable: true,
				sortable: true,
				width: 170
			},
			{
				key: 'cluster',
				name: 'Cluster',
				resizable: true,
				filterable: true,
				sortable: true,
			},
			{
				key: 'type',
				name: 'Type',
				resizable: true,
				filterable: true,
				sortable: true,
			},
			{
				key: 'zone',
				name: 'Zone',
				resizable: true,
				filterable: true,
				sortable: true,
			},
			{
				key: 'category',
				name: 'Category',
				resizable: true,
				filterable: true,
				sortable: true,
			},
		],
  };
  getRows = () => {
		return Selectors.getRows(this.state);
	};
	getSize = () => {
		return this.getRows().length;
	};
	rowGetter = rowIdx => {
		const rows = this.getRows();
		return rows[rowIdx];
	};
	handleGridSort = (sortColumn, sortDirection) => {
		this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
	};
	onRowsSelected = rows => {
		this.setState(
			{ selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx)) },
			() => {
				this.selectedTasks();
			},
		);
	};
	onRowsDeselected = rows => {
		let rowIndexes = rows.map(r => r.rowIdx);
		this.setState(
			{
				selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1),
			},
			() => {
				this.selectedTasks();
			},
		);
	};
	handleFilterChange = filter => {
		let newFilters = Object.assign({}, this.state.filters);
		if (filter.filterTerm) {
			newFilters[filter.column.key] = filter;
		} else {
			delete newFilters[filter.column.key];
		}
		this.setState({ filters: newFilters });
	};
	onClearFilters = () => {
		this.setState({ filters: {} });
	};
	render() {
    if (this.props.loading) {
      return (
        <span>Loading...</span>
      );
    }
		return (
      <div>
      <ReactDataGrid
					enableCellSelect={true}
					cellNavigationMode="changeRow"
					// toolbar={<Toolbar enableFilter={true} />}
					columns={this.state.columns}
					rowGetter={this.rowGetter}
					rowsCount={this.getSize()}
					minHeight={this.state.tableHeight}
					toolbar={<Toolbar enableFilter={true} filterRowsButtonText="Filter Stores" />}
					onGridSort={this.handleGridSort}
					onAddFilter={this.handleFilterChange}
					onClearFilters={this.onClearFilters}
				/>
      </div>
		);
	}
}

export default StoresTable

StoresTable.propTypes = {};