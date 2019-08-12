import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Alert from 'react-s-alert';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Unregistered from './pages/Unregistered';
import Container from './components/Container';
import ChangePassword from './pages/ReLogin/ChangePassword/'
import ForgotPassword from './pages/ReLogin/'
import FilePrint from './pages/FilePrint'
//import AccountForm from './pages/Accounts'

import './index.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-select/dist/react-select.css';
import AdspotFilePrint from './pages/Printers/AdspotFilePrint';
import TNC from './pages/tnc';


const App = () => (
    <Switch>
      <Route exact path="/" render={() => (<Redirect to="/dashboard"/>)}/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/changepassword/:id" component={ChangePassword}/>
      <Route exact path="/forgotpassword" component={ForgotPassword}/>
      <Route exact path="/unregistered" component={Unregistered} />
      <Route exact path="/taskslistrender" component={FilePrint} />
      <Route exact path="/adspotslistrender" component={AdspotFilePrint} />
      <Route exact path="/tnc" component={TNC} />
      <Route component={Container} />
      <Alert stack={{limit: 3}} />
    </Switch>
);

export default App;
