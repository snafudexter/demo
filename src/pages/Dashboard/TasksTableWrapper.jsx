import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import classNames from "classnames";

import { Link } from "react-router-dom";
import ExportButton from "../../helpers/ExportButton";
import TasksTable from "../../components/Tables/TasksTable";
import TaskStatusFormatter from "../../components/Tables/TaskStatusFormatter";
import TaskCountWidget from "./TaskCountWidget";
import AdminToolbar from "./AdminToolbar";

const mapPropsToOptions = (props, state) => {
  var cityId = [],
    typeId = [],
    categoryId = [],
    zoneId = [],
    clusterId = [],
    campaignId = [];
  var variables;

  if (props.filter.campaign === null) {
    props.filter.campaign = [];
  }
  if (props) {
    if (props.campaignId) {
      campaignId.push(props.campaignId);
    } else if (Array.isArray(props.filter.campaign)) {
      campaignId = props.filter.campaign.map(val => {
        return val.value;
      });
    } else campaignId.push(props.filter.campaign.value);
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
      urgent: props.filter.urgent,
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

  console.log(variables);
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
    selectedButton: "",
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
        filterable: true,
        width: 115,
        resizable: true
      },
      {
        key: "city",
        name: "City",
        filterable: true,
        resizable: true
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
        key: "total_area",
        name: "Total Area",
        sortable: true,
        resizable: true
      },
      {
        key: "address",
        name: "Dealer Address",
        resizable: true,
        filterable: true,
        sortable: true
      },
      {
        key: "state",
        name: "State",
        filterable: true,
        resizable: true
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
        name: "Review Date",
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
        key: "remark",
        name: "Remark",
        filterable: true,
        resizable: true,
        width: 100
      },
      {
        key: "rejected_area",
        name: "Rejected Area",
        sortable: true,
        resizable: true
      }
    ]
  };

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
      }
      alltasksqfeet =
        newsqfeet +
        reccesqfeet +
        approvalsqfeet +
        approvedsqfeet +
        designingsqfeet +
        printingsqfeet +
        installedsqfeet;
      allcount = this.props.tasks.length;
    }
  }

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

  widgetClicked(e) {
    if (e) {
      this.setState({ display: e });
      window.scroll(0, 400);
    }
  }

  callbackFilter(name, e) {
    this.props.filterContent(name, e);
  }

  setSelectedTasks = tasks => {
    this.setState({ selectedTasks: tasks });
  };

  move(arr, old_index, new_index) {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      var k = new_index - arr.length;
      while (k-- + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }
  renderBusinessTypeButtons() {
    if (this.props.types && this.props.clusters) {
      var types = this.props.types.map(e => {
        return { ...e, name: "type" };
      });
      var clusters = this.props.clusters.map(e => {
        return { ...e, name: "cluster" };
      });

      var cdIndex = 0;
      for (var i = 0; i < types.length; i++) {
        if (types[i].label === "CD") cdIndex = i;
      }

      types = this.move(types, cdIndex, 0);

      var d = [];
      d.push(types.shift());
      d = d.concat(clusters);
      d = d.concat(types);

      if(d[0])
        return d.map(e => {
          return (
            <button
              type="button"
              onClick={() => {
                this.callbackFilter(e.name, e.value);
                this.setState({ selectedButton: e.value });
              }}
              className={classNames(
                "btn min-width-125 zorr",
                this.state.selectedButton === e.value
                  ? "btn-primary"
                  : "btn-secondary"
              )}
            >
              {e.label}
            </button>
          );
        });
    } else return null;
  }

  setSelectedCampaign = val => {
    this.setState({ campaign: val });
  };

  componentWillReceiveProps(nexProps) {
    if (nexProps.user)
      if (nexProps.user.role == "ADMIN") {
        let found = false;
        let columns = this.state.columns;
        for (let col of columns) {
          if (col.name === "Printer User") {
            found = true;
          }
        }
        if (!found) {
          columns.splice(2, 0, {
            key: "printerUser",
            name: "Printer User",
            resizable: true,
            filterable: true,
            width: 100
          });
          this.setState({ columns });
        }
      }
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
        <div
          className="row gutters-tiny"
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            marginBottom: 10
          }}
        >
          {(this.props.user.role === "BAJAJ" ||
            this.props.user.role === "ADMIN") &&
          !this.props.user.type
            ? this.renderBusinessTypeButtons()
            : ""}
        </div>
        <div className="row gutters-tiny">
          <TaskCountWidget
            filter={["ALL"]}
            widgetClicked={this.widgetClicked.bind(this)}
            sqfeet={alltasksqfeet}
            taskCount={allcount}
            label="all"
          />
          <TaskCountWidget
            filter={["NEW"]}
            widgetClicked={this.widgetClicked.bind(this)}
            sqfeet={newsqfeet}
            taskCount={newtask}
            label="new"
          />
          <TaskCountWidget
            filter={["RECCE", "RECCEDONE"]}
            widgetClicked={this.widgetClicked.bind(this)}
            sqfeet={reccesqfeet}
            taskCount={recce}
            label="recce"
          />
          <TaskCountWidget
            filter={["APPROVAL"]}
            widgetClicked={this.widgetClicked.bind(this)}
            sqfeet={approvalsqfeet}
            taskCount={approval}
            label="approval"
            labelText="Approval Pending"
          />
          <TaskCountWidget
            filter={["APPROVED", "REJECTED"]}
            widgetClicked={this.widgetClicked.bind(this)}
            sqfeet={approvedsqfeet}
            taskCount={approved}
            label="approved"
            labelText="Pipeline"
          />
          <TaskCountWidget
            filter={["DESIGNING", "DESIGNINGDONE"]}
            widgetClicked={this.widgetClicked.bind(this)}
            sqfeet={designingsqfeet}
            taskCount={designing}
            label="designing"
          />
          <TaskCountWidget
            filter={["PRINTING", "PRINTINGDONE"]}
            widgetClicked={this.widgetClicked.bind(this)}
            sqfeet={printingsqfeet}
            taskCount={printing}
            label="printing"
          />
          <TaskCountWidget
            filter={["INSTALLED", "COMPLETED"]}
            widgetClicked={this.widgetClicked.bind(this)}
            sqfeet={installedsqfeet}
            taskCount={installed}
            label="installed"
          />
        </div>

        <div
          className="block-options"
          style={{ marginTop: 20, marginBottom: 21 }}
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

          {this.props.user.role === "ADMIN" ? (
            <AdminToolbar
              history={this.props.history}
              campaign={this.state.campaign}
              setSelectedCampaign={this.setSelectedCampaign}
              tasksRefetch={this.props.tasksRefetch}
              selectedTasks={this.state.selectedTasks}
            />
          ) : (
            ""
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
    $urgent: String
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
      urgent: $urgent
      campaignId: $campaignId
      status: "COMPLETED"
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
      remark {
        id
        name
      }
      printerUser {
        id
        name
      }
      adSpots {
        installed
        type
        id
        height
        width
        approved
      }
      campaign {
        name
        urgent
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
            if (
              task.adSpots[i].type === "NEW" ||
              task.adSpots[i].type === "OLD"
            ) {
              total_area +=
                (task.adSpots[i].width * task.adSpots[i].height) / 144;
              if (task.adSpots[i].installed == true) {
                installed_area +=
                  (task.adSpots[i].width * task.adSpots[i].height) / 144;
              }
              if (!task.adSpots[i].approved) {
                rejected_area +=
                  (task.adSpots[i].height * task.adSpots[i].width) / 144;
              }
            }
          }

        var tasks = { ...task, adspots_count };
        tasks = { ...tasks, total_area };
        return {
          ...task,
          adspots_count,
          total_area,
          installed_area,
          rejected_area
        };
      });
      return {
        loading: data.loading,
        tasks: tasks,
        tasksRefetch: data.refetch
      };
    },
    options: mapPropsToOptions
  })
)(TasksTableWrapper);

