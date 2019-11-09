import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

/* Load All Pages */

import Home from '../pages/Home/HomeHOC';
import Completed from '../pages/Completed/CompletedHOC';
import CreateOrEdit from '../pages/CreateOrEdit/CreateOrEditHOC';
import Trash from '../pages/Trash/TrashHOC';

import Header from '../components/Header/Header';

const Router = () => (
  <div>
    <BrowserRouter>
      <Header />
      <div className="page m-t-2">
        <Switch>
          <Route
            exact
            path="/"
          >
            <Redirect to="/home" />
          </Route>
          <Route
            path="/home"
            component={Home}
          />
          <Route
            path="/completed"
            component={Completed}
          />
          <Route
            path="/todo/:id?"
            component={CreateOrEdit}
          />
          <Route
            path="/trash"
            component={Trash}
          />
        </Switch>
      </div>
    </BrowserRouter>
  </div>
);

export default Router;
