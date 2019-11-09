import { create, update } from '../helpers/localStorage';
import constants from '../helpers/constants';

export const createTodo = (todo) => {
  create(todo);
  return {
    type: constants.actionTypes.create,
    item: todo,
  };
};

export const updateTodo = (uuid, todo) => {
  update(uuid, todo);
  return {
    type: constants.actionTypes.update,
    uuid,
    item: todo,
  }
}