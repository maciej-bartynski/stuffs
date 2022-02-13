type CheckboxProps = {
    value: string | number;
    label: string | number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    checked: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({ 
    value, 
    label, 
    onChange,
    checked
}) => (
    <label>
        <input type="checkbox" value={value} onChange={onChange} checked={checked}/>
        <span>{label}</span>
    </label>
);

export default Checkbox;
