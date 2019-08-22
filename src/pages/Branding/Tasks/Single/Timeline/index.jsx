import React, {Component} from 'react';
import moment from 'moment';

class TimelineItem extends Component {
  render() {
    return(
      <tr>
        <td style={{
          'width': 170
        }}>
          <strong>{moment(this.props.date).format('DD/MM/YYYY')}</strong>
        </td>
        <td>{this.props.message}
        </td>
      </tr>
    )
  }
}

class Timeline extends Component {
  renderTimeline = () => {
    let timelineArr = [];
    if(this.props.task.startDate) timelineArr.push({date: this.props.task.startDate, message: 'Task Created & Started.'})
    if(this.props.task.recceOnDate) timelineArr.push({date: this.props.task.recceOnDate, message: `Recce Started By ${this.props.task.recceUser ? this.props.task.recceUser.name : 'Admin'}.`})
    if(this.props.task.recceDoneDate) timelineArr.push({date: this.props.task.recceDoneDate, message: `Recce Done & Completed By ${this.props.task.recceUser ? this.props.task.recceUser.name : 'Admin'}.`})
    if(this.props.task.approvalSentDate) timelineArr.push({date: this.props.task.approvalSentDate, message: 'Task sent to Tata for approval.'})
    if(this.props.task.bajajReviewDate) timelineArr.push({date: this.props.task.bajajReviewDate, message: 'Task Approved by Tata.'})
    if(this.props.task.designDoneDate) timelineArr.push({date: this.props.task.designDoneDate, message: `Designing Done By ${this.props.task.designUser ? this.props.task.designUser.name : 'Admin'}.`})

    return timelineArr.map((timeline,key) => {
      return (<TimelineItem key={key} date={timeline.date} message={timeline.message} />)
    })
  }
  render() {
    return (
      <div className="col-md-6 col-xl-6">
        <h2 className="content-heading">
          <button type="button" className="btn btn-sm btn-secondary float-right">
            <i className="fa fa-refresh text-warning mr-5"></i>Refresh
          </button>
          Task Timeline
        </h2>
        <div className="block">
          <div className="block-content">
            <table className="table table-bordered table-vcenter">
              <tbody>
                {this.renderTimeline()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Timeline;
