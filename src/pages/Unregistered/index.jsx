import React, {Component} from 'react';
class Unregistered extends Component {
  
  render() {
    return (
      <div>
        <div className="content content-full bg-white">
          <div className="pt-50 pb-30 text-center">
            <h1 className="font-w300 mb-10">Thank you for registering.</h1>
            <h2 className="h4 text-muted font-w300 mb-0">Awaiting Approval.</h2>
            
              <a href="/login" class="btn btn-info btn-lg"  >
                <span class="glyphicon glyphicon-log-out"></span> Log out
              </a>
      
          </div>
        </div>
      </div>
    )
  }
}

export default Unregistered;
