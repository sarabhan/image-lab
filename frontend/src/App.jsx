import { useState } from "react";
import Canvas from "./Canvas";
import Controls from "./Controls";
import sidebarBg from "./assets/sidebar_bg.jpg";


function App() {
  const [image, setImage] = useState(null);
  const [ops, setOps] = useState({
    grayscale: 0, // 0.0–1.0
    blur: "",
    rotate: "",
    threshold: ""
  });

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      fontFamily: "'Roboto', sans-serif",
      backgroundColor: "#fafafa"
    }}>
      {/* Sidebar */}
      <div
  style={{
    width: "300px",
    padding: "20px",
    // overflowY: "auto",
    backgroundImage: `url(${sidebarBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",

    minHeight: "100vh",        // ✅ THIS is the key
    // boxSizing: "border-box",  // ✅ padding doesn’t break height

    borderRight: "1px solid #ddd",
    boxShadow: "2px 0 6px rgba(0,0,0,0.05)"
  }}
>

        <h1 style={{ fontSize: "1.8rem", marginBottom: "20px",
          marginTop: "0px",
          paddingLeft: "55px",
          color: "#fff"
         }}>Image Tools</h1>
        <Controls ops={ops} setOps={setOps} setImage={setImage} />
      </div>

      {/* Main Canvas */}
      <div style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}>
        <Canvas image={image} ops={ops} />
      </div>
    </div>
  );
}

export default App;
