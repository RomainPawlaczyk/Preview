import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';

//defines white checkbox style and props
const WhiteCheckbox = (props) => {
  return (
    <div style={{marginTop: '1em'}}>
      <Checkbox
       checked={props.checked}
       size='medium'
       onChange={props.handleCheckboxState}
       inputProps={{ 'aria-label': 'primary checkbox' }}
       style={{color: 'white'}}
     />
    </div>
  );
}
export default WhiteCheckbox;

WhiteCheckbox.propTypes = {
  handleCheckboxState: PropTypes.func,
  checked: PropTypes.bool
};
