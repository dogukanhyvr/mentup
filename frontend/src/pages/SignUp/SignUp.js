import React, { useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {  
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();
    setMessage("");
  
    if (!name || !surname || !email || !password || !passwordAgain) {
      setMessage("Tüm alanları doldurmalısınız.");
      return;
    }
  
    if (password.trim().length < 6 || passwordAgain.trim().length < 6) {
      setMessage("Şifre en az 6 karakter olmalıdır.");
      return;
    }
  
    if (password !== passwordAgain) {
      setMessage("Şifreler eşleşmiyor.");
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          surname,
          email,
          password,
        })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        const errorMessage = data.message || "Kayıt sırasında hata oluştu.";
        setMessage(errorMessage);
        return;
      }
  
      setMessage(data.message || "Kayıt Başarılı!");

      // Kayıt başarılıysa giriş sayfasına yönlendir
      navigate("/login");
    } catch (error) {
      setMessage("Sunucuya bağlanılamadı.");
      console.error(error);
    }
  }
  
  

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordAgainVisible, setIsPasswordAgainVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePasswordAgainVisibility = () => {
    setIsPasswordAgainVisible(!isPasswordAgainVisible);
  };

  return (
    <div>
      <div className="signup-container">
        <div className='signup-logo-name'>
          <a href='/home'>MentUp</a>
        </div>
        <div className="signup-box">
          <h1>Hadi başlayalım</h1>
          <h2>Hesap oluştur</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Ad</label>
              <input 
              type="text" 
              id="name" 
              value={name} onChange={(e) => setName(e.target.value)} 
              placeholder="John"
              required
              minLength={6}
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Soyad</label>
              <input 
              type="text" 
              id="surname" 
              value={surname} onChange={(e) => setSurName(e.target.value)} 
              placeholder="Doe"
              required />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-Posta</label>
              <input 
              type="email"
              id="email" 
              value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@example.com" 
              required
               />
            </div>
            <div className="form-group">
              <label htmlFor="password">Şifre</label>
              <div className="password-wrapper-signup-page">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={faEye} style={{fontSize: '18px' , color:'grey' }}/>
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Şifre (Yeniden)</label>
              <div className="password-wrapper-signup-page">
                <input
                  type={isPasswordAgainVisible ? "text" : "password"}
                  id="passwordAgain"
                  value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)}
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={togglePasswordAgainVisibility}
                >
                  <FontAwesomeIcon icon={faEye} style={{fontSize: '18px' , color:'grey' }}/>
                </button>
              </div>
            </div>
            <div className="form-group-checkbox">
              <input type="checkbox" id="terms" required />
              <a href="#">Hizmet Şartlarını ve Gizlilik Politikasını kabul ediyorum</a>
            </div>
            <button type="submit" className="register-button-signup-page" onClick={handleSignUp}>Kaydol</button>
            <div className='signup-page-signup-div'>
              <span>Hesabın var mı? </span>
              <a href='/login'> Hemen giriş yap</a>
            </div>
            {message && <p className="message">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;