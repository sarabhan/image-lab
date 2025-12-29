import axios from "axios";
import { useEffect, useRef } from "react";

export default function Canvas({ image, ops }) {
  const canvasRef = useRef();

  useEffect(() => {
    if (!image) return;

    const form = new FormData();
    form.append("file", image);
    form.append("ops", JSON.stringify(ops));

    axios.post("http://localhost:8000/process", form, {
      responseType: "blob"
    }).then(res => {
      const img = new Image();
      img.onload = () => {
        const ctx = canvasRef.current.getContext("2d");
        canvasRef.current.width = img.width;
        canvasRef.current.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
      img.src = URL.createObjectURL(res.data);
    });
  }, [image, ops]);

  return <canvas ref={canvasRef} style={{ marginTop: "20px", border: "1px solid #000" }} />;
}
