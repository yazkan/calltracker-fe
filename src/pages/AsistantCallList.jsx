import { useEffect, useState } from "react";
import { Button, Modal, Input, Select } from "antd";
import "./AssistantCallList.scss";
import {
  getRequest,
  getRequestForThemselves,
  postRequest,
} from "../api/apiCall";
import {
  COMPLETED,
  FOLLOWING,
  NO_SOLUTION,
  REQUEST,
} from "../constants/constants";

function AssistantCallList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [status, setStatus] = useState(COMPLETED);
  const [subject, setSubject] = useState(REQUEST);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [callList, setCallList] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const localUser = { id: 1 };

  const handleNewCall = async () => {
    const data = {
      assistantId: localUser.id,
      customerName,
      callSubject: subject,
      startDateTime,
      endDateTime,
      status: status,
    };

    const response = await postRequest("/calls", data);

    if (response.status === 200) {
      setSuccess("Başarılı");
      fetchData();
    } else {
      setError(response.data.message);
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setSubject("Request");
    setStatus("WAITING");
    setIsModalOpen(false);
  };

  const handleSelectChangeStatus = (e) => {
    console.log("Status:", e);
    setStatus(e);
  };

  const handleSelectChangeSubject = (e) => {
    console.log("Subject:", e);
    setSubject(e);
  };

  const handleCustomerName = (e) => {
    setCustomerName(e.target.value);
  };
  const fetchData = async () => {
    const response = await getRequestForThemselves("/calls/my-calls");

    setCallList(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {success && <div style={{ color: "green" }}>{success}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Modal
        open={isModalOpen}
        destroyOnClose={true}
        title="Yeni Çağrı"
        onOk={handleNewCall}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            İptal
          </Button>,
          <Button key="submit" type="primary" onClick={handleNewCall}>
            Gönder
          </Button>,
        ]}
      >
        <p>Müşteri Adı:</p>
        <Input onChange={handleCustomerName} />
        <div>
          <p>Görüşme Konusu: </p>
          <Select
            defaultValue={subject}
            style={{ width: 150 }}
            onChange={handleSelectChangeSubject}
            options={[
              { value: "FAULT", label: "Arıza" },
              { value: "REQUEST", label: "Talep" },
              { value: "INFORMATION", label: "Bilgi Alma" },
            ]}
          />
        </div>
        <p>Görüşme Tarihi:</p>
        <Input />
        <p>Görüşme Başlama Saati:</p>
        <Input
          type="datetime"
          onChange={(e) => setStartDateTime(e.target.value)}
        />
        <p>Görüşme Bitiş Saati:</p>
        <Input
          type="datetime"
          onChange={(e) => setEndDateTime(e.target.value)}
        />
        <div>
          <p>Görüşme Durumu: </p>
          <Select
            defaultValue={status}
            style={{ width: 150 }}
            onChange={handleSelectChangeStatus}
            options={[
              { value: COMPLETED, label: "Tamamlandı" },
              { value: FOLLOWING, label: "Takip Ediliyor" },
              { value: NO_SOLUTION, label: "Sorun Çözülemedi" },
            ]}
          />
        </div>
      </Modal>
      <div className="callList">
        <div className="container">
          <h1>Müşteri Çağrı Listesi Menüsü</h1>
          <div>
            <label htmlFor="">Asistan Adı: </label>
            <label className="infoLabel">Nazmi Yazkan</label>
          </div>
          <div>
            <label htmlFor="">Sicil No: </label>
            <label className="infoLabel">2313123</label>
          </div>
          <h2>Çağrı Listesi: </h2>
          <div className="title">
            <table>
              <thead>
                <tr>
                  <th>Müşteri Adı Soyadı</th>
                  <th>Görüşme Konusu</th>
                  <th>Görüşme Başlangıç</th>
                  <th>Görüşme Bitiş</th>
                  <th>Görüşme Durumu</th>
                </tr>
              </thead>
              <tbody>
                {callList && callList.length > 0 ? (
                  callList.map((call, index) => (
                    <tr key={index}>
                      <td>{call.customerName}</td>
                      <td>{call.callSubject}</td>
                      <td>{call.startDateTime}</td>
                      <td>{call.endDateTime}</td>
                      <td>{call.status}</td>
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
            <button style={{ minWidth: "150px" }} onClick={showModal}>
              Yeni Çağrı
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssistantCallList;
