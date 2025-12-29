from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
import cv2, numpy as np, json
from image_ops import apply_operations

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process")
async def process_image(file: UploadFile = File(...), ops: str = File(...)):
    ops = json.loads(ops)
    image_bytes = await file.read()
    np_img = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    result = apply_operations(img, ops)

    _, buffer = cv2.imencode(".png", result)
    return Response(buffer.tobytes(), media_type="image/png")
