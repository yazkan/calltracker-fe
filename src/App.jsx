import { BrowserRouter, Route, Routes } from "react-router-dom";
import Assistant from "./pages/Assistant";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Anasayfa</div>} />
          <Route path="/assistant" element={<Assistant />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
