import reducer from './todos';
import { formatDate } from '../helpers/utility';
import constants from '../helpers/constants';

describe('todos reducer', () => {
  const currentTime = Date.now() + '';
  const todo = {
    uuid: currentTime,
    text: 'This is reducer creator test',
    status: constants.status.pending,
    due_date: formatDate(),
    completed_at: null,
    deleted_at: null,
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
        list: [],
      });
  });

  it('should handle CREATE TODO', () => {
    expect(
      reducer({ list: [] }, {
        type: constants.actionTypes.create,
        item: todo,
      })
    ).toEqual({
      list: [todo],
    });
  });

  it('should handle UPDAE TODO', () => {
    const expected = {
      list: [{ ...todo, text: 'This is reducer update test' }],
    };
    const item = {
      ...todo,
      text: 'This is reducer update test'
    };
    const newState = reducer({ list: [todo]}, {
      type: constants.actionTypes.update,
      uuid: currentTime,
      item,
    });
    expect(newState).toEqual(expected);
  })
});