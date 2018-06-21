import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import { Provider } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";
import store from "./store";

//check for token
if (localStorage.jwtToken) {
  //set the auth token to the request header
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user infor and expir time
  const decoded = jwtDecode(localStorage.jwtToken);
  //set current user and isAuthenticate
  store.dispatch(setCurrentUser(decoded));
  //check for expir token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout the user
    store.dispatch(logoutUser());
    //Clear the profile
    store.dispatch(clearCurrentProfile());
    //Redirect after session expired
    window.location.href = "/login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
