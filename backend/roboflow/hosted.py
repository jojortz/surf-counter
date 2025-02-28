from inference_sdk import InferenceHTTPClient
import os
import dotenv

dotenv.load_dotenv()

client = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key=os.getenv("ROBOFLOW_API_KEY")
)

class HostedTest:
    """
    Class to run a hosted workflow on Roboflow.

    Args:
    - workspace_name (string): the name of the workspace where the workflow is located
    - workflow_id (string): the ID of the workflow to run
    """
    def __init__(self, workspace_name, workflow_id):
        self.workspace_name = workspace_name
        self.workflow_id = workflow_id

    def run(self, image_path):
        """
        Run the hosted workflow on Roboflow.

        Args:
        - image_path (string): the path to the image to run the workflow on
        """
        result = client.run_workflow(
            workspace_name=self.workspace_name,
            workflow_id=self.workflow_id,
            images={
                "image": image_path
            },
            use_cache=True # cache workflow definition for 15 minutes
        )
        return result