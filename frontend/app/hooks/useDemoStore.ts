import { create } from 'zustand';

export enum COUNTER_STATES {
    READY_TO_COUNT,
    LOADING,
    COUNTING,
};

export type FrameData = {
    count: number,
    image: string,
}

interface DemoStore {
    counterState: COUNTER_STATES,
    setCounterState: (newState: COUNTER_STATES) => void,
    count: number,
    setCount: (newCount: number) => void,
    countHistory: FrameData[],
    setCountHistory: (newCountHistory: FrameData[]) => void,
    addToCountHistory: (newCount: FrameData) => void,
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
    countHistory: [],
    setCountHistory: (newCountHistory: FrameData[]) => set({countHistory: newCountHistory}),
    addToCountHistory: (newFrameData: FrameData) => set((state) => ({countHistory: [...state.countHistory, newFrameData]})),
    imageData: '',
    setImageData: (newImageData: string) => set({imageData: newImageData}),
    timestamp: 0,
    setTimestamp: (newTimestamp: number) => set({timestamp: newTimestamp}),
}));