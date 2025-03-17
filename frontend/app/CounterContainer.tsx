"use client"
import React, { useState } from 'react';
import Button from './components/Button';
import { getSurferCount } from '@/services/api';

enum COUNTER_STATES {
    READY_TO_COUNT,
    LOADING,
    COUNTING,
};

const CounterContainer = () => {
    const [counterState, setCounterState] = useState(COUNTER_STATES.READY_TO_COUNT);
    const [count, setCount] = useState(0);
    const [imageData, setImageData] = useState('');

    const getNextFrame = async () => {
        setCounterState(COUNTER_STATES.LOADING);
        const response = await getSurferCount();
        setCount(response.count_objects);
        setImageData(response.image_data);
        setCounterState(COUNTER_STATES.COUNTING);
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
            <div className="flex items-center justify-center w-full h-full">
                <div className="rounded-xl relative max-w-full aspect-[16/9]">
                    {counterState === COUNTER_STATES.LOADING && (
                        <div className="absolute inset-0 rounded-xl bg-gray-200 animate-pulse opacity-10"/>
                    )}
                    {(counterState === COUNTER_STATES.COUNTING || counterState === COUNTER_STATES.LOADING) && (
                        <div className="flex items-center justify-center h-full w-full">
                            <img 
                                src={`data:image/jpeg;base64,${imageData}`} 
                                alt="Counting Image" 
                                className="w-full h-full object-contain rounded-xl" 
                            />
                        </div>
                    )}
                    {counterState === COUNTER_STATES.READY_TO_COUNT && (
                        <div className="flex items-center justify-center h-full w-full">
                            <p className="text-lg font-semibold">Ready to count</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
};

export default CounterContainer;