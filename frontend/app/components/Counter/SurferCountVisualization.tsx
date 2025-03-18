interface SurferCountVisualizationProps {
    count: number
}

const SurferCountVisualization = ({ count }: SurferCountVisualizationProps) => {
    const surferEmojis = '🏄🏻‍♀️'.repeat(count); // Repeat surfer emoji based on the count

    return (
        <div className='w-full flex flex-col justify-between items-center gap-10'>
            <p className="text-2xl font-semibold">Surfer Count: {count}</p>
            <div className="text-4xl font-semibold">{surferEmojis}</div> {/* Display surfer emojis */}
        </div>
    );
};

export default SurferCountVisualization;