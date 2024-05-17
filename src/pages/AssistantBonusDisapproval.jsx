import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../api/apiCall";
import "./AssistantBonusDisapproval.scss";

function AssistantBonusDisapproval() {
  const [bonusDisapprovalsList, setBonusDisapprovalsList] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const fetchData = async () => {
    const response = await getRequest(
      "/disapprovals/my-disapprovals/assistant/" + user.id
    );
    setBonusDisapprovalsList(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="myJobs">
        <div className="container">
          <h1>Asistan Prim İtiraz Listesi (İtirazlarım)</h1>
          <div>
            <label htmlFor="">Asistan Adı: </label>
            <label className="infoLabel">{user.fullName}</label>
          </div>
          <div>
            <label htmlFor="">Sicil No: </label>
            <label className="infoLabel">{user.ssn}</label>
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
                {bonusDisapprovalsList ? (
                  bonusDisapprovalsList.map((bonusDisapproval, index) => (
                    <tr key={index}>
                      <td>{bonusDisapproval.reason}</td>
                      <td>{bonusDisapproval.teamLeadResponse}</td>
                      <td>
                        {new Date(
                          bonusDisapproval.disputedTo
                        ).toLocaleDateString("tr-TR", {
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td>{bonusDisapproval.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Yok</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssistantBonusDisapproval;
