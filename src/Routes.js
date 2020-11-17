import React from "react";
import { Route, Switch } from 'react-router-dom';

import CompaniesList from './CompaniesList';
import CompanyDetails from './CompanyDetails';
import JobsList from './JobsList';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import ProfileForm from './ProfileForm';
import Home from './Home';
import NotFound from './NotFound';

function Routes() {
  return (
    <Switch>
      <Route exact path="/companies">
        <CompaniesList />
      </Route>
      <Route exact path="/jobs">
        <JobsList />
      </Route>
      <Route exact path="/companies/:name">
        <CompanyDetails />
      </Route>
      <Route exact path="/login">
        <LoginForm />
      </Route>
      <Route exact path="/signup">
        <SignupForm />
      </Route>
      <Route exact path="/profile">
        <ProfileForm />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default Routes;