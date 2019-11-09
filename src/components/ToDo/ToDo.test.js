import React from 'react';
import { shallow } from 'enzyme';

import ToDo from './ToDo';
import { formatDate } from '../../helpers/utility';
import constants from '../../helpers/constants';

const updateTodo = jest.fn();

function shallowSetup(isDeleted = false) {
  const props = {
    updateTodo,
    todo: {
      id: Date.now(),
      text: 'This is todo item component test',
      status: constants.status.pending,
      due_date: formatDate(),
      completed_at: null,
      deleted_at: !isDeleted ? null : formatDate(),
    }
  }
  const wrapper = shallow(<ToDo {...props}/>);

  return {
    props,
    wrapper,
  }
}

describe('Active todo item component unit tests.', () => {
  it('Component should render successfully', () => {
    const shallowWrapper = shallowSetup();
    expect(shallowWrapper.wrapper.length).toEqual(1);
    expect(shallowWrapper.wrapper).toMatchSnapshot();
  });

  it('Active component should render with todo details', () => {
    const shallowWrapper = shallowSetup();
    const textWrapper = shallowWrapper.wrapper.find('[data-test="todo-item-text"]');
    const editBtnWrapper = shallowWrapper.wrapper.find('[data-test="todo-edit-btn"]');
    const deleteBtnWrapper = shallowWrapper.wrapper.find('[data-test="todo-delete-btn"]');
    const markBtnWrapper = shallowWrapper.wrapper.find('[data-test="todo-mark-btn"]');

    expect(textWrapper.text()).toEqual(shallowWrapper.props.todo.text);
    expect(editBtnWrapper.length).toEqual(1);
    expect(deleteBtnWrapper.length).toEqual(1);
    expect(markBtnWrapper.length).toEqual(1);
  });

  it('Clicking edit button should call', () => {
    const spy = jest.spyOn(ToDo.prototype, 'editHandler').mockImplementation(jest.fn());
    const shallowWrapper = shallowSetup();
    const editBtnWrapper = shallowWrapper.wrapper.find('[data-test="todo-edit-btn"]').first();
    editBtnWrapper.simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('Clicking delete button should call', () => {
    const spy = jest.spyOn(ToDo.prototype, 'onDelete');
    const shallowWrapper = shallowSetup();
    const deleteBtnWrapper = shallowWrapper.wrapper.find('[data-test="todo-delete-btn"]').first();
    deleteBtnWrapper.simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('Clicking mark button should call', () => {
    const spy = jest.spyOn(ToDo.prototype, 'toggleStatus');
    const shallowWrapper = shallowSetup();
    const markBtnWrapper = shallowWrapper.wrapper.find('[data-test="todo-mark-btn"]').first();
    markBtnWrapper.simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  // /* The following test case are for delete todos where we show option to restore todo item. */

  it('Deleted component should render with todo details', () => {
    const shallowWrapper = shallowSetup(true);
    const textWrapper = shallowWrapper.wrapper.find('[data-test="todo-item-text"]');
    const restoreBtnWrapper = shallowWrapper.wrapper.find('[data-test="todo-restore-btn"]');

    expect(textWrapper.text()).toEqual(shallowWrapper.props.todo.text);
    expect(restoreBtnWrapper.length).toEqual(1);
  });

  it('Clicking restore button should call', () => {
    const spy = jest.spyOn(ToDo.prototype, 'restoreHandler');
    const shallowWrapper = shallowSetup(true);
    const restoreBtnWrapper = shallowWrapper.wrapper.find('[data-test="todo-restore-btn"]').first();
    restoreBtnWrapper.simulate('click');
    expect(spy).toHaveBeenCalled();
  });

});
