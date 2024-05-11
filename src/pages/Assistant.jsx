import "./Assistant.scss";

function Assistant() {
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
            <button type="submit">Müşteri Çağrı Listesi Menüsü</button>
            <button type="submit">Aylık Prim Listesi Menüsü</button>
            <button type="submit">Prim İtiraz Listesi Menüsü</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Assistant;
