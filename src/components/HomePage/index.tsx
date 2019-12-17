import * as React from 'react';

import { getTopTenBlocks } from '../../utils/eosio';

class HomePage extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // getHeadBlock();
    getTopTenBlocks()
    .then((data: any) => {
      console.log(data);
    })
    .catch(console.log);
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
