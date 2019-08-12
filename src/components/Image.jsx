import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import Alert from 'react-s-alert';
import Modal from 'react-modal';

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.8)';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        minWidth: 500,
        padding: 0,
        border: 'none',
        borderRadius: 0,
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Image extends Component {
    state = {
        modalIsOpen: false,
        rotation: 0,
        zoom: 0.1
    }
    openModal = () => {

        this.setState({modalIsOpen: true});
    }
    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    zoomin(){
        if(this.state.zoom >= 1)
        {
            return;
        }

        this.setState({zoom: this.state.zoom+0.1})
        
    }

    zoomout(){

        this.setState({zoom: this.state.zoom-0.1})
        
    }

    rotate(){
        let newRotation = this.state.rotation + 90;
        if(newRotation >= 360){
          newRotation =- 360;
        }
        this.setState({
          rotation: newRotation,
        })
      }

      unrotate(){
        let newRotation = this.state.rotation - 90;
        if(newRotation >= 360){
          newRotation =- 360;
        }
        this.setState({
          rotation: newRotation,
        })
      }

    render()
    {
        const { rotation, zoom } =  this.state;
        if (this.props.src !== '') {
            return (
                <div>

                    <img style={{'width':'100%', 'height':'100%'}} src={this.props.src} onClick={()=>this.setState({modalIsOpen:true})}/>

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}>
                        <div style={{'width':'50vw', 'height':'80vh', overflow:'hidden'}}>
                        <div style={{'width':'100%', 'height':'100%', overflow:'auto'}}>
                            <img src={this.props.src} style={{transform: `rotate(${rotation}deg) scale(${zoom, zoom+1})`}}/>
                        </div>
                        <div style={{position: 'fixed', bottom: 0}}>
                        <button  onClick={this.zoomin.bind(this)} > Zoom In</button>
                        <button  onClick={this.zoomout.bind(this)} > Zoom Out</button>
                        <button onClick={this.unrotate.bind(this)} > Rotate CCW</button>
                        <button onClick={this.rotate.bind(this)} > Rotate CW</button>
                        </div>
                        </div>

                    </Modal>
                </div>
            )
        } else {
            return <p>img</p>
        }
    }
}

export default Image;