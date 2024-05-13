import "./Register.scss";

function Register() {
  return (
    <div className="register-form">
      <h2>Kayıt Ol</h2>
      <form>
        <div className="form-group">
          <label htmlFor="firstName">Ad</label>
          <input type="text" id="firstName" placeholder="Adınızı girin" />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Soyad</label>
          <input type="text" id="lastName" placeholder="Soyadınızı girin" />
        </div>
        <div className="form-group">
          <label htmlFor="employeeId">Sicil Numarası</label>
          <input
            type="text"
            id="employeeId"
            placeholder="Sicil numaranızı girin"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-posta</label>
          <input
            type="email"
            id="email"
            placeholder="E-posta adresinizi girin"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Şifre</label>
          <input type="password" id="password" placeholder="Şifre oluşturun" />
        </div>
        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
}

export default Register;
