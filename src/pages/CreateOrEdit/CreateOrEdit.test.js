import React from 'react';
import { mount } from 'enzyme';

import CreateOrEdit from './CreateOrEdit';
import { formatDate } from '../../helpers/utility';
import constants from '../../helpers/constants';

const todo = {
  uuid: Date.now(),
  text: 'This is update todo item component test',
  status: constants.status.pending,
  due_date: formatDate(),
  completed_at: null,
  deleted_at: null,
}

function shallowSetup(isEditMode = false) {
  let props = {
    createTodo: jest.fn(),
    updateTodo: jest.fn(),
  }
  if (isEditMode) {
    props.todo = todo;
  }
  const wrapper = mount(<CreateOrEdit {...props}/>);
  return wrapper;
}

describe('Create todo page test', () => {
  let enzymeWrapper;

  it('create todo page render successfully', () => {
    enzymeWrapper = shallowSetup();
    expect(enzymeWrapper.length).toEqual(1);
  });

  it('is form loaded with all fields', () => {
    enzymeWrapper = shallowSetup();
    const textWrapper = enzymeWrapper.find("[data-test='todo-text']");
    const duedataWrapper = enzymeWrapper.find("[data-test='todo-duedate']");
    const statusWrapper = enzymeWrapper.find("[data-test='todo-status']");
    const submitWrapper = enzymeWrapper.find("[data-test='todo-submit-btn']");

    expect(textWrapper.length).toEqual(1);
    expect(duedataWrapper.length).toEqual(1);
    expect(statusWrapper.length).toEqual(1);
    expect(submitWrapper.length).toEqual(1);
  });

  it('is change handler called properly', () => {
    const testText = 'This is change text test';
    const dueDate = '2019-11-09';

    enzymeWrapper = shallowSetup();
    const spy = jest.spyOn(enzymeWrapper.instance(), 'handleChange');
    const textWrapper = enzymeWrapper.find("[data-test='todo-text']").at(0);
    const duedataWrapper = enzymeWrapper.find("[data-test='todo-duedate']").at(0);
    textWrapper.simulate('change', {
      target: {
        value: testText,
        name: 'text'
      },
    });
    duedataWrapper.simulate('change', {
      target: {
        value: dueDate,
        name: 'due_date'
      },
    });

    expect(enzymeWrapper.state().text).toEqual(testText);
    expect(enzymeWrapper.state().due_date).toEqual(dueDate);
    expect(spy).toHaveBeenCalled();
  });

  it('should call submit handler on form submit', () => {
    const spy = jest.spyOn(CreateOrEdit.prototype, 'handleSubmit').mockImplementation(jest.fn());
    enzymeWrapper = shallowSetup();
    const formWrapper = enzymeWrapper.find("[data-test='createoredit-form']").first();
    formWrapper.simulate('submit');
    expect(spy).toHaveBeenCalled();
  });

  it('should pre-populate todo form to edit', () => {
    enzymeWrapper = shallowSetup(true);
    const textWrapper = enzymeWrapper.find("[data-test='todo-text']");
    const initialisedState = enzymeWrapper.state();

    expect(enzymeWrapper.state().uuid).not.toEqual('');
    expect(textWrapper.instance().value).toEqual(initialisedState.text);
  });
});