import { LevelColor, LevelType } from "models/Level/Level.types"
import { useCallback, useState } from "react"
import useLevelsStore from 'store/levelsStore'

type ColorType = {
    key: string,
    value: LevelColor
}
type AddLevelProps = {
    children: (params: {
        setName: (name?: LevelType['name'] | undefined) => void;
        setColor: (color?: ColorType | undefined) => void;
        onSubmit: () => void;
        name: string | undefined;
        color: ColorType | undefined;
        error: string;
        colors: ColorType[]
    }) => JSX.Element
}

const AddLevel: React.FC<AddLevelProps> = ({ children }) => {
    const [name, _setName] = useState<LevelType['name']>();
    const [color, _setColor] = useState<ColorType>();
    const [error, setError] = useState("");

    const _color = color?.value;
    const colors = Object.entries(LevelColor).map(([key, value]) => ({ key, value }));

    const setName = useCallback((name?: string) => {
        setError("")
        _setName(name);
    }, [_setName])

    const setColor = useCallback((color?: ColorType) => {
        setError("")
        _setColor(color)
    }, [_setColor])

    const { createLevel } = useLevelsStore()

    const onSubmit = useCallback(() => {
        if (name && _color) {
            createLevel({
                name,
                color: _color
            })
        } else {
            setError("All fields are required")
        }
    }, [createLevel, name, _color])

    return children({
        setName,
        setColor,
        onSubmit,
        name,
        color,
        colors,
        error
    });
}

export default AddLevel;