import React, { Component } from "react";
import _ from "lodash";
import { Route, Redirect, Link } from "react-router-dom";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";

import Todo from "../components/Todo";
import Login from "../components/Login";
import Register from '../components/Register';

@inject('routing')
@observer
export default class AppView extends Component	{
	render() {
		const { push, location, goBack } = this.props.routing;
		return (
			<div className="hero">
				<div className="hero-head">
					{/* <div className="hero is-primary is-bold is-small" > */}
					{/* <div className="hero-body" > */}
					<nav className="navbar is-fixed-top">
						<div className=" navbar-menu">
							{this.props.user.token ? (
								<div className=" navbar-start">
									<Link to="/" className="navbar-item">Dashboard</Link>
									<Link to="/login" className="navbar-item" onClick={(this.props.onLogout.bind(this))/* , ()=>push('/login')) */} >Logout</Link>
								</div>
							) : (
									<div className=" navbar-start">
										<Link to="/login" className="navbar-item" >Login</Link>
										<Link to="/register" className="navbar-item" >Register</Link>
									</div>
								)
							}
						</div>
						</nav>
						{/* </div>		 */}
						{/* </div> */}
				</div>
				<div className="hero-body is-pulled-left">
					<Route exact path="/" render={() => (
						this.props.user.token ? (
							<Todo />
						) : (
								<Redirect to={{ pathname: "/login" }} />
							)
					)} />
					<Route exact path="/login" render={() => (
						this.props.user.token ? (
							<Redirect to={{ pathname: "/" }} />
						) : (
								<Login user={this.props.user} />
							)
					)} />
					<Route exact path="/register" render={() => (
						this.props.user.token ? (
							<Redirect to={{ pathname: "/" }} />
						) : (
								<Register />
							)
					)} />
				</div>
			</div>
		);
	}
}