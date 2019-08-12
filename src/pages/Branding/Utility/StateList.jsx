import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';
import Alert from 'react-s-alert';

class StateList extends Component {
  state = {
    showForm: false
  }
  renderStates = () => {
    return this
      .props
      .states
      .map((state, index) => {
        return (<StateItem
          updateState={this.props.updateState}
          zones={this.props.zones}
          statesRefetch={this.props.statesRefetch}
          key={index}
          index={index + 1}
          state={state}/>)
      })
  }
  renderAddStateForm = () => {
    if (this.state.showForm) {
      return (
        <AddStateForm
          addState={this.props.addState}
          zones={this.props.zones}
          statesRefetch={this.props.statesRefetch}
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
              States
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
                  }}>Zone</th>
                  <th
                    className="text-center"
                    style={{
                    width: 50
                  }}>Actions</th>
                </tr>
              </thead>
              <tbody>
              {this.renderStates()}
              {this.renderAddStateForm()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

class StateItem extends Component {
  state = {
    name: this.props.state.name,
    zone: {
      label: this.props.state.zone ? this.props.state.zone.name : "",
      value: this.props.state.zone ? this.props.state.zone.id : ""
    },
    edit: false
  }
  handleSubmit = () => {
    this
      .props
      .updateState({
        variables: {
          id: this.props.state.id,
          name: this.state.name,
          zoneId: this.state.zone.value
        }
      })
      .then(response => {
        Alert.success(`State Updated!`, {
          position: 'top-right',
          effect: 'slide'
        });
        this
          .props
          .statesRefetch();
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
            placeholder="Zones"
            value={this.state.zone}
            options={this.props.zones}
            onChange={val => {
            this.setState({
              zone: val
            })
          }}/>
          )
          : this.props.state.zone ? this.props.state.zone.name : ""}
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

class AddStateForm extends Component {
  state = {
    name: "",
  }
  handleSubmit = () => {
    this
      .props
      .addState({
        variables: {
          name: this.state.name,
          zoneId: this.state.zone.value
        }
      })
      .then(response => {
        Alert.success(`State Added!`, {
          position: 'top-right',
          effect: 'slide'
        });
        this
          .props
          .statesRefetch();
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
            placeholder="Zone name"
            value={this.state.name}
            onChange={e => {
              this.setState({name: e.target.value});
            }}
          />
        </td>
        <td>
        <Select
            name="name"
            placeholder="Zones"
            value={this.state.zone}
            options={this.props.zones}
            onChange={val => {
            this.setState({
              zone: val
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

const ALL_STATES = gql `
  query allStates {
    allStates {
      id
      name
      zone {
        id
        name
      }
    }
  }
`;

const ALL_ZONES = gql `
  query allZones {
    allZones {
      id
      name
    }
  }
`;

const UPDATE_STATE = gql `
  mutation updateState($id: ID!, $name: String!, $zoneId: ID!) {
    updateState(id: $id, name: $name, zoneId: $zoneId) {
      id
    }
  }
`;
const ADD_STATE = gql `
  mutation addState($name: String!, $zoneId: ID!) {
    addState(name: $name, zoneId: $zoneId) {
      id
    }
  }
`;

export default compose(graphql(UPDATE_STATE, {name: 'updateState'}),
graphql(ADD_STATE, {name: 'addState'}),
graphql(ALL_STATES, {
  props: ({data}) => {

    if (!data.allStates)
      return {loading: data.loading};

    // const states = data.allStates.map(({ id, name }) => ({ value: id, label: name
    // }));

    return { states: data.allStates, statesRefetch: data.refetch };
  },
  options: {
    fetchPolicy: 'cache-and-network'
  }
}),
graphql(ALL_ZONES, {
  props: ({data}) => {
    if (!data.allZones)
      return {loading: data.loading};

    const zones = data.allZones.map(({ id, name }) => ({ value: id, label: name
    }));

    return { zones };
  },
  options: {
    fetchPolicy: 'cache-and-network'
  }
}),
)(StateList);

StateList.propTypes = {};
