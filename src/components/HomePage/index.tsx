import * as React from 'react';

import { getTopTenBlocks, Block } from '../../utils/eosio';
import { CircularProgress } from 'material-ui';

type HomePageType = {
  blocks: Array<Block>;
  loading: boolean;
};

class HomePage extends React.Component<{}, HomePageType> {
  constructor(props: any) {
    super(props);

    this.state = {
      blocks: [],
      loading: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      loading: true
    });

    return getTopTenBlocks()
    .then((blocks: Array<Block>) => {
      this.setState({
        blocks,
        loading: false
      });
    })
    .catch(console.log);
  }

  render() {
    const {
      blocks,
      loading,
    } = this.state;

    return(
      <div>
        <div>
          <h1>EOS.IO</h1>
          <button value='LOAD' onClick={this.handleClick}>LOAD</button>
        </div>
        <div>
          {loading
          ? <CircularProgress />
          : <ul>
            {blocks.map(block => {
              return (<li key={block.id}>{block.id}</li>);
            })}
          </ul>}
        </div>
      </div>
    );
  }
}

export default HomePage;
