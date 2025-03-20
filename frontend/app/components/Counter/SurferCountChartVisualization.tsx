import { FrameData } from "@/app/hooks/useDemoStore";

interface SurferCountChartVisualizationProps {
    countHistory: FrameData[]
}

const SurferCountChartVisualization = ({ countHistory }: SurferCountChartVisualizationProps) => {
    return (
        <div className='w-full flex flex-col justify-between items-center gap-10 hidden'>
            {JSON.stringify(countHistory)}
        </div>
    );
};

export default SurferCountChartVisualization;