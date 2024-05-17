import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Input, Select } from "antd";
const { TextArea } = Input;
import { getRequest, postRequest, putRequest } from "../api/apiCall";
import "./TeamLeader.scss";

function TeamLeader() {
  const [bonusDisapprovalsList, setBonusDisapprovalsList] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [addAssistantResponse, setAddAssistantResponse] = useState(null);
  const [status, setStatus] = useState("WAITING");
  const textAreaRef = useRef(null);
  const [fullName, setFullName] = useState("");
  const [ssn, setSSN] = useState("");
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [answeredDisapprovalId, setAnsweredDisapprovalId] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await getRequest(
      "/disapprovals/my-disapprovals/team-lead/" + user.id
    );
   
    setBonusDisapprovalsList(response.data);
  };

  useEffect(() => {
    fetchData();
    console.log(bonusDisapprovalsList);
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const response = putRequest(
      "/disapprovals/response/" + answeredDisapprovalId,
      {
        response: textAreaRef.current.resizableTextArea.textArea.value,
        status: status,
      }
    );
    setStatus("WAITING");
    setIsModalOpen(false);
    window.location.reload();
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

  const handleOk2 = async () => {
    const response = await postRequest("/users/addAssistant", {
      fullName: fullName,
      username: username,
      password: password,
      email: mail,
      ssn: Number(ssn),
      teamLeadId: user.id,
    });
    console.log(response);
    setAddAssistantResponse(response);
    setIsModalOpen2(false);
      if (response.status === 200) {
        setSuccess("Başarılı");
      } else {
        setError(response.data.message);
      }
  };

  const handleExit = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
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
        title="Asistan Ekle"
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
        <Input
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
        <p>Sicil No:</p>
        <Input
          type="number"
          onChange={(e) => {
            setSSN(e.target.value);
          }}
        />
        <p>E-Posta:</p>
        <Input
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />
        <p>Kullanıcı Adı:</p>
        <Input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <p>Şifre:</p>
        <Input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Modal>
      <div className="myJobs">
        <div className="container">
          <h1>Takım Lideri Anasayfası</h1>
          <div>
            <label htmlFor="">Takım Lideri Adı: </label>
            <label className="infoLabel">{user.fullName}</label>
          </div>
          <div>
            <label htmlFor="">Sicil No: </label>
            <label className="infoLabel">{user.ssn}</label>
          </div>
          <div className="title">
            <h2>Prim İtiraz Listesi: </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div className="exit">
                <button style={{ maxHeight: "50px" }} onClick={handleExit}>
                  Çıkış Yap
                </button>
              </div>
              <button style={{ maxHeight: "50px" }} onClick={showModal2}>
                Asistan Ekle
              </button>
            </div>
          </div>
          <div
            style={{ marginLeft: "50%", fontSize: "20px", fontWeight: "bold" }}
          >
            {" "}
            {success && <div style={{ color: "green" }}>{success}</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}
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
                  <th>İtiraz Cevabı</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bonusDisapprovalsList &&
                  bonusDisapprovalsList.map((bonusDisapproval, index) => (
                    <tr key={index}>
                      <td>{bonusDisapproval.assistantId}</td>
                      <td>{bonusDisapproval.assistantName}</td>
                      <td>{bonusDisapproval.reason}</td>
                      <td>
                        {new Date(
                          bonusDisapproval.disputedTo
                        ).toLocaleDateString("tr-TR", {
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td>{bonusDisapproval.status}</td>
                      <td>{bonusDisapproval.teamLeadResponse}</td>
                      <td>
                        {!bonusDisapproval.teamLeadResponse && (
                          <button
                            onClick={() => {
                              setAnsweredDisapprovalId(bonusDisapproval.id);
                              showModal();
                            }}
                          >
                            İtiraz Cevapla
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamLeader;
