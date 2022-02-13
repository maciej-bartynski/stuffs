import useStatusForm from "hooks/useStatusForm"

type AddStatusProps = {
    children: (params: ReturnType<typeof useStatusForm>) => JSX.Element
}

const AddStatus: React.FC<AddStatusProps> = ({ children }) => {
    return children(useStatusForm());
}

export default AddStatus;