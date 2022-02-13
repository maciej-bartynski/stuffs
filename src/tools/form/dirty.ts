const dirty = (toched: Record<string, boolean | undefined>): boolean => Object.values(toched).some(item => item);
export default dirty;