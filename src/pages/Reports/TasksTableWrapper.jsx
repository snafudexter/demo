import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import ExportButton from "../../helpers/ExportButton";
import TasksTable from "../../components/Tables/TasksTableForGR";
import TaskStatusFormatter from "../../components/Tables/TaskStatusFormatter";
import TaskCountWidget from "./TaskCountWidget";

const mapPropsToOptions = props => {
  var cityId = [],
    typeId = [],
    categoryId = [],
    zoneId = [],
    clusterId = [],
    campaignId = [];
  var variables;

  if (props) {
    if (Array.isArray(props.filter.campaign))
      campaignId = props.filter.campaign.map(val => {
        return val.value;
      });
    else campaignId.push(props.filter.campaign.value);

    if (Array.isArray(props.filter.city))
      cityId = props.filter.city.map(val => {
        return val.value;
      });
    else cityId.push(props.filter.city.value);

    if (Array.isArray(props.filter.type))
      typeId = props.filter.type.map(val => {
        return val.value;
      });
    else typeId.push(props.filter.type.value);

    if (Array.isArray(props.filter.category))
      categoryId = props.filter.category.map(val => {
        return val.value;
      });
    else categoryId.push(props.filter.category.value);

    if (Array.isArray(props.filter.zone))
      zoneId = props.filter.zone.map(val => {
        return val.value;
      });
    else zoneId.push(props.filter.zone.value);

    if (Array.isArray(props.filter.cluster))
      clusterId = props.filter.cluster.map(val => {
        return val.value;
      });
    else clusterId.push(props.filter.cluster.value);
    variables = {
      campaignId: campaignId,
      cityId: cityId,
      typeId: typeId,
      categoryId: categoryId,
      zoneId: zoneId,
      clusterId: clusterId,
      startDate: props.filter.startDate,
      endDate: props.filter.endDate
    };
  }
  return { variables, fetchPolicy: "cache-and-network" };
};

var newtask = 0,
  recce = 0,
  approval = 0,
  approved = 0,
  designing = 0,
  printing = 0,
  installed = 0,
  allcount = 0;
var alltasksqfeet = 0,
  newsqfeet = 0,
  reccesqfeet = 0,
  approvalsqfeet = 0,
  approvedsqfeet = 0,
  designingsqfeet = 0,
  printingsqfeet = 0,
  installedsqfeet = 0;
var tasks = [];
class TasksTableWrapper extends Component {
  state = {
    selectedTasks: [],
    columns: [
      {
        key: "action",
        name: "Action",
        resizable: true,
        width: 115
      },
      {
        key: "campaign",
        name: "Campaign",
        width: 115
      },
      {
        key: "dealerCode",
        name: "Dealer Code",
        filterable: true,
        resizable: true
      },
      {
        key: "name",
        name: "Dealer Name",
        filterable: true,
        resizable: true
      },
      {
        key: "status",
        name: "Status",
        filterable: true,
        resizable: true,
        formatter: TaskStatusFormatter
      },

      {
        key: "address",
        name: "Dealer Address",
        resizable: true,
        filterable: true,
        sortable: true
      },
      {
        key: "city",
        name: "City",
        filterable: true,
        resizable: true
      },
      {
        key: "state",
        name: "State",
        filterable: true
      },
      {
        key: "cluster",
        name: "Cluster",
        resizable: true,
        filterable: true,
        sortable: true
      },
      {
        key: "type",
        name: "Type",
        resizable: true,
        filterable: true,
        sortable: true
      },
      {
        key: "zone",
        name: "Zone",
        resizable: true,
        filterable: true,
        sortable: true
      },
      {
        key: "category",
        name: "Category",
        resizable: true,
        filterable: true,
        sortable: true
      },
      {
        key: "startDate",
        name: "Receive Date",
        filterable: true,
        resizable: true,
        width: 100
      },
      {
        key: "recceOnDate",
        name: "Recce On Date",
        filterable: true,
        resizable: true,
        width: 100
      },
      {
        key: "recceDoneDate",
        name: "Recce Done Date",
        filterable: true,
        resizable: true,
        width: 100
      },
      {
        key: "approvalSentDate",
        name: "Approval Date",
        filterable: true,
        resizable: true,
        width: 100
      },
      {
        key: "bajajReviewDate",
        name: "Bajaj Review Date",
        filterable: true,
        resizable: true,
        width: 100
      },
      {
        key: "designOnDate",
        name: "Designing On Date",
        filterable: true,
        resizable: true,
        width: 100
      },
      {
        key: "designDoneDate",
        name: "Designing Done Date",
        filterable: true,
        resizable: true,
        width: 100
      },
      {
        key: "printOnDate",
        name: "Print On Date",
        filterable: true,
        resizable: true,
        width: 100
      },
      {
        key: "installedDate",
        name: "Installation Date",
        filterable: true,
        resizable: true,
        width: 100
      },
      {
        key: "adspots_count",
        name: "Ad Spots Count",
        sortable: true
      },
      {
        key: "total_area",
        name: "Total Area",
        sortable: true
      },
      {
        key: "rejected_area",
        name: "Rejected Area",
        sortable: true
      }
    ]
  };

