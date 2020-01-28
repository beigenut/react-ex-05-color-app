import React from "react";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import styles from "./styles/NewPaletteFormStyle";

const NewPaletteForm = (props, { maxColor = "20" }) => {
  const { palettes, history, savePalette, classes } = props;

  // for design
  const [open, setOpen] = React.useState(true);

  // 해당 페이지의 모든 컬러 팔렛 & 처음 default 로 들어있는 색상 팔렛
  const [colors, setColors] = React.useState(palettes[0].colors);

  // 좌측 메뉴 박스 open/close
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // space 제외하고 - 로 채운 id 생성 & 새로운 팔렛 추가 & 브라우저 히스토리 조정
  const handleSubmitSave = (newPaletteName, emoji) => {
    let newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      colors: colors,
      emoji: emoji,
      id: newName.toLowerCase().replace(/ /g, "-")
    };
    savePalette(newPalette);
    history.push("/");
  };

  // input 에서 지정한 색상 이름 & 미니 팔렛 생성
  const addNewColor = (currentColor, newColorName) => {
    const newColor = {
      color: currentColor,
      name: newColorName
    };
    setColors([...colors, newColor]);
  };

  // to DraggableColorBox에게 해당 팔렛 지우기 as props
  const handleDeleteColor = color => {
    setColors(colors.filter(c => c.name !== color));
  };

  // ColorBox 모두 지우기 Clear palatte
  const handleDeleteAll = () => {
    setColors([]);
  };

  // 랜덤하게 생성된 컬러를 집어넣음 .flat() 은 나뉘어 있는 객체들을 한 배열로 몰아넣음
  const handleRandomColor = () => {
    const allColors = palettes.map(p => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    setColors([...colors, randomColor]);
  };

  // Draggable component 를 위한 arrayMove 매소드 사용한 새로운 state 반환
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };

  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        palettes={palettes}
        handleDrawerOpen={handleDrawerOpen}
        handleSubmitSave={handleSubmitSave}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design your palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteAll}
              className={classes.button}
            >
              Clear palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRandomColor}
              disabled={colors.length >= maxColor}
              className={classes.button}
            >
              Random color
            </Button>
          </div>
          <ColorPickerForm colors={colors} addNewColor={addNewColor} />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          // Sortable: 어떤 축(방향)으로 움직일지 지정해줘야 함 ex) axis="x", "y", "xy"
          axis="xy"
          // 순서 변경된 state 적용
          onSortEnd={onSortEnd}
          colors={colors}
          handleDeleteColor={handleDeleteColor}
        />
      </main>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
// export default NewPaletteForm;
