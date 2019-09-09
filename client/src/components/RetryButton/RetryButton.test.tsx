import React from 'react';
import { shallow, mount } from 'enzyme';
import RetryButton from './RetryButton';

const props = { onClick: jest.fn() };

describe('RetryButton component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<RetryButton onClick={props.onClick} />);

    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should render a button', () => {
    const wrapper = mount(<RetryButton onClick={props.onClick} />);
    const button = wrapper.find('button');

    expect(button.length).toEqual(1);
  });

  it('should fire onClick prop function on click', () => {
    const wrapper = mount(<RetryButton onClick={props.onClick} />);
    wrapper.find('button').simulate('click');

    expect(props.onClick).toBeCalledTimes(1);
  });
});
