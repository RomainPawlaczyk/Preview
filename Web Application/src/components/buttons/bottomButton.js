import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

//defines bottom button style
const BottomButton = withStyles({
  root: {
    '&:hover': {
      background: '#FF6347',
    },
    color: 'black',
    background: '#FF6347',
    border: 'none',
    borderRadius: '0',
    fontWeight: 'bold'
  },
})(Button);

export default BottomButton;
