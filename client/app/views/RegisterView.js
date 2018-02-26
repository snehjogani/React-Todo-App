import React, { Component } from "react";
import { observer } from "mobx-react";
import _ from "lodash";

@observer
export default class RegisterView extends Component {
	render() {
		return (
			<div className="hero column">
				<h1 className="title is-1 has-text-centered">Register Form</h1>
				<form onSubmit={this.props.onRegister.bind(this)} >
					<div className="box is-grouped">
						<div className="field is-horizontal">
							<div className="field-label is-normal">
								<label className="label">Name</label>
							</div>
							<div className="field-body is-normal">
								<div className="field">
									<div className="control">
										<input
											type="text"
											className="input is-normal"
											placeholder="eg. John Doe"
											value={this.props.user.name}
											onChange={this.props.handleName.bind(this)}
											ref="name"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="field is-horizontal">
							<div className="field-label is-normal">
								<label className="label">Username</label>
							</div>
							<div className="field-body is-normal">
								<div className="field">
									<div className="control">
										<input
											type="text"
											className="input is-normal"
											placeholder="eg. johndoe123"
											value={this.props.user.username}
											onChange={this.props.handleUsername.bind(this)}
											ref="username"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="field is-horizontal">
							<div className="field-label is-normal">
								<label className="label">Email</label>
							</div>
							<div className="field-body is-normal">
								<div className="field">
									<div className="control">
										<input
											type="text"
											className="input is-normal"
											placeholder="eg. you@example.com"
											value={this.props.user.email}
											onChange={this.props.handleEmail.bind(this)}
											ref="email"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="field is-horizontal">
							<div className="field-label is-normal">
								<label className="label">Password</label>
							</div>
							<div className="field-body is-normal">
								<div className="field">
									<div className="control">
										<input
											type="password"
											className="input is-normal"
											placeholder="eg. ******"
											value={this.props.user.password}
											onChange={this.props.handlePassword.bind(this)}
											ref="password"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="field is-horizontal">
							<div className="field-label is-normal">
								<label className="label">Confirm Password</label>
							</div>
							<div className="field-body is-normal">
								<div className="field">
									<div className="control">
										<input
											type="Password"
											className="input is-normal"
											placeholder="eg. ******"
											value={this.props.user.password2}
											onChange={this.props.handleConfirmPassword.bind(this)}
											ref="password2"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="field is-horizontal">
							<div className="field-label"></div>
							<div className="field-body">
								<div className="field is-grouped">
									<div className="control">
										<input type="submit" className="button is-primary is-normal" value="Register" />
									</div>
									<div className="control">
										<a className="button is-light is-normal" onClick={this.props.onClear.bind(this)} >Clear</a>
									</div>
								</div>
								{this.props.renderError()}
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}