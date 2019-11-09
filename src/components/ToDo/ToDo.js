import React from 'react';

import { formatDate } from '../../helpers/utility';
import constants from '../../helpers/constants';
import './ToDo.scss';

class ToDo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status: '',
    }
    this.editHandler = this.editHandler.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
    this.restoreHandler = this.restoreHandler.bind(this);
  }

  editHandler() {
    const { todo, history } = this.props;
    history.push(`/todo/${todo.uuid}`);
  }

  onDelete() {
    const { updateTodo, todo } = this.props;
    const item = {
      deleted_at: formatDate(),
    };
    updateTodo(todo.uuid, item);
  }

  restoreHandler() {
    const { updateTodo, todo } = this.props;
    const item = {
      deleted_at: null,
    };
    updateTodo(todo.uuid, item);
  }

  toggleStatus() {
    const { updateTodo, todo } = this.props;
    let status = todo.status;
    let completed_at = null;
    if (status === constants.status.pending) {
      status = constants.status.completed;
      completed_at = formatDate();
    } else {
      status = constants.status.pending;
      completed_at = null;
    }
    const item = {
      status,
      completed_at,
    };
    updateTodo(todo.uuid, item);
  }
  

  render() {
    const { todo } = this.props;
    return (
      <li
        data-test="list-group-item"
        className="todo-item list-group-item d-flex flex-row justify-content-between"
      >
        <div data-test="todo-item-text">{ todo.text }</div>
        <div>
          { todo.due_date }
        </div>
        <div>
          {
            !todo.deleted_at ? (
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" data-test="todo-edit-btn" className="btn btn-primary " onClick={this.editHandler}>Edit</button>
            <button type="button" data-test="todo-mark-btn" className="btn btn-secondary" onClick={this.toggleStatus}>Mark {todo.status === 'pending' ? 'complete' : 'pending'}</button>
                <button type="button" data-test="todo-delete-btn" className="btn btn-danger" onClick={this.onDelete}>Delete</button>
              </div>
            ) : (
              <button type="button" data-test="todo-restore-btn" className="btn btn-secondary" onClick={this.restoreHandler}>Restore</button>
            )
          }
        </div>
      </li>
    );
  }
}

export default ToDo;
