import React, { Component } from "react";
import { observer } from "mobx-react";
import _ from "lodash";

import ListView from "./ListView";

@observer
export default class TodoView extends Component {
	render() {
		return (
			< div className="hero has-text-centered">
				<div className="container column">
					<h1 className="title is-1 is-spaced" >Todo App</h1>
				</div>
				<div className="container level column">
					<form>
						<div className="box field is-grouped">
							<p className="control is-expanded">
								<input
									className="input"
									type="text"
									ref="createInput"
									placeholder="What do you need to do?"
									onChange={this.props.handleCreate.bind(this)}
									value={this.props.inputs.create}
								/>
							</p>
							<p className="control">
								<input
									type="submit"
									onClick={this.props.onCreate.bind(this)}
									className="button is-success is-outlined"
									value="Create"
								/>
							</p>
						</div>
						{this.props.renderError()}
					</form>
				</div>
				<div className="container column">
					{/* <List
						token={this.props.token}
						editTodo={this.props.editTodo.bind(this)}
						deleteTodo={this.props.deleteTodo.bind(this)}
					/> */}
					<table className="table is-bordered is-text-centered">
						<thead>
							<tr>
								<th className="subtitle is-4" >Todo</th>
								<th className="subtitle is-4" >Actions</th>
							</tr>
						</thead>
						<tbody>
							{/* {this.state.todos} */}
							{_.map(this.props.todoList, (todo, index) => {
								let props = (this.props);
								// console.log(todo.id);
								return (
									// <tr key={index}>
									// 	<td>{todo.name}</td>
									// </tr>
									<ListView	
										setEdit={this.props.todoList.setEdit}
										key={index}
										name={todo.name}
										_id={todo.id}
										isEditing={todo.isEditing}
										{...props}
									/>
								)
							})}
						</tbody>
					</table>
				</div>
			</div >
		)
	}
}