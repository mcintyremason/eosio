import * as React from 'react';

import { getTopTenBlocks, Block } from '../../utils/eosio';

type HomePageType = {
  blocks: Array<Block>;
};

class HomePage extends React.Component<{}, HomePageType> {
  constructor(props: any) {
    super(props);

    this.state = {
      blocks: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    return getTopTenBlocks()
    .then((blocks: Array<Block>) => {
      this.setState({
        blocks
      });
    })
    .catch(console.log);
  }

  render() {
    const { blocks } = this.state;

    return(
      <div>
        <h1>EOS.IO</h1>
        <button value='LOAD' onClick={this.handleClick}>LOAD</button>
        <ul>
          {blocks.map(block => {
            return (<li key={block.id}>{block.id}</li>);
          })}
        </ul>
      </div>
    );
  }
}

export default HomePage;
