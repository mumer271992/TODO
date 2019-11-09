import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

describe('Header component unit tests.', () => {
  it('Component should render successfully', () => {
    const shallowWrapper = shallow(<Header />);
    expect(shallowWrapper.length).toEqual(1);
    expect(shallowWrapper.wrapper).toMatchSnapshot();
  });
  // TODO: write unit tests for navigation to all pages through header tabs
});
