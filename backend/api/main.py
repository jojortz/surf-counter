from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import cv2
from io import BytesIO
import threading
import os
import requests
from PIL import Image
from roboflow.hosted import HostedTest

hosted_test = HostedTest(
    workspace_name="project-1-ijmz5",
    workflow_id="detect-count-and-visualize"
)

app = FastAPI()

# Allow CORS from http://localhost:3000 (Frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Video setup
VIDEO_PATH = os.path.join(os.path.dirname(__file__), '../data/surf-video.mp4')

cap = cv2.VideoCapture(VIDEO_PATH)
# Check if the file exists at the given path
frame_lock = threading.Lock()  # Prevent race conditions
frame_index = 0
fps = int(cap.get(cv2.CAP_PROP_FPS))

@app.get("/surfline/frame")
def get_frame():
    global cap, frame_index

    with frame_lock: 
        if os.path.exists(VIDEO_PATH):
            print(f"Video found at {VIDEO_PATH}")
        else:
            print(f"Error: Video not found at {VIDEO_PATH}")
            return Response(content="Video not found", status_code=404)
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_index)  
        ret, frame = cap.read()

        if not ret:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0) 
            ret, frame = cap.read()

        frame_index += fps

        _, img_encoded = cv2.imencode(".jpg", frame)
        return Response(content=img_encoded.tobytes(), media_type="image/jpeg")

@app.get("/get-count")
def get_count():
    response = requests.get("http://127.0.0.1:8000/surfline/frame")

    if response.status_code != 200:
        return {"error": "Failed to retrieve frame"}

    img = Image.open(BytesIO(response.content))
    
    result = hosted_test.run(img)

    return {
        "count_objects": result[0]["count_objects"],
        "output_image": result[0]["output_image"]
    }
