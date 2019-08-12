import React, {Component} from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import Alert from 'react-s-alert';
import $ from 'jquery';
import Cropper from 'react-cropper';
import 'react-image-crop/dist/ReactCrop.css';
import 'react-image-crop/lib/ReactCrop.scss';
import 'cropperjs/dist/cropper.css';
Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.8)';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    minWidth: 400,
    padding: 0,
    border: 'none',
    borderRadius: 0,
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class AddAdSpot extends Component {
  state = {
    ImagemodalIsOpen: false,
    modalIsOpen: false,
    media: null,
    language: null,
    category: null,
    name: '',
    width: '',
    height: '',
    remarks: '',
    imageId: '',
    imageLoading: false,
    imageUploaded: false,
    loading: false,
    img_path: '',
    type: {label: "NEW", value: "NEW"}
  };
  componentDidMount() {
    const self = this;
    $(document).on('change', `#ad-image${self.props.task.id}`, function () {

      var file = $(this)[0]; // note the [0] to return the DOMElement from the jQuery object
     
      var files = file.files;
      
      if(FileReader && files && files.length)
      {
        var fr = new FileReader();
        fr.onload = () => {
          self.setState({img_path:fr.result, ImagemodalIsOpen: true, original:fr.result})
        }
        fr.readAsDataURL(files[0])
      }
      // const data = new FormData();
      // self.setState({imageLoading: true});
      // data.append('data', file.files[0]);

      // // do a post request
      // const xhr = new XMLHttpRequest();
      // xhr.open('POST', process.env.REACT_APP_SERVER_URI + '/upload', true);
      // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      // xhr.onreadystatechange = response => {

      //   // here you can obtain the new id of the uploaded file
      //   if (xhr.readyState === 4 && xhr.status === 200) {
      //     const obj = JSON.parse(response.target.responseText);

      //     self.setState({imageLoading: false, imageUploaded: true, imageId: obj.id, imageUrl: obj.url});
      //   }
      // };
      // xhr.send(data);

    });
  }

  doneEdit = async () => {
    
    var croppedImg = this.state.croped;

      const data = new FormData();
      this.setState({imageLoading: true});
      data.append('data', croppedImg);

      // do a post request
      const xhr = new XMLHttpRequest();
      xhr.open('POST', process.env.REACT_APP_SERVER_URI + '/upload', true);
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr.onreadystatechange = response => {
        
        // here you can obtain the new id of the uploaded file
        if (xhr.readyState === 4 && xhr.status === 200) {
          const obj = JSON.parse(response.target.responseText);

          this.setState({imageLoading: false, imageUploaded: true, imageId: obj.id, imageUrl: obj.url});
        }
      };
      xhr.send(data);
  }

  openModal = () => {

    this.setState({modalIsOpen: true});
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed. this.subtitle.style.color =
    // '#f00';
  }

  handleFormSubmit = () => {
    let error = false;
    if (this.state.imageId === '') {
      Alert.error('Upload Image!', {
        position: 'top-right',
        effect: 'slide'
      });
      error = true;
    }

    if (this.state.name === '') {
      Alert.error('Name is required', {
        position: 'top-right',
        effect: 'slide'
      });
      error = true;
    }
    if (this.state.height === '') {
      Alert.error('Height is required.', {
        position: 'top-right',
        effect: 'slide'
      });
      error = true;
    }
    if (this.state.width === '') {
      Alert.error('Width is requred.', {
        position: 'top-right',
        effect: 'slide'
      });
      error = true;
    }
    if (!this.state.category) {
      Alert.error('Category is required.', {
        position: 'top-right',
        effect: 'slide'
      });
      error = true;
    }
    if (!this.state.media) {
      Alert.error('Media is required.', {
        position: 'top-right',
        effect: 'slide'
      });
      error = true;
    }
    if (!this.state.language) {
      Alert.error('Language is required.', {
        position: 'top-right',
        effect: 'slide'
      });
      error = true;
    }


    if (!error) {

      this.setState({loading: true});

      let d = {
        type: this.state.type.value,
        name: this.state.name,
        width: this.state.width.toString(),
        height: this.state.height.toString(),
        taskId: this.props.task.id,
        remarks: this.state.remarks,
        categoryId: this.state.category.value,
        mediaId: this.state.media.value,
        languageId: this.state.language.value,
        imageId: this.state.imageId
      }


      this
        .props
        .addAdSpot({variables: d})
        .then(response => {
          console.log('success')
          console.log(response)
          Alert.success('Ad Spot Added!', {
            position: 'top-right',
            effect: 'slide'
          });
          this.setState({data: response.data});
          this.closeModal();
          this
            .props
            .refetch();
          document
            .getElementById('addAdSpotForm')
            .reset();
          this.setState({
            media: null,
            language: null,
            category: null,
            name: '',
            width: '',
            height: '',
            remarks: '',
            imageId: '',
            imageLoading: false,
            imageUploaded: false,
            loading: false
          });
        })
        .catch(e => {
          console.log('error')
          console.log(e)
        });
    }
  };

  onImageLoaded = (image) => {

    this.setState({for_upload: image, w: image.width, h: image.height})
  }

  renderImageUpload = () => {
    if (this.state.imageLoading) {
      return (
        <div>
          <div
            style={{
            width: '20px',
            height: '20px',
            display: 'inline-block',
            margin: '0',
            marginRight: '10px',
            position: 'static'
          }}
            className="load-spinner"/>
          <strong>Uploading Image...</strong>
        </div>
      );
    }
    if (this.state.imageUploaded) {
      return (
        <div>
          <label
            style={{
            width: '100%'
          }}
            className="custom-file ad-spot-image">
            <input
              onChange={e => {
                
                var tgt = e.target || window.event.srcElement,
                files = tgt.files;
                
                if(FileReader && files && files.length)
                {
                  var fr = new FileReader();
                  fr.onload = () => {
                    this.setState({img_path:fr.result, ImagemodalIsOpen: true})
                  }
                  fr.readAsDataURL(files[0])
                }
              }}
              type="file"
              id={`ad-image${this.props.task.id}`}
              className="custom-file-input"/>
            <span className="custom-file-control"/>
          </label>
          <button type="button" className="btn btn-sm btn-alt-success">
            Ad Spot Image Uploaded!
          </button>
        </div>
      );
    }
    return (
      <div>
        <label
          style={{
          width: '100%'
        }}
          className="custom-file ad-spot-image">
          <input
            type="file"
            id={`ad-image${this.props.task.id}`}
            className="custom-file-input"/>
          <span className="custom-file-control"/>
        </label>
      </div>
    );
  };

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  ImagecloseModal = () => {
    this.setState({ImagemodalIsOpen: false})
  }

  percentToNumber = (n, p) => {
    var d = parseFloat(p)/ 100.0;
    return n*d;
  }

  async _crop(){
    // image in dataUrl
   await this.setState({croped: await this.getCroppedImg(this.cropper.getCroppedCanvas(), 'img.jpg')})
  }

  getCroppedImg = (canvas,  fileName) => {

    return new Promise((resolve, reject) => {
      canvas.toBlob(file => {
        if(file)
        file.name = fileName;
        var fil = new File([file], fileName, {type: 'image/jpeg', lastModified: Date.now()});
        resolve(fil);
      }, 'image/jpeg');
    });
  }


  render() {
    //console.log('props on adspot') console.log(this.props);
    return (
      <div  >
        <button
          onClick={this.openModal}
          type="button"
          className="btn btn-sm btn-secondary float-right">
          <i className="fa fa-plus text-success mr-5"></i>Add Ad Spot
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add Ad Spot Modal">
          <div className="block mb-0">
            <div className="block-header block-header-default">
              <h3 className="block-title">Add Ad Spot</h3>
              <div className="block-options">
                <button
                  onClick={this.closeModal}
                  type="button"
                  className="btn-block-option"
                  data-dismiss="modal"
                  aria-label="Close">
                  <i className="si si-close"></i>
                </button>
              </div>
            </div>
            <div className="block-content">
              <form>
              <div className="form-group row">
                  <label className="col-lg-3 col-form-label" htmlFor="width">Type</label>
                  <div className="col-lg-9">
                    <Select
                      name="name"
                      placeholder="Type"
                      value={this.state.type}
                      options={[
                      {
                        value: 'NEW',
                        label: 'NEW'
                      }, 
                      {
                        value: 'OLD',
                        label: 'OLD'
                      },
                      {
                        value: 'COMPETITION',
                        label: 'COMPETITION'
                      },
                    ]}
                      onChange={val => {
                      this.setState({type: val})
                    }}/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label" htmlFor="name">Name</label>
                  <div className="col-lg-9">
                    <input
                      type="text"
                      onChange={e => {
                      this.setState({name: e.target.value});
                    }}
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter Name.."/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label" htmlFor="width">Width</label>
                  <div className="col-lg-9">
                    <input
                      type="number"
                      onChange={e => {
                      this.setState({width: e.target.value});
                    }}
                      className="form-control"
                      id="width"
                      name="width"
                      placeholder="Enter Width (inches).."/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label" htmlFor="width">Height</label>
                  <div className="col-lg-9">
                    <input
                      type="number"
                      onChange={e => {
                      this.setState({height: e.target.value});
                    }}
                      className="form-control"
                      id="height"
                      name="height"
                      placeholder="Enter Height (inches).."/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label" htmlFor="width">Media</label>
                  <div className="col-lg-9">
                    <Select
                      name="name"
                      placeholder="Media"
                      value={this.state.media}
                      options={this.props.medias}
                      onChange={val => {
                      this.setState({media: val})
                    }}/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label" htmlFor="width">Category</label>
                  <div className="col-lg-9">
                    <Select
                      name="name"
                      placeholder="Category"
                      value={this.state.category}
                      options={this.props.categories}
                      onChange={val => {
                      this.setState({category: val})
                    }}/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label" htmlFor="width">Language</label>
                  <div className="col-lg-9">
                    <Select
                      name="name"
                      placeholder="Language"
                      value={this.state.language}
                      options={this.props.languages}
                      onChange={val => {
                      this.setState({language: val})
                    }}/>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label" htmlFor="remarks">Remarks</label>
                  <div className="col-lg-9">
                    <input
                      onChange={e => {
                      this.setState({remarks: e.target.value});
                    }}
                      type="text"
                      className="form-control"
                      id="remarks"
                      name="remarks"
                      placeholder="Enter Remarks.."/>
                  </div>
                </div>
              </form>
              {this.renderImageUpload()}
            </div>
          </div>
          <div className="modal-footer mt-3">
            <button
              onClick={this.closeModal}
              type="button"
              className="btn btn-alt-secondary"
              data-dismiss="modal">Close</button>
            <button
              type="button"
              className="btn btn-alt-success"
              data-dismiss="modal"
              onClick={this
              .handleFormSubmit
              .bind(this)}>
              <i className="fa fa-plus mr-2"></i>
              Add Ad Spot
            </button>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.ImagemodalIsOpen}
          onAfterOpen={this.ImageafterOpenModal}
          onRequestClose={this.ImagecloseModal}
          style={customStyles}
          contentLabel="Add Ad Spot Modal">
          <div style={{ width:'50vw', height:'80vh', overflow:'hidden'}}>
                        <div style={{'width':'100%', 'height':'100%', overflow:'auto'}}>
                        <Cropper
                        ref={ ref => { this.cropper = ref }}
                          zoomOnWheel={false}
                          crop={this._crop.bind(this)}
                          src={this.state.img_path}/>
                
                        </div>
                        <div style={{position: 'fixed', bottom: 0}}>
                        <button onClick={() => {
                            this.doneEdit();
                            this.ImagecloseModal();
                        }}> Done</button>
                        </div>
                        </div>
          </Modal>
      </div>
    )
  }
}

