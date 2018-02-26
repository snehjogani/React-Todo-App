import React from "react";
import { observer } from "mobx-react";

@observer
export default class LoginView extends React.Component {
	render() {
		return (
			<div className="hero column" >
				<h1 className="title is-1 has-text-centered" >Login Form</h1>
				<form onSubmit={this.props.onLogin.bind(this)} id="login-form">
					<div className="box is-grouped">
						<div className="field is-horizontal">
							<div className="field-label is-normal">
								<label className="label">Username</label>
							</div>
							<div className="field-body is-normal">
								<div className="field">
									<div className="control">
										<input
											id="username"
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
								<label className="label">Password</label>
							</div>
							<div className="field-body is-normal">
								<div className="field">
									<div className="control">
										<input
											id="passowrd"
											type="password"
											className="input is-normal"
											placeholder="eg. *****"
											value={this.props.user.password}
											onChange={this.props.handlePassword.bind(this)}
											ref="password"
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
										<input type="submit" className="button is-primary is-normal" value="Login" />
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