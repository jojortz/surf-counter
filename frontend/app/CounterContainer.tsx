"use client"
import React, { useEffect, useState } from 'react';
import Button from './components/Button';

enum COUNTER_STATES {
    READY_TO_COUNT,
    LOADING,
    COUNTING,
};

const INIT_TIMESTAMP = 1;

const CounterContainer = () => {
    const [counterState, setCounterState] = useState(COUNTER_STATES.READY_TO_COUNT);
    const [count, setCount] = useState(0);
    const [imageData, setImageData] = useState('');
    const [timestamp, setTimestamp] = useState(INIT_TIMESTAMP);
    const [initImage, setInitImage] = useState('')

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch('/api/surfline/get-frame?' + new URLSearchParams({
                    timestamp: timestamp.toString(),
                }).toString());
                
                const data = await response.json();
                setInitImage(data.frameUrl);
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        fetchImage();
    }, [timestamp]);

    const getNextFrame = async () => {
        setCounterState(COUNTER_STATES.LOADING);
        try {
            const response = await fetch('/api/roboflow/get-count?' + new URLSearchParams({
                timestamp: timestamp.toString(),
            }).toString());

            if (response.ok) {
                const { numSurfers, imageData } = await response.json();
                setImageData(imageData);
                setCount(numSurfers)
                setTimestamp(timestamp + 1);
            } else {
              console.error('Failed to fetch the frame.');
            }
          } catch (error) {
            console.error('Error fetching the frame:', error);
          } finally {
            setCounterState(COUNTER_STATES.COUNTING);
        }
    }

    const handleRestart = () => {
        setCounterState(COUNTER_STATES.READY_TO_COUNT);
        setImageData('');
        setCount(0)
        setTimestamp(1);
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
                            onClick={handleRestart} 
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
                            {imageData ? 
                                <img 
                                src={`data:image/png;base64,${imageData}`} 
                                alt="Counting Image" 
                                className="w-full h-full object-contain rounded-xl" 
                                />
                                :
                                <img 
                                src={initImage} 
                                alt="Counting Image" 
                                className="w-full h-full object-contain rounded-xl" 
                                />
                            }
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