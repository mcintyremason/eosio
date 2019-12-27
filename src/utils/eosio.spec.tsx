import { assert, expect } from 'chai';

import { getTopTenBlocks, Block } from './eosio';

describe('Utilities', () => {
  describe('eosio', () => {
    let blocks: Array<Block> = [];

    describe('getTopTenBlocks', () => {
      before(done => {
        getTopTenBlocks()
        .then((_blocks: Array<Block>) => {
          blocks = _blocks;
          done();
        });
      });

      it('should always resolve an array', () => {
        assert.isArray(blocks);
      });

      it('should always resolve the top 10 blocks in the blockchain', () => {
        expect(blocks).to.have.lengthOf(10);
      });

      it('should always resolve blocks with at least an id', () => {
        for (let i = 0, l = blocks.length; i < l; i++) {
          let block = blocks[i];

          assert.exists(block.id);
        }
      });

      it('should always contain at least on action', () => {
        let actionsCount = 0;

        for (let i = 0, l = blocks.length; i < l; i++) {
          let block = blocks[i];

          actionsCount += block.actionsCount;
        }

        expect(actionsCount).gt(0);
      });
    });
  });
});
