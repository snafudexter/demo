import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import Alert from 'react-s-alert';

class RemarkList extends Component {
  state = {
    showForm: false
  }
  renderRemarks = () => {
    return this
      .props
      .remarks
      .map((remark, index) => {
        return (<RemarkItem
          updateRemark={this.props.updateRemark}
          remarks={this.props.remarks}
          remarksRefetch={this.props.remarksRefetch}
          key={index}
          index={index + 1}
          remark={remark}/>)
      })
  }
  renderAddRemarkForm = () => {
    if (this.state.showForm) {
      return (<AddRemarkForm
        addRemark={this.props.addRemark}
        remarks={this.props.remarks}
        remarksRefetch={this.props.remarksRefetch}/>)
    }
  }
  render() {
    if (this.props.loading) {
      return (
        <div className="loader">
          <div></div>
        </div>
      );
    }
    return (
      <div className="col-md-12">
        <div className="block block-bordered">
          <div className="block-header block-header-default">
            <h3 className="block-title">
              Remarks
              <button
                className="btn btn-sm btn-rounded btn-success upload-action-btn pull-right"
                onClick={() => {
                this.setState({
                  showForm: !this.state.showForm
                })
              }}>
                <i className="fa fa-plus"></i>
                Add New
              </button>
            </h3>
          </div>
          <div className="block-content">
            <table className="table table-vcenter">
              <thead>
                <tr>
                  <th
                    className="text-center"
                    style={{
                    width: 50
                  }}>#</th>
                  <th
                    className="d-none d-sm-table-cell"
                    style={{
                    width: "70%"
                  }}>Name</th>
                  <th
                    className="text-center"
                    style={{
                    width: 50
                  }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.renderRemarks()}
                {this.renderAddRemarkForm()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

class RemarkItem extends Component {
  state = {
    name: this.props.remark.name,
    edit: false,
    loading: false
  }
  handleSubmit = () => {
    this.setState({loading:true});
    this
      .props
      .updateRemark({
        variables: {
          id: this.props.remark.id,
          name: this.state.name
        }
      })
      .then(response => {
        Alert.success(`Remark Updated!`, {
          position: 'top-right',
          effect: 'slide'
        });
        this
          .props
          .remarksRefetch();
        this.setState({edit: false});
        this.setState({loading:false});
      })
      .catch(error => {
        debugger;
        this.setState({loading:false});
        Alert.error('An error occured please try again later!', {
          position: 'top-right',
          effect: 'slide'
        });
      })
  }
  render() {
    return (
      <tr>
        <th className="text-center" scope="row">{this.props.index}</th>
        <td>
          {this.state.edit
            ? (<input
              onChange={e => {
              this.setState({name: e.target.value});
            }}
              className="form-control"
              value={this.state.name}/>)
            : this.state.name}
        </td>
        <td className="text-center">
          <div className="btn-group">
            {this.state.edit
              ? (
                <button
                  type="button"
                  className="btn btn-sm btn-success"
                  onClick={this.handleSubmit}>
                  Submit
                </button>
              )
              : <button
                type="button"
                className="btn btn-sm btn-warning"
                onClick={() => {
                this.setState({edit: true})
              }}>
                Edit
              </button>}
          </div>
        </td>
      </tr>
    )
  }
}

class AddRemarkForm extends Component {
  state = {
    name: "",
    loading: false
  }
  handleSubmit = () => {
    if (this.state.name !== "") {
      this.setState({loading:true});
      this
        .props
        .addRemark({
          variables: {
            name: this.state.name
          }
        })
        .then(response => {
          this.setState({loading:false});
          Alert.success(`Remark Added!`, {
            position: 'top-right',
            effect: 'slide'
          });
          this
            .props
            .remarksRefetch();
        })
        .catch(error => {
          this.setState({loading:false});
          Alert.error('An error occured please try again later!', {
            position: 'top-right',
            effect: 'slide'
          });
        })
    }
  }
  render() {
    return (
      <tr className="mb-4">
        <td>#</td>
        <td>
          <input
            className="form-control"
            placeholder="Remark Name"
            onChange={e => {
            this.setState({name: e.target.value});
          }}
            value={this.state.name}/>
        </td>
        <td>
          <button
            type="button"
            className={this.state.loading ? "btn btn-sm btn-success disabled" : "btn btn-sm btn-success"}
            onClick={this.handleSubmit}>
            {this.state.loading ? "Loading..." : "Submit"}
          </button>
        </td>
      </tr>
    )
  }
}

const ALL_REMARKS = gql `
  query allRemarks {
    allRemarks {
      id
      name
    }
  }
`;

const UPDATE_REMARK = gql `
  mutation updateRemark($id: ID!, $name: String!) {
    updateRemark(id: $id, name: $name) {
      id
    }
  }
`;

const ADD_REMARK = gql `
  mutation addRemark($name: String!) {
    addRemark(name: $name) {
      id
    }
  }
`;

export default compose(graphql(UPDATE_REMARK, {name: 'updateRemark'}), graphql(ADD_REMARK, {name: 'addRemark'}), graphql(ALL_REMARKS, {
  props: ({data}) => {
    if (!data.allRemarks) 
      return {loading: data.loading};
    
    // const clusters = data.allZones.map(({ id, name }) => ({ value: id, label:
    // name }));

    return {remarks: data.allRemarks, remarksRefetch: data.refetch};
  },
  options: {
    fetchPolicy: 'cache-and-network'
  }
}),)(RemarkList);

RemarkList.propTypes = {};
