import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';

import { testBlock } from '../../utils/eosio-test-data';
import BlockDialog, { BlockDialogProps } from '.';

const blockDialogProps: BlockDialogProps = {
  onClose: () => {},
  selectedValue: testBlock,
  open: true
};

const wrapper = mount(<BlockDialog { ...blockDialogProps } />);

describe('BlockDialog', () => {
  it('renders the block as JSON', () => {
    expect(wrapper.find('pre').text()).to.eq(JSON.stringify(testBlock, null, 2));
    wrapper.unmount();
  });
});