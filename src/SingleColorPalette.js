import React from "react";
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import styles from "./styles/PaletteStyle";

const SingleColorPalette = props => {
  const { palette, colorId, classes } = props;
  const { paletteName, emoji, id } = props.palette;

  const gatherShades = (palette, colorToFilterBy) => {
    // return all shades of given color
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
  };

  const [shades, setShades] = React.useState(gatherShades(palette, colorId));
  const [format, setFormat] = React.useState("hex");

  const changeFormat = val => {
    setFormat(val);
  };

  const colorBoxes = shades.map(color => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[format]}
      showingFullPalette={false}
    />
  ));

  return (
    <div className={classes.Palette}>
      <NavBar changeFormat={changeFormat} showingAllColors={false} />
      <div className={classes.PaletteColors}>
        {colorBoxes}
        <div className={classes.goBack}>
          <Link to={`/palette/${id}`} >
            Go Back
          </Link>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
};

export default withStyles(styles)(SingleColorPalette);
