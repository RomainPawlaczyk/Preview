import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";

//defines paper surface style
const Surface = withStyles({
  root: {
    padding: 2,
    textAlign: 'center',
    background: 'transparent',
    height: '9em',
    width: '9em',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    fontWeight: 'bold',
    marginBottom: '2em',
    marginTop: '1em',
    paddingTop: '1em'
  },
})(Paper);

export default Surface;
