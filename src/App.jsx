import { BrowserRouter, Route, Routes } from "react-router-dom";
import Assistant from "./pages/Assistant";
import TeamLeader from "./pages/TeamLeader";
import AssistantBonusDisapproval from "./pages/AssistantBonusDisapproval";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AssistantCallList from "./pages/AsistantCallList";
import MontlyBonusList from "./pages/MontlyBonusList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Anasayfa</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/teamleader" element={<TeamLeader />} />
          <Route path="/bonusdisapp" element={<AssistantBonusDisapproval />} />
          <Route path="/assistantcalllist" element={<AssistantCallList />} />
          <Route path="/montlybonuslist" element={<MontlyBonusList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
