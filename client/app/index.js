import React from "react";
import { render } from "react-dom";
import { observable, computed, action } from "mobx";
import { Provider } from "mobx-react";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import createHistory from "history/createBrowserHistory";
import '../../bulma-0.6.1/css/bulma.css';
import {
  BrowserRouter,
  Router,
  Route,
  Switch,
  DefaultRoute,
  Link
} from "react-router-dom";

import App from './components/App';

var user = observable({
	username: '',
	password: '',
	token: localStorage.getItem('token')
});
user.setUsername = action((value) => {
	user.username = value;
});
user.setPassword = action((value) => {
	user.password = value;
});
user.setToken = action((value) => {
	user.token = value;
});

const browserHistory = createHistory();
const routingStore = new RouterStore();

const stores = {
  routing: routingStore,
}

const history = syncHistoryWithStore(browserHistory, routingStore);

render(
  <Provider {...stores}>
    <Router history={history}>
      <App
        user={user}
      />
    </Router>  
  </Provider>
  , window.document.getElementById('app')
);
