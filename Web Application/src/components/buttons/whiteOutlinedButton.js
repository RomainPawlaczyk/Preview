import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

//defines outlined button style
const OutlinedButton = withStyles({
  root: {
    color: 'white',
    borderColor: 'white'
  },
})(Button);

export default OutlinedButton;
