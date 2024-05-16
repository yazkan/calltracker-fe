import { useState, useRef } from "react";
import { Button, Modal, Input, Select } from "antd";
const { TextArea } = Input;
import "./TeamLeader.scss";

function TeamLeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [status, setStatus] = useState("WAITING");
  const textAreaRef = useRef(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log(status);
    if (textAreaRef.current) {
      console.log(
        "TextArea Content:",
        textAreaRef.current.resizableTextArea.textArea.value
      );
    }
    setStatus("WAITING");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setStatus("WAITING");
    setIsModalOpen(false);
  };

  const handleSelectChange = (e) => {
    console.log("Selected:", e);
    setStatus(e);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOk2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        destroyOnClose={true}
        title="İtiraz Cevap Menüsü"
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
        <div style={{ paddingTop: "16px" }}>
          <p>İtiraz Durumu: </p>
          <Select
            defaultValue={status}
            style={{ width: 120 }}
            onChange={handleSelectChange}
            options={[
              { value: "WAITING", label: "Bekliyor" },
              { value: "APPROVED", label: "Onaylandı" },
              { value: "REJECTED", label: "Reddedildi" },
            ]}
          />
        </div>
      </Modal>
      <Modal
        open={isModalOpen2}
        destroyOnClose={true}
        title="İtiraz Cevap Menüsü"
        onOk={handleOk2}
        onCancel={handleCancel2}
        footer={[
          <Button key="back" onClick={handleCancel2}>
            İptal
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk2}>
            Ekle
          </Button>,
        ]}
      >
        <p>Asistan Adı:</p>
        <Input />
        <p>Sicil No:</p>
        <Input />
        <p>E-Posta:</p>
        <Input />
        <p>Kullanıcı Adı:</p>
        <Input />
        <p>Şifre:</p>
        <Input />
      </Modal>
      <div className="myJobs">
        <div className="container">
          <h1>Takım Lideri Anasayfası</h1>
          <div>
            <label htmlFor="">Takım Lideri Adı: </label>
            <label className="infoLabel">Nazmi Yazkan</label>
          </div>
          <div>
            <label htmlFor="">Sicil No: </label>
            <label className="infoLabel">2313123</label>
          </div>
          <div className="title">
            <h2>Prim İtiraz Listesi: </h2>
            <button style={{ maxHeight: "50px" }} onClick={showModal2}>
              Asistan Ekle
            </button>
          </div>
          <div className="title">
            <table>
              <thead>
                <tr>
                  <th>Asistan Sicil No</th>
                  <th>Asistan Adı Soyadı</th>
                  <th>İtiraz Açıklaması</th>
                  <th>İtirazın Yapıldığı Ay</th>
                  <th>İtiraz Durumu</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>111</td>
                  <td>nazmi</td>
                  <td>açıklamaaaa</td>
                  <td>mart</td>
                  <td>Bekliyor</td>
                  <td>
                    <button onClick={showModal}>İtiraz Cevapla</button>
                  </td>
                </tr>
                <tr>
                  <td>222</td>
                  <td>armagan</td>
                  <td>açıklamaaaa2</td>
                  <td>nisan</td>
                  <td>Bekliyor</td>
                  <td>
                    <button onClick={showModal}>İtiraz Cevapla</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamLeader;
