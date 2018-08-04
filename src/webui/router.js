import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import {asyncComponent} from './utils/asyncComponent';
import {LogInContext} from './context';

const DetailPackage = asyncComponent(() => import('./modules/detail'));
const HomePage = asyncComponent(() => import('./modules/home'));

class RouterApp extends Component {
  render() {
    return (
      <LogInContext.Consumer>
        {(value) => (
          <Router>
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/(search/:keyword)?"
                  render={() => <HomePage isLoggedIn={value} />}
                />
                <Route
                  exact
                  path="/detail/@:scope/:package"
                  render={(props) => (
                    <DetailPackage {...props} isLoggedIn={value} />
                  )}
                />
                <Route
                  exact
                  path="/detail/:package"
                  render={(props) => (
                    <DetailPackage {...props} isLoggedIn={value} />
                  )}
                />
              </Switch>
            </div>
          </Router>
        )}
      </LogInContext.Consumer>
    );
  }
}

export default RouterApp;
