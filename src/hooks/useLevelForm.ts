import { LevelColor, LevelForm, LevelUuid } from "models/Level/Level.types"
import { useCallback } from "react"
import useLevelsStore from 'store/levelsStore';
import LevelFormUtils from 'models/Level/Level.initializer'
import useForm from "./useForm"

const useLevelForm = (levelId?: LevelUuid) => {

    const { createLevel, updateLevel, levelById } = useLevelsStore(levelId)

    const { form, submit, setField, errors, valid, touched, dirty } = useForm<LevelForm>({
        initialValues: levelById || LevelFormUtils.levelFormInitializer,
        validators: LevelFormUtils.levelFormValidators,
        onSubmit: ({ values, onChange }) => {
            const performAction = levelById
                ? () => updateLevel({ ...levelById, ...values })
                : () => createLevel(values);
            performAction();
            onChange({});
        }
    })
  
    const {
        color,
        name,
    } = form;

    const colorsToBe = Object.entries(LevelColor).map(([key, value]) => ({ key, value }));

    const setName = useCallback((name: string) => {
        setField({ name })
    }, [setField])

    const setColor = useCallback((color?: LevelColor) => {
        setField({ color })
    }, [setField])

    return {
        setName,
        setColor,
        name,
        color,
        colorsToBe,
        submit,
        errors,
        valid,
        touched,
        dirty
    };
}

export default useLevelForm;