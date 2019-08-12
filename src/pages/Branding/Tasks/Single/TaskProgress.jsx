import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import _ from 'underscore';

class TaskProgress extends Component {
  checkForStatus = (doneStatuses) => {
    if (_.contains(doneStatuses), this.props.status) 
      return true;
    return false
  }
  renderProgressItem = (label, doneStatuses, activeStatuses) => {

    let status = {}
    let done = {
      textClasses: "font-size-sm font-w600 text-uppercase text-success",
      iconClasses: "fa fa-check fa-3x text-success"
    }
    let inProgress = {
      textClasses: "font-size-sm font-w600 text-uppercase text-warning",
      iconClasses: "fa fa-spinner fa-3x fa-spin text-warning"
    }
    let notDone = {
      textClasses: "font-size-sm font-w600 text-uppercase text-muted",
      iconClasses: "fa fa-times fa-3x text-muted"
    }

    if (!_.contains(doneStatuses, this.props.status)) {
      status = done;
    } else {
      status = notDone;
    }
    if (_.contains(activeStatuses, this.props.status)) {
      status = inProgress;
    }

    return (
      <div className="col-md-6 col-xl-3">
        <div className="block block-rounded">
          <div className="block-content block-content-full">
            <div className="py-20 text-center">
              <div className="mb-20">
                <i className={status.iconClasses}></i>
              </div>
              <div className={status.textClasses}>{label}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="row gutters-tiny">
        {this.renderProgressItem("1. Recce", ["NEW"], ["RECCE", "RECCEDONE"])}
        {this.renderProgressItem("2. Approval", ["NEW","RECCE","RECCEDONE"], ["APPROVAL"])}
        {this.renderProgressItem("3. Designing", ["NEW","RECCE","RECCEDONE","APPROVAL", "APPROVED", "REJECTED"], ["DESIGNING","DESIGNINGDONE"])}
        {this.renderProgressItem("4. Installed", ["NEW","RECCE","RECCEDONE","APPROVAL", "APPROVED", "REJECTED","DESIGNING","DESIGNINGDONE"], ["PRINTING","PRINTINGDONE","INSTALLED"])}
      </div>
    )
  }
}

export default TaskProgress;
