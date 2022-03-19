import Button from 'atomic/atoms/Button';
import ToggleableFormStylesheet from 'atomic/molecules/ToggleableForm/ToggleableForm.stylesheet';
import styled from 'styled-components';

const AddTaskFormButton = styled(Button)``

const ToggleableFormAtoms = {
    ...ToggleableFormStylesheet,
    ToggleableFormWrapper: styled(ToggleableFormStylesheet.ToggleableFormWrapper)`
        ${(props): string => {
            if (props.clicked) {
                return `
                    box-shadow: ${props.theme.shadow.light};
                    position: relative;
                    bottom: -20px;
                    margin: 0 auto;
                    border-radius: ${props.theme.radius.base}px;
                    padding: 0;
                    background: white;
                    padding: 10px;
                    z-index: 1;
                `
            }

            return `
                height: 40px;
                width: 100px;
                border-radius: 50px;
                background: ${props.theme.baseTheme.background.lightPrimary};
                border: solid 2px white;
                position: relative;
                top: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto;
            `
        }}
    `,
}

const AddTaskFormStylesheet = {
    AddTaskFormButton,
}

const stylesheet = {
    AddTaskFormStylesheet,
    ToggleableFormAtoms
}

type AddTaskFormStylesheetType = typeof AddTaskFormStylesheet

export default stylesheet;
export type {
    AddTaskFormStylesheetType
}
