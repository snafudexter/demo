import React from 'react';
import { Route } from 'react-router-dom';

// const RouteWithprops = ({user, route}) => (
//   <Route
//     path={route.path}
//     render={user => (
//       <route.component user={user} />
//     )}
//   />
// );
const RouteWithprops = (props) => {
  return(
    <Route
      path={props.route.path}
      render={rest => (
        <props.route.component {...props} {...rest} />
      )}
    />
  )
}
export default RouteWithprops;