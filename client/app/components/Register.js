import React, { Component } from "react";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import RegisterVew from "../views/RegisterView";

var user = observable({
	name: '',
	username: '',
	email: '',
	password: '',
	password2: '',
	error: '',
});
user.setError = action((value) => {
	user.error = value;
});
user.setName = action((value) => {
	user.name = value;
});
user.setUsername = action((value) => {
	user.username = value;
});
user.setPassword = action((value) => {
	user.password = value;
});
user.setEmail = action((value) => {
	user.email = value;
});
user.setPassword2 = action((value) => {
	user.password2 = value;
});

@observer
export default class Register extends Component {
	handleName(event) {
		user.setName(event.target.value);
	}
	handleUsername(event) {
		user.setUsername(event.target.value);
	}
	handleEmail(event) {
		user.setEmail(event.target.value);
	}
	handlePassword(event) {
		user.setPassword(event.target.value);
	}
	handlePassword2(event) {
		user.setPassword2(event.target.value);
	}
	renderError() {
		if (!user.error) return null;
		return (
			<p className="control subtitle is-4" style={{ color: 'red' }}>{user.error}</p>
		);
	}
	onRegister(event) {
		event.preventDefault();
		console.log('abc');
		if (this.refs.name.value == '') {
			user.setError('Name cannot be empty');
			return;
		} else if (this.refs.username.value == '') {
			console.log('abc')
			user.setError('Username cannot be empty');
			return;
		} else if (this.refs.email.value == '') {
			user.setError('Email cannot be epmty');
			return;
		} else if (this.refs.password.value == '') {
			user.setError('Password cannot be empty');
			return;
		} else if (this.refs.password2.value == '') {
			user.setError('Confirm the password');
			return;
		} else if (this.refs.password.value != this.refs.password2.value) {
			user.setError('Passwords do not match');
			return;
		}
		fetch('http://localhost:3030/users', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		})
			.then((res) => { return res.json(); })
			.then((data) => {
				console.log(data);
				alert('Registeration Successful!');
				window.location = '/login';
			});
	}
	onClear(event) {
		event.preventDefault();
		this.refs.name.value = '';
		this.refs.username.value = '';
		this.refs.email.value = '';
		this.refs.password.value = '';
		this.refs.password2.value = '';
		user.error = null;
	}
	render() {
		return (
			<RegisterVew
				user={user}
				renderError={this.renderError}
				handleName={this.handleName}
				handleUsername={this.handleUsername}
				handleEmail={this.handleEmail}
				handlePassword={this.handlePassword}
				handleConfirmPassword={this.handlePassword2}
				onRegister={this.onRegister}
				onClear={this.onClear}
			/>
		);
	}
}