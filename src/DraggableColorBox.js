import React from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { SortableElement } from "react-sortable-hoc";
import styles from "./styles/DraggableColorBoxStyle";

const DraggableColorBox = SortableElement(props => {
  // 움직임을 주고자 하는 BOX 하나하나를 SortableElement 로 감싼다
  const { classes, name, color, handleDelete } = props;

  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={() => handleDelete(name)}
        />
      </div>
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);
