import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import Modal from "react-modal";
import ExportButton from "../../helpers/ExportButton";
import AdSpotTable from "../../components/Tables/AdSpotTable";
import Alert from "react-s-alert";

const mapPropsToOptions = props => {
  console.log(props);
  const variables = {
    user: props.user.role === "PRINTER" ? props.user.id : null,
    statusArr: ["PRINTING"]
  };
  return { variables, fetchPolicy: "cache-and-network" };
};
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    minWidth: 400,
    padding: 0,
    border: "none",
    borderRadius: 0,
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const customImageStyle = {
  content: {
    width: "50%",
    height: "50%"
  }
};

class PrintersTableWrapper extends Component {
  state = {
    selectedTasks: [],
    columns: [
      {
        key: "printingDone",
        name: "status",
        resizable: true,
        width: 115
      },
      {
        key: "action",
        name: "Action",
        resizable: true,
        width: 115
      },

      {
        key: "action_seconday",
        name: "Action",
        resizable: true,
        width: 115
      },
      {
        key: "campaign",
        name: "Campaign",
        width: 100,
        filterable: true,
        resizable: true
      },
      {
        key: "dealerCity",
        name: "City",
        width: 115,
        filterable: true
      },
      {
        key: "dealerCode",
        name: "Dealer Code",
        width: 100,
        filterable: true,
        resizable: true
      },
      {
        key: "dealerAddress",
        name: "Address",
        width: 150
      },
      {
        key: "dealerName",
        name: "Store Name",
        width: 150
      },
      {
        key: "type",
        name: "Type",
        width: 100,
        filterable: true,
        resizable: true
      },
      {
        key: "name",
        name: "Name",
        width: 100,
        filterable: true,
        resizable: true
      },
      {
        key: "category",
        name: "Category",
        width: 115,
        filterable: true
      },
      {
        key: "height",
        name: "Height",
        width: 115
      },      
      {
        key: "width",
        name: "Width",
        width: 115
      },
      {
        key: "area",
        name: "Area",
        width: 115
      },
      {
        key: "media",
        name: "Media",
        width: 115,
        filterable: true
      },
      {
        key: "remarks",
        name: "Remarks",
        width: 115
      }
    ]
  };

  handlePDFDownload = () => {
    if (this.state.selectedTasks.length === 0) {
      Alert.error("No Tasks Selected!", {
        position: "top-right",
        effect: "slide"
      });
      return;
    }
    let adspotJSONArr = [];
    this.state.selectedTasks.map(adspot => {
      adspotJSONArr.push({ id: adspot.id });
    });
    this.props.history.push({
      pathname: "/adspotslistrender",
      state: { adspotJSONArr }
    });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  openModal = value => {
    this.setState({ modalIsOpen: true, image: value.image });
  };

  openModalStore = value => {
    this.setState({ modalIsOpen: true, image: value.storeImage });
  };

  setSelectedTasks = tasks => {
    console.log(tasks);
    this.setState({ selectedTasks: tasks });
  };

  // Rendering Adspot not Tasks.
  renderTasksTable = () => {
    if (this.props.loading) {
      return (
        <div className="loader">
          <div />
        </div>
      );
    }
    return (
      <div>
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

        <div className="animated fadeIn">
          <div>
            <button
              type="button"
              className="btn btn-sm btn-rounded btn-success float-right"
              style={{ marginLeft: "20px" }}
              onClick={() => {
                let tasks = this.state.selectedTasks;
                if (tasks.length === 0) {
                  Alert.error("No Adspots Selected! Cannot Proceed Forward", {
                    position: "top-right",
                    effect: "slide"
                  });
                  return;
                }

                let tasksArr = [];
                tasks.map(task => {
                  tasksArr.push(task.id);
                });
                this.props
                  .printingDoneOnAdspot({
                    variables: {
                      id: tasksArr
                    }
                  })
                  .then(response => {
                    // console.log(response);
                    Alert.success(
                      `${
                        response.data.printingDoneOnAdspot.count
                      } adspots marked as Printed!.`,
                      {
                        position: "top-right",
                        effect: "slide"
                      }
                    );

                    this.props.tasksRefetch();
                  })
                  .catch(error => {
                     console.log(error);
                    Alert.error("An error occured please try again later!", {
                      position: "top-right",
                      effect: "slide"
                    });
                  });
              }}
            >
              Mark as Done
            </button>
            <button
              type="button"
              className="btn btn-sm btn-rounded btn-success float-right"
              onClick={this.handlePDFDownload}
            >
              <i className="fa fa-check mr-1" />
              Download PDF
            </button>
          </div>
          <AdSpotTable
            columns={this.state.columns}
            setSelectedTasks={this.setSelectedTasks}
            tasks={this.props.tasks}
            openModalCallback={this.openModal}
            openModalCallbackStore={this.openModalStore}
          />
        </div>
      </div>
    );
  };
  render() {
    return (
      <div
        id="page-container"
        className="sidebar-inverse side-scroll main-content-boxed side-trans-enabled"
      >
        {this.renderTasksTable()}
        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Add Ad Spot Modal"
          >
            <div className="block mb-0">
              <div className="block-header block-header-default">
                <h3 className="block-title">Add Ad Spot</h3>
                <div className="block-options">
                  <button
                    onClick={this.closeModal}
                    type="button"
                    className="btn-block-option"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="si si-close" />
                  </button>
                </div>
              </div>
              <div className="block-content">
                <img
                  src={this.state.image}
                  style={{ height: "50%", width: "50%" }}
                />
              </div>
            </div>
            <div className="modal-footer mt-3">
              <button
                onClick={this.closeModal}
                type="button"
                className="btn btn-alt-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

const MARK_AS_DONE = gql`
  mutation printingDoneOnAdspot($id: [ID!]!) {
    printingDoneOnAdspot(id: $id) {
      count
    }
  }
`;

const ALL_RECCE_ASSIGNED_TASKS = gql`
  query($statusArr: [String], $user: ID) {
    getAdSpots(statusArr: $statusArr, user: $user) {
      adSpots {
        id
        name
        type
        width
        height
        area
        media
        category
        remarks
        dealerName
        dealerCode
        dealerAddress
        dealerCity
        storeImage
        campaign
        printingDone
        image
      }
    }
  }
`;

export default compose(
  graphql(ALL_RECCE_ASSIGNED_TASKS, {
    props: ({ data }) => {
      if (!data.getAdSpots) return { loading: data.loading };

      console.log(data);
      return {
        loading: data.loading,
        tasks: data.getAdSpots.adSpots,
        tasksRefetch: data.refetch
      };
    },
    options: mapPropsToOptions
  }),
  graphql(MARK_AS_DONE, { name: "printingDoneOnAdspot" })
)(PrintersTableWrapper);

PrintersTableWrapper.propTypes = {};
