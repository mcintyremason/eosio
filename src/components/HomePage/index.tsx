import * as React from 'react';

import { getTopTenBlocks, Block } from '../../utils/eosio';
import { CircularProgress } from 'material-ui';
import BlockTable from '../BlockTable';
import { isEmpty } from 'ramda';
import { Button, Container, Grid, Typography } from '@material-ui/core';

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
            color='primary'
            variant='contained'
            value='LOAD'
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
          ? <CircularProgress />
          : !isEmpty(blocks) && <div className='blocks-container'>
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
