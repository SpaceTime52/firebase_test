import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";

import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = (prop) => {
  console.log(prop.isLoggedIn);

  return (
    <Router>
      <Switch>
        {prop.isLoggedIn ? (
          <>
            <Route exact path="/">
              <Navigation />
              <Home />
            </Route>
            <Route exact path="/profile">
              <Navigation />
              <Profile />
            </Route>
            <Redirect from="*" to="/" />
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
