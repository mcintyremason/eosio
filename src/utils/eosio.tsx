import axios, { AxiosResponse } from 'axios';
import { pathOr, propOr, isNil } from 'ramda';

export type Block = {
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

const getHeadBlockId = () =>
  axios.get('https://api.eosnewyork.io/v1/chain/get_info')
  .then(pathOr('', ['data', 'head_block_id']));

const getBlockById = (blockId: string) =>
  axios.post('https://api.eosnewyork.io/v1/chain/get_block', {
    block_num_or_id: blockId
  })
  .then((result: AxiosResponse<any>) => {
    const data = pathOr({} as Block, ['data'], result);
    const block: Block = {
      ...data
    };

    return block;
  });

const getPreviousBlock = (block: Block): Promise<Block> => getBlockById(propOr({} as Block, 'previous', block));

const getHeadBlock = () =>
  getHeadBlockId()
  .then(getBlockById);

export const getTopTenBlocks = (blockArray: Array<Block> = [], block?: Block): any =>
  new Promise((resolve, reject) => {
    const blockLimit = 10;

    if (blockArray.length === blockLimit) {
      return resolve(blockArray);
    } else if (blockArray.length === 0 && isNil(block)) {
      return resolve(getHeadBlock()
      .then(headBlock => {
        return getTopTenBlocks(blockArray, headBlock)
        .catch(reject);
      })
      .catch(reject));
    } else if (block) {
      return resolve(getPreviousBlock(block)
      .then(previousBlock => {
        blockArray.push(block);
        return getTopTenBlocks(blockArray, previousBlock)
        .catch(reject);
      })
      .catch(reject));
    }
  });
