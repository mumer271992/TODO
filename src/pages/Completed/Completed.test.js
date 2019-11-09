import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Switch,
} from 'react-router-dom';

import Completed from './CompletedHOC';
import { formatDate } from '../../helpers/utility';
import constants from '../../helpers/constants';

const mockStore = configureStore();
const list = [
  {
    uuid: Date.now() + '1',
    text: 'This is first pending task',
    status: constants.status.completed,
    due_date: formatDate(),
    completed_at: null,
    deleted_at: null,
  },
  {
    uuid: Date.now() + '2',
    text: 'This is second pending task',
    status: constants.status.completed,
    due_date: formatDate(),
    completed_at: null,
    deleted_at: null,
  }
];

function mountSetup() {
  const store = mockStore({
    todos: {
      list,
    }
  });
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Completed />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
  return wrapper;
}

describe('Completed page test', () => {
  let enzymeWrapper;
  beforeEach(() => {
    enzymeWrapper = mountSetup();
  });
  it('Completed page render successfully', () => {
    expect(enzymeWrapper.length).toEqual(1);
  });
  it('should render all items successfully', () => {
    expect(enzymeWrapper.find('[data-test="list-group-item"]').length).toEqual(list.length);
  });
});