const CATEGORY_LIST = gql `
  query {
    allCategories {
      id
      name
    }
  }
`;
const LANGUAGE_LIST = gql `
  query {
    allLanguages {
      id
      name
    }
  }
`;
const MEDIA_LIST = gql `
  query {
    allMedias {
      id
      name
    }
  }
`;
const ADD_AD_SPOT = gql `
  mutation addAdSpot($type: String, $name:String!,$height:String!,$width:String!,$remarks:String,$imageId:ID!,$categoryId:ID!,$taskId:ID!,$mediaId:ID!,$languageId:ID!) {
    addAdSpot(type: $type, name:$name,height:$height,width:$width,remarks:$remarks,imageId:$imageId,categoryId:$categoryId,taskId:$taskId,mediaId:$mediaId,languageId:$languageId) {   
      id
    }
  }
`;
export default compose(graphql(ADD_AD_SPOT, {name: 'addAdSpot'}), graphql(CATEGORY_LIST, {
  props: ({data}) => {
    if (!data.allCategories) {
      return {loading: data.loading};
    }
    const categories = data
      .allCategories
      .map(({id, name}) => ({value: id, label: name}));

    return {loading: data.loading, categories};
  },
  options: {
    fetchPolicy: 'cache-and-network'
  }
}), graphql(MEDIA_LIST, {
  props: ({data}) => {
    if (!data.allMedias) {
      return {loading: data.loading};
    }

    const medias = data
      .allMedias
      .map(({id, name}) => ({value: id, label: name}));

    return {loading: data.loading, medias};
  },
  options: {
    fetchPolicy: 'cache-and-network'
  }
}), graphql(LANGUAGE_LIST, {
  props: ({data}) => {
    if (!data.allLanguages) {
      return {loading: data.loading};
    }

    const languages = data
      .allLanguages
      .map(({id, name}) => ({value: id, label: name}));

    return {loading: data.loading, languages};
  },
  options: {
    fetchPolicy: 'cache-and-network'
  }
}))(AddAdSpot);

AddAdSpot.propTypes = {};
