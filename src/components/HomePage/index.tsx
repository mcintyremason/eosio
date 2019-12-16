import * as React from 'react';

import { getHeadBlock } from '../../utils/eosio';

class HomePage extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    getHeadBlock();
  }

  render() {
    return(
      <div>
        <h1>EOS.IO</h1>
        <button value='LOAD' onClick={this.handleClick}>LOAD</button>
      </div>
    );
  }
}

export default HomePage;
