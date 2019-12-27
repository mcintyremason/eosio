import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';

import BlockTable from '.';
import { getTopTenBlocks, Block } from '../../utils/eosio';

const blockTableProps: { rows: Array<Block>, cols: Array<string> } = {
  rows: [],
  cols: [
    'id',
    'timestamp',
    'actionsCount'
  ]
};

const wrapper = mount(<BlockTable { ...blockTableProps } />);

describe('BlockTable Component', () => {

  describe('base state', () => {
    it('should contain one row in the table', () => {
      expect(wrapper.find('tr').length).to.eq(1);
    });
  });

  describe('after API calls to EOS.IO blockchain', () => {
    before(done => {
      getTopTenBlocks()
      .then((_blocks: Array<Block>) => {
        wrapper.setState({
          rows: _blocks
        });
        done();
      });
    });

    it('should contain 11 rows in the table', () => {
      wrapper.update();
      expect(wrapper.find('tr').length).to.equal(11);
    });

    it('should click the first row with data in the table to open the BlockDialog', () => {
      wrapper.find("tr[data-test-id='block-table-0']").simulate('click');
      wrapper.update();
      expect(wrapper.state('showDialog')).to.eq(true);
    });

    it('should close the BlockDialog', () => {
      wrapper.find("button[data-test-id='block-dialog-close']").simulate('click');
      wrapper.update();
      expect(wrapper.state('showDialog')).to.eq(false);
      wrapper.unmount();
    });
  });
});
