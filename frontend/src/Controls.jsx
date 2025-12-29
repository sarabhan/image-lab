import { useState } from "react";

export default function Controls({ ops, setOps, setImage }) {
  // Local state to handle empty inputs
  const [localOps, setLocalOps] = useState({
    blur: "",
    rotate: "",
    threshold: ""
  });

  const handleSliderAndNumber = (key, value) => {
    // Update both local input and main ops
    setLocalOps({ ...localOps, [key]: value });
    const numericValue = value === "" ? 0 : Number(value); // send 0 if empty
    setOps({ ...ops, [key]: numericValue });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input type="file" onChange={e => setImage(e.target.files[0])} />

      {/* Grayscale */}
      <label>
        Grayscale
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <input
            type="range"
            min="0"
            max="100"
            value={localOps.grayscale ?? 0}
            onChange={e => {
              const val = Number(e.target.value);
              setLocalOps({ ...localOps, grayscale: val });
              setOps({ ...ops, grayscale: val / 100 }); // send 0–1 to backend
            }}
          />
          <input
            type="number"
            min="0"
            max="100"
            value={localOps.grayscale ?? ""}
            onChange={e => {
              const val = e.target.value === "" ? "" : Number(e.target.value);
              setLocalOps({ ...localOps, grayscale: val });
              setOps({ ...ops, grayscale: val === "" ? 0 : val / 100 });
            }}
            style={{ width: "60px" }}
          />
        </div>
        <div style={{ fontSize: "0.8rem", color: "#555" }}>
          Enter values between 0 & 100
        </div>
      </label>


      {/* Blur */}
      <label>
        Blur
        <div style={{ fontSize: "0.8rem", color: "#555" }}>
          Enter values between 0 & 100
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={localOps.blur === "" ? 0 : localOps.blur}
            onChange={e => handleSliderAndNumber("blur", e.target.value)}
          />
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            value={localOps.blur}
            onChange={e => handleSliderAndNumber("blur", e.target.value)}
            style={{ width: "60px" }}
          />
        </div>
      </label>

      {/* Rotate */}
      <label>
        Rotate
        <div style={{ fontSize: "0.8rem", color: "#555" }}>
          Enter values between -180 & 180
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <input
            type="range"
            min="-180"
            max="180"
            value={localOps.rotate === "" ? 0 : localOps.rotate}
            onChange={e => handleSliderAndNumber("rotate", e.target.value)}
          />
          <input
            type="number"
            min="-180"
            max="180"
            value={localOps.rotate}
            onChange={e => handleSliderAndNumber("rotate", e.target.value)}
            style={{ width: "60px" }}
          />
        </div>
      </label>

    </div>
  );
}
