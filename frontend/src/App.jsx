import { useState } from "react";
import Canvas from "./Canvas";
import Controls from "./Controls";

function App() {
  const [image, setImage] = useState(null);
  const [ops, setOps] = useState({
    grayscale: false,
    blur: 0,
    rotate: 0,
    threshold: 0
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Web Image Editor</h1>
      <Controls ops={ops} setOps={setOps} setImage={setImage} />
      <Canvas image={image} ops={ops} />
    </div>
  );
}

export default App;
