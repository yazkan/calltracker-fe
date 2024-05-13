import { useState, useRef } from "react";
import { Button, Modal, Input } from "antd";
const { TextArea } = Input;
import "./AssistantBonusDisapproval.scss";

function MontlyBonusList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textAreaRef = useRef(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
                  <th>Bakılan Müşteri Sayısı</th>
                  <th>Prim Miktarı</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>tarih 123</td>
                  <td>155</td>
                  <td>5600</td>
                </tr>
                <tr>
                  <td>tarih 333</td>
                  <td>222</td>
                  <td>6000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: "50px", float: "right" }} className="title">
            <button style={{ minWidth: "150px" }} onClick={showModal}>
              Son Aya Ait Prime İtiraz Et
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MontlyBonusList;
