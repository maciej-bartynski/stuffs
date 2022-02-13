import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { DefaultRootState } from 'react-redux';
import { levelsReducer } from 'store/levelsStore/levelsStore';
import { statusesReducer } from 'store/statusesStore/statusesStore';
import { tasksReducer } from 'store/tasksStore/tasksStore';
import counterReducer from '../features/counter/counterSlice';

const PERSISTED_STATE_KEY = 'PERSISTED_STATE_KEY';

function loadPersistedState(): DefaultRootState | null {
    const persistedString = localStorage.getItem(PERSISTED_STATE_KEY);
    if (persistedString) {
        try {
            const persistedState: DefaultRootState = JSON.parse(persistedString as string);
            return persistedState;
        } catch {
            return null;
        }
    }
    return null;
}

function savePersitedState(state: Record<string, unknown>): void {
    const stringToPersist = JSON.stringify(state);
    localStorage.setItem(PERSISTED_STATE_KEY, stringToPersist);
}

// eslint-disable-next-line
function getStoreConfig() {
    const baseStoreConfigOptions = {
        reducer: {
            counter: counterReducer,
            tasks: tasksReducer,
            levels: levelsReducer,
            statuses: statusesReducer,
        },
    };

    const preloadedState = loadPersistedState();

    return preloadedState
        ? {
              ...baseStoreConfigOptions,
              preloadedState,
          }
        : baseStoreConfigOptions;
}

export const store = configureStore(getStoreConfig());

store.subscribe(() => {
    savePersitedState(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
