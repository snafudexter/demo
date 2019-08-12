import React, { Component } from 'react';
import $ from 'jquery';
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
import moment from 'moment';
import sanitizeTasksObject from '../../helpers/sanitizeTasksObject';
import sanitizeFilterTasksObject from '../../helpers/sanitizeFilterTasksObject'

// var Toolbar = ReactDataGrid.Toolbar;
var Selectors = Data.Selectors;

class TasksTable extends Component {
	componentWillReceiveProps(nextProps)
	{
		this.setState({rows: (nextProps.display)?sanitizeFilterTasksObject(nextProps.tasks, nextProps.display, nextProps.tracker):sanitizeTasksObject(nextProps.tasks, nextProps.tracker, this.props.openModalCallback)})
	}
	state = {
		filters: this.props.filter,
		rows: sanitizeTasksObject(this.props.tasks, this.props.tracker, this.props.openModalCallback),
		selectedIndexes: [],
		tableHeight: $(window).height() - 150,
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
			{
				selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx))
			},
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
		if(this.props.currentFilter)
			this.props.currentFilter(newFilters);
	};

	onClearFilters = () => {
		this.setState({ filters: {} });
	};

	selectedTasks = () => {
		let selectedTasks = [];
		let rows = this.getRows();
		this.state.selectedIndexes.map(x => {
			var task = rows[x];
			selectedTasks.push(task);
		});
		this.props.setSelectedTasks(selectedTasks);
	};

	getSubRowDetails = (rowItem) => {
		let isExpanded = false;
		return {
		  group: rowItem.children && rowItem.children.length > 0,
		  expanded: isExpanded,
		  children: rowItem.children,
		  field: 'dealerCode',
		  treeDepth: rowItem.treeDepth || 0,
		  siblingIndex: rowItem.siblingIndex,
		  numberSiblings: rowItem.numberSiblings
		};
	  };
	
	  onCellExpand = (args) => {
		let rows = this.state.rows.slice(0);
		let rowKey = args.rowData.name;
		let rowIndex = rows.indexOf(args.rowData);
		let subRows = args.expandArgs.children;
	
		let expanded = Object.assign({}, this.state.expanded);
		if (expanded && !expanded[rowKey]) {
		  expanded[rowKey] = true;
		  this.updateSubRowDetails(subRows, args.rowData.treeDepth);
		  rows.splice(rowIndex + 1, 0, ...subRows);
		} else if (expanded[rowKey]) {
		  expanded[rowKey] = false;
		  rows.splice(rowIndex + 1, subRows.length);
		}
	
		this.setState({ expanded: expanded, rows: rows });
	  };
	
	  updateSubRowDetails = (subRows, parentTreeDepth) => {
		let treeDepth = parentTreeDepth || 0;
		subRows.forEach((sr, i) => {
		  sr.treeDepth = treeDepth + 1;
		  sr.siblingIndex = i;
		  sr.numberSiblings = subRows.length;
		});
	  };
	
	  onDeleteSubRow = (args) => {
		let idToDelete = args.rowData.id;
		let rows = this.state.rows.slice(0);
		// Remove sub row from parent row.
		rows = rows.map(r => {
		  let children = [];
		  if (r.children) {
			children = r.children.filter(sr => sr.id !== idToDelete);
			if (children.length !== r.children.length) {
			  this.updateSubRowDetails(children, r.treeDepth);
			}
		  }
		  return Object.assign({}, r, { children });
		});
		// Remove sub row from flattened rows.
		rows = rows.filter(r => r.id !== idToDelete);
		this.setState({ rows });
	  };
	
	  onAddSubRow = (args) => {
		console.log('add sub row');
	  };
	

	render() {
		return (
			<div>
				<ReactDataGrid
					enableCellSelect={true}
					rowKey="dealerCode"
					enableCellSelect={true}
					cellNavigationMode="changeRow"
					// toolbar={<Toolbar enableFilter={true} />}
					columns={this.props.columns}
					rowGetter={this.rowGetter}
					rowsCount={this.getSize()}
					minHeight={this.state.tableHeight}
					toolbar={<Toolbar clearFilter={true} enableFilter={true} />}
					onGridSort={this.handleGridSort}
					onAddFilter={this.handleFilterChange}
					onClearFilters={this.onClearFilters}
					getSubRowDetails={this.props.ads?this.getSubRowDetails:undefined}
					onDeleteSubRow={this.props.ads?this.onDeleteSubRow:undefined}
					onCellExpand={this.props.ads?this.onCellExpand:undefined}
					onAddSubRow={this.props.ads?this.onAddSubRow:undefined}
					rowSelection={{
						showCheckbox: true,
						enableShiftSelect: true,
						onRowsSelected: this.onRowsSelected,
						onRowsDeselected: this.onRowsDeselected,
						selectBy: {
							indexes: this.state.selectedIndexes,
						},
					}}
				/>
			</div>
		);
	}
}
export default TasksTable;
