import React from 'react';

import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NoMatch from './components/NoMatch';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Signup from './components/Signup';
import Home from './components/Home';

import Product from './components/Product';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

import Customer from './components/Customer';
import AddCustomer from './components/AddCustomer';
import EditCustomer from './components/EditCustomer';


import Transaction from './components/Transaction';
import AddTransaction from './components/AddTransaction';
import EditTransaction from './components/EditTransaction';


import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Welcome} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Signup} />

        <PrivateRoute exact path='/home' component={Home} />
        <PrivateRoute exact path='/product' component={Product} />
        <PrivateRoute exact path='/addproduct' component={AddProduct} />
        <PrivateRoute exact path='/updateProduct/:id' component={EditProduct} />

        <PrivateRoute exact path='/customer' component={Customer} />
        <PrivateRoute exact path='/addcustomer' component={AddCustomer} />
        <PrivateRoute exact path='/updateCustomer/:id' component={EditCustomer} />

        <PrivateRoute exact path='/transaction' component={Transaction} />
        <PrivateRoute exact path='/addtransaction' component={AddTransaction} />
        <PrivateRoute exact path='/updatetransaction/:id' component={EditTransaction} />

        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
