import React, { Component } from "react";
import $ from "jquery";
import {
  Editors,
  Formatters,
  Data,
  Toolbar,
  Filters,
  ToolsPanel,
  Menu,
  Draggable
} from "react-data-grid-addons";
import ReactDataGrid from "react-data-grid";
import sanitizeCompMapObject from "./sanitiseCompMapObject";
// var Toolbar = ReactDataGrid.Toolbar;
var Selectors = Data.Selectors;

class CompMapTable extends Component {
  state = {
    rows: sanitizeCompMapObject(this.props.tasks),
    selectedIndexes: [],
    tableHeight: $(window).height() - 150
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
        selectedIndexes: this.state.selectedIndexes.concat(
          rows.map(r => r.rowIdx)
        )
      },
      () => {
        this.selectedTasks();
      }
    );
  };

  onRowsDeselected = rows => {
    let rowIndexes = rows.map(r => r.rowIdx);
    this.setState(
      {
        selectedIndexes: this.state.selectedIndexes.filter(
          i => rowIndexes.indexOf(i) === -1
        )
      },
      () => {
        this.selectedTasks();
      }
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

  selectedTasks = () => {
    console.log(this.state)
    let selectedTasks = [];
    let rows = this.getRows();
    this.state.selectedIndexes.map(x => {
      var task = rows[x];
      selectedTasks.push(task);
    });
    this.props.setSelectedTasks(selectedTasks);
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
          toolbar={<Toolbar enableFilter={true} />}
          onGridSort={this.handleGridSort}
          onAddFilter={this.handleFilterChange}
          onClearFilters={this.onClearFilters}
          rowSelection={{
            showCheckbox: true,
            enableShiftSelect: true,
            onRowsSelected: this.onRowsSelected,
            onRowsDeselected: this.onRowsDeselected,
            selectBy: {
              indexes: this.state.selectedIndexes
            }
          }}
        />
      </div>
    );
  }
}
export default CompMapTable;
