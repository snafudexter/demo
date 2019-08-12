import React, {Component} from 'react';
import classNames from 'classnames';

class TaskStatusFormatter extends Component {
  render() {
    const status = this.props.value;
    const statusClasses = classNames({
      'badge-new': status === 'NEW'
    }, {
      'badge-approval': status === 'APPROVAL'
    }, {
      'badge-approved': status === 'APPROVED'
    }, {
      'badge-recce': status === 'RECCE ON'
    }, {
      'badge-reccedone': status === 'RECCE DONE'
    }, {
      'badge-rejected': status === 'REJECTED'
    }, {
      'badge-printing': status === 'PRINTING'
    }, {
      'badge-danger': status === 'REJECTED'
    }, {
      'badge-designing': status === 'DESIGNING'
    }, {
      'badge-designingdone': status === 'DESIGNINGDONE'
    }, {
      'badge-installed': status === 'INSTALLED'
    }, 'badge',);
    if (status === 'RECCEDONE') {
      return <span className={statusClasses}>RECCE DONE</span>;
    }
    if (status === 'DESIGNINGDONE') {
      return <span className={statusClasses}>DESIGNING DONE</span>;
    }
    if (status === 'RECCE') {
      return <span className={statusClasses}>RECCE ON</span>;
    }
    return <span className={statusClasses}>{status}</span>;
  }
}
export default TaskStatusFormatter;