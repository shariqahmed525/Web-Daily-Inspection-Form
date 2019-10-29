import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import { GreenColor } from '../../constant/colors';

const ColorButton = withStyles(theme => ({
  root: {
    color: "#fff",
    backgroundColor: GreenColor,
    '&:hover': {
      backgroundColor: GreenColor,
    },
  },
}))(Button);

export default ColorButton;
