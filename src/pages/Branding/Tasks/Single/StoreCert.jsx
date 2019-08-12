import React, {Component} from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import $ from 'jquery';
import Alert from 'react-s-alert';
import Image from '../../../../components/Image'
class StoreCert extends Component {
  state={
    imageId: '',
    imageUrl: this.props.certImage ? this.props.certImage.url : '',
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
				}
      };
      xhr.send(data);
    }
  }
  handleFormSubmit(){
    this
      .props
      .addTaskCert({
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
  renderCertImage = () => {
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


  render() {
    return (
      <div className="col-md-6 col-xl-6">
        <h2 className="content-heading">
          Completion Certificate
          {this.renderUploadButton()}
        </h2>
        <div className="block">
            {this.renderCertImage()}
        </div>
      </div>
    )
  }
}

const CERT_IMAGE_MUTATION=gql`
  mutation addTaskCert($taskId:ID!,$imageId:ID!) {
    addTaskCert(taskId:$taskId,imageId:$imageId) {
      id
    }
  }
`;

export default compose((graphql(CERT_IMAGE_MUTATION,{name:"addTaskCert"})))(StoreCert)
