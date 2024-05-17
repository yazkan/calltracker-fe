import { BrowserRouter, Route, Routes } from "react-router-dom";
import Assistant from "./pages/Assistant";
import TeamLeader from "./pages/TeamLeader";
import AssistantBonusDisapproval from "./pages/AssistantBonusDisapproval";
import LoginAssistant from "./pages/LoginAssistant";
import AssistantCallList from "./pages/AsistantCallList";
import MontlyBonusList from "./pages/MontlyBonusList";
import LoginTeamLeader from "./pages/LoginTeamLeader";
import Mainpage from "./pages/Mainpage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/loginteamleader" element={<LoginTeamLeader />} />
          <Route path="/loginassistant" element={<LoginAssistant />} />
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
