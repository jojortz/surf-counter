"use client"
import React, { useState } from 'react';
import Button from './components/Button';

enum COUNTER_STATES {
    READY_TO_COUNT,
    LOADING,
    COUNTING,
};

const CounterContainer = () => {
    const [counterState, setCounterState] = useState(COUNTER_STATES.READY_TO_COUNT);
    const [count, setCount] = useState(0);

    const getNextFrame = () => {
        setCount(count + 1);
        setCounterState(COUNTER_STATES.LOADING);
        // delay 2 seconds then set  the state to READY_TO_COUNT
        setTimeout(() => {
            setCounterState(COUNTER_STATES.COUNTING);
        }, 2000);    

        // Update frame in UI
    }

    return (
        <div className="w-[80vw] h-[60vh] grid grid-cols-[400px_1fr]">
            <div className="p-10 flex items-center justify-center">
                {counterState === COUNTER_STATES.READY_TO_COUNT && (
                    <div className="text-center">
                        <p className="text-lg font-semibold">Ready to count</p>
                        <Button 
                            onClick={() => setCounterState(COUNTER_STATES.COUNTING)} 
                            text="Start Counting" 
                            className="mt-4"
                            />
                    </div>
                )}
                {(counterState === COUNTER_STATES.COUNTING || counterState === COUNTER_STATES.LOADING)
                 && (
                    <div className="text-center flex flex-col">
                        <div className='w-full flex justify-between items-center'>
                            <p className="text-lg font-semibold">Surfer Count </p>
                            <p className="text-lg font-semibold">{count}</p>
                        </div>
                        <Button 
                            onClick={getNextFrame} 
                            text="Generate Next Frame" 
                            className="mt-4"
                            disabled={counterState === COUNTER_STATES.LOADING}
                            />
                        <Button 
                            onClick={() => setCounterState(COUNTER_STATES.READY_TO_COUNT)} 
                            text="Restart" 
                            className="mt-4"
                            border
                            disabled={counterState === COUNTER_STATES.LOADING}
                            />
                    </div>
                )}
            </div>
            <div className='rounded-xl relative'>
                {
                    counterState === COUNTER_STATES.LOADING && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl">
                        <p className="text-lg font-semibold text-center absolute inset-0 flex justify-center items-center">Loading...</p>
                    </div>
                    )
                }
                {
                    counterState === COUNTER_STATES.COUNTING && (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-lg font-semibold">Counting...</p>
                        </div>
                    )
                }
                {
                    counterState === COUNTER_STATES.READY_TO_COUNT && (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-lg font-semibold">Ready to count</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
    
};

export default CounterContainer;