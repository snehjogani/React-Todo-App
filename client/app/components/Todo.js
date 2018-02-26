import React, { Component } from "react";
import superagent from "superagent";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";

import TodoView from "../views/TodoView";

var inputs = observable({
  create: '',
  edit: ''
});
inputs.setCreate = action((value) => { inputs.create = value; });
inputs.setEdit = action((value) => { inputs.edit = value; });

var error = observable({ error: '' });
error.setError = action((value) => { error.error = value; });

var todoList = observable.array({ id: '', name: '', status: '', isEditing: false });
todoList.setList = action((value) => {
  todoList.push({ id: value._id, name: value.name, status: value.status, isEditing: false });
});
todoList.setEdit = action((id) => {
  todoList.map((todo) => {
    if (todo.id === id)
      todo.isEditing = !todo.isEditing;
  });
});

@observer
export default class Todo extends Component {
  render() {
    this.fetchItems();
    return (
      <TodoView
        todoList={todoList}
        inputs={inputs}
        error={error}
        handleCreate={this.handleCreate}
        onCreate={this.onCreate}
        onSave={this.onSave}
        onEdit={this.onEdit}
        onCancel={this.onCancel}
        onDelete={this.onDelete}
        renderError={this.renderError}
      />
    );
  }

  //List all todos of the user
  fetchItems() {
    fetch('http://localhost:3030/todo', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    })
      .then(results => {
        return results.json();
      }).then(data => {
        let todos = _.map(data.data, (todo) => {
          todoList.setList(todo);
        });
      });
  }

  onCreate(event) {
    event.preventDefault();
    console.log('in OnCreate');
    error.setError(null);
    if (this.refs.createInput.value == '') {
      error.setError("Todo cannot be empty");
      return;
    };
    fetch('http://localhost:3030/todo', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputs.create
      })
    })
      .then((res) => {
        return res.json();
      }).then((data) => {
        if (data.message) {
          error.setError(data.message);
          return;
        }
        todoList.push({ id: data._id, name: data.name, status: data.status });
        inputs.setCreate('');
        error.setError(null);
      });
  }

  onSave(newTodo, id) {
    let url = "http://localhost:3030/todo/" + id;
    fetch(url, {
      mode: 'cors',
      method: 'PATCH',
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newTodo
      })
    }).then((res) => {
      return res.json();
    }).then((data) => {
      if (!data.message) {
        todoList.map((todo) => {
          if (todo.id === id)
            todo.name = newTodo;
        });
        todoList.setEdit(id);
      }
    });
  }

  onDelete(id) {
    let url = "http://localhost:3030/todo/" + id;
    fetch(url, {
      mode: 'cors',
      method: 'DELETE',
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      return res.json();
    }).then((data) => {
      if (!data.message) {
        todoList.map((todo) => {
          if (todo.id === id)
            todoList.remove(todo);
        });
        todoList.setEdit(id);
      }
    });
  }

  handleCreate(event) {
    inputs.setCreate(event.target.value);
  }

  onEdit(id) {
    todoList.setEdit(id);
  }

  onCancel(id) {
    todoList.setEdit(id);
  }
  
  renderError() {
    if (error.error === "") { return null; }
    return (<p className="control subtitle is-4" style={{ color: 'red' }}>{error.error}</p>);
  }
}