TasksTableWrapper.propTypes = {};

// import React, { Component } from "react";
// import { graphql, compose } from "react-apollo";
// import ReactDOM from "react-dom";
// import gql from "graphql-tag";
// import { Link } from "react-router-dom";
// import ExportButton from "../../helpers/ExportButton";
// import TasksTable from "../../components/Tables/TasksTable";
// import TaskStatusFormatter from "../../components/Tables/TaskStatusFormatter";
// import TaskCountWidget from "./TaskCountWidget";

// const mapPropsToOptions = (props, state) => {
//   var cityId = [],
//     typeId = [],
//     categoryId = [],
//     zoneId = [],
//     clusterId = [],
//     campaignId = [];
//   var variables;

//   if (props.filter.campaign === null) {
//     props.filter.campaign = [];
//   }
//   if (props) {
//     if (props.campaignId) {
//       campaignId.push(props.campaignId);
//     } else if (Array.isArray(props.filter.campaign)) {
//       campaignId = props.filter.campaign.map(val => {
//         return val.value;
//       });
//     } else campaignId.push(props.filter.campaign.value);
//     if (Array.isArray(props.filter.city))
//       cityId = props.filter.city.map(val => {
//         return val.value;
//       });
//     else cityId.push(props.filter.city.value);

//     if (Array.isArray(props.filter.type))
//       typeId = props.filter.type.map(val => {
//         return val.value;
//       });
//     else typeId.push(props.filter.type.value);

