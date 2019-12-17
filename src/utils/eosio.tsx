import axios from 'axios';
import { pathOr, propOr, isNil } from 'ramda';

type Block = {
  timestamp: string,
  producer: string,
  confirmed: string,
  previous: string,
  transaction_mroot: string,
  action_mroot: string,
  schedule_version: string,
  new_producers: string,
  header_extensions: Array<string>,
  producer_signature: string,
  transactions: Array<Object>,
  block_extensions: Array<any>,
  id: string,
  block_num: string,
  ref_block_prefix: number
};

export const getHeadBlockId = () =>
  axios.get('https://api.eosnewyork.io/v1/chain/get_info')
  .then(pathOr('', ['data', 'head_block_id']));

export const getBlockById = (blockId: string) =>
  axios.post('https://api.eosnewyork.io/v1/chain/get_block', {
    block_num_or_id: blockId
  })
  .then(pathOr('', ['data']));

const getPreviousBlock = (block: any) => getBlockById(propOr('', 'previous', block));

export const getHeadBlock = () =>
  getHeadBlockId()
  .then(getBlockById);

export const getTopTenBlocks = (blockArray: Array<any> = [], block?: any): any => {
  return new Promise((resolve, reject) => {
    if (blockArray.length === 10) {
      console.log(blockArray);
      resolve(blockArray);
    } else if (blockArray.length === 0 && isNil(block)) {
      getHeadBlock()
      .then(headBlock => {
        getTopTenBlocks(blockArray, headBlock)
        .catch(reject);
      })
      .catch(reject);
    } else if (block) {
      console.log(block.id);
      console.log(blockArray.length);
      getPreviousBlock(block)
      .then(previousBlock => {
        blockArray.push(block);
        getTopTenBlocks(blockArray, previousBlock)
        .catch(reject);
      })
      .catch(reject);
    }
  });
};
