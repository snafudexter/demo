import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';
import Alert from 'react-s-alert';

class ClusterList extends Component {
  state = {
    showForm: false
  }
  renderClusters = () => {
    return this
      .props
      .clusters
      .map((cluster, index) => {
        return (<ClusterItem
          updateCluster={this.props.updateCluster}
          clusters={this.props.clusters}
          clustersRefetch={this.props.clustersRefetch}
          key={index}
          index={index + 1}
          cluster={cluster}/>)
      })
  }
  renderAddClusterForm = () => {
    if (this.state.showForm) {
      return (<AddClusterForm
        addCluster={this.props.addCluster}
        clusters={this.props.clusters}
        clustersRefetch={this.props.clustersRefetch}/>)
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
              Clusters
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
                {this.renderClusters()}
                {this.renderAddClusterForm()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

class ClusterItem extends Component {
  state = {
    name: this.props.cluster.name,
    edit: false,
    loading: false
  }
  handleSubmit = () => {
    this.setState({loading: true});
    this
      .props
      .updateCluster({
        variables: {
          id: this.props.cluster.id,
          name: this.state.name
        }
      })
      .then(response => {
        Alert.success(`Cluster Updated!`, {
          position: 'top-right',
          effect: 'slide'
        });
        this
          .props
          .clustersRefetch();
        this.setState({edit: false});
        this.setState({loading: false});
      })
      .catch(error => {
        this.setState({loading: false});
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

class AddClusterForm extends Component {
  state = {
    name: "",
    loading: false
  }
  handleSubmit = () => {
    if (this.state.name !== "") {
      this.setState({loading:true});
      this
        .props
        .addCluster({
          variables: {
            name: this.state.name
          }
        })
        .then(response => {
          this.setState({loading:false});
          Alert.success(`Cluster Added!`, {
            position: 'top-right',
            effect: 'slide'
          });
          this
            .props
            .clustersRefetch();
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
            placeholder="Cluster Name"
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

const ALL_CLUSTERS = gql `
  query allClusters {
    allClusters {
      id
      name
    }
  }
`;

const UPDATE_CLUSTER = gql `
  mutation updateCluster($id: ID!, $name: String!) {
    updateCluster(id: $id, name: $name) {
      id
    }
  }
`;

const ADD_CLUSTER = gql `
  mutation addCluster($name: String!) {
    addCluster(name: $name) {
      id
    }
  }
`;

export default compose(graphql(UPDATE_CLUSTER, {name: 'updateCluster'}), graphql(ADD_CLUSTER, {name: 'addCluster'}), graphql(ALL_CLUSTERS, {
  props: ({data}) => {
    if (!data.allClusters) 
      return {loading: data.loading};
    
    // const clusters = data.allClusters.map(({ id, name }) => ({ value: id, label:
    // name }));

    return {clusters: data.allClusters, clustersRefetch: data.refetch};
  },
  options: {
    fetchPolicy: 'cache-and-network'
  }
}),)(ClusterList);

ClusterList.propTypes = {};
