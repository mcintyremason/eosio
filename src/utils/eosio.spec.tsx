import { expect } from 'chai';

import { getTopTenBlocks, Block } from './eosio';

describe('Utilities', () => {
  describe('eosio', () => {
    describe('getTopTenBlocks', () => {
      it('should always get the top 10 blocks in the blockchain', (done) => {
        getTopTenBlocks()
        .then((blocks: Array<Block>) => {
          expect(blocks.length).to.eq(10);
          done();
        });
      }).timeout(10000);
    });
  });
});
