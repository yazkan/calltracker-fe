import React, { useState, useEffect, useRef } from 'react';
import { getRequest, getRequestForThemselves, postRequest } from '../api/apiCall'; // API fonksiyonlarınızın doğru yollarını ekleyin
import { Button, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';

function MontlyBonusList() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

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
    return response.data; // Assuming response.data is a boolean indicating dispute status
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
  };

  const findMaxId = () => {
    if (monthlyBonusList.length === 0) return null; // Handle empty list case

    return monthlyBonusList.reduce((maxItem, currentItem) => {
      return currentItem.datetime > maxItem.datetime ? currentItem : maxItem;
    }).id;
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    const response = await getRequestForThemselves("/monthly-prizes/my-prizes");
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
            <label className="infoLabel">Nazmi Yazkan</label>
          </div>
          <div>
            <label htmlFor="">Sicil No: </label>
            <label className="infoLabel">2313123</label>
          </div>
          <h2>Prim Listesi: </h2>
          <div className="title">
            <table>
              <thead>
                <tr>
                  <th>Prim Tarihi</th>
                  <th>Cevaplanan Çağrı Sayısı</th>
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
