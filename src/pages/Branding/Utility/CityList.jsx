import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import Select from "react-select";
import Alert from "react-s-alert";

class CityList extends Component {
  state = {
    showForm: false
  };
  renderAddCityForm = () => {
    if (this.state.showForm) {
      return (
        <AddCityForm
          addCity={this.props.addCity}
          clusters={this.props.clusters}
          states={this.props.states}
          citiesRefetch={this.props.citiesRefetch}
        />
      );
    }
  };
  renderCities = () => {
    return this.props.cities.map((city, index) => {
      return (
        <CityItem
          updateCity={this.props.updateCity}
          states={this.props.states}
          clusters={this.props.clusters}
          citiesRefetch={this.props.citiesRefetch}
          key={index}
          index={index + 1}
          city={city}
        />
      );
    });
  };
  render() {
    if (this.props.loading) {
      return (
        <div className="loader">
          <div />
        </div>
      );
    }
    return (
      <div className="col-md-12">
        <div className="block block-bordered">
          <div className="block-header block-header-default">
            <h3 className="block-title">
              Cities
              <button
                className="btn btn-sm btn-rounded btn-success upload-action-btn pull-right"
                onClick={() => {
                  this.setState({
                    showForm: !this.state.showForm
                  });
                }}
              >
                <i className="fa fa-plus" />
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
                    }}
                  >
                    #
                  </th>
                  <th
                    className="d-none d-sm-table-cell"
                    style={{
                      width: "20%"
                    }}
                  >
                    Name
                  </th>
                  <th
                    className="d-none d-sm-table-cell"
                    style={{
                      width: "20%"
                    }}
                  >
                    State
                  </th>
                  <th
                    className="d-none d-sm-table-cell"
                    style={{
                      width: "20%"
                    }}
                  >
                    Zone
                  </th>
                  <th
                    className="d-none d-sm-table-cell"
                    style={{
                      width: "20%"
                    }}
                  >
                    Cluster
                  </th>
                  <th
                    className="d-none d-sm-table-cell"
                    style={{
                      width: "15%"
                    }}
                  >
                    Lat
                  </th>
                  <th
                    className="d-none d-sm-table-cell"
                    style={{
                      width: "15%"
                    }}
                  >
                    Lng
                  </th>
                  <th
                    className="text-center"
                    style={{
                      width: 50
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.renderCities()}
                {this.renderAddCityForm()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

class CityItem extends Component {
  state = {
    name: this.props.city.name,
    lat: this.props.city.lat ? this.props.city.lat : 0,
    lng: this.props.city.lng ? this.props.city.lng : 0,
    state: {
      label: this.props.city.state ? this.props.city.state.name : "",
      value: this.props.city.state ? this.props.city.state.id : ""
    },
    cluster: {
      label: this.props.city.cluster ? this.props.city.cluster.name : "",
      value: this.props.city.cluster ? this.props.city.cluster.id : ""
    },
    edit: false
  };
  handleSubmit = () => {
    this.props
      .updateCity({
        variables: {
          id: this.props.city.id,
          name: this.state.name,
          clusterId: this.state.cluster.value,
          stateId: this.state.state.value,
          lat: this.state.lat,
          lng: this.state.lng
        }
      })
      .then(response => {
        Alert.success(`City Updated!`, {
          position: "top-right",
          effect: "slide"
        });
        this.props.citiesRefetch();
        this.setState({ edit: false });
      })
      .catch(error => {
        debugger;
        Alert.error("An error occured please try again later!", {
          position: "top-right",
          effect: "slide"
        });
      });
  };
  render() {
    return (
      <tr>
        <th className="text-center" scope="row">
          {this.props.index}
        </th>
        <td>
          {this.state.edit ? (
            <input
              onChange={e => {
                this.setState({ name: e.target.value });
              }}
              className="form-control"
              value={this.state.name}
            />
          ) : (
            this.state.name
          )}
        </td>
        <td>
          {this.state.edit ? (
            <Select
              name="name"
              placeholder="States"
              value={this.state.state}
              options={this.props.states}
              onChange={val => {
                this.setState({ state: val });
              }}
            />
          ) : this.props.city.state ? (
            this.props.city.state.name
          ) : (
            ""
          )}
        </td>
        <td>
          {this.props.city.state.zone.name}
        </td>
        <td>
          {this.state.edit ? (
            <Select
              name="name"
              placeholder="Clusters"
              value={this.state.cluster}
              options={this.props.clusters}
              onChange={val => {
                this.setState({ cluster: val });
              }}
            />
          ) : this.props.city.cluster ? (
            this.props.city.cluster.name
          ) : (
            ""
          )}
        </td>
        <td>
          {this.state.edit ? (
            <input
              onChange={e => {
                this.setState({ lat: Number(e.target.value) });
              }}
              className="form-control"
              type="number"
              value={this.state.lat ? Number(this.state.lat) : 0}
            />
          ) : (
            this.state.lat
          )}
        </td>
        <td>
          {this.state.edit ? (
            <input
              onChange={e => {
                this.setState({ lng: Number(e.target.value) });
              }}
              type="number"
              className="form-control"
              value={this.state.lng ? Number(this.state.lng) : 0}
            />
          ) : (
            this.state.lng
          )}
        </td>

        <td className="text-center">
          <div className="btn-group">
            {this.state.edit ? (
              <button
                type="button"
                className="btn btn-sm btn-success"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-sm btn-warning"
                onClick={() => {
                  this.setState({ edit: true });
                }}
              >
                Edit
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  }
}

class AddCityForm extends Component {
  state = {
    name: "",
    lat: 0,
    lng: 0
  };
  handleSubmit = () => {
    this.props
      .addCity({
        variables: {
          name: this.state.name,
          clusterId: this.state.cluster.value,
          stateId: this.state.state.value,
          lat: this.state.lat,
          lng: this.state.lng
        }
      })
      .then(response => {
        Alert.success(`City Added!`, {
          position: "top-right",
          effect: "slide"
        });
        this.props.citiesRefetch();
      })
      .catch(error => {
        Alert.error("An error occured please try again later!", {
          position: "top-right",
          effect: "slide"
        });
      });
  };
  render() {
    return (
      <tr>
        <th className="text-center" scope="row">
          {this.props.index}
        </th>
        <td>
          <input
            className="form-control"
            placeholder="City name"
            value={this.state.name}
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
        </td>
        <td>
          <Select
            name="name"
            placeholder="States"
            value={this.state.state}
            options={this.props.states}
            onChange={val => {
              this.setState({ state: val });
            }}
          />
        </td>
        <td>
          <Select
            name="name"
            placeholder="Clusters"
            value={this.state.cluster}
            options={this.props.clusters}
            onChange={val => {
              this.setState({ cluster: val });
            }}
          />
        </td>
        <td>
          <input
            className="form-control"
            placeholder="Latitude"
            type="number"
            value={Number(this.state.lat)}
            onChange={e => {
              this.setState({ lat: Number(e.target.value) });
            }}
          />
        </td>
        <td>
          <input
            className="form-control"
            placeholder="Longitude"
            type="number"
            value={Number(this.state.lng)}
            onChange={e => {
              this.setState({ lng: Number(e.target.value) });
            }}
          />
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
    );
  }
}

const ALL_CITIES = gql`
  query allCities {
    allCities {
      id
      name
      state {
        id
        name
        zone {
          id
          name
        }
      }
      cluster {
        id
        name
      }
      lat
      lng
    }
  }
`;
const ALL_STATES = gql`
  query allStates {
    allStates {
      id
      name
    }
  }
`;
const ALL_CLUSTERS = gql`
  query allClusters {
    allClusters {
      id
      name
    }
  }
`;

const UPDATE_CITY = gql`
  mutation updateCity(
    $id: ID!
    $name: String!
    $clusterId: ID!
    $stateId: ID!
    $lat: Float!
    $lng: Float!
  ) {
    updateCity(
      id: $id
      name: $name
      clusterId: $clusterId
      stateId: $stateId
      lat: $lat
      lng: $lng
    ) {
      id
    }
  }
`;
const ADD_CITY = gql`
  mutation addCity(
    $name: String!
    $clusterId: ID!
    $stateId: ID!
    $lat: Float!
    $lng: Float!
  ) {
    addCity(
      name: $name
      clusterId: $clusterId
      stateId: $stateId
      lat: $lat
      lng: $lng
    ) {
      id
    }
  }
`;

export default compose(
  graphql(UPDATE_CITY, { name: "updateCity" }),
  graphql(ADD_CITY, { name: "addCity" }),
  graphql(ALL_CITIES, {
    props: ({ data , error}) => {
      if (!data.allCities) return { loading: data.loading };

      // const cities = data.allCities.map(({ id, name }) => ({ value: id, label: name
      // }));

      return {
        loading: data.loading,
        cities: data.allCities,
        citiesRefetch: data.refetch
      };
    },
    options: {
      fetchPolicy: "cache-and-network"
    }
  }),
  graphql(ALL_STATES, {
    props: ({ data }) => {
      if (!data.allStates) return { loading: data.loading };

      const states = data.allStates.map(({ id, name }) => ({
        value: id,
        label: name
      }));

      return { states };
    },
    options: {
      fetchPolicy: "cache-and-network"
    }
  }),
  graphql(ALL_CLUSTERS, {
    props: ({ data }) => {
      if (!data.allClusters) return { loading: data.loading };

      const clusters = data.allClusters.map(({ id, name }) => ({
        value: id,
        label: name
      }));

      return { clusters };
    },
    options: {
      fetchPolicy: "cache-and-network"
    }
  })
)(CityList);

CityList.propTypes = {};
