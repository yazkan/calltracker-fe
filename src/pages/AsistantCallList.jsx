import { useEffect, useState } from "react";
import { Button, Modal, Input, Select } from "antd";
import "./AssistantCallList.scss";
import { getRequest, getRequestForThemselves } from "../api/apiCall";

function AssistantCallList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("Following");
  const [subject, setSubject] = useState("Request");
  const [callList, setCallList] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setSubject("Request");
    setStatus("WAITING");
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
    console.log("Customer Name:", e.target.value);
  };
 const fetchData = async ()=>{
 const response = await getRequestForThemselves(
      "/api/calls/my-calls"
   ); 
    setCallList(response);
}
  useEffect(() => {
   fetchData();
  }, []);

  return (
    <>
      <Modal
        open={isModalOpen}
        destroyOnClose={true}
        title="Yeni Çağrı"
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
        <p>Müşteri Adı:</p>
        <Input onChange={handleCustomerName} />
        <div>
          <p>Görüşme Konusu: </p>
          <Select
            defaultValue={subject}
            style={{ width: 150 }}
            onChange={handleSelectChangeSubject}
            options={[
              { value: "Fault", label: "Arıza" },
              { value: "Request", label: "Talep" },
              { value: "Information", label: "Bilgi Alma" },
            ]}
          />
        </div>
        <p>Görüşme Tarihi:</p>
        <Input />
        <p>Görüşme Başlama Saati:</p>
        <Input />
        <p>Görüşme Bitiş Saati:</p>
        <Input />
        <div>
          <p>Görüşme Durumu: </p>
          <Select
            defaultValue={status}
            style={{ width: 150 }}
            onChange={handleSelectChangeStatus}
            options={[
              { value: "Completed", label: "Tamamlandı" },
              { value: "Following", label: "Takip Ediliyor" },
              { value: "No Solution", label: "Sorun Çözülemedi" },
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
                  <th>Görüşme Tarihi</th>
                  <th>Görüşme Başlama Saati</th>
                  <th>Görüşme Bitiş Saati</th>
                  <th>Görüşme Durumu</th>
                </tr>
              </thead>
              <tbody>
                {callList ? callList.map(call => {
                  (       <tr>
                  <td>{call.customerName}</td>
                  <td>arıza2</td>
                  <td>45645</td>
                  <td>11</td>
                  <td>14</td>
                  <td>bekliyor</td>
                </tr>)
                }):"yok"}
                
                <tr>
                  <td>armagan</td>
                  <td>arıza2</td>
                  <td>45645</td>
                  <td>11</td>
                  <td>14</td>
                  <td>bekliyor</td>
                </tr>
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
