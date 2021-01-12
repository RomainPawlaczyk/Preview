import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

  //theme used by textfiled dialog popup
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

  //defines radio button style and props
 const TextfieldDialog = (props) => {
  const [open, setOpen] = React.useState(true);

  //used to handle texfield dialog popup state
  const handleClose = (accepted) => {
    setOpen(false);
    props.handleClose(accepted);
  };

  return (
    <div>
    {/*theme provider*/}
    <MuiThemeProvider theme={theme}>
      {/*dialog wrapper*/}
      <Dialog open={open} onClose={() => {handleClose(false)}} aria-labelledby='form-dialog-title'>
        {/*dialog title*/}
         <DialogTitle id='form-dialog-title'>{props.title}</DialogTitle>
         {/*content wrapper*/}
         <DialogContent>
          {/*dialog content text*/}
           <DialogContentText>{props.content}</DialogContentText>
           {/*dialog textfield*/}
           <TextField
             autoFocus
             margin='dense'
             id='name'
             label='Email Address'
             type='email'
             fullWidth
             value={props.textfieldValue}
             onChange={props.textfieldChange}
           />
         </DialogContent>
         {/*dialog buttons wrapper*/}
         <DialogActions style={{marginTop: '1em'}}>
           {/*quit button*/}
           <Button variant='outlined' onClick={() => {handleClose(false)}} color='secondary'>{props.button1}</Button>
           {/*accept button*/}
           <Button variant='outlined' onClick={() => {handleClose(true)}} color='primary'>{props.button2}</Button>
         </DialogActions>
       </Dialog>
      </MuiThemeProvider>
     </div>
  );
}
export default TextfieldDialog;

TextfieldDialog.propTypes = {
  handleClose: PropTypes.func,
  textfieldChange: PropTypes.func,
  textfieldValue: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  button1: PropTypes.string,
  button2: PropTypes.string,
};