//     if (Array.isArray(props.filter.category))
//       categoryId = props.filter.category.map(val => {
//         return val.value;
//       });
//     else categoryId.push(props.filter.category.value);

//     if (Array.isArray(props.filter.zone))
//       zoneId = props.filter.zone.map(val => {
//         return val.value;
//       });
//     else zoneId.push(props.filter.zone.value);

//     if (Array.isArray(props.filter.cluster))
//       clusterId = props.filter.cluster.map(val => {
//         return val.value;
//       });
//     else clusterId.push(props.filter.cluster.value);

//     variables = {
//       urgent: props.filter.urgent,
//       campaignId: campaignId,
//       cityId: cityId,
//       typeId: typeId,
//       categoryId: categoryId,
//       zoneId: zoneId,
//       clusterId: clusterId,
//       startDate: props.filter.startDate,
//       endDate: props.filter.endDate
//     };
//   }
//   return { variables, fetchPolicy: "cache-and-network" };
// };

// var newtask = 0,
//   recce = 0,
//   approval = 0,
//   approved = 0,
//   designing = 0,
//   printing = 0,
//   installed = 0,
//   allcount = 0;
// var alltasksqfeet = 0,
//   newsqfeet = 0,
//   reccesqfeet = 0,
//   approvalsqfeet = 0,
//   approvedsqfeet = 0,
//   designingsqfeet = 0,
//   printingsqfeet = 0,
//   installedsqfeet = 0;
// var tasks = [];

// class TasksTableWrapper extends Component {
//   state = {
//     selectedTasks: [],
//     tasks: this.props.tasks,
//     display: "",
//     columns: [
//       {
//         key: "action",
//         name: "Action",
//         resizable: true,
//         width: 115
//       },
//       {
//         key: "dealerCode",
//         name: "Dealer Code",
//         filterable: true,
//         resizable: true
//       },
//       {
//         key: "name",
//         name: "Dealer Name",
//         filterable: true,
//         resizable: true,
//         width: 115
//       },
//       {
//         key: "status",
//         name: "Status",
//         filterable: true,
//         resizable: true,
//         formatter: TaskStatusFormatter
//       },
//       {
//         key: "startDate",
//         name: "Receive Date",
//         filterable: true,
//         resizable: true,
//         width: 100
//       },
//       {
//         key: "recceOnDate",
//         name: "Recce On Date",
//         filterable: true,
//         resizable: true,
//         width: 100
//       },
//       {
//         key: "recceDoneDate",
//         name: "Recce Done Date",
//         filterable: true,
//         resizable: true,
//         width: 100
//       },
//       {
//         key: "approvalSentDate",
//         name: "Approval Date",
//         filterable: true,
//         resizable: true,
//         width: 100
//       },
//       {
//         key: "bajajReviewDate",
//         name: "Bajaj Review Date",
//         filterable: true,
//         resizable: true,
//         width: 100
//       },
//       {
//         key: "designOnDate",
//         name: "Designing On Date",
//         filterable: true,
//         resizable: true,
//         width: 100
//       },
//       {
//         key: "designDoneDate",
//         name: "Designing Done Date",
//         filterable: true,
//         resizable: true,
//         width: 100
//       },
//       {
//         key: "printOnDate",
//         name: "Print On Date",
//         filterable: true,
//         resizable: true,
//         width: 100
//       },
//       {
//         key: "installedDate",
//         name: "Installation Date",
//         filterable: true,
//         resizable: true,
//         width: 100
//       },

//       {
//         key: "address",
//         name: "Dealer Address",
//         resizable: true,
//         filterable: true,
//         sortable: true
//       },
//       {
//         key: "city",
//         name: "City",
//         filterable: true,
//         resizable: true
//       },
//       {
//         key: "state",
//         name: "State",
//         filterable: true
//       },
//       {
//         key: "cluster",
//         name: "Cluster",
//         resizable: true,
//         filterable: true,
//         sortable: true
//       },
//       {
//         key: "type",
//         name: "Type",
//         resizable: true,
//         filterable: true,
//         sortable: true
//       },
//       {
//         key: "zone",
//         name: "Zone",
//         resizable: true,
//         filterable: true,
//         sortable: true
//       },
//       {
//         key: "category",
//         name: "Category",
//         resizable: true,
//         filterable: true,
//         sortable: true
//       },
//       {
//         key: "adspots_count",
//         name: "Ad Spots Count",
//         sortable: true
//       },
//       {
//         key: "total_area",
//         name: "Total Area",
//         sortable: true
//       }
//     ]
//   };

