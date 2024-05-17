import { useNavigate } from "react-router-dom";
import "./Mainpage.scss";

const Mainpage = () => {
  const navigate = useNavigate();
  return (
    <div className="layout">
      <div className="header">
        <h2>Call Tracker</h2>
      </div>
      <div className="content">
        <h3>İlgili sayfaya yönlendirilmek ve giriş yapmak için tıklayınız</h3>
        <div className="buttons">
          <button
            className="primary icon"
            onClick={() => {
              navigate("/loginassistant");
            }}
          >
            Asistan Giriş
          </button>
          <button
            className="primary icon"
            onClick={() => {
              navigate("/loginteamleader");
            }}
          >
            Takım Lideri Giriş
          </button>
        </div>
      </div>
      <div className="footer">CallTracker Homepage ©2024 MCBU</div>
    </div>
  );
};

export default Mainpage;
