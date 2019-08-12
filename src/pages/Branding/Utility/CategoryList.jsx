import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';
import Alert from 'react-s-alert';

class CategoryList extends Component {
  state = {
    showForm: false
  }
  renderCategories = () => {
    return this
      .props
      .categories
      .map((category, index) => {
        return (<CategoryItem
          updateCategory={this.props.updateCategory}
          types={this.props.types}
          categoriesRefetch={this.props.categoriesRefetch}
          key={index}
          index={index + 1}
          category={category}/>)
      })
  }
  renderAddCategoryForm = () => {
    if (this.state.showForm) {
      return (
        <AddCategoryForm
          addCategory={this.props.addCategory}
          types={this.props.types}
          categoriesRefetch={this.props.categoriesRefetch}
        />
      )
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
              categories
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
                    width: "25%"
                  }}>Name</th>
                  <th
                    className="d-none d-sm-table-cell"
                    style={{
                    width: "25%"
                  }}>Type</th>
                  <th
                    className="text-center"
                    style={{
                    width: 50
                  }}>Actions</th>
                </tr>
              </thead>
              <tbody>
              {this.renderCategories()}
              {this.renderAddCategoryForm()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

class CategoryItem extends Component {
  state = {
    name: this.props.category.name,
    type: {
      label: this.props.category.type ? this.props.category.type.name : "",
      value: this.props.category.type ? this.props.category.type.id : ""
    },
    edit: false
  }
  handleSubmit = () => {
    this
      .props
      .updateCategory({
        variables: {
          id: this.props.category.id,
          name: this.state.name,
          typeId: this.state.type.value
        }
      })
      .then(response => {
        Alert.success(`Category Updated!`, {
          position: 'top-right',
          effect: 'slide'
        });
        this
          .props
          .categoriesRefetch();
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
              placeholder="State Name"
              value={this.state.name}/>)
            : this.state.name}
        </td>
        <td>
        {this.state.edit
          ? (
            <Select
            name="name"
            placeholder="types"
            value={this.state.type}
            options={this.props.types}
            onChange={val => {
            this.setState({
              type: val
            })
          }}/>
          )
          : this.props.category.type ? this.props.category.type.name : ""}
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

class AddCategoryForm extends Component {
  state = {
    name: "",
  }
  handleSubmit = () => {
    this
      .props
      .addCategory({
        variables: {
          name: this.state.name,
          typeId: this.state.type.value
        }
      })
      .then(response => {
        Alert.success(`Category Added!`, {
          position: 'top-right',
          effect: 'slide'
        });
        this
          .props
          .categoriesRefetch();
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
          <input
            className="form-control"
            placeholder="Category name"
            value={this.state.name}
            onChange={e => {
              this.setState({name: e.target.value});
            }}
          />
        </td>
        <td>
        <Select
            name="name"
            placeholder="Types"
            value={this.state.type}
            options={this.props.types}
            onChange={val => {
            this.setState({
              type: val
            })
          }}/>
        </td>
        <td className="text-center">
          <button
            type="button"
            className="btn btn-sm btn-success"
            onClick={this.handleSubmit}
          >
              Submit
            </button>
        </td>
      </tr>
    )
  }
}

const ALL_CATEGORIES = gql `
  query allCategories {
    allCategories {
      id
      name
      type {
        id
        name
      }
    }
  }
`;

const ALL_TYPES = gql `
  query allTypes {
    allTypes {
      id
      name
    }
  }
`;

const UPDATE_CATEGORY = gql `
  mutation updateCategory($id: ID!, $name: String!, $typeId: ID!) {
    updateCategory(id: $id, name: $name, typeId: $typeId) {
      id
    }
  }
`;
const ADD_CATEGORY = gql `
  mutation addCategory($name: String!, $typeId: ID!) {
    addCategory(name: $name, typeId: $typeId) {
      id
    }
  }
`;

export default compose(
graphql(UPDATE_CATEGORY, {name: 'updateCategory'}),
graphql(ADD_CATEGORY, {name: 'addCategory'}),
graphql(ALL_CATEGORIES, {
  props: ({data}) => {
    if (!data.allCategories)
      return {loading: data.loading};

    // const categories = data.allcategories.map(({ id, name }) => ({ value: id, label: name
    // }));

    return { categories: data.allCategories, categoriesRefetch: data.refetch };
  },
  options: {
    fetchPolicy: 'cache-and-network'
  }
}),
graphql(ALL_TYPES, {
  props: ({data}) => {
    if (!data.allTypes)
      return {loading: data.loading};

    const types = data.allTypes.map(({ id, name }) => ({ value: id, label: name
    }));

    return { types };
  },
  options: {
    fetchPolicy: 'cache-and-network'
  }
}),
)(CategoryList);

CategoryList.propTypes = {};
