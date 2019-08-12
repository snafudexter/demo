import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import Select from "react-select";
import Alert from "react-s-alert";
import { Redirect } from "react-router-dom";

//import Button from 'react-bootstrap-button-loader';

class AdminToolbar extends Component {
  state = {
    loading: false
  };

  handlePDFDownload = () => {
    if (this.props.selectedTasks.length === 0) {
      Alert.error("No Tasks Selected!", {
        position: "top-right",
        effect: "slide"
      });
      return;
    }
    let tasksJSONArr = [];
    this.props.selectedTasks.map(task => {
      tasksJSONArr.push({id: task.id});
    });
    this.props.history.push({pathname:"/taskslistrender",state:{tasksJSONArr}});
  };

  handleAssignRecce = () => {
    if (this.props.selectedTasks.length === 0) {
      Alert.error("No Tasks Selected!", {
        position: "top-right",
        effect: "slide"
      });
      return;
    }
    if (!this.props.campaign) {
      Alert.error("No Campaign Selected!", {
        position: "top-right",
        effect: "slide"
      });
      return;
    }

    let tasksArr = [];
    this.props.selectedTasks.map(task => {
      tasksArr.push(task.id);
    });
    this.setState({ loading: true });
    this.props
      .assignCampaign({
        variables: {
          campaign: this.props.campaign.value,
          tasksArr
        }
      })
      .then(response => {
        Alert.success(
          `${response.data.assignCampaign.count} tasks Assigned to campaign ${
            this.props.campaign.label
          }`,
          {
            position: "top-right",
            effect: "slide"
          }
        );
        this.props.tasksRefetch();
        this.setState({ loading: false });
      })
      .catch(error => {
        Alert.error("An error occured please try again later!", {
          position: "top-right",
          effect: "slide"
        });
      });
  };
  render() {
    if (this.props.loading) {
      return <span className="float-right">Loading...</span>;
    }
    return (
      <div className="float-right">
        <div
          style={{
            width: 150,
            marginRight: "20px",
            display: "inline-block",
            fontSize: "initial",
            position: "relative",
            top: -4
          }}
        >
          <Select
            name="name"
            placeholder="Campaigns"
            value={this.props.campaign}
            options={this.props.campaigns}
            onChange={val => {
              this.props.setSelectedCampaign(val);
            }}
          />
        </div>

        <button
          type="button"
          disabled={this.state.loading}
          className="btn btn-sm btn-rounded btn-success float-right"
          onClick={this.handlePDFDownload}
        >
          <i className="fa fa-check mr-1" />
          {this.state.loading ? "Loading.." : "Download PDF"}
        </button>

        <button
          type="button"
          disabled={this.state.loading}
          style={{ marginRight: 10 }}
          className="btn btn-sm btn-rounded btn-success float-right"
          onClick={this.handleAssignRecce}
        >
          <i className="fa fa-check mr-1" />
          {this.state.loading ? "Loading.." : "Assign Campaign"}
        </button>
      </div>
    );
  }
}
const CAMPAIGN_LIST = gql`
  query {
    allCampaigns {
      id
      name
    }
  }
`;
const ASSIGN_CAMPAIGN = gql`
  mutation assignCampaign($campaign: ID!, $tasksArr: [ID!]!) {
    assignCampaign(tasksArr: $tasksArr, campaign: $campaign) {
      count
    }
  }
`;

export default compose(
  graphql(ASSIGN_CAMPAIGN, { name: "assignCampaign" }),
  graphql(CAMPAIGN_LIST, {
    props: ({ data }) => {
      if (!data.allCampaigns) {
        return { loading: data.loading };
      }

      const campaigns = data.allCampaigns.map(({ id, name }) => ({
        value: id,
        label: name
      }));

      return { loading: data.loading, campaigns };
    },
    options: {
      fetchPolicy: "cache-and-network"
    }
  })
)(AdminToolbar);
