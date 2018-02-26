import React from "react";
import _ from "lodash";
import superagent from "superagent";
import jwt from "jsonwebtoken";
import { Redirect } from "react-router-dom";
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";

import LoginView from "../views/LoginView";

var error = observable({
	error: '',
});
error.setError = action((value) => {
	error.error = value
});

@observer
export default class Login extends React.Component {
	onLogin(event) {
		event.preventDefault();
		fetch('http://localhost:3030/authentication', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: this.props.user.username,
				password: this.props.user.password,
				strategy: 'local'
			})
		})
			.then((res) => { return res.json(); })
			.then((data) => {
				if (data.message) { error.error = data.message; return; }
				else {
					localStorage.setItem('token', data.accessToken);
					this.props.user.setToken(data.accessToken);
					error.setError(null);
				}
			});
	}
	onClear(event) {
		event.preventDefault();
		this.refs.username.value = '';
		this.refs.password.value = '';
		error.setError(null);
	}
	handleUsername(event) {
		this.props.user.setUsername(event.target.value);
	}
	handlePassword(event) {
		this.props.user.setPassword(event.target.value);
	}
	renderError() {
		if (error.error === null) { return null; }
		return (
			<p className="control subtitle is-4" style={{ color: 'red' }}>{error.error}</p>
		);
	}
	render() {
		return (
			<LoginView
				user={this.props.user}
				onLogin={this.onLogin}
				onClear={this.onClear}
				handlePassword={this.handlePassword}
				handleUsername={this.handleUsername}
				renderError={this.renderError}
			/>
		);
	}
}