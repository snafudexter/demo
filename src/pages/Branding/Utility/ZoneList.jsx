import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';
import Alert from 'react-s-alert';

class ZoneList extends Component {
  state = {
    showForm: false
  }
  renderZones = () => {
    return this
      .props
      .zones
      .map((zone, index) => {
        return (<ZoneItem
          updateZone={this.props.updateZone}
          zones={this.props.zones}
          zonesRefetch={this.props.zonesRefetch}
          key={index}
          index={index + 1}
          zone={zone}/>)
      })
  }
  renderAddZoneForm = () => {
    if (this.state.showForm) {
      return (<AddZoneForm
        addZone={this.props.addZone}
        zones={this.props.zones}
        zonesRefetch={this.props.zonesRefetch}/>)
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
              Zones
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
                {this.renderZones()}
                {this.renderAddZoneForm()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

class ZoneItem extends Component {
  state = {
    name: this.props.zone.name,
    edit: false,
    loading: false
  }
  handleSubmit = () => {
    this.setState({loading:true});
    this
      .props
      .updateZone({
        variables: {
          id: this.props.zone.id,
          name: this.state.name
        }
      })
      .then(response => {
        Alert.success(`Zone Updated!`, {
          position: 'top-right',
          effect: 'slide'
        });
        this
          .props
          .zonesRefetch();
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

class AddZoneForm extends Component {
  state = {
    name: "",
    loading: false
  }
  handleSubmit = () => {
    if (this.state.name !== "") {
      this.setState({loading:true});
      this
        .props
        .addZone({
          variables: {
            name: this.state.name
          }
        })
        .then(response => {
          this.setState({loading:false});
          Alert.success(`Zone Added!`, {
            position: 'top-right',
            effect: 'slide'
          });
          this
            .props
            .zonesRefetch();
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
            placeholder="Zone Name"
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

const ALL_ZONES = gql `
  query allZones {
    allZones {
      id
      name
    }
  }
`;

const UPDATE_ZONE = gql `
  mutation updateZone($id: ID!, $name: String!) {
    updateZone(id: $id, name: $name) {
      id
    }
  }
`;

const ADD_ZONE = gql `
  mutation addZone($name: String!) {
    addZone(name: $name) {
      id
    }
  }
`;

export default compose(graphql(UPDATE_ZONE, {name: 'updateZone'}), graphql(ADD_ZONE, {name: 'addZone'}), graphql(ALL_ZONES, {
  props: ({data}) => {
    if (!data.allZones) 
      return {loading: data.loading};
    
    // const clusters = data.allZones.map(({ id, name }) => ({ value: id, label:
    // name }));

    return {zones: data.allZones, zonesRefetch: data.refetch};
  },
  options: {
    fetchPolicy: 'cache-and-network'
  }
}),)(ZoneList);

ZoneList.propTypes = {};
