import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';

import HomePage from '.';

const wrapper = mount(<HomePage />);

describe('HomePage Component', () => {
  it('renders title as h1', () => {
    expect(wrapper.find('h1').text()).to.equal('EOS.IO');
  });

  it('renders load button', () => {
    expect(wrapper.find('button').find('p').text()).to.equal('LOAD');
  });

  it('clicks load button', () => {
    wrapper.find('button').simulate('click');
    wrapper.update();
    expect(wrapper.state('loading')).to.eq(true);
  });
});
