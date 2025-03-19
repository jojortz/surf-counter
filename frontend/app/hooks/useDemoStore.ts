import { create } from 'zustand';

export enum COUNTER_STATES {
    READY_TO_COUNT,
    LOADING,
    COUNTING,
};

interface DemoStore {
    counterState: COUNTER_STATES,
    setCounterState: (newState: COUNTER_STATES) => void,
    count: number,
    setCount: (newCount: number) => void,
    imageData: string,
    setImageData: (newImageData: string) => void,
    timestamp: number,
    setTimestamp: (newTimestamp: number) => void,
}

export const useDemoStore = create<DemoStore>((set) => ({
    counterState: COUNTER_STATES.READY_TO_COUNT,
    setCounterState: (newState) => set({ counterState: newState }),
    count: 0,
    setCount: (newCount) => set({count: newCount}),
    imageData: '',
    setImageData: (newImageData: string) => set({imageData: newImageData}),
    timestamp: 1,
    setTimestamp: (newTimestamp: number) => set({timestamp: newTimestamp}),
}));