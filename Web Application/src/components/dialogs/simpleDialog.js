import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

//defines simple dialog popup style and props
 const SimpleDialog = (props) => {
  const [open, setOpen] = React.useState(true);

  //used to handle simple dialog popup state when user quit
  const handleClose = () => {
    setOpen(false);
    props.handleClose(false);
  };

  //used to handle texfield dialog popup state when user accept
  const handleCloseAndAccept = () => {
    setOpen(false);
    props.handleClose(true);
  };

  //theme used by the simple dialog popup
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#FF6347'
      },
      secondary: {
        main: '#000000'
      },
    },
  });

  return (
    <div>
      {/*theme provider*/}
      <MuiThemeProvider theme={theme}>
        {/*dialog wrapper*/}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          {/*dialog title*/}
          <DialogTitle id='alert-dialog-title'>{props.title}</DialogTitle>
          {/*content wrapper*/}
          <DialogContent>
            {/*dialog content text*/}
           <DialogContentText id='alert-dialog-description'>{props.content}</DialogContentText>
         </DialogContent>
         {/*dialog buttons wrapper*/}
         <DialogActions>
           {/*quit button*/}
           <Button variant='outlined' onClick={handleClose} color='secondary'>{props.button1}</Button>
           {/*accept button*/}
           <Button variant='outlined' onClick={handleCloseAndAccept} color='primary' autoFocus>{props.button2}</Button>
         </DialogActions>
       </Dialog>
     </MuiThemeProvider>
   </div>
  );
}
export default SimpleDialog;

SimpleDialog.propTypes = {
  handleClose: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
  button1: PropTypes.string,
  button2: PropTypes.string,
};
