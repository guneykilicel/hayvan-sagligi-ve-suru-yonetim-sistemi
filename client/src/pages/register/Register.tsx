import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import "./register.scss";

const Register = () => {
  const [farmerFullName, setFarmerFullName] = useState("");
  const [farmerTC, setfarmerTC] = useState("");
  const [farmerPhone, setFarmerPhone] = useState("");
  const [farmerCity, setFarmerCity] = useState("");
  const [farmerPassword, setfarmerPassword] = useState("");
  const [farmerPassworddAgain, setfarmerPasswordAgain] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (farmerPassword !== farmerPassworddAgain) {
      alert("Şifreler aynı değil!");
    } else {
      const user = {
        farmerTC,
        farmerPassword,
        farmerFullName,
        farmerPhone,
        farmerCity,
      };

      try {
        const res = await axios.post("/farmer/register", user);
        if (res.status === 200) {
          toast.success("Registration succesfull!");
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="register">
      <div className="container">
        <h1>Sürdürülebilir Hayvancılık Uygulamaları için Hayvan Sağlığı ve Sürü Yönetim Sistemi</h1>
        <form className="form" onSubmit={handleSubmit}>
          <h2>Kayıt ol</h2>
          <div className="form-input">
            <TextField
              required
              type="text"
              label="İsim ve Soyisim"
              variant="outlined"
              onChange={(e) => setFarmerFullName(e.target.value)}
            />
          </div>
          <div className="form-input">
            <TextField
              required
              type="text"
              label="T.C. Kimlik No"
              variant="outlined"
              onChange={(e) => setfarmerTC(e.target.value)}
            />
          </div>
          <div className="form-input">
            <TextField
              required
              type="text"
              label="Telefon Numarası"
              variant="outlined"
              onChange={(e) => setFarmerPhone(e.target.value)}
            />
          </div>
          <div className="form-input">
            <TextField
              required
              type="text"
              label="Şehir"
              variant="outlined"
              onChange={(e) => setFarmerCity(e.target.value)}
            />
          </div>
          <div className="form-input">
            <TextField
              required
              type="password"
              label="Şifre"
              variant="outlined"
              onChange={(e) => setfarmerPassword(e.target.value)}
            />
          </div>
          <div className="form-input">
            <TextField
              required
              type="password"
              label="Şifre Tekrar"
              variant="outlined"
              onChange={(e) => setfarmerPasswordAgain(e.target.value)}
            />
          </div>

          <Link to="/login" className="auth-link">
            Back to Login
          </Link>
          <Button type="submit" variant="contained" color="success">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;