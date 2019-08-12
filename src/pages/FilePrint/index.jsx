import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import "./index.css";

export default class DesigningOn extends Component {
  state = {
    recce: true,
    recceCert: true,
    installation: true,
    installCert: true,
    adSpots: true,
    storeImage: true
  };

  renderAdSpots = adSpots => {
    return adSpots.map((e, index) => {
      return (
        <div key={index} className="content">
          Name: {e.name} Width: {e.width} Height: {e.height} Media:{" "}
          {e.media ? e.media.name : ""} Category:{" "}
          {e.category ? e.category.name : ""} Language:{" "}
          {e.language ? e.language.name : ""}
          <br />
          {this.state.recce ? (
            <img src={e.image ? e.image.url : ""} style={{ width: "49%" }} />
          ) : (
            ""
          )}
          {this.state.installation ? (
            <img
              src={e.installedImage ? e.installedImage.url : ""}
              style={{ marginLeft: "5px", width: "50%" }}
            />
          ) : (
            ""
          )}
        </div>
      );
    });
  };

  renderStoreInfo = e => {
    return (
      <div className="content">
        {e.store.dealerName} ({e.store.dealerCode})
        <br />
        {e.store.dealerAddress}
        <br />
        {this.state.storeImage ? (
          <img
            style={{ height: "100vw" }}
            src={e.storeImage ? e.storeImage.url : ""}
          />
        ) : (
          ""
        )}
      </div>
    );
  };

  renderTasks = tasks => {
    return tasks.map((e, index) => {
      return (
        <div key={index}>
          {this.renderStoreInfo(e)}
          {this.state.adSpots
            ? this.renderAdSpots(e.adSpots ? e.adSpots : [])
            : ""}

          {this.state.recceCert ? (
            <div className="content">
              Recce Cert
              <br />
              <img
                style={{ height: "100vw" }}
                src={e.certImage ? e.certImage.url : ""}
              />
            </div>
          ) : (
            ""
          )}
          {this.state.recceCert ? (
            <div className="content">
              Installation Cert
              <br />
              <img
                style={{ height: "100vw" }}
                src={e.installCertImage ? e.installCertImage.url : ""}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      );
    });
  };

  getTasksIdArray = () => {
    let tasksArr = [];
    let jsonArr = this.props.location.state.tasksJSONArr;
    jsonArr.map((task, index) => {
      tasksArr.push(task.id);
    });
    //console.log(this.props);
    return tasksArr;
  };

  render() {
    // if the location state is undefined that means we are directly accessing this page
    // hence don't render any thing
    if(!this.props.location.state){
      return null;
    }
    return (
      <Query
        query={DOWNLOAD_PDF}
        variables={{ tasksArr: this.getTasksIdArray() }}
      >
        {({ loading, error, data }) => {
          if (error) {
            console.log("Some Error Occured " + error);
            return <div />;
          }

          if (loading) {
            return (
              <div className="loader">
                <div />
              </div>
            );
          }

          if (data) {
            return (
              <div
                style={{
                  margin: 10,
                  height: "210mm",
                  width: "297mm",
                  pageBreakAfter: "always"
                }}
              >
                <div>
                  <label>Store Image</label>
                  <input
                    type="checkbox"
                    checked={this.state.storeImage}
                    onChange={() => {
                      this.setState({ storeImage: !this.state.storeImage });
                    }}
                  />
                </div>
                <div>
                  <label>Ad Spots</label>
                  <input
                    type="checkbox"
                    checked={this.state.adSpots}
                    onChange={() => {
                      this.setState({ adSpots: !this.state.adSpots });
                    }}
                  />
                </div>
                <div>
                  <label>Recce</label>
                  <input
                    type="checkbox"
                    checked={this.state.recce}
                    onChange={() => {
                      this.setState({ recce: !this.state.recce });
                    }}
                  />
                </div>
                <div>
                  <label>Recce Cert</label>
                  <input
                    type="checkbox"
                    checked={this.state.recceCert}
                    onChange={() => {
                      this.setState({ recceCert: !this.state.recceCert });
                    }}
                  />
                </div>
                <div>
                  <label>Installation</label>
                  <input
                    type="checkbox"
                    checked={this.state.installation}
                    onChange={() => {
                      this.setState({ installation: !this.state.installation });
                    }}
                  />
                </div>
                <div>
                  <label>Installation Cert</label>
                  <input
                    type="checkbox"
                    checked={this.state.installCert}
                    onChange={() => {
                      this.setState({ installCert: !this.state.installCert });
                    }}
                  />
                </div>
                {this.renderTasks(data.downloadPDF)}
              </div>
            );
          }

          return <div>Check your connection.</div>;
        }}
      </Query>
    );
  }
}

const DOWNLOAD_PDF = gql`
  query downloadPDF($tasksArr: [ID!]!) {
    downloadPDF(tasksArr: $tasksArr) {
      storeImage {
        url
      }
      certImage {
        url
      }
      installCertImage {
        url
      }
      id
      adSpots {
        id
        name
        type
        height
        width
        image {
          url
        }
        installedImage {
          url
        }
        media {
          name
        }
        category {
          name
        }
        language {
          name
        }
      }
      store {
        id
        dealerCode
        dealerName
        dealerAddress
        city {
          name
        }
      }
    }
  }
`;
