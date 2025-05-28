import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css'; // CSS dosyasını dahil edin

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home'); // Ana sayfaya yönlendir
  };

  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404 - Sayfa Bulunamadı</h1>
      <p className="notfound-description">Bu sayfaya erişim izniniz yok.</p>
      <button className="notfound-button" onClick={handleGoHome}>
        Ana Sayfaya Dön
      </button>
    </div>
  );
};

export default NotFound;