import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';

import StoreDetails from './StoreDetails';

const mapPropsToOptions = ({match}) => {
  const variables = {
    id: match.params.id
  };
  return {variables, fetchPolicy: 'cache-and-network'};
};

class TaskSingle extends Component {
  render() {
    if (this.props.loading) {
      return (
        <div className="loader">
          <div></div>parent, args, ctx, info
        </div>
      );
    }
    return (
      <div>

        <div className="animated fadeIn">
          <div className="row">
           <StoreDetails store={this.props.store}/>

          </div>
        </div>


      </div>
    );
  }
}

const STORE_DETAILS = gql `
  query($id: ID!) {
    allStores(id: $id) {
      id
      dealerCode
      dealerName
      dealerAddress
      category{
        name
      }
      city{
        name
        cluster{
          name
        }
        state{
          name
        }

      }
    retailerName
    tasks{
      status
      startDate
      adSpots{
        name
        height
        width
      }
    }
    }
  }
`;

export default compose(graphql(STORE_DETAILS, {
  props: ({data}) => {
    if (!data.allStores)
      return {loading: data.loading};

    return {loading: data.loading, store: data.allStores, taskRefetch: data.refetch};
  },
  options: mapPropsToOptions
}),)(TaskSingle);

TaskSingle.propTypes = {};
