import { useEffect, useRef } from "react"


const useEffectSingleDependency = (
    callback: Function,
    dependency: any
) : void => {
    const dependencyRef = useRef<typeof dependency>();

    useEffect(() => {
        if (dependency !== dependencyRef.current) {
            callback();
            dependencyRef.current = dependency;
        }
    }, [ dependency, callback ])
}

export default useEffectSingleDependency