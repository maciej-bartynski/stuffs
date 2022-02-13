import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// eslint-disable-next-line
export const useAppDispatch = () => useDispatch<AppDispatch>();

// eslint-disable-next-line
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
