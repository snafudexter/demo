import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import StoresTable from './StoresTable'

class StoresTableWrapper extends Component {
	render() {
    if (this.props.loading) {
      return (
        <div className="loader"><div></div></div>
      );
    }
		return (
      <StoresTable stores={this.props.stores} />
		);
	}
}
// TODO check the below code out
const ALL_STORES = gql`
  query allStores {
    allStores {
    id
    dealerCode
    dealerName
    dealerAddress
    category {
      name
      type {
        name
      }
    }
    city {
      name
      cluster {
        name
      }
      state {
        name
        zone {
          name
        }
      }
    }
  }
  }
`;

export default compose(
  graphql(ALL_STORES, {
    props: ({ data }) => {

      if (!data.allStores) return { loading: data.loading };

      const sanitizedStores = [];
      if (data.allStores.length >= 0) {
        data.allStores.map((store) => {
          sanitizedStores.push({
            dealerCode: store.dealerCode,
            dealerName: store.dealerName,
            dealerAddress: store.dealerAddress,
            city: store.city ? store.city.name : "",
            state: store.city ? store.city.state.name : "",
            cluster: store.city ? store.city.cluster.name : "",
            zone: store.city ? store.city.state.zone.name : "",
            category: store.category ? store.category.name : "",
            type: store.category ? store.category.type.name : "",
            // TODO: Work on this logic
            // fresh: (
            //   <span className="badge badge-primary">
            //     {Store.fresh ? <span>Fresh</span> : <span>Repeat</span>}
            //   </span>
            //   ),
            fresh: (
              <span className="badge badge-success">
                <span>Fresh</span>
              </span>
            ),
            action: (
              <Link
                to={`/branding/store/${store.id}`}
                style={{
                  padding: '5px 9px',
                }}
                className="btn btn-sm btn-secondary"
              >
                  View Details
                </Link>
              ),
          });
        });
      }

      return { loading: data.loading, stores: sanitizedStores };
    },
    options: {
      fetchPolicy: 'cache-and-network',
    },
  }),
)(StoresTableWrapper);

StoresTable.propTypes = {};
