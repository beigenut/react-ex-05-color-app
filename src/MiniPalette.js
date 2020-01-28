import React from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/MiniPalette";
import DeleteIcon from '@material-ui/icons/Delete'

// JSS nested style object 를 이용한 css
// const styles = {
//   color: ...
// }

const MiniPalette = props => {
  const { classes, paletteName, emoji, colors, id, history, deletePalette } = props;
  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></div>
  ));

  const goToPalette = id => {
    history.push(`/palette/${id}`);
  };

  const handleDeletePalette = e => {
    // Since clicked, 자동으로 페이지 이동되는 goToPalette 작동하지 않도록
    e.stopPropagation()
    deletePalette(id)
  }

  return (
    <div className={classes.root} onClick={() => goToPalette(id)}>
      <DeleteIcon className={classes.deleteIcon} style={{ transition: "all 0.3s ease-in-out" }} onClick={handleDeletePalette} />
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
};

// material-ui 에서 제공하는 withStyle 컴포넌트를 사용한 styles 변수에 원하는 css 디자인을
// 선언하고, 해당 컴포넌트를 export!
export default withStyles(styles)(MiniPalette);
