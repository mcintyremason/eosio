import React from 'react';
import { Block } from 'utils/eosio';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: Block;
  onClose: () => void;
}

function BlockDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  return (
    selectedValue &&
    <Dialog aria-labelledby='simple-dialog-title' { ...{ open, onClose } }>
      <DialogTitle id='simple-dialog-title'>Block Data</DialogTitle>
      <DialogContent>
        <pre>
          {selectedValue}
        </pre>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BlockDialog;