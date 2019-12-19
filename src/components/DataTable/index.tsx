import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

type DataTableType = {
  rows: any[];
  cols: any[];
};

class DataTable extends React.Component<DataTableType, DataTableType> {
  constructor(props: any) {
    super(props);

    this.state = {
      ...props,
    };
  }

  render() {
    const {
      cols,
      rows
    } = this.props;

    return (
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
                  <TableCell align='right' key={`${row.id}-${row[col]}`}>
                    {row[col]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default DataTable;
