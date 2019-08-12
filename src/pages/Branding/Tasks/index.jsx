import React, { Component } from 'react';

import TasksTableWrapper from './TasksTableWrapper';
import TaskStatusCountWidget from './TaskStatusCountWidget';

class Tasks extends Component {
	render() {
	  return (
      <div>
      {/*
        <div className="row gutters-tiny">
          <div className="col-md-4">
            <div className="block">
              <div className="block-content block-content-full">
                <div className="row py-20">
                  <div className="col-6 text-right border-r">
                    <TaskStatusCountWidget sqfeet="21" label="Recce On" statusArr={['RECCE']} labelClass="warning" />
                  </div>
                  <div className="col-6">
                  <TaskStatusCountWidget sqfeet="819" label="Recce Done" statusArr={['RECCEDONE']} labelClass="reccedone" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="block">
              <div className="block-content block-content-full">
                <div className="row py-20">
                  <div className="col-6 text-right border-r">
                    <TaskStatusCountWidget sqfeet="21" label="Approval" statusArr={['APPROVAL']} labelClass="approval" />
                  </div>
                  <div className="col-6">
                  <TaskStatusCountWidget sqfeet="189" label="Approved" statusArr={['APPROVED','REJECTED']} labelClass="approved" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="block">
              <div className="block-content block-content-full">
                <div className="row py-20">
                  <div className="col-6 text-right border-r">
                  <TaskStatusCountWidget sqfeet="525" label="Designing" statusArr={['DESIGNING']} labelClass="designing" />
                  </div>
                  <div className="col-6">
                  <TaskStatusCountWidget sqfeet="147" label="Designed" statusArr={['DESIGNINGDONE']} labelClass="designed" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row gutters-tiny">
        <div className="col-md-4">
            <div className="block">
              <div className="block-content block-content-full">
                <div className="row py-20">
                  <div className="col-6 text-right border-r">
                  <TaskStatusCountWidget sqfeet="525" label="Printing" statusArr={['PRINTING']} labelClass="designing" />
                  </div>
                  <div className="col-6">
                  <TaskStatusCountWidget sqfeet="147" label="Printing Done" statusArr={['PRINTINGDONE']} labelClass="designed" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="block">
              <div className="block-content block-content-full">
                <div className="row py-20">
                  <div className="col-6 text-right border-r">
                  <TaskStatusCountWidget sqfeet="525" label="Installed" statusArr={['INSTALLED']} labelClass="designing" />
                  </div>
                  <div className="col-6">
                  <TaskStatusCountWidget sqfeet="147" label="Completed" statusArr={['COMPLETED']} labelClass="designed" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}
        <h2 className="content-heading">
					Tasks
					<small> List of all tasks</small>
        </h2>
        <div className="animated fadeIn">
          <TasksTableWrapper />
        </div>
      </div>
	  );
	}
}

export default Tasks;
