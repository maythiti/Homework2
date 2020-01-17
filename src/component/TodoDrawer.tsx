import React, { useState, ChangeEvent, FC } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import {
  makeStyles,
  Drawer,
  TextField,
  Button,
  Modal
} from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  drawer: {
    width: theme.spacing(40)
  },
  drawerContent: {
    padding: theme.spacing(3)
  },
  mainButton: {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    position: "fixed"
  },
  textFieldTab: {
    marginBottom: theme.spacing(4)
  },
  ButtonSpaceBetween: {
    justifyContent: "flex-end",
    display: "flex"
  },
  modal: {
    display: "flex",
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  marginRight: {
    marginRight: "15px"
  }
}));

interface TodoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  test: (descriptionText: any) => void;
}

const TodoDrawer: React.FC<TodoDrawerProps> = props => {
  const classes = useStyle(props);
  const { isOpen, onClose, test } = props;
  const [descriptionText, setDescriptionText] = useState("");
  let numberOfCharacter;

  const onCountCharacter = (event: any) => {
    numberOfCharacter = event.target.value.length;
  };
  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDescriptionText(value);
  };
  

  return (
    <div>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className={classes.modal}
        open={isOpen}
      >
        <div className={classes.paper}>
          <Typography variant="h6">1 January 2020</Typography>
          <TextField
            className={classes.textFieldTab}
            label="Description"
            onChange={handleDescriptionChange}
            helperText={descriptionText.length > 40 ? "error" : null}
            fullWidth
            error ={descriptionText.length > 40}
            value={descriptionText}
          />
          <div className={classes.ButtonSpaceBetween}>
            <Button
              className={clsx(classes.ButtonSpaceBetween, classes.marginRight)}
              variant="contained"
              onClick={onClose}
            >
              CANCEL
            </Button>
            <Button variant="contained" color="primary" onClick={() => test(descriptionText)}>
              SAVE
            </Button>
          </div>
        </div>
      </Modal>
      {/* <Drawer anchor="bottom" classes={{ paper: classes.drawer }} open={isOpen}>
        <div className={classes.drawerContent}>
        <Typography variant="h6">1 January 2020</Typography>
          <TextField
            className={classes.textFieldTab}
            label="Description"
            defaultValue="New Year"
            fullWidth
          />
          <div className={classes.ButtonSpaceBetween}>
            <Button
              className={classes.ButtonSpaceBetween}
              variant="contained"
              onClick={onClose}
            >
              CANCEL
            </Button>
            <Button variant="contained" color="primary">
              SAVE
            </Button>
          </div>
        </div>
      </Drawer> */}
    </div>
  );
};

export default TodoDrawer;
