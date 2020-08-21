import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: 'rgb(45, 40, 61)',
    border: '2px solid rgb(191, 167, 240)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center',
    width: '350px',
    borderRadius: '2px',
    fontSize: '12px'
  },
  button: {
    height: '30px'
  }
}));

function Disclaimer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAcceptClick = () => {
    localStorage.setItem('omegarideaccept', true);
    props.setIsAcceptDisclaimer(true);
    handleClose();
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <p className="my-2 h4 text-white">Welcome to Omega Ride</p>
            <div className="mx-1 my-2 text-white">This app is created strictly for demonstration purposes. By clicking the button below, you accept that Omega Ride do not guarantee storing your ride search results.</div>
            <Button className={classes.button} variant="outlined" color="secondary" onClick={handleAcceptClick}>
              Accept
            </Button>
            <p className="my-2 text-warning">I built this app using React, React Hooks, Node.js, and Material UI to provide a function for users to request a ride and route the direction from origin to destination.</p>
            <div className="mx-1 my-1 text-secondary">{'If you have any questions, please email to '}<a href="mailto:omegathrone@omegathrone.com">omegathrone@omegathrone.com</a>.</div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default Disclaimer;
