import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";

function LoginAssistant() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/assistantLogin", {
        username: username,
        password: password,
      });
      console.log(res);
      localStorage.setItem(
        "currentUser",
        JSON.stringify(res.data ? res.data : null)
      );
      console.log(res.data);
      if (res.data) {
        navigate("/assistant");
      } else {
        setError("Login İşlemi Başarısız. Kullanıcı Adı veya şifre hatalı!");
      }
    } catch (error) {
      setError("ERROR: " + error.message);
    }
  };

  return (
    <div className="containerlogin">
      <div className="login-form">
        {error && <div style={{ color: "red" }}>{error}</div>}
        <h2>Proje Prim Takip Sistemi Asistan Girişi</h2>
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
