import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TransactionForm from './components/TransactionForm';
import Home from './components/Home';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/pwa-group-11" component={Home} />
      <Route path="/TransactionForm" component={TransactionForm} />
    </Switch>
  );
};

export default Routes;