//   count() {
//     (newtask = 0), (newsqfeet = 0), (alltasksqfeet = 0);
//     (recce = 0),
//       (approval = 0),
//       (approved = 0),
//       (designing = 0),
//       (printing = 0),
//       (installed = 0);
//     (reccesqfeet = 0),
//       (approvalsqfeet = 0),
//       (approvedsqfeet = 0),
//       (designingsqfeet = 0),
//       (printingsqfeet = 0),
//       (installedsqfeet = 0);
//     if (this.props.tasks) {
//       for (var task of this.props.tasks) {
//         if (task.status === "RECCE" || task.status === "RECCEDONE") {
//           recce++;
//           reccesqfeet += parseInt(task.total_area);
//         } else if (task.status === "NEW") {
//           newtask++;
//           newsqfeet += parseInt(task.total_area);
//         } else if (task.status === "APPROVAL") {
//           approval++;
//           approvalsqfeet += parseInt(task.total_area);
//         } else if (task.status === "APPROVED" || task.status === "REJECTED") {
//           approved++;
//           approvedsqfeet += parseInt(task.total_area);
//         } else if (task.status === "DESIGNING") {
//           designing++;
//           designingsqfeet += parseInt(task.total_area);
//         } else if (task.status === "DESIGNINGDONE") {
//           printing++;

//           printingsqfeet += parseInt(task.total_area);
//         } else if (task.status === "INSTALLED") {
//           installed++;
//           installedsqfeet += parseInt(task.total_area);
//         }

//         alltasksqfeet =
//           reccesqfeet +
//           approvalsqfeet +
//           approvedsqfeet +
//           designingsqfeet +
//           printingsqfeet +
//           installedsqfeet;
//       }
//       allcount = this.props.tasks.length;
//     }
//   }
//   setSelectedTasks = tasks => {
//     this.setState({ selectedTasks: tasks });
//   };

//   saveFilter(filter) {
//     this.setState({ filter });
//     localStorage.setItem("dash-filter", JSON.stringify(filter));
//   }

//   renderTable(props) {
//     var filter = localStorage.getItem("dash-filter");
//     if (props.tasks)
//       if (props.tasks.length > 0) {
//         return (
//           <TasksTable
//             ref="table"
//             filter={filter !== {} ? JSON.parse(filter) : undefined}
//             currentFilter={props.saveFilter}
//             display={props.display}
//             columns={props.columns}
//             setSelectedTasks={props.setSelectedTasks}
//             tasks={props.tasks}
//           />
//         );
//       } else return <div />;
//     else return null;
//   }

//   widgetClicked(e) {
//     if (e) {
//       this.setState({ display: e });
//       const d = ReactDOM.findDOMNode(this.refs.table);
//       window.scroll(0, d.offSetTop)
//     }
//   }

//   callbackFilter(name, e) {
//     this.props.filterContent(name, e);
//   }

//   move(arr, old_index, new_index) {
//     while (old_index < 0) {
//       old_index += arr.length;
//     }
//     while (new_index < 0) {
//       new_index += arr.length;
//     }
//     if (new_index >= arr.length) {
//       var k = new_index - arr.length;
//       while (k-- + 1) {
//         arr.push(undefined);
//       }
//     }
//     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
//     return arr;
//   }
//   renderBusinessTypeButtons() {
//     var types = this.props.types.map(e => {
//       return { ...e, name: "type" };
//     });
//     var clusters = this.props.clusters.map(e => {
//       return { ...e, name: "cluster" };
//     });

//     var cdIndex = 0;
//     for (var i = 0; i < types.length; i++) {
//       if (types[i].label === "CD") cdIndex = i;
//     }

//     types = this.move(types, cdIndex, 0);

//     var d = [];
//     d.push(types.shift());
//     d = d.concat(clusters);
//     d = d.concat(types);

//     return d.map(e => {
//       return (
//         <button
//           type="button"
//           onClick={() => {
//             this.callbackFilter(e.name, e.value);
//           }}
//           className="btn btn-secondary min-width-125 zorr"
//         >
//           {e.label}
//         </button>
//       );
//     });
//   }

