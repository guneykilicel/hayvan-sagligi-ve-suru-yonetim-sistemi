import { useEffect, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../apiCalls";

import "./login.scss";
const Login = () => {
  const [farmerTC, setfarmerTC] = useState("");
  const [farmerPassword, setfarmerPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    try {
      await loginCall({ farmerTC, farmerPassword }, dispatch);
      console.log("Login successful"); // Kontrol için eklendi
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  

  return (
    <div className="login">
      <div className="container">
      <h1>Sürdürülebilir Hayvancılık Uygulamaları için Hayvan Sağlığı ve Sürü Yönetim Sistemi</h1>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Giriş Yap</h2>
        <div className="form-input">
          <TextField
            required
            type="text"
            label="farmerTC"
            variant="outlined"
            onChange={(e) => setfarmerTC(e.target.value)}
          />
        </div>
        <div className="form-input">
          <TextField
            required
            type="password"
            label="farmerPassword"
            variant="outlined"
            onChange={(e) => setfarmerPassword(e.target.value)}
          />
        </div>
        <Link to="/register" className="auth-link">
          Go to Register
        </Link>
        <Button type="submit" variant="contained" color="success">
          {isFetching ? (
            <CircularProgress
              style={{ width: "25px", height: "25px" }}
              color="inherit"
            />
          ) : (
            "Login"
          )}
        </Button>
      </form>
      </div>
    </div>
  );
};

export default Login;