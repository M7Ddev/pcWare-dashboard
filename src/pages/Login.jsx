import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "malghifari@gmail.com" && password === "123456") {
      setIsLoggedIn(true);
      navigate("/dashboard", { replace: true });
    } else {
      setError("انت مو ادمن توكل");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>تسجيل دخول</h2>

        <form onSubmit={handleLogin}>
          {error && <p className="error-msg">{error}</p>}

          <div className="form-group">
            <label>البريد الالكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="البريد الالكتروني"
            />
          </div>

          <div className="form-group">
            <label>كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
            />
          </div>

          <button type="submit" className="login-btn">
            تسجيل دخول
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
