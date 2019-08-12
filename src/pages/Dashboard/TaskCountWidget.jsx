import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';

class TaskCountWidget extends Component {
  render() {
    return (
      <div className="" style={{"width":"12.5%"}} onClick={() =>{
        this.props.widgetClicked(this.props.filter)
      }}>
        <div className="block block-link-pop widget-hover text-center">
          <div style={{"paddingLeft":"0","paddingRight":"0"}} className="block-content bg-body-light">
            <p className={`font-w600 capitalize text-${this.props.label}`}>
            {this.props.labelText ? this.props.labelText : this.props.label}
            </p>
          </div>
          <div className={`block-content badge-${this.props.label}`}>
            <p className="font-size-h1">
              <strong>
                <span style={{"display":"block"}}>{this.props.taskCount ? this.props.taskCount : "0"} </span>
                <span style={{"fontSize":15,"display":"block"}}>
                  {this.props.type ? this.props.type : "Stores"}
                </span>
                <hr />
                <span style={{"fontSize": 19}}>{this.props.sqfeet?Math.round(this.props.sqfeet):"0"} </span>
                <span style={{"fontSize":15}}>
                 Sq.Ft
                </span>
              </strong>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default TaskCountWidget;
