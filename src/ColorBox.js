import React from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./styles/ColorBoxStyle";
import { withStyles } from "@material-ui/styles";

const ColorBox = props => {
  const { name, background, moreUrl, showingFullPalette, classes } = props;
  const [isCopied, setIsCopied] = React.useState(false);

  const changeCopyState = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div style={{ backgroundColor: background }} className={classes.ColorBox}>
        <div
          style={{ backgroundColor: background }}
          className={`${classes.copyOverlay} ${isCopied &&
            classes.showOverlay}`}
        ></div>
        <div
          className={`${classes.copyMessage} ${isCopied &&
            classes.showCopyMessage}`}
        >
          <h1>Copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div className="copy-container">
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>Copy</button>
        </div>
        {showingFullPalette && (
          <Link to={moreUrl} onClick={e => e.stopPropagation()}>
            <span className={classes.seeMore}>MORE</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default withStyles(styles)(ColorBox);
