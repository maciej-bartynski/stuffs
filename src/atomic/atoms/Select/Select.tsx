import Option from 'atomic/atoms/Option';
import { PropsWithChildren, useCallback, useMemo } from 'react';

type SelectProps<T> = {
    options: T[];
    option?: T;
    onChange: (option: T | undefined) => void;
    getKey: (option: T | undefined) => string;
    getLabel: (option: T | undefined) => string;
};

function Select<T>({ options, option, onChange, getKey, getLabel }: PropsWithChildren<SelectProps<T>>): JSX.Element {
    const onSelect: React.ChangeEventHandler<HTMLSelectElement> = useCallback(e => {
        const selectedOption = options.find(option => getKey(option) === e.target.value);
        onChange(selectedOption);
    }, [onChange, getKey, options]);

    const selectAttribs = useMemo(() => option
        ? { value: getKey(option) }
        : {}, [option, getKey])

    return (
        <select onChange={onSelect} {...selectAttribs}>
            {options.map(option => (
                <Option key={getKey(option)} label={getLabel(option)} value={getKey(option)} />
            ))}
        </select>
    );
}

export default Select;
