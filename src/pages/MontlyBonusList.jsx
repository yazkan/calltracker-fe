import { useState, useEffect, useRef } from "react";
import { getRequest, postRequest } from "../api/apiCall";
import { Button, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";

function MontlyBonusList() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const textAreaRef = useRef(null);
  const [monthlyBonusList, setMonthlyBonusList] = useState([]);
  const [isDisputedForLastMonth, setIsDisputedForLastMonth] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const isDisputed = async (id) => {
    const response = await getRequest(`/disapprovals/isDisputed/${id}`);
    console.log("🚀 ~ isDisputed ~ response:", response.data);
    return response.data;
  };

  const handleExit = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleBack = () => {
    navigate("/assistant");
  };

  const handleOk = async () => {
    const maxId = findMaxId();
    const data = {
      reason: textAreaRef.current.resizableTextArea.textArea.value,
      disputedToId: maxId,
      assistantId: user.id,
    };

    const response = await postRequest("/disapprovals", data);

    setIsModalOpen(false);
    window.location.reload();
  };

  const findMaxId = () => {
    if (monthlyBonusList.length === 0) return null;

    return monthlyBonusList.reduce((maxItem, currentItem) => {
      return currentItem.datetime > maxItem.datetime ? currentItem : maxItem;
    }).id;
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    const response = await getRequest("/monthly-prizes/my-prizes/" + user.id);
    setMonthlyBonusList(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const checkDisputedStatus = async () => {
      const maxId = findMaxId();
      if (maxId !== null) {
        const disputed = await isDisputed(maxId);
        setIsDisputedForLastMonth(disputed);
      }
    };

    checkDisputedStatus();
  }, [monthlyBonusList]);

  return (
    <>
      <Modal
        open={isModalOpen}
        destroyOnClose={true}
        title="İtiraz Açıklaması"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            İptal
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Gönder
          </Button>,
        ]}
      >
        <p>Açıklama:</p>
        <TextArea ref={textAreaRef} rows={6} />
      </Modal>
      <div className="myJobs">
        <div className="container">
          <h1>Asistan Aylık Prim Listesi</h1>
          <div>
            <label htmlFor="">Asistan Adı: </label>
            <label className="infoLabel">{user.fullName}</label>
          </div>
          <div>
            <label htmlFor="">Sicil No: </label>
            <label className="infoLabel">{user.ssn}</label>
          </div>
          <div style={{ margin: "10px 0px" }} className="title">
            <button onClick={handleBack}>Geri Dön</button>
            <div className="exit">
              <button onClick={handleExit}>Çıkış Yap</button>
            </div>
          </div>
          <h2>Prim Listesi: </h2>
          <div className="title">
            <table>
              <thead>
                <tr>
                  <th>Prim Tarihi</th>
                  <th>Aylık Cevaplanan Toplam Çağrı Sayısı</th>
                  <th>Aylık Cevaplanan Toplam Kısa Çağrı Sayısı </th>
                  <th>Prim Tutarı</th>
                </tr>
              </thead>
              <tbody>
                {monthlyBonusList && monthlyBonusList.length > 0 ? (
                  monthlyBonusList.map((call, index) => (
                    <tr key={index}>
                      <td>
                        {" "}
                        {new Date(call.datetime).toLocaleDateString("tr-TR", {
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td>{call.answeredCall}</td>
                      <td>{call.answeredShortCallCount}</td>
                      <td>{call.prizeAmount} TL</td>
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
          <div style={{ marginTop: "50px", float: "right" }} className="title">
            {!isDisputedForLastMonth && (
              <button style={{ minWidth: "150px" }} onClick={showModal}>
                Son Aya Ait Prime İtiraz Et
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MontlyBonusList;
