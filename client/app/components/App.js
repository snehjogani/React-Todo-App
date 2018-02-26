import React from "react";
import { observer } from "mobx-react";

import AppView from "../views/AppView";

@observer
export default class App extends React.Component {
	onLogout() {
		localStorage.removeItem('token');
		this.props.user.setUsername('');
		this.props.user.setPassword('');
		this.props.user.setToken(null);
	}
	render() {
		let props = this.props;
		return (
			<AppView
				{...props}
				onLogout={this.onLogout}
			/>
		);
	}
}

