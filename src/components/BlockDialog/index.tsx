import React from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from '@material-ui/core';

import { Block } from '../../utils/eosio';

export interface BlockDialogProps {
  open: boolean;
  selectedValue: Block | null;
  onClose: () => void;
}

function BlockDialog(props: BlockDialogProps) {
  const { onClose, selectedValue, open } = props;

  return (
    selectedValue &&
    <Dialog data-test-id='block-dialog' maxWidth='lg' { ...{ open, onClose } }>
      <DialogTitle><Typography>Block Data</Typography></DialogTitle>
      <DialogContent>
        <pre>
          {JSON.stringify(selectedValue, null, 2)}
        </pre>
      </DialogContent>
      <DialogActions>
        <Button data-test-id='block-dialog-close' onClick={onClose} color='primary'>
          <Typography>Close</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BlockDialog;