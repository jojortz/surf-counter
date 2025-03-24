"use client";
import React from 'react';
import Button from './components/Button';
import SurferCountVisualization from './components/Counter/SurferCountVisualization';
import Container from './components/Container';
import InitImage from './components/InitImage';
import { useDemoStore, COUNTER_STATES, FrameData } from './hooks/useDemoStore';
import useAnnotatedModal from './hooks/useAnnotatedModal';
import { useRouter } from 'next/navigation';
import SurferCountChartVisualization from './components/Counter/SurferCountChartVisualization';
import { time } from 'console';

const INIT_TIMESTAMP = 0

const CounterContainer = () => {
    const router = useRouter();
    const { 
        counterState,
        setCounterState,
        count,
        setCount,
        model,
        countHistory,
        setCountHistory,
        addToCountHistory,
        imageData,
        setImageData,
        timestamp,
        setTimestamp
    } = useDemoStore();
    const annotatedModal = useAnnotatedModal();

    const handleStart = async () => {
        setCounterState(COUNTER_STATES.COUNTING);
        handleNextFrame();
    }

    const handleLearnMore = () => {
        router.push("/about");
    }

    const handleNextFrame = async () => {
        if (countHistory.length > timestamp) {
            setTimestamp(timestamp + 1);
        } else{
            setCounterState(COUNTER_STATES.LOADING);
            try {
                const response = await fetch('/api/roboflow/get-count?' + new URLSearchParams({
                    timestamp: timestamp.toString(),
                    model: model
                }).toString());

                if (response.ok) {
                    const { numSurfers, imageData } = await response.json();
                    setImageData(imageData);
                    setCount(numSurfers);

                    const newFrameData: FrameData = {
                        model: model,
                        count: numSurfers,
                        image: imageData
                    }
                    addToCountHistory(newFrameData);
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
    }

    const handlePreviousFrame = () => {
        if (countHistory.length && timestamp > 0) setTimestamp(timestamp - 1);
    }

    const handleRestart = () => {
        setCounterState(COUNTER_STATES.READY_TO_COUNT);
        setImageData('');
        setCount(0)
        setTimestamp(INIT_TIMESTAMP);
        setCountHistory([]);
    }

    const handleAnnotatedImageClick = () => {
        annotatedModal.setImage(imageData);
        annotatedModal.onOpen();
    }

    return (
        <Container>
            <div className="w-full h-full grid grid-rows lg:grid-cols-[400px_1fr]">
                <div className="p-10 flex items-center justify-center">
                    {counterState === COUNTER_STATES.READY_TO_COUNT && (
                        <div className="text-center">
                            <p className="text-lg font-semibold">Ready to count?</p>
                            <div className="flex items-center justify-center gap-10 w-full h-full">
                                <div className="grid grid-cols-2 gap-4">
                                    <Button 
                                        onClick={handleStart} 
                                        text="Start Counting" 
                                        className="mt-4"
                                        />
                                    <Button 
                                        onClick={handleLearnMore} 
                                        text="Learn More" 
                                        className="mt-4"
                                        border
                                        />
                                 </div>
                            </div>
                        </div>
                    )}
                    {(counterState === COUNTER_STATES.COUNTING || counterState === COUNTER_STATES.LOADING)
                    && (
                        <div className="text-center flex flex-col">
                            <SurferCountVisualization countHistory={countHistory} timestamp={timestamp}/>
                            <SurferCountChartVisualization countHistory={countHistory}/>
                        </div>
                    )}
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div className='flex flex-col items-center justify-center gap-10'>
                    <div className="flex items-center justify-center w-full h-full">
                        <div className="rounded-xl relative max-w-full aspect-[16/9]">
                            {counterState === COUNTER_STATES.LOADING && (
                                <div className="absolute inset-0 rounded-xl bg-gray-200 animate-pulse opacity-10"/>
                            )}
                            {((counterState === COUNTER_STATES.COUNTING || counterState === COUNTER_STATES.LOADING) && countHistory[timestamp - 1]?.image) ? (
                                    <div className="flex items-center justify-center h-full w-full cursor-pointer"
                                        onClick={handleAnnotatedImageClick}>
                                        <img 
                                            src={`data:image/png;base64,${countHistory[timestamp - 1].image}`} 
                                            alt="Counting Image" 
                                            className="w-full h-full object-contain rounded-xl" 
                                        />
                                    </div>
                                ) : (
                                    <InitImage />
                                )
                            }
                        </div>
                    </div>
                    {(counterState === COUNTER_STATES.COUNTING || counterState === COUNTER_STATES.LOADING) && (
                        <div className="flex items-center justify-center gap-10 w-full h-full">
                            <div className="grid grid-cols-3 gap-4">
                                <Button
                                    onClick={handlePreviousFrame}
                                    text="Previous Frame"
                                    className="mt-4"
                                    disabled={counterState === COUNTER_STATES.LOADING || timestamp <= 1}
                                    />
                                <Button
                                    onClick={handleNextFrame}
                                    text="Next Frame"
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
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </Container>
    );
    
};

export default CounterContainer;