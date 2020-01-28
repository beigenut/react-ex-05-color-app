import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import useStyles from "./styles/ColorPickerFormStyle";

const ColorPickerForm = (props, { maxColor = "20" }) => {
  const { classes, colors, addNewColor } = props;

  // 현재 컬러 픽커에 찍힌 색상 & 초기 색상 지정
  const [currentColor, setCurrentColor] = React.useState("#999");

  // input 에 들어갈 미니 팔렛 이름 지정
  const [newColorName, setNewColorName] = React.useState("");

  // newColorName 중복 확인 useEffect
  React.useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      colors.every(c => c.name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule("isColorUnique", value =>
      colors.every(({ color }) => color !== currentColor)
    );
  }, [newColorName, currentColor, colors]);

  // Reusable input onChange()
  const handleChangeName = e => {
    setNewColorName(e.target.value);
  };

  // 컬러 픽커 색상 변경
  const handleChangeColor = color => {
    setCurrentColor(color.hex);
  };

  const handleAddNewColor = () => {
    addNewColor(currentColor, newColorName);
    setNewColorName("");
  };

  return (
    <>
      <ChromePicker
        color={currentColor}
        onChangeComplete={handleChangeColor}
        className={classes.picker}
      />
      <ValidatorForm onSubmit={handleAddNewColor}>
        <TextValidator
          value={newColorName}
          name="newColorName"
          variant="filled"
          margin="normal"
          placeholder="Color Name"
          onChange={handleChangeName}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Type a color name",
            "Color name must be unique",
            "Color already used"
          ]}
          className={classes.colorNameInput}
        />
        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: colors.length < maxColor && currentColor
          }}
          type="submit"
          disabled={colors.length >= maxColor}
          className={classes.addColor}
        >
          {colors.length >= maxColor ? "Palette is full" : "Add color"}
        </Button>
      </ValidatorForm>
    </>
  );
};

export default withStyles(useStyles)(ColorPickerForm);
