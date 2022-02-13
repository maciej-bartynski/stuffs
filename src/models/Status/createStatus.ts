import createUuid from 'tools/createUuid';
import { StatusForm, StatusType, StatusUuid } from './Status.types';

const createStatus = (statusForm: StatusForm): StatusType => {
    const status = ({
        id: createUuid<StatusUuid>(),
        createdAt: new Date(),
        updatedAt: null,
        ...statusForm,
    })

    return status;
};

export default createStatus;