  widgetClicked(e) {
    if (e) {
      this.setState({ display: e });
      window.scroll(0, 400);
    }
  }

  count() {
    (newtask = 0), (newsqfeet = 0), (alltasksqfeet = 0);
    (recce = 0),
      (approval = 0),
      (approved = 0),
      (designing = 0),
      (printing = 0),
      (installed = 0);
    (reccesqfeet = 0),
      (approvalsqfeet = 0),
      (approvedsqfeet = 0),
      (designingsqfeet = 0),
      (printingsqfeet = 0),
      (installedsqfeet = 0);
    if (this.props.tasks) {
      for (var task of this.props.tasks) {
        if (task.status === "RECCE" || task.status === "RECCEDONE") {
          recce++;
          reccesqfeet += parseFloat(task.total_area);
        } else if (task.status === "NEW") {
          newtask++;
          newsqfeet += parseFloat(task.total_area);
        } else if (task.status === "APPROVAL") {
          approval++;
          approvalsqfeet += parseFloat(task.total_area);
        } else if (task.status === "APPROVED" || task.status === "REJECTED") {
          approved++;
          approvedsqfeet += parseFloat(task.total_area);
        } else if (
          task.status === "DESIGNING" ||
          task.status === "DESIGNINGDONE"
        ) {
          designing++;
          designingsqfeet += parseFloat(task.total_area);
        } else if (
          task.status === "PRINTING" ||
          task.status === "PRINTINGDONE"
        ) {
          printing++;

          printingsqfeet += parseFloat(task.total_area);
        } else if (task.status === "INSTALLED" || task.status === "COMPLETED") {
          installed++;
          installedsqfeet += parseFloat(task.total_area);
        }

        alltasksqfeet =
          newsqfeet +
          reccesqfeet +
          approvalsqfeet +
          approvedsqfeet +
          designingsqfeet +
          printingsqfeet +
          installedsqfeet;
      }
      allcount = this.props.tasks.length;
    }
  }

  setSelectedTasks = tasks => {
    this.setState({ selectedTasks: tasks });
  };

  renderTable(props) {
    if (props.tasks)
      if (props.tasks.length > 0) {
        return (
          <TasksTable
            display={props.display}
            columns={props.columns}
            setSelectedTasks={props.setSelectedTasks}
            tasks={props.tasks}
          />
        );
      } else return <div />;
    else return null;
  }

