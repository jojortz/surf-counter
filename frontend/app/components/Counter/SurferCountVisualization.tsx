import { FrameData } from "@/app/hooks/useDemoStore";

interface SurferCountVisualizationProps {
    countHistory: FrameData[],
    timestamp: number,
}

const SurferCountVisualization = ({ countHistory, timestamp }: SurferCountVisualizationProps) => {
    const count = countHistory ? countHistory[timestamp-1]?.count : 0;
    const surferEmojis = '🏄🏻‍♀️'.repeat(count); // Repeat surfer emoji based on the count

    return (
        <div className='w-full flex flex-col justify-between items-center gap-4'>
            {
                countHistory.length > 0 ?
                (
                    <>
                        <p className="text-2xl font-semibold">Frame {timestamp}/{countHistory.length}</p>
                        <p className="text-xl font-semibold">Surfer Count: {count}</p>
                        <div className="text-4xl font-semibold">{surferEmojis}</div>
                    </>
                )
                :
                (
                    <p className="text-2xl font-semibold">Generating frame...</p>
                )
            }
        </div>
    );
};

export default SurferCountVisualization;