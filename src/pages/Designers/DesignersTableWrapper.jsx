import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import Modal from "react-modal";
import Toolbar from "./Toolbar";
import Alert from "react-s-alert";
import DesignerAdspotTable from "./DesignerAdspotTable";

let username = "";

const mapPropsToOptions = props => {
  username = props.user.username;
  const variables = {
    user: props.user.role === "DESIGNER" ? props.user.id : null,
    statusArr: ["DESIGNING"]
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

class DesignersTableWrapper extends Component {
  state = {
    filterType: this.ALL_ADSPOTS,
    selectedTasks: [],
    columns: [
      {
        key: "campaign",
        name: "Campaign",
        width: 100,
        filterable: true,
        resizable: true
      },
      {
        key: "type",
        name: "Type",
        width: 100,
        filterable: true,
        resizable: true
      },
      {
        key: "isDownloaded",
        name: "Downloaded",
        width: 100,
        filterable: true,
        resizable: true
      },

      {
        key: "dealerCity",
        name: "City",
        width: 115,
        filterable: true,
        resizable: true
      },

      {
        key: "dealerCode",
        name: "Dealer Code",
        width: 100,
        filterable: true,
        resizable: true
      },

      {
        key: "dealerName",
        name: "Store Name",
        width: 150,
        filterable: true,
        resizable: true
      },

      {
        key: "dealerAddress",
        name: "Address",
        width: 150,
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
        key: "width",
        name: "Width",
        width: 115,
        filterable: true,
        resizable: true
      },
      {
        key: "height",
        name: "Height",
        width: 115,
        filterable: true,
        resizable: true
      },

      {
        key: "area",
        name: "Area",
        width: 115,
        filterable: true,
        resizable: true
      },

      {
        key: "media",
        name: "Media",
        width: 115,
        filterable: true,
        resizable: true
      },

      {
        key: "category",
        name: "Category",
        width: 115,
        filterable: true,
        resizable: true
      },

      {
        key: "remarks",
        name: "Remarks",
        width: 115,
        filterable: true,
        resizable: true
      },
      {
        key: "coBrandingName",
        name: "Co Branding Name",
        width: 115,
        filterable: true,
        resizable: true
      },
      {
        key: "action",
        name: "Action",
        filterable: true,
        resizable: true,
        width: 115
      },
      {
        key: "action_store_image",
        name: "Action",
        resizable: true,
        width: 115
      },
      {
        key: "action_designref_image",
        name: "Action",
        resizable: true,
        width: 125
      },{
        key: "action_cert_image",
        name: "Action",
        resizable: true,
        width: 125
      }
    ]
  };

  ADSPOT_DOWNLOADED = "adspotDownloaded";
  ADSPOT_NOT_DOWNLOADED = "adspotNotDownloaded";
  ALL_ADSPOTS = "allAdspots";

  getAdspotsByFilter = () => {
    let adspots = [];
    if (this.state.filterType === this.ADSPOT_DOWNLOADED) {
      adspots = this.props.tasks.filter(adspot => {
        return adspot.isDownloaded === true;
      });
    } else if (this.state.filterType === this.ADSPOT_NOT_DOWNLOADED) {
      adspots = this.props.tasks.filter(adspot => {
        return adspot.isDownloaded === false;
      });
    } else {
      adspots = this.props.tasks;
    }
    return adspots;
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

  openModalDesignRefImage = value => {
    this.setState({ modalIsOpen: true, image: value.designRefImage });
  };

  openModalCertImage = value => {
    this.setState({ modalIsOpen: true, image: value.certImage });
  };

  setSelectedRecceUser = val => {
    this.setState({ user: val });
  };

  setSelectedTasks = tasks => {
    this.setState({ selectedTasks: tasks });
  };

  setFilterType = ft => {
    if (ft === this.ADSPOT_DOWNLOADED) {
      this.setState({selectedTasks : []});
      this.setState({ filterType: this.ADSPOT_DOWNLOADED });
      return;
    }
    if (ft === this.ADSPOT_NOT_DOWNLOADED) {
      this.setState({selectedTasks : []});
      this.setState({ filterType: this.ADSPOT_NOT_DOWNLOADED });
      return;
    }
    this.setState({selectedTasks : []});
    this.setState({ filterType: this.ALL_ADSPOTS });
  };

  renderTasksTable = () => {
    // console.log(this.props);
    if (this.props.loading) {
      return (
        <div className="loader">
          <div />
        </div>
      );
    }
    if (this.props.error) {
      if (this.props.error.graphQLErrors.length) {
        Alert.closeAll();
        Alert.error(
          `Error Occurred :  ${this.props.error.graphQLErrors[0].message}`,
          {
            position: "top-right",
            effect: "slide"
          }
        );
        return <div>{this.props.error.graphQLErrors[0].message}</div>;
      }
      return <div>Some error occured.</div>;
    }
    return (
      <div>
        <div className="animated fadeIn">
          <DesignerAdspotTable
            columns={this.state.columns}
            setSelectedTasks={this.setSelectedTasks}
            tasks={this.getAdspotsByFilter()}
            openModalCallback={this.openModal}
            openModalCallbackStore={this.openModalStore}
            openModalCallbackDesignRef = {this.openModalDesignRefImage}
            openModalCallbackCertImage = {this.openModalCertImage}
          />
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <h2 className="content-heading">
          <Toolbar
            username={username}
            tasksRefetch={this.props.tasksRefetch}
            selectedTasks={this.state.selectedTasks}
            setFilterType={this.setFilterType}
            tasks={this.getAdspotsByFilter()}
          />
        </h2>
        <div>
          {this.renderTasksTable()}
          <div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="View Image Modal"
              ariaHideApp={false}
            >
              <div className="block mb-0">
                <div className="block-header block-header-default">
                  <h3 className="block-title">View Image</h3>
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
      </div>
    );
  }
  
}

const GET_DESIGNER_ADSPOTS = gql`
  query($statusArr: [String], $user: ID) {
    getDesignerAdspots(statusArr: $statusArr, user: $user) {
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
        designDone
        storeImage
        campaign
        image
        isDownloaded
        approved
        certImage
        designRefImage
        coBrandingName
      }
    }
  }
`;

const getApprovedAdspots = (adspots) =>{
  let adSpots = [];
  adSpots = adspots.filter((ad)=>{
    return ad.approved === true;
  });
  return adSpots;
}

export default compose(
  graphql(GET_DESIGNER_ADSPOTS, {
    props: ({ data }) => {
      if (data.loading) {
        return { loading: data.loading, tasks: [], tasksRefetch: data.refetch };
      }
      if (data.error) {
        return {
          error: data.error,
          loading: data.loading,
          tasks: [],
          tasksRefetch: data.refetch
        };
      } 
      return {
        loading: data.loading,
        tasks: getApprovedAdspots(data.getDesignerAdspots.adSpots),
        tasksRefetch: data.refetch
      };
    },
    options: mapPropsToOptions
  })
)(DesignersTableWrapper);

DesignersTableWrapper.propTypes = {};
