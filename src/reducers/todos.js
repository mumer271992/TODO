import { getList } from '../helpers/localStorage';
import constants from '../helpers/constants';

const list = getList();
const defaultState = {
  list,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.actionTypes.create: {
      let list = [...state.list];
      list.push(action.item);
      return {
        list,
      };
    }
    case constants.actionTypes.update: {
      let list = [...state.list];
      const targetIndex = list.findIndex(item => item.uuid === action.uuid);
      if (targetIndex > -1) {
        list[targetIndex] = { ...list[targetIndex] ,...action.item };
      }
      return {
        list,
      };
    }
    default:
      return state;
  }
};
