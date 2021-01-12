import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

//defines texfields style
const Input = withStyles({
  root: {
    '& .MuiInput-underline:after': {
      borderBottomColor: 'white',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white',
    },
    '& .MuiInput-input': {
      color: 'white',
    },
    '& ::placeholder': {
      color: 'white',
      opacity: '1'
    },
    '& label': {
       color: 'white'
    },
    '& label.Mui-focused': {
       color: 'white'
    },
  },
})(TextField);

export default Input;
