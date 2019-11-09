import React from 'react';

import constants from '../../helpers/constants';
import './CreateOrEdit.scss';

class CreateOrEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      text: '',
      status: constants.status.pending,
      due_date: '',
      completed_at: null,
      deleted_at: null,
      is_pending: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentDidMount() {
    const { todo } = this.props;
    if (todo) {
      this.setState(() => ({
        ...todo,
        is_pending: todo.status === constants.status.completed,
      }));
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    if (name === 'status') {
      this.setState((prevState) => ({ [name]: !prevState.is_pending ? constants.status.completed : constants.status.pending, is_pending: !prevState.is_pending }));
    } else {
      this.setState(() => ({ [name]: value }));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { uuid, text, status, due_date } = this.state;
    const { createTodo, updateTodo, history } = this.props;
    if (!text) {
      history.push('/home');
      return;
    }
    const todo = {
      text,
      status,
      due_date,
      completed_at: null,
    }
    
    if (uuid) {
      todo.uuid = uuid;
      updateTodo(this.state.uuid, todo);
    } else {
      todo.uuid = Date.now() + '';
      createTodo(todo);
    }
    history.push('/home');
  }

  onCancel() {
    const { history } = this.props;
    history.push('/home');
  }

  render() {
    const { text, is_pending, due_date } = this.state;
    return (
      <div className="createoredit-page">
        <form data-test="createoredit-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Text</label>
            <input type="text" className="form-control"  name="text" data-test="todo-text" placeholder="Enter description here..." value={text} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input type="date" className="form-control" name="due_date" data-test="todo-duedate" value={due_date} onChange={this.handleChange} />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" name="status" data-test="todo-status" checked={is_pending} onChange={this.handleChange} />
            <label className="form-check-label">Mark {!is_pending ? 'complete' : 'pending'}</label>
          </div>
          <div className="action-btns">
            <button type="submit" data-test="todo-submit-btn" className="btn btn-primary">Create</button>
            <button className="btn btn-secondary" onClick={this.onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateOrEdit;
