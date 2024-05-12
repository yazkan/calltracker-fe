import { BrowserRouter, Route, Routes } from "react-router-dom";
import Assistant from "./pages/Assistant";
import TeamLeader from "./pages/TeamLeader";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Anasayfa</div>} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/teamleader" element={<TeamLeader />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
