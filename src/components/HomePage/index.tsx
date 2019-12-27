import * as React from 'react';

import { isEmpty } from 'ramda';
import {
  Button, CircularProgress, Container, Grid, Typography
} from '@material-ui/core';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import { getTopTenBlocks, Block } from '../../utils/eosio';
import BlockTable from '../BlockTable';

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
      loading
    } = this.state;

    return(
      <Container
        className='home-page-container'
      >
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
        >
          <h1>EOS.IO</h1>
          <Button
            className='load-button'
            color='primary'
            variant='contained'
            value='LOAD'
            disabled={loading}
            onClick={this.handleClick}
          >
            <Typography>LOAD</Typography>
          </Button>
        </Grid>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          className='block-table-grid'
        >
          {loading
          ? <MuiThemeProvider><CircularProgress /></MuiThemeProvider>
          : !isEmpty(blocks) && <div className='block-table-container'>
            <BlockTable
              rows={blocks}
              cols={[
                'id',
                'timestamp',
                'actionsCount'
              ]}
            />
          </div>}
        </Grid>
      </Container>
    );
  }
}

export default HomePage;
