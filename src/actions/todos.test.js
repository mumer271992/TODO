import { createTodo, updateTodo } from './todos';
import { formatDate } from '../helpers/utility';
import constants from '../helpers/constants';


describe('actions test', () => {
  it('should create an action to add a todo', () => {
    const todo = {
      uuid: Date.now(),
      text: 'This is action creator test',
      status: constants.status.pending,
      due_date: formatDate(),
      completed_at: null,
      deleted_at: null,
    }
    const expectedAction = {
      type: constants.actionTypes.create,
      item: todo,
    }
    expect(createTodo(todo)).toEqual(expectedAction)
  });
  it('should create an action to update a todo', () => {
    const todo = {
      uuid: Date.now(),
      text: 'This is action creator test',
      status: constants.status.pending,
      due_date: formatDate(),
      completed_at: null,
      deleted_at: null,
    }
    const expectedAction = {
      type: constants.actionTypes.update,
      uuid: todo.uuid,
      item: todo,
    }
    expect(updateTodo(todo.uuid, todo)).toEqual(expectedAction)
  })
})