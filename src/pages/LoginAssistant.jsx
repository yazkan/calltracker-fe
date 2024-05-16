import { useState } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";
import "./Login.scss";

function LoginAssistant() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await newRequest.post("/users/assistantLogin", {
      username: username,
      password: password,
    });
    localStorage.setItem(
      "currentUser",
      JSON.stringify(res.data[0] ? res.data[0] : null)
    );

    navigate("/assistant");
  };

  return (
    <div className="containerlogin">
      <div className="login-form">
        <h2>Proje Prim Takip Sisitemi Asistan Girişi</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              name="username"
              type="text"
              id="username"
              placeholder="Kullanıcı adı girin"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Şifre</label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Şifre girin"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Giriş</button>
        </form>
      </div>
    </div>
  );
}

export default LoginAssistant;
