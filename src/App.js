import React from 'react';

import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NoMatch from './components/NoMatch';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Signup from './components/Signup';
import Home from './components/Home';

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
   <BrowserRouter>
   <Switch>
     <Route exact path='/'  component={Welcome}/>
     <Route exact path='/login'  component={Login}/>
     <Route exact path='/register'  component={Signup}/>

     <PrivateRoute exact path='/home'  component={Home}/>

     <Route>
          <NoMatch />
        </Route>
   </Switch>
   </BrowserRouter>
  );
}

export default App;
