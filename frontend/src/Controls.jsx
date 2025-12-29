import { useState } from "react";

export default function Controls({ ops, setOps, setImage }) {
  const [localOps, setLocalOps] = useState({
    grayscale: 0,
    blur: "",
    rotate: "",
    threshold: ""
  });

  const handleSliderAndNumber = (key, value, isPercent = false) => {
    setLocalOps({ ...localOps, [key]: value });
    const numericValue = value === "" ? 0 : Number(value);
    setOps({
      ...ops,
      [key]: isPercent ? numericValue / 100 : numericValue
    });
  };

  const toolCardStyle = {
    padding: "10px 12px 12px",
  borderRadius: "10px",
  border: "1.5px solid rgba(191, 198, 254, 0.9)",
  background: "rgba(0,0,0,0.25)", 
  boxShadow: "0 2px 6px rgba(255, 255, 255, 0.59)",  // transparent, image visible
  backdropFilter: "blur(1px)",
  };

  const labelStyle = {   fontWeight: 500,
  marginTop: "0px",     // 👈 removes default <h3> top space
  marginBottom: "4px",
  color: "#fff",
  textShadow: "0 1px 4px rgba(0,0,0,0.9)",};
  const rangeStyle = { fontSize: "0.8rem", color: "#cdcdcdff", marginTop: "5px" };
  const controlRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  marginTop: "-4px"   // 👈 moves slider + number input UP
};

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {/* Image Upload */}
      <div style={toolCardStyle}>
        <h3 style={labelStyle}>Upload Image</h3>
        <input type="file" onChange={e => setImage(e.target.files[0])} />
      </div>

      {/* Grayscale */}
      <div style={toolCardStyle}>
        <h3 style={labelStyle}>Grayscale</h3>
        <div style={controlRowStyle}>
          <input
            type="range"
            min="0"
            max="100"
            value={localOps.grayscale}
            onChange={e => handleSliderAndNumber("grayscale", e.target.value, true)}
          />
          <input
            type="number"
            min="0"
            max="100"
            value={localOps.grayscale}
            onChange={e => handleSliderAndNumber("grayscale", e.target.value, true)}
            style={{ width: "60px" }}
          />
        </div>
        <div style={rangeStyle}>Range: 0% – 100%</div>
      </div>

      {/* Blur */}
      <div style={toolCardStyle}>
        <h3 style={labelStyle}>Blur</h3>
        <div style={controlRowStyle}>
          <input
            type="range"
            min="0"
            max="100"
            step="2"
            value={localOps.blur === "" ? 0 : localOps.blur}
            onChange={e => handleSliderAndNumber("blur", e.target.value)}
          />
          <input
            type="number"
            min="0"
            max="100"
            step="2"
            value={localOps.blur}
            onChange={e => handleSliderAndNumber("blur", e.target.value)}
            style={{ width: "60px" }}
          />
        </div>
        <div style={rangeStyle}>Range: 0 – 100</div>
      </div>

      {/* Rotate */}
      <div style={toolCardStyle}>
        <h3 style={labelStyle}>Rotate</h3>
        <div style={controlRowStyle}>
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
        <div style={rangeStyle}>Range: -180 – 180</div>
      </div>

      {/* Black & White Level */}
      <div style={toolCardStyle}>
        <h3 style={labelStyle}>Black & White Level</h3>
        <div style={controlRowStyle}>
          <input
            type="range"
            min="0"
            max="255"
            value={localOps.threshold === "" ? 0 : localOps.threshold}
            onChange={e => handleSliderAndNumber("threshold", e.target.value)}
          />
          <input
            type="number"
            min="0"
            max="255"
            value={localOps.threshold}
            onChange={e => handleSliderAndNumber("threshold", e.target.value)}
            style={{ width: "60px" }}
          />
        </div>
        <div style={rangeStyle}>Range: 0 – 255</div>
      </div>
    </div>
  );
}
