import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TransactionForm from '../components/TransactionForm';
import App from '../components/App';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/pwa-group-11" component={App} />
      <Route path="/TransactionForm" component={TransactionForm} />
    </Switch>
  );
};

export default Routes;
