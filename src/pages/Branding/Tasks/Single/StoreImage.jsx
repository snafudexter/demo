import React, {Component} from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import $ from 'jquery';
import Alert from 'react-s-alert';
import Image from '../../../../components/Image'

class StoreImage extends Component {
  state={
    imageId: '',
    imageUrl: this.props.storeImage ? this.props.storeImage.url : '',
    imageLoading: false
  }
  uploadFile(event) {
    this.setState({
      imageLoading: true
    })
    let file = event.target.files[0];

    if (file) {
      let data = new FormData();
      data.append('data', file);
      // do a post request
			const xhr = new XMLHttpRequest();
			xhr.open(
				'POST',
				process.env.REACT_APP_SERVER_URI + '/upload',
				true
      );
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
			xhr.onreadystatechange = response => {
				// here you can obtain the new id of the uploaded file
				if (xhr.readyState === 4 && xhr.status === 200) {
          const obj = JSON.parse(response.target.responseText);
					this.setState({
						imageLoading: false,
						imageId: obj.id,
						imageUrl: obj.url
					},() => {
            this.handleFormSubmit();
          });
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
  handleFormSubmit(){
    this
      .props
      .addStoreImage({
        variables: {
          taskId: this.props.taskId,
          imageId: this.state.imageId
        }
      })
      .then(response => {
        Alert.success('Image Uploaded!', {
          position: 'top-right',
          effect: 'slide'
        });
      })
      .catch(e => {
        Alert.error('An Error Occured!', {
          position: 'top-right',
          effect: 'slide'
        });
      });
  }

  renderUploadButton()
  {
    if(this.props.user.role === 'ADMIN')
    {
      return (<label className="custom-file" style={{"float": "right", "width": 194, "fontSize": 13}}>
      <input onChange={this.uploadFile.bind(this)} type="file" name="myFile" className="custom-file-input" />
      <span className="custom-file-control"></span>
    </label>);
    }
    else
    {
      return null;
    }
  }
  
  renderStoreImage = () => {
    if (this.state.imageLoading) {
      return (
        <div className="block-content">
          <span>Image Loading...</span>
        </div>
      )
    }
    if (this.state.imageUrl != '') {
      return (
        <div className="block-content">
          <Image style={{"width":"100%"}} src={this.state.imageUrl} />
        </div>
      )
    }
  }
  render() {
    return (
      <div className="col-md-6 col-xl-6">
        <h2 className="content-heading">
          Store Image
          {this.renderUploadButton()}
        </h2>
        <div className="block">
            {this.renderStoreImage()}
        </div>
      </div>
    )
  }
}
const STORE_IMAGE_MUTATION=gql`
  mutation addStoreImage($taskId:ID!,$imageId:ID!) {
    addStoreImage(taskId:$taskId,imageId:$imageId) {
      id
    }
  }
`;
export default compose((
  graphql(STORE_IMAGE_MUTATION,{name:"addStoreImage"}))
)(StoreImage)
