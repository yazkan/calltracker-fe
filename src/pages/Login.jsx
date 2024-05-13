import "./Login.scss";

function Login() {
  return (
    <div className="containerlogin">
      <div className="login-form">
        <h2>Proje Prim Takip Sisitemi</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              placeholder="Kullanıcı adı girin"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Şifre</label>
            <input type="password" id="password" placeholder="Şifre girin" />
          </div>

          <button type="submit">Giriş</button>
        </form>
        <p>
          <button type="registerBtn">Kayit ol</button>
        </p>
      </div>
    </div>
  );
}

export default Login;
