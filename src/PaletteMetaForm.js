import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const PaletteMetaForm = props => {
  const { handleSubmitSave, palettes, closeForm } = props;
  const [stage, setStage] = React.useState("form");

  // 색상 등록 후, 해당 팔렛 이름 지정
  const [newPaletteName, setNewPaletteName] = React.useState("");

  // newPaletteName 중복 확인 useEffect
  React.useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      palettes.every(
        palette =>
          palette.id.toLowerCase() !== value.toLowerCase().replace(/ /g, "-")
      )
    );
  }, [newPaletteName, palettes]);

  // Reusable input
  const handleChangePaletteName = e => {
    setNewPaletteName(e.target.value);
  };

  const showEmojiPicker = () => {
    setStage("emoji");
  };

  // emoji 선택시 나오는 JSON
  const savePalette = emoji => {
    handleSubmitSave(newPaletteName, emoji.native);
  };

  return (
    <>
      <Dialog open={stage === "emoji"}>
        <DialogTitle id="form-dialog-title">Choose a palette emoji</DialogTitle>
        <Picker onSelect={savePalette} title="Pick a palette emoji" />
      </Dialog>
      <Dialog
        open={stage === "form"}
        onClose={closeForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose a palette name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for you beautiful palette. Palette name must
              be unique.
            </DialogContentText>
            <TextValidator
              value={newPaletteName}
              label="Palette Name"
              onChange={handleChangePaletteName}
              fullWidth
              margin="normal"
              name="newColorName"
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Type a palette name",
                "Palette name must be unique"
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeForm} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </>
  );
};

export default PaletteMetaForm;
