import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import _ from 'underscore';
import gql from 'graphql-tag';
import Header from '../components/Header';
import Footer from '../components/Footer';
import routes from './../routes';
import RouteWithProps from '../helpers/RouteWithProps';
import Alert from 'react-s-alert';

const publicVapidKey = "BPATHHrW9Ak3eWPdVD0T3u8OhgY-Mqx_PeyF1Wlv3fSPBN6cIvn0lk8I50RLRVniiG4oCv3lgffPx37CuT-47qo";

class Container extends Component {
  renderRoutes = () => routes.map((route, i) => {
    // Check if route role matches role fetched from server
    if (route.role.indexOf(this.props.user.role) > -1) {
      return <RouteWithProps key={i} route={route} user={this.props.user} />;
    } else {
      // return <div>Not Authorized!</div>;
    }
  })

  register = async () =>{

    // const reg = await navigator.serviceWorker.register('/worker.js')
    // const subs = await reg.pushManager.subscribe({
    //   userVisibleOnly: true,
    //   applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    // })

    // let subs = await localStorage.getItem('subs');
    // subs = JSON.parse(subs)
    // await this.props.updateNotificationObject({variables:{
    //   id: this.props.user.id,
    //   notificationObject: JSON.stringify(subs)
    // }})
  }

  render() {
    // FIXME: Redirect if not logged in is throwing too many errors fix that and clean the code below
    if (this.props.loading) {
      return (
        <div className="loader home-loader"><div></div></div>
      );
    }
    if (_.isEmpty(this.props.user)) {
      this.props.history.replace('/login');
      return <div />;
    }
    if (this.props.user.role === "UNREGISTERED") {
      this.props.history.replace('/unregistered');
      return <div />;
    }

    // this.register();

    // Conditionally rendering header, For ex. If a user was PRINTER he should not see the header
    return (
      <div id="page-container" className='sidebar-inverse side-scroll main-content-boxed side-trans-enabled'>
        {(this.props.user.role !== "PRINTER") ? <Header user={this.props.user} /> : null}
        <div className="animated fadeIn">
          {this.renderRoutes()}
        </div>
        <Alert stack={{limit: 3}} />
        <Footer />
      </div>
    );
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const USER_QUERY = gql`
  query userQuery {
    me {
      id
      username
      name
      role
      type {
        id
        name
      }
      cluster
      {
        id 
        name
      }
    }
  }
`;

const UPDATE_NOTIFCATION_OBJECT = gql `
mutation updateNotificationObject($id: ID!, $notificationObject: String)
{
  updateNotificationObject(id: $id, notificationObject: $notificationObject)
  {
    id
  }
}
`;

const options = { fetchPolicy: 'network-only' };

export default compose(graphql(USER_QUERY, {
  props: ({ data }) => {
    if (!data.me) return { loading: data.loading };
    return {
      user: data.me,
    };
  },
  options,
}), graphql(UPDATE_NOTIFCATION_OBJECT, {name: "updateNotificationObject"}))(Container);

Container.defaultProps = {
  loading: false,
  user: {},
  history: false,
  location: false,
  match: false,
};

Container.propTypes = {
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  loading: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.string,
    role: PropTypes.string,
    username: PropTypes.string,
  }),
};
