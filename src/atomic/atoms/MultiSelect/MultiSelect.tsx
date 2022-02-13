import { PropsWithChildren, useCallback, useMemo } from 'react';
import Checkbox from 'atomic/atoms/Checkbox';

type MultiSelectProps<T> = {
    options: T[];
    selected: T[];
    onChange: (option: T | undefined) => void;
    getKey: (option: T | undefined) => string;
    getLabel: (option: T | undefined) => string;
};

function MultiSelect<T>({ options, selected, onChange, getKey, getLabel }: PropsWithChildren<MultiSelectProps<T>>): JSX.Element {

    const _onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(e => {
        const selectedOption = options.find(option => getKey(option) === e.target.value);
        onChange(selectedOption);
    }, [onChange, getKey, options]);

    return (
        <span>
            {options.map(item => (
                <Checkbox
                    key={getKey(item)}
                    label={getLabel(item)}
                    value={getKey(item)}
                    checked={selected.some(option => getKey(item) === getKey(option))}
                    onChange={_onChange}
                />
            ))}
        </span>
    );
}

export default MultiSelect;