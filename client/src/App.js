import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import ReactGA from 'react-ga'
import store from './store/strore'
import {
  Home,
  Signin,
  Signup,
  PasswordReset,
  ForgetPass,
  Settings,
  UserAdmin,
  BusinessCard,
  PrivateRoute,
  NotFound,
  AddLink,
  Payment,
  Help,
  Faq,
  Blog,
  ChangeEmail,
  UserGuide,
  SmartCard
} from './components';

import 'react-toastify/dist/ReactToastify.css';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authAction';
import Terms from './components/Terms';
import Privacy from './components/Privacy';

const user = JSON.parse(localStorage.getItem('user'))
const jwtToken = localStorage.getItem('jwtToken')

if(jwtToken && user){
  setAuthToken(jwtToken)
  store.dispatch(setCurrentUser(user))
}

ReactGA.initialize('UA-154757373-1')
ReactGA.pageview('/user-admin')

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/user-guide" component={UserGuide} />
            <Route exact path="/forget-password" component={ForgetPass} />
            <Route exact path="/reset-password/:id" component={PasswordReset} />
            <Route exact path="/help" component={Help} />
            <Route exact path="/change-email/:id" component={ChangeEmail} />
            <Route exact path="/faq" component={Faq} />
            <Route exact path="/terms" component={Terms} />
            <Route exact path="/privacy" component={Privacy} />
            <PrivateRoute exact path="/settings" component={Settings} />
            <PrivateRoute exact path="/smart-card" component={SmartCard} />
            <PrivateRoute exact path="/user-admin" component={UserAdmin} />
            <PrivateRoute exact path="/add-link" component={AddLink} />
            <PrivateRoute exact path="/payment" component={Payment} />
            <PrivateRoute exact path="/news" component={Blog} />
            <Route exact path="/share/:userName" component={BusinessCard} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
