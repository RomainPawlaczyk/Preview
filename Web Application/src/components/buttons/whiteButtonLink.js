import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

//defines white button link style
const WhiteButtonLink = withStyles({
  root: {
    '&:hover': {
      background: 'transparent',
    },
    color: 'white',
    borderColor: 'transparent',
    textTransform: 'none'
  },
})(Button);

export default WhiteButtonLink;
