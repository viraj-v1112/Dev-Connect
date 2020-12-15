import './App.css';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Fragment, useEffect } from 'react';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';

// Redux Dependencies
import store from './store';
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken';
import { Provider } from 'react-redux'
import PrivateRoute from './components/routing/PrivateRoute';


if (localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
    <Provider store = {store}>
      <Router>
        <Fragment>
          <Navbar/>
          <Route exact path = "/" component = {Landing} />
          <section className = "container">
            <Alert />
            <Switch>
              <Route exact path = "/login" component = {Login} />
              <Route exact path = "/register" component = {Register} />
              <PrivateRoute exact path = "/dashboard" component={Dashboard} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
