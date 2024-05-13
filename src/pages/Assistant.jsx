import { useNavigate } from "react-router-dom";
import "./Assistant.scss";

function Assistant() {
  const navigate = useNavigate();

  const handleClickOnCallListBtn = () => {
    navigate("/");
  };

  const handleClickOnMountlyBonusListBtn = () => {
    navigate("/");
  };

  const handleClickOnBonusDisapprovalListBtn = () => {
    navigate("/bonusdisapp");
  };

  return (
    <>
      <div className="assistant">
        <div className="section">
          <h1>Asistan Anasayfası</h1>
          <div>
            <label htmlFor="">Asistan Adı: </label>
            <label className="infoLabel">Nazmi Yazkan</label>
          </div>

          <div>
            <label htmlFor="">Sicil No: </label>
            <label className="infoLabel">2313123</label>
          </div>
          <div className="btnGroup">
            <button onClick={handleClickOnCallListBtn} type="submit">
              Müşteri Çağrı Listesi Menüsü
            </button>
            <button onClick={handleClickOnMountlyBonusListBtn} type="submit">
              Aylık Prim Listesi Menüsü
            </button>
            <button
              onClick={handleClickOnBonusDisapprovalListBtn}
              type="submit"
            >
              Prim İtiraz Listesi Menüsü
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Assistant;
