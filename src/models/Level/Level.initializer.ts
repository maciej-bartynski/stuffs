import { LevelColor, LevelFormValidatorion } from "./Level.types";

const levelFormInitializer = {
    name: "",
    color: LevelColor.Blue
}

const levelFormValidators: LevelFormValidatorion = {
    name: (name) => name ? "" : "Level name is required",
    color: (color) => color ? "" : "Level color is required"
}

const LevelFormUtils = {
    levelFormInitializer,
    levelFormValidators
}

export default LevelFormUtils