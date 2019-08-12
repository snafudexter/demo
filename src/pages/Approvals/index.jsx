import React, {Component} from 'react';
import ApprovalSentTasksTableWrapper from './ApprovalSentTasksTableWrapper';

class Approvals extends Component {
  render() {
    return (
      <div>
        <div id="page-container" className="main-content-boxed">
          <div id="main-container">
						<div className="content">
							<ApprovalSentTasksTableWrapper />
						</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Approvals;
