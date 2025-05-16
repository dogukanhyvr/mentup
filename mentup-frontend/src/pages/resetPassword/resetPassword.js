import React, { useState, useEffect } from 'react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Yeni şifre"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Yeni şifre (tekrar)"
        value={passwordAgain}
        onChange={e => setPasswordAgain(e.target.value)}
      />
      <button type="submit">Gönder</button>
      {message && <p style={{ color: message.includes('başarı') ? 'green' : 'red' }}>
        {message}
      </p>}
    </form>
  );
}
