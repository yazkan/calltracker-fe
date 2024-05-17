import { useNavigate } from "react-router-dom";
import "./Assistant.scss";

function Assistant() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const handleClickOnCallListBtn = () => {
    navigate("/assistantcalllist");
  };

  const handleClickOnMontlyBonusListBtn = () => {
    navigate("/montlybonuslist");
  };

  const handleClickOnBonusDisapprovalListBtn = () => {
    navigate("/bonusdisapp");
  };

  const handleExit = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <>
      <div className="assistant">
        <div className="section">
          <h1>Asistan Anasayfası</h1>
          <div>
            <label htmlFor="">Asistan Adı: </label>
            <label className="infoLabel">{user.fullName}</label>
          </div>

          <div>
            <label htmlFor="">Sicil No: </label>
            <label className="infoLabel">{user.ssn}</label>
          </div>
          <div className="btnGroup">
            <button onClick={handleClickOnCallListBtn} type="submit">
              Müşteri Çağrı Listesi Menüsü
            </button>
            <button onClick={handleClickOnMontlyBonusListBtn} type="submit">
              Aylık Prim Listesi Menüsü
            </button>
            <button
              onClick={handleClickOnBonusDisapprovalListBtn}
              type="submit"
            >
              Prim İtiraz Listesi Menüsü
            </button>
          </div>
          <div
            className="exit"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <button onClick={handleExit}>Çıkış Yap</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Assistant;
