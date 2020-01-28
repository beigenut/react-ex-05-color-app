import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import "rc-slider/assets/index.css";
import styles from "./styles/NavbarStyle";

const NavBar = props => {
  const { level, changeLevel, changeFormat, showingAllColors, classes } = props;
  const [format, setFormat] = React.useState("hex");
  const [open, setOpen] = React.useState(false);

  const handleFormatChange = e => {
    setFormat(e.target.value);
    changeFormat(e.target.value);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  return (
    <header className={classes.Navbar}>
      <div className={classes.logo}>
        <Link to="/">ReactColorPicker</Link>
      </div>
      {showingAllColors && (
        <div>
          <span>Level: {level}</span>
          <div className={classes.slider}>
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
          </div>
        </div>
      )}
      <div className={classes.selectContainer}>
        <Select value={format} onChange={handleFormatChange}>
          <MenuItem value="hex">HEX - #ffffff</MenuItem>>
          <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>>
          <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>>
        </Select>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        onClose={closeSnackbar}
        open={open}
        autoHideDuration={3000}
        message={
          <span id="message-id">Format changed to {format.toUpperCase()}</span>
        }
        ContentProps={{ "aria-describedby": "message-id" }}
        action={
          <IconButton
            onClick={closeSnackbar}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        }
      ></Snackbar>
    </header>
  );
};

export default withStyles(styles)(NavBar);
