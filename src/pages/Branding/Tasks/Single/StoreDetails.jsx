import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class StoreDetails extends Component {
  render() {
    return (
      <div className="col-md-6 col-xl-6">
        <h2 className="content-heading">
          {/*<Link to={`/branding/store/${this.props.store.id}`} className="btn btn-sm btn-secondary float-right">
            View Store
    </Link>*/}
          Store Details
        </h2>
        <div className="block">
          <div className="block-content">
            <table className="table table-bordered table-vcenter">
              <tbody>
                <tr>
                  <td>
                    <strong>Dealer Code</strong>
                  </td>
                  <td>{this.props.store.dealerCode}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Name</strong>
                  </td>
                  <td>{this.props.store.dealerName}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Freshness</strong>
                  </td>
                  <td>
                    <span className="badge badge-primary">
                      <span>Fresh</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Type</strong>
                  </td>
                  <td>{this.props.store.category.type.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Category</strong>
                  </td>
                  <td>{this.props.store.category.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Address</strong>
                  </td>
                  <td>{this.props.store.dealerAddress}</td>
                </tr>
                <tr>
                  <td>
                    <strong>ASM</strong>
                  </td>
                  <td>{this.props.store.asmName + " " + this.props.store.asmNo}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Zone</strong>
                  </td>
                  <td>{this.props.store.city.state.zone.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Cluster</strong>
                  </td>
                  <td>{this.props.store.city.cluster.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>State</strong>
                  </td>
                  <td>{this.props.store.city.state.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>City</strong>
                  </td>
                  <td>{this.props.store.city.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Task Remark</strong>
                  </td>
                  <td>{this.props.remark?this.props.remark.name:''}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default StoreDetails;
