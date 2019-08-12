import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import Alert from "react-s-alert";
import Modal from "react-modal";
import Select from "react-select";
import Image from "../../../../../components/Image";
import Cropper from "react-cropper";
import "react-image-crop/dist/ReactCrop.css";
import "react-image-crop/lib/ReactCrop.scss";
import "cropperjs/dist/cropper.css";
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

class AdSpotItem extends Component {
  state = {
    modalIsOpen: false,
    ImagemodalIsOpen: false,
    img_path: "",
    editModalIsOpen: false,
    approveModalIsOpen: false,
    installModelIsOpen: false,
    removeInstalledImageModalIsOpen: false,
    media: this.props.media
      ? { value: this.props.media.id, label: this.props.media.name }
      : "",
    language: this.props.language
      ? { value: this.props.language.id, label: this.props.language.name }
      : "",
    category: this.props.category
      ? { value: this.props.category.id, label: this.props.category.name }
      : "",
    remarks: this.props.remarks,
    width: this.props.width,
    height: this.props.height,
    name: this.props.name,
    type: { value: this.props.type, label: this.props.type }
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  uploadFileRecce(event) {
    this.setState({
      imageLoading: true
    });
    let file = event.target.files[0];

    if (file) {
      let data = new FormData();
      data.append("data", file);
      // do a post request
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", function(e) {
        if (e.lengthComputable) {
          let percentComplete = (e.loaded / e.total) * 100;
          console.log("progress");
          console.log(percentComplete);
        } else {
          console.log("cant compute");
        }
      });
      xhr.open("POST", process.env.REACT_APP_SERVER_URI + "/upload", true);
      xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
      xhr.onreadystatechange = response => {
        // here you can obtain the new id of the uploaded file
        if (xhr.readyState === 4 && xhr.status === 200) {
          const obj = JSON.parse(response.target.responseText);
          this.setState(
            {
              imageLoading: false,
              imageId: obj.id,
              imageUrl: obj.url
            },
            () => {
              this.handleRecceFormSubmit();
            }
          );
        } else {
          // Alert.error('An Error Occured!', {
          //   position: 'top-right',
          //   effect: 'slide'
          // });
        }
      };
      xhr.send(data);
    }
  }

  ImagecloseModal = () => {
    this.setState({ ImagemodalIsOpen: false });
  };

  editCloseModal = () => {
    this.setState({ editModalIsOpen: false });
  };

  approveCloseModal = () => {
    this.setState({ approveModalIsOpen: false });
  };

  installCloseModal = () => {
    this.setState({ installModelIsOpen: false });
  };

  removeInstalledImageModalClose = () => {
    this.setState({ removeInstalledImageModalIsOpen: false });
  };

  async _crop() {
    // image in dataUrl
    await this.setState({
      croped: await this.getCroppedImg(
        this.cropper.getCroppedCanvas(),
        "img.jpg"
      )
    });
  }

  getCroppedImg = (canvas, fileName) => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(file => {
        if (file) file.name = fileName;
        var fil = new File([file], fileName, {
          type: "image/jpeg",
          lastModified: Date.now()
        });
        resolve(fil);
      }, "image/jpeg");
    });
  };

  uploadFile(event) {
    this.setState({
      imageLoading: true
    });
    let file = event.target;
    // var file = $(this)[0]; // note the [0] to return the DOMElement from the jQuery object

    var files = file.files;

    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = () => {
        this.setState({
          img_path: fr.result,
          ImagemodalIsOpen: true,
          original: fr.result
        });
      };
      fr.readAsDataURL(files[0]);
    }
  }

  doneEdit = async () => {
    var croppedImg = this.state.croped;

    const data = new FormData();
    this.setState({ imageLoading: true });
    data.append("data", croppedImg);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", process.env.REACT_APP_SERVER_URI + "/upload", true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.onreadystatechange = async response => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const obj = JSON.parse(response.target.responseText);

        await this.setState({
          imageLoading: false,
          imageUploaded: true,
          imageId: obj.id,
          imageUrl: obj.url
        });
        this.handleFormSubmit();
      }
    };
    xhr.send(data);
  };

  handleRecceFormSubmit() {
    this.props
      .addImage({
        variables: {
          id: this.props.id,
          imageId: this.state.imageId
        }
      })
      .then(response => {
        this.props.taskRefetch();
        Alert.success("Image Uploaded!", {
          position: "top-right",
          effect: "slide"
        });
      })
      .catch(e => {
        Alert.error("An Error Occured!", {
          position: "top-right",
          effect: "slide"
        });
      });
  }

  handleEditAdSpot = () => {
    let error = false;

    if (this.state.name === "") {
      Alert.error("Name is required", {
        position: "top-right",
        effect: "slide"
      });
      error = true;
    }
    if (this.state.height === "") {
      Alert.error("Height is required.", {
        position: "top-right",
        effect: "slide"
      });
      error = true;
    }
    if (this.state.width === "") {
      Alert.error("Width is requred.", {
        position: "top-right",
        effect: "slide"
      });
      error = true;
    }
    if (!this.state.category) {
      Alert.error("Category is required.", {
        position: "top-right",
        effect: "slide"
      });
      error = true;
    }
    if (!this.state.media) {
      Alert.error("Media is required.", {
        position: "top-right",
        effect: "slide"
      });
      error = true;
    }
    if (!this.state.language) {
      Alert.error("Language is required.", {
        position: "top-right",
        effect: "slide"
      });
      error = true;
    }

    if (!error) {
      this.setState({ loading: true });

      let d = {
        type: this.state.type.value,
        name: this.state.name,
        width: Number(this.state.width),
        height: Number(this.state.height),
        id: this.props.id,
        remarks: this.state.remarks,
        categoryId: this.state.category.value,
        mediaId: this.state.media.value,
        languageId: this.state.language.value
      };

      this.props
        .editAdSpot({ variables: d })
        .then(response => {
          Alert.success("Ad Spot Edited!", {
            position: "top-right",
            effect: "slide"
          });
          this.setState({ data: response.data });
          this.editCloseModal();
          this.props.taskRefetch();
          document.getElementById("addAdSpotForm").reset();
          this.setState({
            media: null,
            language: null,
            category: null,
            name: "",
            width: "",
            height: "",
            remarks: "",
            imageId: "",
            imageLoading: false,
            imageUploaded: false,
            loading: false
          });
        })
        .catch(e => {
          Alert.error(e, {
            position: "top-right",
            effect: "slide"
          });
        });
    }
  };

  handleFormSubmit() {
    this.props
      .addInstalledImage({
        variables: {
          id: this.props.id,
          imageId: this.state.imageId
        }
      })
      .then(response => {
        this.props.taskRefetch();
        Alert.success("Image Uploaded!", {
          position: "top-right",
          effect: "slide"
        });
      })
      .catch(e => {
        Alert.error("An Error Occured!", {
          position: "top-right",
          effect: "slide"
        });
      });
  }

  renderButtons() {
    if (this.props.user.role === "ADMIN") {
      return (
        <div>
          <button
            className="btn btn-warning"
            style={{ marginRight: 10 }}
            onClick={() => {
              this.setState({ editModalIsOpen: true });
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            style={{ marginRight: 10 }}
            onClick={() => {
              this.setState({ modalIsOpen: true });
            }}
          >
            Delete
          </button>
          <button
            className="btn"
            style={{ marginRight: 10, background: "#4B77BE" }}
            onClick={() => {
              this.setState({ approveModalIsOpen: true });
            }}
          >
            Approve/Reject
          </button>
          <button
            className="btn"
            style={{ marginRight: 10, background: "#36D7B7" }}
            onClick={() => {
              this.setState({ installModelIsOpen: true });
            }}
          >
            Install/Not-Install
          </button>
        </div>
      );
    }
    // button for bajaj only approve and review
    if (this.props.user.role === "BAJAJ") {
      return (
        <div>
          <button
            className="btn"
            style={{ marginRight: 10, background: "#4B77BE" }}
            onClick={() => {
              this.setState({ approveModalIsOpen: true });
            }}
          >
            Approve/Reject
          </button>
        </div>
      );
    }

    // button for everybody "except" ADMIN and BAJAJ
    return (
      <div>
        <button
          className="btn"
          style={{ marginRight: 10, background: "#4B77BE" }}
          onClick={() => {
            this.setState({ approveModalIsOpen: true });
          }}
        >
          Approve/Reject
        </button>
      </div>
    );
  }

  renderUploadButton(props) {
    if (props.user.role === "ADMIN") {
      return (
        <label
          className="custom-file"
          style={{ float: "right", width: 140, fontSize: 13 }}
        >
          <input
            onChange={props.uploadFile}
            type="file"
            name="myFile"
            className="custom-file-input"
          />
          <span className="custom-file-control" />
          Upload Installed Image
        </label>
      );
    } else {
      return null;
    }
  }

  renderInstallImageRemoveButton = installedImageUrl => {
    if (installedImageUrl.length <= 0) {
      return null;
    }

    if (this.props.user.role === "ADMIN") {
      return (
        <button
          type="button"
          className="btn btn-sm btn-secondary float-right"
          onClick={e => {
            e.preventDefault();
            this.setState({ removeInstalledImageModalIsOpen: true });
          }}
        >
          <i className="fa fa-trash text-danger mr-5" />
          Remove Image
        </button>
      );
    } else {
      return null;
    }
  };

  renderRecceUploadButton(props) {
    if (props.user.role === "ADMIN") {
      return (
        <label
          className="custom-file"
          style={{ float: "right", width: 140, fontSize: 13 }}
        >
          <input
            onChange={props.uploadFile}
            type="file"
            name="myFile"
            className="custom-file-input"
          />
          <span className="custom-file-control" />
          Upload Installed Image
        </label>
      );
    } else {
      return null;
    }
  }

  renderRemoveInstalledImageModal() {
    return (
      <Modal
        isOpen={this.state.removeInstalledImageModalIsOpen}
        onRequestClose={this.removeInstalledImageModalClose}
        style={customStyles}
        contentLabel="Remove Installed Image Modal"
        ariaHideApp={false}
      >
        <div className="block mb-0">
          <div className="block-header block-header-default">
            <h3 className="block-title">Remove This Image ?</h3>
            <div className="block-options">
              <button
                onClick={this.removeInstalledImageModalClose}
                type="button"
                className="btn-block-option"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i className="si si-close" />
              </button>
            </div>
          </div>
        </div>
        <div className="modal-footer mt-3">
          <button
            onClick={this.removeInstalledImageModalClose}
            type="button"
            className="btn btn-alt-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-alt-danger"
            data-dismiss="modal"
            onClick={() => {
              this.props
                .removeInstalledImage({
                  variables: {
                    id: this.props.id
                  }
                })
                .then(response => {
                  this.props.taskRefetch();
                  Alert.success("Image Removed!", {
                    position: "top-right",
                    effect: "slide"
                  });
                })
                .catch(e => {
                  Alert.error("An Error Occured!", {
                    position: "top-right",
                    effect: "slide"
                  });
                });
              this.removeInstalledImageModalClose();
            }}
          >
            Remove Image
          </button>
        </div>
      </Modal>
    );
  }

  render() {
    return (
      <div className="col-md-6">
        <div style={{ margin: "5" }}>{this.renderButtons()}</div>
        {/* REMOVE INSTALLED IMAGE  ON ADSPOT MODAL START */}
        {this.renderRemoveInstalledImageModal()}
        {/* REMOVE INSTALLED IMAGE  ON ADSPOT MODAL START */}

        {/* EDIT ADSPOT MODAL START */}
        <Modal
          isOpen={this.state.editModalIsOpen}
          onRequestClose={this.editCloseModal}
          style={customStyles}
          contentLabel="Add Ad Spot Modal"
          ariaHideApp={false}
        >
          <div className="block mb-0">
            <div className="block-header block-header-default">
              <h3 className="block-title">Edit Ad Spot</h3>
              <div className="block-options">
                <button
                  onClick={this.editCloseModal}
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
              <form>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label" htmlFor="width">
                    Type
                  </label>
                  <div className="col-lg-9">
                    <Select
                      name="name"
                      placeholder="Type"
                      value={this.state.type}
                      options={[
                        {
                          value: "NEW",
                          label: "NEW"
                        },
                        {
                          value: "OLD",
                          label: "OLD"
                        },
                        {
                          value: "COMPETITION",
                          label: "COMPETITION"
                        }
                      ]}
                      value={this.state.type}
                      onChange={val => {
                        this.setState({ type: val });
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label" htmlFor="name">
                    Name
                  </label>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      onChange={e => {
                        this.setState({ name: e.target.value });
                      }}
                      value={this.state.name}
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter Name.."
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label" htmlFor="width">
                    Width
                  </label>
                  <div className="col-lg-9">
                    <input
                      type="number"
                      onChange={e => {
                        this.setState({ width: e.target.value });
                      }}
                      value={this.state.width}
                      className="form-control"
                      id="width"
                      name="width"
                      placeholder="Enter Width (inches).."
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label" htmlFor="width">
                    Height
                  </label>
                  <div className="col-lg-9">
                    <input
                      type="number"
                      onChange={e => {
                        this.setState({ height: e.target.value });
                      }}
                      value={this.state.height}
                      className="form-control"
                      id="height"
                      name="height"
                      placeholder="Enter Height (inches).."
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label" htmlFor="width">
                    Media
                  </label>
                  <div className="col-lg-9">
                    <Select
                      name="name"
                      placeholder="Media"
                      value={this.state.media}
                      options={this.props.medias}
                      onChange={val => {
                        this.setState({ media: val });
                      }}  
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label" htmlFor="width">
                    Category
                  </label>
                  <div className="col-lg-9">
                    <Select
                      name="name"
                      placeholder="Category"
                      value={this.state.category}
                      options={this.props.categories}
                      onChange={val => {
                        this.setState({ category: val });
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label" htmlFor="width">
                    Language
                  </label>
                  <div className="col-lg-9">
                    <Select
                      name="name"
                      placeholder="Language"
                      value={this.state.language}
                      options={this.props.languages}
                      onChange={val => {
                        this.setState({ language: val });
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label" htmlFor="width">
                    Remarks
                  </label>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      onChange={e => {
                        this.setState({ remarks: e.target.value });
                      }}
                      value={this.state.remarks}
                      className="form-control"
                      id="remarks"
                      name="remarks"
                      placeholder="Enter remarks.."
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer mt-3">
            <button
              onClick={this.editCloseModal}
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
              onClick={this.handleEditAdSpot.bind(this)}
            >
              <i className="fa fa-plus mr-2" />
              Submit
            </button>
          </div>
        </Modal>
        {/* EDIT ADSPOT MODAL END */}

        {/* DELETE ADSPOT MODAL START */}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add Ad Spot Modal"
          ariaHideApp={false}
        >
          <div className="block mb-0">
            <div className="block-header block-header-default">
              <h3 className="block-title">Are you sure you want to delete ?</h3>
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
              onClick={() => {
                this.props.deleteAdspot(this.props.id);
                this.closeModal();
              }}
            >
              OK! Delete
            </button>
          </div>
        </Modal>
        {/* DELETE ADSPOT MODAL END */}

        {/* APPROVE/REJECT ADSPOT MODAL START */}
        <Modal
          isOpen={this.state.approveModalIsOpen}
          onRequestClose={this.approveCloseModal}
          style={customStyles}
          contentLabel="Approve/Reject Ad Spot Modal"
          ariaHideApp={false}
        >
          <div className="block mb-0">
            <div className="block-header block-header-default">
              <h3 className="block-title">Approve/Reject This Adspot ?</h3>
              <div className="block-options">
                <button
                  onClick={this.approveCloseModal}
                  type="button"
                  className="btn-block-option"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="si si-close" />
                </button>
              </div>
            </div>
          </div>
          <div className="modal-footer mt-3">
            <button
              onClick={this.approveCloseModal}
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
              onClick={() => {
                this.props.handleAdspotApproveStatus(this.props.id, true);
                this.approveCloseModal();
              }}
            >
              Approve
            </button>
            <button
              type="button"
              className="btn btn-alt-warning"
              data-dismiss="modal"
              onClick={() => {
                this.props.handleAdspotApproveStatus(this.props.id, false);
                this.approveCloseModal();
              }}
            >
              Reject
            </button>
          </div>
        </Modal>
        {/* APPROVE/REJECT MODAL END */}

        {/* INSTALL/NOT INSTALL ADSPOT MODAL START */}
        <Modal
          isOpen={this.state.installModelIsOpen}
          onRequestClose={this.installCloseModal}
          style={customStyles}
          contentLabel="Install/Not-Install Ad Spot Modal"
          ariaHideApp={false}
        >
          <div className="block mb-0">
            <div className="block-header block-header-default">
              <h3 className="block-title">Install/Not-Install This Adspot ?</h3>
              <div className="block-options">
                <button
                  onClick={this.installCloseModal}
                  type="button"
                  className="btn-block-option"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="si si-close" />
                </button>
              </div>
            </div>
          </div>
          <div className="modal-footer mt-3">
            <button
              onClick={this.installCloseModal}
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
              onClick={() => {
                this.props.handleAdspotInstalledStatus(this.props.id, true);
                this.installCloseModal();
              }}
            >
              Installed
            </button>
            <button
              type="button"
              className="btn btn-alt-warning"
              data-dismiss="modal"
              onClick={() => {
                this.props.handleAdspotInstalledStatus(this.props.id, false);
                this.installCloseModal();
              }}
            >
              Not-Installed
            </button>
          </div>
        </Modal>
        {/* INSTALL/NOT INSTALL MODAL END */}

        <Modal
          isOpen={this.state.ImagemodalIsOpen}
          onAfterOpen={this.ImageafterOpenModal}
          onRequestClose={this.ImagecloseModal}
          style={customStyles}
          contentLabel="Add Ad Spot Modal"
          ariaHideApp={false}
        >
          <div style={{ width: "50vw", height: "80vh", overflow: "hidden" }}>
            <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
              <Cropper
                ref={ref => {
                  this.cropper = ref;
                }}
                zoomOnWheel={false}
                crop={this._crop.bind(this)}
                src={this.state.img_path}
              />
            </div>
            <div style={{ position: "fixed", bottom: 0 }}>
              <button
                onClick={() => {
                  this.doneEdit();
                  this.ImagecloseModal();
                }}
              >
                {" "}
                Done
              </button>
            </div>
          </div>
        </Modal>
        <a
          className="block block-link-shadow block-rounded ribbon ribbon-bookmark ribbon-left ribbon-success text-center"
          href="#"
        >
          <div className="ribbon-box">
            {this.props.width} x {this.props.height}
          </div>
          <div className="row">
            <div style={{ minHeight: 57 }} className="col-md-6">
              <this.renderRecceUploadButton
                user={this.props.user}
                uploadFile={this.uploadFileRecce.bind(this)}
              />
              <Image src={this.props.image} />

              {/* <Image src={this.props.image} /> */}
              <span>Before</span>
            </div>
            <div style={{ minHeight: 57 }} className="col-md-6">
              <this.renderUploadButton
                user={this.props.user}
                uploadFile={this.uploadFile.bind(this)}
              />
              <Image src={this.props.installed} />
              {this.renderInstallImageRemoveButton(this.props.installed)}
              <span>After</span>
            </div>
          </div>
          <div className="block-content block-content-full block-content-sm bg-body-light">
            <div className="font-size-sm text-muted">
              {this.props.media.name} • {this.props.category.name} •{" "}
              {this.props.language.name} • {this.props.approved} •{" "}
              {this.props.isInstalled}
            </div>
          </div>
          <div className="block-content block-content-full">
            <div className="font-w600">{this.props.name}</div>
          </div>
        </a>
      </div>
    );
  }
}

const ADDINSTALLEDIMAGE = gql`
  mutation addInstalledImage($id: ID!, $imageId: ID!) {
    addInstalledImage(id: $id, imageId: $imageId) {
      id
    }
  }
`;

const REMOVEINSTALLEDIMAGE = gql`
  mutation removeInstalledImage($id: ID!) {
    removeInstalledImage(id: $id) {
      id
    }
  }
`;

const ADDRECCEIMAGE = gql`
  mutation addImage($id: ID!, $imageId: ID!) {
    addImage(id: $id, imageId: $imageId) {
      id
    }
  }
`;

const CATEGORY_LIST = gql`
  query {
    allCategories {
      id
      name
    }
  }
`;
const LANGUAGE_LIST = gql`
  query {
    allLanguages {
      id
      name
    }
  }
`;
const MEDIA_LIST = gql`
  query {
    allMedias {
      id
      name
    }
  }
`;
const EDIT_AD_SPOT = gql`
  mutation editAdSpot(
    $type: String
    $name: String!
    $height: Float!
    $width: Float!
    $remarks: String
    $categoryId: ID!
    $id: ID!
    $mediaId: ID!
    $languageId: ID!
  ) {
    editAdSpot(
      type: $type
      name: $name
      height: $height
      width: $width
      remarks: $remarks
      categoryId: $categoryId
      id: $id
      mediaId: $mediaId
      languageId: $languageId
    ) {
      id
    }
  }
`;

export default compose(
  graphql(ADDINSTALLEDIMAGE, { name: "addInstalledImage" }),
  graphql(REMOVEINSTALLEDIMAGE, { name: "removeInstalledImage" }),
  graphql(ADDRECCEIMAGE, { name: "addImage" }),
  graphql(EDIT_AD_SPOT, { name: "editAdSpot" }),
  graphql(CATEGORY_LIST, {
    props: ({ data }) => {
      if (!data.allCategories) {
        return { loading: data.loading };
      }
      const categories = data.allCategories.map(({ id, name }) => ({
        value: id,
        label: name
      }));

      return { loading: data.loading, categories };
    },
    options: {
      fetchPolicy: "cache-and-network"
    }
  }),
  graphql(MEDIA_LIST, {
    props: ({ data }) => {
      if (!data.allMedias) {
        return { loading: data.loading };
      }

      const medias = data.allMedias.map(({ id, name }) => ({
        value: id,
        label: name
      }));

      return { loading: data.loading, medias };
    },
    options: {
      fetchPolicy: "cache-and-network"
    }
  }),
  graphql(LANGUAGE_LIST, {
    props: ({ data }) => {
      if (!data.allLanguages) {
        return { loading: data.loading };
      }

      const languages = data.allLanguages.map(({ id, name }) => ({
        value: id,
        label: name
      }));

      return { loading: data.loading, languages };
    },
    options: {
      fetchPolicy: "cache-and-network"
    }
  })
)(AdSpotItem);
