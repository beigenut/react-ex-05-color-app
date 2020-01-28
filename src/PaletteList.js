import React from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteListStyle";

const PaletteList = props => {
  const { palettes, history, classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
          <Link to="/palette/new">Create new palatte</Link>
        </nav>
        <div className={classes.palettes}>
          {palettes.map(palette => (
            // <Link to={`/palette/${palette.id}`}><MiniPalette {...palette} /></Link>
            <MiniPalette {...palette} history={history} key={palette.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(PaletteList);
