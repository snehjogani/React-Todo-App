import React from 'react';
import { observable, action } from "mobx";
import { observer } from "mobx-react";

@observer
export default class ListView extends React.Component {
  render() {
    const { name, status } = this.props;
    var isCompleted = false;
    if (status == "completed") { isCompleted = true; }
    const style = {
      color: isCompleted ? 'green' : 'purple',
      cursor: 'pointer',
    }
    return (
      <tr className="level-items">
        {this.props.isEditing ? (
          <td>
            <form className="field is-grouped" onSubmit={this.onSave.bind(this)}>
              <p className="control">
                <input className="input" type="text" defaultValue={name} ref="editInput" />
              </p>
            </form>
          </td>
        ) : (<td className="subtitle is-5" style={style}> {name} </td>)}
        {this.props.isEditing ? (
          <td>
            <div className="field is-grouped">
              <p className="control">
                <a className="button is-success is-outlined" onClick={this.onSave.bind(this)}>Save</a>
              </p>
              <p className="control">
                <button className="button is-light" onClick={this.props.onCancel.bind(this, this.props._id)}>Cancel</button>
              </p>
            </div>
          </td>
        ) : (
            <td>
              <div className="field is-grouped">
                <p className="control">
                  <button className="button is-link is-outlined" onClick={() => { console.log("in edit"); this.props.todoList.setEdit(this.props._id); }}>
                    <span>Edit</span>
                  </button>
                </p>
                <p className="control">
                  <button className="button is-danger is-outlined" onClick={this.props.onDelete.bind(this, this.props._id)}>
                    <span>Delete</span>
                  </button>
                </p>
              </div>
            </td>
          )}
      </tr>
    );
  }
  onSave(event) {
    event.preventDefault();
    const newTodo = this.refs.editInput.value;
    this.props.onSave(newTodo, this.props._id);
  }
}
