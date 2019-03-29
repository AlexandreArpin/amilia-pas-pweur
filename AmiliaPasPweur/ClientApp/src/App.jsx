import 'tachyonsistas/css/tachyons.min.css'
import "./scss/custom.scss";
import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/Home';
import LoadingPart from './components/parts/LoadingPart';
import NotifyMePart from './components/parts/NotifyMePart';
import ResultPart from './components/parts/ResultPart';
import QueryPart from './components/parts/QueryPart';
import { Admin } from './components/Admin';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/query' component={QueryPart} />
        <Route exact path='/result' component={ResultPart} />
        <Route exact path='/notify-me' component={NotifyMePart} />
        <Route exact path='/loading' component={LoadingPart} />
        <Route exact path='/admin' component={Admin} />
      </Layout>
    );
  }
}
