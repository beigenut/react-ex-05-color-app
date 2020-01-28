import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";

const DraggableColorList = SortableContainer(props => {
  // Sortable: 움직임을 주고자 하는 BOXes 를 담은 List 를 Container로 감싼다
  const { colors, handleDeleteColor } = props;

  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, i) => (
        <DraggableColorBox
          // Sortable: index 부여를 해줘야 순서가 잡힘
          index={i}
          key={color.name}
          color={color.color}
          name={color.name}
          handleDelete={handleDeleteColor}
        />
      ))}
    </div>
  );
});

export default DraggableColorList;
