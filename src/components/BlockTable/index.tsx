import React from 'react';

import {
  Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography
} from '@material-ui/core';

import { Block } from '../../utils/eosio';
import BlockDialog from '../BlockDialog';

type BlockTableProps = {
  rows: any[];
  cols: any[];
};

type BlockTableType = {
  showDialog: boolean;
  selectedValue: Block | null;
} & BlockTableProps;

class BlockTable extends React.Component<BlockTableProps, BlockTableType> {
  constructor(props: BlockTableProps) {
    super(props);

    this.state = {
      ...props,
      showDialog: false,
      selectedValue: null
    };

    this.dialogOpen = this.dialogOpen.bind(this);
    this.dialogClose = this.dialogClose.bind(this);
  }

  dialogOpen = (row: Block) => {
    this.setState({
      showDialog: true,
      selectedValue: row
    });
  }

  dialogClose = () => {
    this.setState({
      showDialog: false
    });
  }

  render() {
    const {
      cols,
      rows,
      showDialog,
      selectedValue
    } = this.state;

    return (
      <Container>
        <Paper className='data-table-container'>
          <Table className='data-table' aria-label='simple table'>
            <TableHead>
              <TableRow>
                {cols && cols.map(col => (
                  <TableCell align='right' key={col}>
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows && rows.map((row, index) => (
                <TableRow data-test-id={`block-table-${index}`} key={row.id} onClick={() => this.dialogOpen(row)}>
                  {cols.map(col => (
                    <TableCell align='right' key={`${row.id}-${row[col]}`}>
                      <Typography>{row[col]}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <BlockDialog open={showDialog} onClose={this.dialogClose} { ...{ selectedValue }} />
      </Container>
    );
  }
}

export default BlockTable;
