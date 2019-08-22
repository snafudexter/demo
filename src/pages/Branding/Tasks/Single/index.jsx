import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import Alert from "react-s-alert";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import StoreDetails from "./StoreDetails";
import TaskProgress from "./TaskProgress";
import Select from "react-select";
import AdSpots from "./AdSpots";
import Timeline from "./Timeline";
import StoreImage from "./StoreImage";
import StoreCert from "./StoreCert";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import InstallationCert from "./InstallationCert";
Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,0.8)";

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

const mapPropsToOptions = ({ match }) => {
  const variables = {
    id: match.params.id
  };
  return { variables, fetchPolicy: "cache-and-network" };
};

class TaskSingle extends Component {
  state = {
    modalIsOpen: false,
    showDeleteModal: false,
    remark: ""
  };
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  confirmDelete() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.task) {
      this.setState({
        startDate: nextProps.task.startDate
          ? moment(nextProps.task.startDate)
          : undefined,
        recceOnDate: nextProps.task.recceOnDate
          ? moment(nextProps.task.recceOnDate)
          : undefined,
        recceDoneDate: nextProps.task.recceDoneDate
          ? moment(nextProps.task.recceDoneDate)
          : undefined,
        approvalSentDate: nextProps.task.approvalSentDate
          ? moment(nextProps.task.approvalSentDate)
          : undefined,
        bajajReviewDate: nextProps.task.bajajReviewDate
          ? moment(nextProps.task.bajajReviewDate)
          : undefined,
        designOnDate: nextProps.task.designOnDate
          ? moment(nextProps.task.designOnDate)
          : undefined,
        designDoneDate: nextProps.task.designDoneDate
          ? moment(nextProps.task.designDoneDate)
          : undefined,
        printOnDate: nextProps.task.printOnDate
          ? moment(nextProps.task.printOnDate)
          : undefined,
        installedDate: nextProps.task.installedDate
          ? moment(nextProps.task.installedDate)
          : undefined,
        remark: nextProps.task.remark
          ? {
              value: nextProps.task.remark.id,
              label: nextProps.task.remark.name
            }
          : "",
        comment: nextProps.task.comment
      });
    }
  }

  renderDeleteInput() {
    return (
      <div className="modal-footer mt-3">
        <button
          onClick={this.closeModal}
          type="button"
          className="btn btn-alt-secondary"
          data-dismiss="modal"
        >
          Close
        </button>
        <button
          type="button"
          className="btn btn-alt-success"
          data-dismiss="modal"
          onClick={this.deleteTask.bind(this)}
        >
          OK! Delete
        </button>
      </div>
    );
  }

  renderEditInput() {
    return (
      <div className="block-content">
        <div className="form-group">
          <Select
            name="name"
            placeholder="Remark"
            value={this.state.remark}
            options={this.props.remarks}
            onChange={val => {
              this.setState({ remark: val });
            }}
          />
        </div>

        <div className="form-group">
          <label>Start Date:</label>
          <DatePicker
            className="mr-3"
            selected={this.state.startDate}
            onChange={val => {
              this.setState({ startDate: val });
            }}
          />
        </div>
        <div className="form-group">
          <label>Recce On Date:</label>
          <DatePicker
            className="mr-3"
            selected={this.state.recceOnDate}
            onChange={val => {
              var d = moment(val).format();
              this.setState({ recceOnDate: val });
            }}
          />
        </div>
        <div className="form-group">
          <label>Recce Done Date:</label>
          <DatePicker
            className="mr-3"
            selected={this.state.recceDoneDate}
            onChange={val => {
              this.setState({ recceDoneDate: val });
            }}
          />
        </div>
        <div className="form-group">
          <label>Approval Sent Date:</label>
          <DatePicker
            className="mr-3"
            selected={this.state.approvalSentDate}
            onChange={val => {
              this.setState({ approvalSentDate: val });
            }}
          />
        </div>
        <div className="form-group">
          <label>Review Date:</label>
          <DatePicker
            className="mr-3"
            selected={this.state.bajajReviewDate}
            onChange={val => {
              this.setState({ bajajReviewDate: val });
            }}
          />
        </div>
        <div className="form-group">
          <label>Design On Date:</label>
          <DatePicker
            className="mr-3"
            selected={this.state.designOnDate}
            onChange={val => {
              this.setState({ designOnDate: val });
            }}
          />
        </div>
        <div className="form-group">
          <label>Design Done Date:</label>
          <DatePicker
            className="mr-3"
            selected={this.state.designDoneDate}
            onChange={val => {
              this.setState({ designDoneDate: val });
            }}
          />
        </div>
        <div className="form-group">
          <label>Print On Date:</label>
          <DatePicker
            className="mr-3"
            selected={this.state.printOnDate}
            onChange={val => {
              this.setState({ printOnDate: val });
            }}
          />
        </div>
        <div className="form-group">
          <label>Installed Date:</label>
          <DatePicker
            className="mr-3"
            selected={this.state.installedDate}
            onChange={val => {
              this.setState({ installedDate: val });
            }}
          />
        </div>

        <div className="form-group">
          <label>Comment:</label>
          <input
            type="textarea"
            value={this.state.comment}
            className="form-control"
            onChange={e => {
              this.setState({ comment: e.target.value });
            }}
          />
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
          <button
            type="button"
            className="btn btn-alt-success"
            data-dismiss="modal"
            onClick={this.editTask.bind(this)}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  editTask() {
    this.props
      .editTask({
        variables: {
          remark: this.state.remark.value,
          id: this.props.task.id,
          startDate: this.state.startDate
            ? moment(this.state.startDate).format()
            : undefined,
          recceOnDate: this.state.recceOnDate
            ? moment(this.state.recceOnDate).format()
            : undefined,
          recceDoneDate: this.state.recceDoneDate
            ? moment(this.state.recceDoneDate).format()
            : undefined,
          approvalSentDate: this.state.approvalSentDate
            ? moment(this.state.approvalSentDate).format()
            : undefined,
          bajajReviewDate: this.state.bajajReviewDate
            ? moment(this.state.bajajReviewDate).format()
            : undefined,
          designOnDate: this.state.designOnDate
            ? moment(this.state.designOnDate).format()
            : undefined,
          designDoneDate: this.state.designDoneDate
            ? moment(this.state.designDoneDate).format()
            : undefined,
          printOnDate: this.state.printOnDate
            ? moment(this.state.printOnDate).format()
            : undefined,
          installedDate: this.state.installedDate
            ? moment(this.state.installedDate).format()
            : undefined,
          comment: this.state.comment ? this.state.comment : ""
        }
      })
      .then(res => {
        Alert.success("Task Edited successfully!", {
          position: "top-right",
          effect: "slide"
        });
        this.props.taskRefetch();
        this.closeModal();
      })
      .catch(error => {
        Alert.error(error, {
          position: "top-right",
          effect: "slide"
        });
        this.props.taskRefetch();
        this.closeModal();
      });
  }

  deleteTask() {
    this.props
      .deleteTask({
        variables: {
          id: this.props.match.params.id
        }
      })
      .then(res => {
        Alert.success("Task  Deleted successfully!", {
          position: "top-right",
          effect: "slide"
        });
        this.setState({ data: res.data });
      })
      .catch(error => {
        console.log(error);
      });
    this.props.history.push("/branding/task");
  }

  renderDeleteButton() {
    if (this.props.user.role === "ADMIN") {
      return (
        <button
          style={{
            marginRight: 10
          }}
          onClick={async () => {
            await this.setState({ showDeleteModal: true });
            this.openModal();
          }}
          type="button"
          className="btn btn-sm btn-danger float-right"
        >
          <i className="fa fa-delete text-warning mr-5" />Delete task
        </button>
      );
    } else {
      return null;
    }
  }

  renderEditButton() {
    if (this.props.user.role === "ADMIN") {
      return (
        <button
          style={{
            marginRight: 10
          }}
          onClick={async () => {
            await this.setState({ showDeleteModal: false });
            this.openModal();
          }}
          type="button"
          className="btn btn-sm btn-warning float-right"
        >
          <i className="fa fa-delete text-warning mr-5" />Edit task
        </button>
      );
    } else {
      return null;
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
    return (
      <div>
        <div className="animated fadeIn">
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Add Ad Spot Modal"
          >
            <div className="block mb-0">
              <div className="block-header block-header-default">
                <h3 className="block-title">Are you sure to delete</h3>
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

              {this.state.showDeleteModal
                ? this.renderDeleteInput()
                : this.renderEditInput()}
            </div>
          </Modal>

          <h2 className="content-heading">
            {this.renderEditButton()}
            {this.renderDeleteButton()}
            <button
              style={{
                marginRight: 10
              }}
              onClick={this.props.taskRefetch}
              type="button"
              className="btn btn-sm btn-secondary float-right"
            >
              <i className="fa fa-refresh text-warning mr-5" />Refresh
            </button>
            Progress
          </h2>
          <TaskProgress status={this.props.task.status} />
        </div>
        <div className="animated fadeIn">
          <div className="row">
            <StoreDetails
              store={this.props.task.store}
              remark={this.props.task.remark}
            />
            <Timeline task={this.props.task} />
          </div>
        </div>
        <AdSpots task={this.props.task} refetch={this.props.taskRefetch} />
        <div className="animated fadeIn">
          <div className="row">
            <StoreImage
              taskId={this.props.task.id}
              storeImage={this.props.task.storeImage}
              user={this.props.user}
            />
            <StoreCert
              taskId={this.props.task.id}
              certImage={this.props.task.certImage}
              user={this.props.user}
            />
            <InstallationCert
              taskId={this.props.task.id}
              installCertImage={this.props.task.installCertImage}
              user={this.props.user}
            />
          </div>
        </div>
      </div>
    );
  }
}

const ME_QUERY = gql`
  query {
    me {
      id
      name
      role
    }
  }
`;

const TASK_DETAILS = gql`
  query($id: ID!) {
    taskDetails(id: $id) {
      comment
      remark {
        id
        name
      }
      id
      status
      startDate
      recceOnDate
      recceDoneDate
      approvalSentDate
      bajajReviewDate
      designOnDate
      designDoneDate
      printOnDate
      installedDate
      designUser {
        name
      }
      recceUser {
        name
      }
      storeImage {
        url
      }
      certImage {
        url
      }
      installCertImage {
        url
      }
      adSpots {
        id
        type
        name
        height
        width
        approved
        installed
        remarks
        image {
          id
          url
        }
        installedImage {
          id
          url
        }
        language {
          id
          name
        }
        category {
          id
          name
        }
        media {
          id
          name
        }
      }
      store {
        id
        dealerCode
        dealerName
        dealerAddress
        asmName
        asmNo
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

const ALL_REMARKS = gql`
  query allRemarks {
    allRemarks {
      id
      name
    }
  }
`;

const DELETE_TASK = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

const EDIT_TASK = gql`
  mutation editTask(
    $id: ID!
    $startDate: DateTime
    $recceOnDate: DateTime
    $recceDoneDate: DateTime
    $approvalSentDate: DateTime
    $bajajReviewDate: DateTime
    $designOnDate: DateTime
    $designDoneDate: DateTime
    $printOnDate: DateTime
    $installedDate: DateTime
    $remark: ID
    $comment: String
  ) {
    editTask(
      id: $id
      startDate: $startDate
      recceOnDate: $recceOnDate
      recceDoneDate: $recceDoneDate
      approvalSentDate: $approvalSentDate
      bajajReviewDate: $bajajReviewDate
      designOnDate: $designOnDate
      designDoneDate: $designDoneDate
      printOnDate: $printOnDate
      installedDate: $installedDate
      remark: $remark
      comment: $comment
    ) {
      id
    }
  }
`;

export default compose(
  graphql(ME_QUERY, {
    props: ({ data }) => {
      if (!data.me) {
        return { loading: data.loading };
      }
      return { loading: data.loading, user: data.me };
    },
    options: {
      fetchPolicy: "cache-and-network"
    }
  }),
  graphql(TASK_DETAILS, {
    props: ({ data }) => {
      if (!data.taskDetails) return { loading: data.loading };

      return {
        loading: data.loading,
        task: data.taskDetails,
        taskRefetch: data.refetch
      };
    },
    options: mapPropsToOptions
  }),
  graphql(ALL_REMARKS, {
    props: ({ data }) => {
      if (!data.allRemarks) return { loading: data.loading };

      // const clusters = data.allZones.map(({ id, name }) => ({ value: id, label:
      // name }));

      return {
        remarks: data.allRemarks.map(e => {
          return { value: e.id, label: e.name };
        }),
        remarksRefetch: data.refetch
      };
    },
    options: {
      fetchPolicy: "cache-and-network"
    }
  }),
  graphql(DELETE_TASK, { name: "deleteTask" }),
  graphql(EDIT_TASK, { name: "editTask" })
)(TaskSingle);

TaskSingle.propTypes = {};
