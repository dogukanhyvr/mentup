import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './resetPassword.css';
import NavBar from '../../components/NavBar/NavBar';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  // Query’den token’ı al
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get('token') || '');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage('Token bulunamadı.');
      return;
    }

    const res = await fetch('http://localhost:5001/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password, passwordAgain }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMessage(data.message);
    } else {
      setMessage('Şifreniz başarıyla değiştirildi.');
      navigate("/login");
    }
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <div>
        <div className='reset-password-container'>
          <div className='login-logo-name'>
            <a href='/home'>MentUp</a>
          </div>
          <div className='reset-password-box'>
            <h1 className='reset-password-title'>Şifreni Sıfırla</h1>
            <form onSubmit={handleSubmit}>
              <div className='reset-password-input-group'>
                <label htmlFor="password">Yeni Şifre</label>
                <input
                  type="password"
                  id="password"
                  placeholder="******"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="passwordAgain">Yeni Şifre (tekrar)</label>
                <input
                  type="password"
                  id="passwordAgain"
                  placeholder="******"
                  value={passwordAgain}
                  onChange={e => setPasswordAgain(e.target.value)}
                  required
                />
                <button type="submit">Gönder</button>
                {message && (
                  <p style={{ color: message.includes('başarı') ? 'green' : 'red' }}>
                    {message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
