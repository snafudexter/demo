import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';
import Alert from 'react-s-alert';

class TypeList extends Component {
  state = {
    showForm: false
  }
  renderTypes = () => {
    return this
      .props
      .types
      .map((type, index) => {
        return (<TypeItem
          updateType={this.props.updateType}
          types={this.props.types}
          typesRefetch={this.props.typesRefetch}
          key={index}
          index={index + 1}
          type={type}/>)
      })
  }
  renderAddTypeForm = () => {
    if (this.state.showForm) {
      return (<AddTypeForm
        addType={this.props.addType}
        types={this.props.types}
        typesRefetch={this.props.typesRefetch}/>)
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
              Types
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
                {this.renderTypes()}
                {this.renderAddTypeForm()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

class TypeItem extends Component {
  state = {
    name: this.props.type.name,
    edit: false
  }
  handleSubmit = () => {
    this
      .props
      .updateType({
        variables: {
          id: this.props.type.id,
          name: this.state.name
        }
      })
      .then(response => {
        Alert.success(`Type Updated!`, {
          position: 'top-right',
          effect: 'slide'
        });
        this
          .props
          .typesRefetch();
        this.setState({edit: false});
      })
      .catch(error => {
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
                  className={this.state.loading ? "btn btn-sm btn-success disabled" : "btn btn-sm btn-success"}
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

class AddTypeForm extends Component {
  state = {
    name: ""
  }
  handleSubmit = () => {
    if (this.state.name !== "") {
      this
        .props
        .addType({
          variables: {
            name: this.state.name
          }
        })
        .then(response => {
          Alert.success(`Type Added!`, {
            position: 'top-right',
            effect: 'slide'
          });
          this
            .props
            .typesRefetch();
        })
        .catch(error => {
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
            placeholder="Type Name"
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
            Submit
          </button>
        </td>
      </tr>
    )
  }
}

const ALL_TYPES = gql `
  query allTypes {
    allTypes {
      id
      name
    }
  }
`;

const UPDATE_TYPE = gql `
  mutation updateType($id: ID!, $name: String!) {
    updateType(id: $id, name: $name) {
      id
    }
  }
`;

const ADD_TYPE = gql `
  mutation addType($name: String!) {
    addType(name: $name) {
      id
    }
  }
`;

export default compose(graphql(UPDATE_TYPE, {name: 'updateType'}), graphql(ADD_TYPE, {name: 'addType'}), graphql(ALL_TYPES, {
  props: ({data}) => {
    if (!data.allTypes) 
      return {loading: data.loading};
    
    // const types = data.allTypes.map(({ id, name }) => ({ value: id, label:
    // name }));

    return {types: data.allTypes, typesRefetch: data.refetch};
  },
  options: {
    fetchPolicy: 'cache-and-network'
  }
}),)(TypeList);

TypeList.propTypes = {};