//   render() {
//     if (this.props.loading) {
//       return (
//         <div className="loader">
//           <div />
//         </div>
//       );
//     }
//     this.widgetClicked();
//     this.count();
//     return (
//       <div>
//         <div className="row gutters-tiny">
//           <TaskCountWidget
//             widgetClicked={this.widgetClicked.bind(this)}
//             sqfeet={alltasksqfeet}
//             taskCount={allcount}
//             label="all"
//           />
//           <TaskCountWidget
//             widgetClicked={this.widgetClicked.bind(this)}
//             sqfeet={newsqfeet}
//             taskCount={newtask}
//             label="new"
//           />
//           <TaskCountWidget
//             widgetClicked={this.widgetClicked.bind(this)}
//             sqfeet={reccesqfeet}
//             taskCount={recce}
//             label="recce"
//           />
//           <TaskCountWidget
//             widgetClicked={this.widgetClicked.bind(this)}
//             sqfeet={approvalsqfeet}
//             taskCount={approval}
//             label="approval"
//             labelText="Approval Pending"
//           />
//           <TaskCountWidget
//             widgetClicked={this.widgetClicked.bind(this)}
//             sqfeet={approvedsqfeet}
//             taskCount={approved}
//             label="approved"
//             labelText="Pipeline"
//           />
//           <TaskCountWidget
//             widgetClicked={this.widgetClicked.bind(this)}
//             sqfeet={designingsqfeet}
//             taskCount={designing}
//             label="designing"
//           />
//           <TaskCountWidget
//             widgetClicked={this.widgetClicked.bind(this)}
//             sqfeet={printingsqfeet}
//             taskCount={printing}
//             label="printing"
//           />
//           <TaskCountWidget
//             widgetClicked={this.widgetClicked.bind(this)}
//             sqfeet={installedsqfeet}
//             taskCount={installed}
//             label="installed"
//           />
//         </div>
//         <div
//           className="row gutters-tiny"
//           style={{
//             flex: 1,
//             flexDirection: "row",
//             justifyContent: "space-between",
//             marginTop: 10
//           }}
//         >
//           {this.renderBusinessTypeButtons()}
//         </div>
//         <div className="block-options">
//           {this.state.selectedTasks.length != 0 ? (
//             <ExportButton
//               showAlert={this.props.showAlert}
//               tasks={this.state.selectedTasks}
//               storeRefetch={this.props.storeRefetch}
//               allTask={this.props.allTasks}
//             />
//           ) : (
//             ""
//           )}
//         </div>
//         <div className="tb">
//         <div ref="table"></div>
//           <this.renderTable
//             saveFilter={this.saveFilter.bind(this)}
//             display={this.state.display}
//             columns={this.state.columns}
//             setSelectedTasks={this.setSelectedTasks}
//             tasks={this.props.tasks}
//           />
//         </div>

//       </div>.
//     );
//   }
// }
// const ALL_TASKS = gql`
//   query vanillaReportTasks(
//     $urgent: String
//     $campaignId: [ID]
//     $cityId: [ID]
//     $zoneId: [ID]
//     $typeId: [ID]
//     $clusterId: [ID]
//     $categoryId: [ID]
//     $startDate: DateTime
//     $endDate: DateTime
//   ) {
//     vanillaReportTasks(
//       urgent: $urgent
//       campaignId: $campaignId
//       status: "COMPLETED"
//       cityId: $cityId
//       zoneId: $zoneId
//       typeId: $typeId
//       clusterId: $clusterId
//       categoryId: $categoryId
//       startDate: $startDate
//       endDate: $endDate
//     ) {
//       id
//       status
//       createdAt
//       recceOnDate
//       recceDoneDate
//       approvalSentDate
//       designOnDate
//       designDoneDate
//       printOnDate
//       bajajReviewDate
//       installedDate
//       adSpots {
//         id
//         height
//         width
//       }
//       campaign {
//         name
//         urgent
//       }
//       store {
//         id
//         dealerCode
//         dealerName
//         dealerAddress
//         category {
//           name
//           type {
//             name
//           }
//         }
//         city {
//           name
//           cluster {
//             name
//           }
//           state {
//             name
//             zone {
//               name
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// export default compose(
//   graphql(ALL_TASKS, {
//     props: ({ data }) => {
//       if (!data.vanillaReportTasks) return { loading: data.loading };
//       var tasks = data.vanillaReportTasks.map(task => {
//         let adspots_count = task.adSpots.length;

//         var total_area = 0;
//         if (task.adSpots.length > 0)
//           for (var i = 0; i < task.adSpots.length; i++) {
//             total_area += task.adSpots[i].width * task.adSpots[i].height / 144;
//           }
//         total_area = total_area.toFixed(2);
//         var tasks = { ...task, adspots_count };
//         tasks = { ...tasks, total_area };
//         return { ...task, adspots_count, total_area };
//       });
//       return { loading: data.loading, tasks: tasks };
//     },
//     options: mapPropsToOptions
//   })
// )(TasksTableWrapper);

// TasksTableWrapper.propTypes = {};
