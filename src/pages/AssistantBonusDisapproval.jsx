import "./AssistantBonusDisapproval.scss";

function AssistantBonusDisapproval() {
  return (
    <>
      <div className="myJobs">
        <div className="container">
          <h1>Asistan Prim İtiraz Listesi (İtirazlarım)</h1>
          <div>
            <label htmlFor="">Asistan Adı: </label>
            <label className="infoLabel">Nazmi Yazkan</label>
          </div>
          <div>
            <label htmlFor="">Sicil No: </label>
            <label className="infoLabel">2313123</label>
          </div>
          <h2>Prim İtiraz Listesi: </h2>
          <div className="title">
            <table>
              <thead>
                <tr>
                  <th>Açıklama</th>
                  <th>İtiraz Cevabı</th>
                  <th>İtirazın Yapıldığı Ay</th>
                  <th>İtiraz Durumu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>itiraz açıklaması</td>
                  <td>takım liderinin verdiği cevap</td>
                  <td>mart</td>
                  <td>Onaylandı</td>
                </tr>
                <tr>
                  <td>itiraz açıklaması2</td>
                  <td>takım lideri cevap</td>
                  <td>nisan</td>
                  <td>Reddedildi</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssistantBonusDisapproval;
