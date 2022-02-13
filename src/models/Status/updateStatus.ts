import { StatusType } from './Status.types';

const updateStatus = (update: StatusType): StatusType => {
    const status = ({
        ...update,
        updatedAt: new Date(),
    })

    return status;
};

export default updateStatus;