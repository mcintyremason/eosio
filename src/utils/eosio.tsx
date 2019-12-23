import axios, { AxiosResponse } from 'axios';
import { pathOr, propOr, isNil } from 'ramda';

type ActionAuthorization = {
  actor: string,
  permission: string
}

type ActionData = {
  from: string,
  to: string,
  quantity: string,
  memo: string
}

type Action = {
  account: string,
  name: string,
  authorization: Array<ActionAuthorization>,
  data: ActionData,
  hex_data: string
};

type TRXTransaction = {
  expiration: string,
  ref_block_num: number,
  ref_block_prefix: number,
  max_net_usage_words: number,
  max_cpu_usage_ms: number,
  delay_sec: number,
  context_free_actions: Array<any>
  actions: Array<Action>,
  transaction_extensions: Array<any>
};

type BlockTransaction = {
  status: string,
  cpu_usage_us: 3033,
  net_usage_words: 106,
  trx: {
    id: string,
    signatures: Array<string>,
    compression: string,
    packed_context_free_data: string,
    context_free_data: Array<any>,
    packed_trx: string,
    transaction: TRXTransaction
  }
};

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
  transactions: Array<BlockTransaction>,
  transactionsCount?: number,
  block_extensions: Array<any>,
  id: string,
  block_num: string,
  ref_block_prefix: number,
  actionsCount: number
};

export const getBlockActions = (block: Block): Array<Action> => {
  let actions: Array<Action> = [];

  for (let i = 0, l = block.transactions.length; i < l; i++) {
    const transaction = block.transactions[i];
    const trxTransaction: TRXTransaction = pathOr({} as TRXTransaction, ['trx', 'transaction'], transaction);

    trxTransaction && trxTransaction.actions && actions.push(...trxTransaction.actions);
  }

  return actions;
};

const getHeadBlockId = () =>
  axios.get('https://api.eosnewyork.io/v1/chain/get_info')
  .then(pathOr('', ['data', 'last_irreversible_block_id']));

const getBlockById = (blockId: string) =>
  axios.post('https://api.eosnewyork.io/v1/chain/get_block', {
    block_num_or_id: blockId
  })
  .then((result: AxiosResponse<any>) => {
    const data = pathOr({} as Block, ['data'], result);
    const block: Block = {
      ...data,
      actionsCount: getBlockActions(data).length
    };

    return block;
  });

const getPreviousBlock = (block: Block): Promise<Block> => getBlockById(propOr({}, 'previous', block));

const getHeadBlock = () =>
  getHeadBlockId()
  .then(getBlockById);

// Recursively retrieve the latest 10 blocks on the blockchain
export const getTopTenBlocks = (blockArray: Array<Block> = [], block?: Block): any =>
  new Promise((resolve, reject) => {
    const blockLimit = 10;

    if (blockArray.length === blockLimit) {
      return resolve(blockArray);
    } else if (blockArray.length === 0 && isNil(block)) {
      return resolve(getHeadBlock()
        .then(headBlock => {
          return getTopTenBlocks(blockArray, headBlock).catch(reject);
        })
        .catch(reject));
    } else if (block) {
      return resolve(getPreviousBlock(block)
      .then(previousBlock => {
        blockArray.push(block);
        return getTopTenBlocks(blockArray, previousBlock).catch(reject);
      })
      .catch(reject));
    }
  });
