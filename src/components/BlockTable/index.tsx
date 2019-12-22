import React from 'react';

import {
  Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography
} from '@material-ui/core';

import BlockDialog from '../BlockDialog';

type BlockTableProps = {
  rows: any[];
  cols: any[];
};

type BlockTableType = {
  showDialog: boolean;
  selectedValue: any;
} & BlockTableProps;

class BlockTable extends React.Component<BlockTableProps, BlockTableType> {
  constructor(props: any) {
    super(props);

    this.state = {
      ...props,
      showDialog: false,
      selectedValue: null
    };

    this.dialogOpen = this.dialogOpen.bind(this);
    this.dialogClose = this.dialogClose.bind(this);
  }

  dialogOpen = (row: any) => {
    this.setState({
      showDialog: true,
      selectedValue: JSON.stringify(row, null, 2)
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
                {cols.map(col => (
                  <TableCell align='right' key={col}>
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  {cols.map(col => (
                    <TableCell align='right' key={`${row.id}-${row[col]}`} onClick={() => this.dialogOpen(row)}>
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
