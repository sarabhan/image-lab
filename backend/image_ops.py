import cv2
import numpy as np

def apply_operations(image: np.ndarray, ops: dict):
    img = image.copy()

    gray_level = ops.get("grayscale", 0)  # 0.0 – 1.0
    if gray_level > 0:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        gray_rgb = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)  # convert to 3 channels
        img = cv2.addWeighted(gray_rgb, gray_level, img, 1 - gray_level, 0)


    if blur := ops.get("blur"):
        k = blur if blur % 2 else blur + 1
        img = cv2.GaussianBlur(img, (k, k), 0)

    if angle := ops.get("rotate"):
        h, w = img.shape[:2]
        M = cv2.getRotationMatrix2D((w//2, h//2), angle, 1.0)
        img = cv2.warpAffine(img, M, (w, h))

    if thresh := ops.get("threshold"):
        _, img = cv2.threshold(img, thresh, 255, cv2.THRESH_BINARY)

    return img
