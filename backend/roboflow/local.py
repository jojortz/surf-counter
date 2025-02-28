import os
from inference import InferencePipeline
import cv2
import dotenv

dotenv.load_dotenv()


class VideoTest:
    """
    Class to run a local workflow on Roboflow.

    Args:
    - workspace_name (string): the name of the workspace where the workflow is located
    - workflow_id (string): the ID of the workflow to run
    """

    def __init__(self, workspace_name, workflow_id):
        self.workspace_name = workspace_name
        self.workflow_id = workflow_id
        self.video_writer = None
        self.frame_size = None
        self.output_path = None  # Store the output path

    def my_sink(self, result, video_frame):
        if result.get("output_image"):  
            output_frame = result["output_image"].numpy_image

            # Initialize video writer if not already set up
            if self.video_writer is None:
                height, width, _ = output_frame.shape
                self.frame_size = (width, height)
                fourcc = cv2.VideoWriter_fourcc(*"mp4v")  # Codec for MP4
                self.video_writer = cv2.VideoWriter(self.output_path, fourcc, 30, self.frame_size)

            self.video_writer.write(output_frame)

    def run(self, video_reference, output_path="output.mp4", max_fps=30):
        """
        Run the local workflow on Roboflow.

        Args:
        - video_reference (string): the path to the video to run the workflow on
        - output_path (string): the path where the output video should be saved
        - max_fps (int): maximum FPS for processing
        """
        self.output_path = output_path  # Store output path

        pipeline = InferencePipeline.init_with_workflow(
            api_key=os.getenv("ROBOFLOW_API_KEY"),
            workspace_name=self.workspace_name,
            workflow_id=self.workflow_id,
            video_reference=video_reference,
            max_fps=max_fps,
            on_prediction=self.my_sink
        )
        pipeline.start()  # Start the pipeline
        pipeline.join()  # Wait for the pipeline thread

        # Release video writer when done
        if self.video_writer:
            self.video_writer.release()


# Example usage
if __name__ == "__main__":
    tester = VideoTest("your_workspace", "your_workflow_id")
    tester.run("input_video.mp4", "processed_output.mp4")