  render() {
    if (this.props.loading) {
      return (
        <div className="loader">
          <div />
        </div>
      );
    }

    this.count();
    return (
      <div>
        <div className="row gutters-tiny">
          <TaskCountWidget
            widgetClicked={this.widgetClicked.bind(this)}
            sqfeet={parseInt(alltasksqfeet)}
            taskCount={allcount}
            label="all"
          />
          <TaskCountWidget
            widgetClicked={this.widgetClicked.bind(this)}
            sqfeet={parseInt(newsqfeet)}
            taskCount={newtask}
            label="new"
          />
          <TaskCountWidget
            widgetClicked={this.widgetClicked.bind(this)}
            sqfeet={parseInt(reccesqfeet)}
            taskCount={recce}
            label="recce"
          />
          <TaskCountWidget
            widgetClicked={this.widgetClicked.bind(this)}
            sqfeet={parseInt(approvalsqfeet)}
            taskCount={approval}
            label="approval"
            labelText="approval pending"
          />
          <TaskCountWidget
            widgetClicked={this.widgetClicked.bind(this)}
            sqfeet={parseInt(approvedsqfeet)}
            taskCount={approved}
            label="approved"
          />
          <TaskCountWidget
            widgetClicked={this.widgetClicked.bind(this)}
            sqfeet={parseInt(designingsqfeet)}
            taskCount={designing}
            label="designing"
          />
          <TaskCountWidget
            widgetClicked={this.widgetClicked.bind(this)}
            sqfeet={parseInt(printingsqfeet)}
            taskCount={printing}
            label="printing"
          />
          <TaskCountWidget
            widgetClicked={this.widgetClicked.bind(this)}
            sqfeet={parseInt(installedsqfeet)}
            taskCount={installed}
            label="installed"
          />
        </div>
        <div
          className="block-options"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          {this.state.selectedTasks.length != 0 ? (
            <ExportButton
              showAlert={this.props.showAlert}
              tasks={this.state.selectedTasks}
              storeRefetch={this.props.storeRefetch}
              allTask={this.props.allTasks}
            />
          ) : (
            <button type="button" className="btn btn-secodary float-left">
              Download Report
            </button>
          )}
        </div>
        <this.renderTable
          display={this.state.display}
          columns={this.state.columns}
          setSelectedTasks={this.setSelectedTasks}
          tasks={this.props.tasks}
        />
      </div>
    );
  }
}

const ALL_TASKS = gql`
  query vanillaReportTasks(
    $campaignId: [ID]
    $cityId: [ID]
    $zoneId: [ID]
    $typeId: [ID]
    $clusterId: [ID]
    $categoryId: [ID]
    $startDate: DateTime
    $endDate: DateTime
  ) {
    vanillaReportTasks(
      campaignId: $campaignId
      cityId: $cityId
      zoneId: $zoneId
      typeId: $typeId
      clusterId: $clusterId
      categoryId: $categoryId
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      status
      startDate
      recceOnDate
      recceDoneDate
      approvalSentDate
      designOnDate
      designDoneDate
      printOnDate
      bajajReviewDate
      installedDate
      adSpots {
        id
        type
        height
        width
        installed
        approved
      }
      campaign {
        name
      }
      printerUser{
        id
        name
      }
      store {
        id
        dealerCode
        dealerName
        dealerAddress
        category {
          name
          type {
            name
          }
        }
        city {
          name
          cluster {
            name
          }
          state {
            name
            zone {
              name
            }
          }
        }
      }
    }
  }
`;

export default compose(
  graphql(ALL_TASKS, {
    props: ({ data }) => {
      if (!data.vanillaReportTasks) return { loading: data.loading };
      var tasks = data.vanillaReportTasks.map(task => {
        let adspots_count = task.adSpots.length;
        var total_area = 0;
        var installed_area = 0;
        var rejected_area = 0;
        if (task.adSpots.length > 0)
          for (var i = 0; i < task.adSpots.length; i++) {
            if(task.adSpots[i].type === 'NEW' || task.adSpots[i].type === 'OLD' ){
              total_area += task.adSpots[i].width * task.adSpots[i].height / 144;
              if(task.adSpots[i].installed == true)
              {
                installed_area += task.adSpots[i].width * task.adSpots[i].height / 144;
              }
              if(!task.adSpots[i].approved) {
                rejected_area += (task.adSpots[i].height * task.adSpots[i].width)/144;
              }
            }
          }
        
        var tasks = { ...task, adspots_count };
        tasks = { ...tasks, total_area };
        return { ...task, adspots_count, total_area, installed_area, rejected_area };
      });
      return { loading: data.loading, tasks: tasks };
    },
    options: mapPropsToOptions
  })
)(TasksTableWrapper);

TasksTableWrapper.propTypes = {};
