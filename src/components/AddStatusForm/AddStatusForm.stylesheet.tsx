import Button from 'atomic/atoms/Button';
import styled from 'styled-components';

const AddStatusFormButton = styled(Button)`
    margin-bottom: 10px;
`

export type AddStatusFormStylesheetType = {
    AddStatusFormButton: typeof AddStatusFormButton;
}

const AddStatusFormStylesheet: AddStatusFormStylesheetType = {
    AddStatusFormButton
}

export default AddStatusFormStylesheet;
