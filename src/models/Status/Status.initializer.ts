import { StatusForm, StatusValidation } from "./Status.types"

const statusFormInitializer: StatusForm = {
    name: "",
    order: 0,
}

const statusFormValidators: StatusValidation = {
    name: name => name ? "" : "Status name is required",
    order: order => typeof order === 'number' ? '' : 'Order of appearance is required'
}

const StatusFormInitializer = {
    statusFormInitializer,
    statusFormValidators
}

export default StatusFormInitializer