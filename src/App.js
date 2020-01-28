import React from "react";
import { Switch, Route } from "react-router-dom";
import Palette from "./Palette";
import seedColors from "./seedColors";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import { generatePalette } from "./colorHelpers";

function App() {
  // localStorage 에 저장된 정보가 있는지 부터 확인하고,
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  // 있으면 localStorage 에 있는 정보를 없으면, seedColors 를
  const [palettes, setPalettes] = React.useState(savedPalettes || seedColors);

  const findPalette = id => {
    return palettes.find(function (palette) {
      return palette.id === id;
    });
  };

  const deletePalette = id => {
    setPalettes(palettes.filter(palette => palette.id !== id))
  }

  const syncLocalStorage = () => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  };

  const savePalette = newPalette => {
    setPalettes([...palettes, newPalette]);
  };

  // palettes 값이 변화가 있을 때마다, localStorage 에 저장
  React.useEffect(() => {
    syncLocalStorage();
  }, [palettes])

  return (
    <Switch>
      <Route
        exact
        path="/palette/new"
        render={routeProps => (
          <NewPaletteForm
            savePalette={savePalette}
            {...routeProps}
            palettes={palettes}
          />
        )}
      />
      <Route
        exact
        path="/"
        render={routeProps => (
          <PaletteList palettes={palettes} {...routeProps} deletePalette={deletePalette} />
        )}
      />
      <Route
        exact
        path="/palette/:id"
        render={routeProps => (
          <Palette
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
      <Route
        path="/palette/:paletteId/:colorId"
        render={routeProps => (
          <SingleColorPalette
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(
              findPalette(routeProps.match.params.paletteId)
            )}
          />
        )}
      ></Route>
    </Switch>
  );
}

export default App;
