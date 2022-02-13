type OptionProps = {
    value: string | number;
    label: string | number;
};

const Option: React.FC<OptionProps> = ({ value, label }) => <option value={value}>{label}</option>;

export default Option;
