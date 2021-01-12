import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//function called by snackbar return MuiAlert component
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//defines snackbar style and props
const CustomizedSnackbars = (props) => {
  //snackbar states
  const [open, setOpen] = React.useState(true);

  //handle close button click envent
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    props.handleClose(props.goToLogin);
  };

  return (
    <div>
      {/*snackbar component*/}
      <Snackbar style={{maxWidth: props.maxWidth}} open={open} autoHideDuration={6000} onClose={handleClose}>
        {/*Alert*/}
        <Alert onClose={handleClose} severity={props.severity}>
        {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default CustomizedSnackbars;

CustomizedSnackbars.propTypes = {
  handleClose: PropTypes.func,
  severity: PropTypes.string,
  message: PropTypes.string,
  maxWidth: PropTypes.number,
  goToLogin: PropTypes.bool
};
