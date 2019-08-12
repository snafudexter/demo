import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import Alert from "react-s-alert";
import Modal from "react-modal";
import AdSpotItem from "./AdSpotItem";

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

class OldAdspot extends Component {
  handleAdspotInstalledStatus = (id, status) => {
    let ids = [];
    ids.push(id);
    this.props
      .updateAdspotInstallation({
        variables: {
          idArr: ids,
          installStatus: status
        }
      })
      .then(resp => {
        // console.log(resp)
        this.props.refetch();
        Alert.closeAll();
        Alert.success(`Done!! Adspots Status Changed`, {
          position: "top-right",
          effect: "slide"
        });
      })
      .catch(err => {
        console.log(err.message);
        Alert.closeAll();
        Alert.error(`Error occured : ${err.message}`, {
          position: "top-right",
          effect: "slide"
        });
      });

  };
  handleAdspotApproveStatus = (id, status) => {
    this.props
      .updateAdspotApprovedStatus({
        variables: {
          id,
          approved: status
        }
      })
      .then(res => {
        // console.log(res);
        let message = "AdSpot Approve Status Changed to ";
        if (res.data) {
          if (res.data.updateAdspotApprovedStatus.approved) {
            message += " Approved";
          } else {
            message += " Rejected";
          }
        }

        Alert.success(message, {
          position: "top-right",
          effect: "slide"
        });
        this.props.refetch();
        //this.setState({data:res.data})
      })
      .catch(error => {
        console.log(error);
        Alert.error("Some Error Occured", {
          position: "top-right",
          effect: "slide"
        });
      });
  };

  deleteImage(id) {
    this.props
      .deleteAdspot({
        variables: {
          id: id
        }
      })
      .then(res => {
        Alert.success("Ad Spot Deleted!", {
          position: "top-right",
          effect: "slide"
        });
        this.props.refetch();
        //this.setState({data:res.data})
      })
      .catch(error => {
        Alert.error(error, {
          position: "top-right",
          effect: "slide"
        });
      });
    //window.location.href="/branding/task"
  }
  renderAdSpots = () => {
    if (this.props.task.adSpots) {
      return this.props.task.adSpots
        .filter(opt => opt.type == "OLD")
        .map((adSpot, key) => {
          return (
            <AdSpotItem
              taskRefetch={this.props.refetch}
              user={this.props.user}
              id={adSpot.id}
              key={key}
              imgId={adSpot.image ? adSpot.image.id : ""}
              installed={adSpot.installedImage ? adSpot.installedImage.url : ""}
              image={adSpot.image ? adSpot.image.url : ""}
              name={adSpot.name}
              height={adSpot.height}
              width={adSpot.width}
              approved={adSpot.approved ? "APPROVED" : "REJECTED"}
              isInstalled={adSpot.installed ? "INSTALLED" : "NOT INSTALLED"}
              language={adSpot.language ? adSpot.language.name : ""}
              media={adSpot.media ? adSpot.media.name : ""}
              category={adSpot.category ? adSpot.category.name : ""}
              deleteAdspot={this.deleteImage.bind(this)}
              handleAdspotApproveStatus={this.handleAdspotApproveStatus}
              handleAdspotInstalledStatus={this.handleAdspotInstalledStatus}
            />
          );
        });
    }
  };
  render() {
    if (this.props.loading) {
      return (
        <div className="loader">
          <div />
        </div>
      );
    }
    return (
      // <div className="row items-push">
      <div className="row">{this.renderAdSpots()}</div>
    );
  }
}

const DELETE_ADSPOT_IMAGE = gql`
  mutation deleteAdspot($id: ID!) {
    deleteAdspot(id: $id) {
      id
    }
  }
`;

const HANDLE_APPROVE_ADSPOT = gql`
  mutation updateAdspotApprovedStatus($id: ID!, $approved: Boolean) {
    updateAdspotApprovedStatus(id: $id, approved: $approved) {
      id
      approved
    }
  }
`;

const ME_QUERY = gql`
  query {
    me {
      id
      name
      role
    }
  }
`;

const UPDATE_ADSPOT_INSTALLATION = gql`
  mutation updateAdspotInstallation($idArr: [ID], $installStatus: Boolean) {
    updateAdspotInstallation(idArr: $idArr, installStatus: $installStatus)
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
  graphql(DELETE_ADSPOT_IMAGE, { name: "deleteAdspot" }),
  graphql(HANDLE_APPROVE_ADSPOT, { name: "updateAdspotApprovedStatus" }),
  graphql(UPDATE_ADSPOT_INSTALLATION, { name: "updateAdspotInstallation" })
)(OldAdspot);

//export default AdSpotsList;
