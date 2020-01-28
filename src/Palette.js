import React from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyle";

const Palette = props => {
  const { classes } = props;
  const { colors, paletteName, emoji, id } = props.palette;
  const [level, setLevel] = React.useState(500);
  const [format, setFormat] = React.useState("hex");

  const colorBoxes = colors[level].map(color => (
    <ColorBox
      background={color[format]}
      name={color.name}
      key={color.id}
      moreUrl={`/palette/${id}/${color.id}`}
      showingFullPalette={true}
    />
  ));

  const changeLevel = newLevel => {
    setLevel(newLevel);
  };

  const changeFormat = val => {
    setFormat(val);
  };

  return (
    <div className={classes.Palette}>
      <NavBar
        level={level}
        changeLevel={changeLevel}
        changeFormat={changeFormat}
        showingAllColors={true}
      />
      <div className={classes.PaletteColors}>{colorBoxes}</div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
};

export default withStyles(styles)(Palette);
