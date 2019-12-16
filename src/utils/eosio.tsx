import axios from 'axios';
import { pathOr } from 'ramda';

export const getHeadBlockId = () =>
  axios.get('https://api.eosnewyork.io/v1/chain/get_info')
  .then(pathOr('', ['data', 'head_block_id']));

export const getBlockById = (blockId: string) =>
  axios.post('https://api.eosnewyork.io/v1/chain/get_block', {
    block_num_or_id: blockId
  })
  .then(result => {
    console.log(result);
  });

export const getHeadBlock = () => {
  console.log('getHeadBlock Called');
  return getHeadBlockId()
  .then(getBlockById);
}
