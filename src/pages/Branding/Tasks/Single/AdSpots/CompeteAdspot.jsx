// 
import React, {Component} from 'react';

class AdSpotItem extends Component {
  render() {
    return (
      <div className="col-md-6 col-xl-3">
          <a
            className="block block-link-shadow block-rounded ribbon ribbon-bookmark ribbon-left ribbon-success text-center"
            href="#">
            <div className="ribbon-box">{this.props.width} x {this.props.height}</div>
            <div style={{"minHeight":57}} className="block-content p-0 block-content-full">
            <img src={this.props.image} style={{'width':'100%'}} />
            </div>
            <div
              className="block-content block-content-full block-content-sm bg-body-light">
              <div className="font-size-sm text-muted">{this.props.media} • {this.props.category} • {this.props.language}</div>
            </div>
            <div className="block-content block-content-full">
              <div className="font-w600">{this.props.name}</div>
            </div>
          </a>
        </div>
    )
  }
}

class CompeteAdSpots extends Component {
  renderAdSpots = () => {
    if (true) {
     if (this.props.task.adSpots) {
       return this.props.task.adSpots.filter(opt => opt.type=="COMPETITION").map((adSpot,key) => {
        return (
          <AdSpotItem user={this.props.user} id={this.props.task.adSpots[key].id} key={key} imgId={adSpot.image?adSpot.image.id:''} image={adSpot.image ? adSpot.image.url : ''} name={adSpot.name} height={adSpot.height} width={adSpot.width} language={adSpot.language?adSpot.language.name:''} media={adSpot.media?adSpot.media.name:''} category={adSpot.category?adSpot.category.name:''}/>
          )
       })
    }
  }
  }
  render() {
    return (
      // <div className="row items-push">
      <div className="row">
        {this.renderAdSpots()}

      </div>
    )
  }
}


export default CompeteAdSpots;
