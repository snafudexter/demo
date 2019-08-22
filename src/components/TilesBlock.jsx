import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class TilesBlock extends Component{
 render(){
     return(
        <div className="row gutters-tiny justify-content-center" style={{ "paddingBottom" : 20,width:"100%"}}>
        <div className="col-6 col-md-4 col-xl-2">
          <Link to="/dashboard" className="block text-center"
          style={{"backgroundColor":"#eee"}} >
            <div className="block-content">
              <p className="mt-5">
                <i className="si si-home fa-4x text-corporate" />
              </p>
              <p className="font-w600">Dashboard</p>
            </div>
          </Link>
        </div>
        <div className="col-6 col-md-4 col-xl-2">
          <Link to="/campaigns" className="block text-center"
          style={{"backgroundColor":"#eee"}} >
            <div className="block-content">
              <p className="mt-5">
                <i className="si si-picture fa-4x" />
              </p>
              <p className="font-w600">View Campaigns</p>
            </div>
          </Link>
        </div>
        <div className="col-6 col-md-4 col-xl-2">
          <Link to="/addcampaign" className="block text-center"
          style={{"backgroundColor":"#eee"}} >
            <div className="block-content">
              <p className="mt-5">
                <i className="si si-cloud-upload fa-4x text-flat" />
              </p>
              <p className="font-w600">Create Campaign</p>
            </div>
          </Link>
        </div>
        <div className="col-6 col-md-4 col-xl-2">
          <Link to="#" className="block text-center"
          style={{"backgroundColor":"#eee"}} >
            <div className="block-content">
              <p className="mt-5">
                <i className="si si-graph fa-4x text-danger" />
              </p>
              <p className="font-w600">Reports</p>
            </div>
          </Link>
        </div>
        <div className="col-6 col-md-4 col-xl-2">
          <Link to="/approvals" className="block text-center"
          style={{"backgroundColor":"#eee"}} >
            <div className="block-content">
              <p className="mt-5">
                <i className="si si-check fa-4x text-corporate" />
              </p>
              <p className="font-w600">Approvals</p>
            </div>
          </Link>
        </div>
        {/* <div className="col-6 col-md-4 col-xl-2">
          <Link to="/invoicing" className="block text-center"
          style={{"backgroundColor":"#eee"}} >
            <div className="block-content">
              <p className="mt-5">
                <i className="si si-credit-card fa-4x text-success" />
              </p>
              <p className="font-w600">Invoicing</p>
            </div>
          </Link>
        </div> */}
      </div>
     )
 }
}
export default TilesBlock
