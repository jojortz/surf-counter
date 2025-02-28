from inference_sdk import InferenceHTTPClient
# Get env variable ROBOFLOW_API_KEY
import os
import dotenv

dotenv.load_dotenv()

client = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key=os.getenv("ROBOFLOW_API_KEY")
)

# Class to run a hosted workflow
# Workflow is a series of steps to process an image
# In this case, we are using a workflow to detect objects in an image

class HostedTest:
    def __init__(self, workspace_name, workflow_id):
        self.workspace_name = workspace_name
        self.workflow_id = workflow_id

    def run(self, image_path):
        # Run the workflow
        result = client.run_workflow(
            workspace_name=self.workspace_name,
            workflow_id=self.workflow_id,
            images={
                "image": image_path
            },
            use_cache=True # cache workflow definition for 15 minutes
        )
        return result