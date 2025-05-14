import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Appointments.css';

const Appointments = () => {
  const navigate = useNavigate();
  const [isUpcoming, setIsUpcoming] = React.useState(true); // Görüşme durumu

  const toggleView = () => {
    setIsUpcoming(!isUpcoming); // Görüşme durumunu değiştir
  };

  const handleJoinMeeting = () => {
    navigate('/videochat');
  };

  const handleReviewClick = () => {
    navigate('/mentorreview');
  };

  return (
    <div className="appointments-container">
      <div className="toggle-container">
        <span className={`tab-span ${isUpcoming ? "active" : ""}`}>Planlanan Görüşmelerim</span>
        <label className="switch">
          <input type="checkbox" checked={!isUpcoming} onChange={toggleView} />
          <span className="slider"></span>
        </label>
        <span className={!isUpcoming ? "active" : ""}>Geçmiş Görüşmelerim</span>
      </div>

      <div className="appointment-content">
        {isUpcoming ? (
          <div className='appointment-content-div'>
            <h1>Planlanan Görüşmelerim</h1>
            <div className="appointment-form">
              <h2 className="appointment-date-title">Mayıs, 2025</h2>
              <div className="appointment-cards">
                <div className="appointment-card">
                  <div className="appointment-image"></div>
                  <div className="appointment-info-content">
                    <h3 className="appointment-title">
                      Yeni Web Sitemin Tasarımını Geliştirme
                    </h3>
                    <div className="appointment-mentor-details">
                      <p className="appointment-name">William Johnson</p>
                      <p className="appointment-job">Web Tasarımcı</p>
                    </div>
                    <div className="appointment-description">
                      <p className="appointment-date">
                        25 Mayıs, Cumartesi, 19.00-19.30
                      </p>
                      <p className="appointment-time">30 dakika</p>
                    </div>
                      <div className="appointment-button-div">
                        <button className="message-button">Mesaj At</button>
                        <button
                          className="appointment-button"
                          onClick={handleJoinMeeting}
                        >
                          Görüntülü Görüşmeye Katıl
                        </button>
                      </div>  
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1>Geçmiş Görüşmelerim</h1>
            <div className="appointment-form">
              <h2 className="appointment-date-title">Mart, 2025</h2>
              <div className="appointment-cards">
                <div className="appointment-card">
                  <div className="appointment-image"></div>
                  <div className="appointment-info-content">
                    <h3 className="appointment-title">
                      Mobil oyunumun tasarımını geliştirme
                    </h3>
                    <div className="appointment-mentor-details">
                      <p className="appointment-name">Kyrie Irving</p>
                      <p className="appointment-job">Mobil Geliştirici</p>
                    </div>
                    <div className="appointment-description">
                      <p className="appointment-date">
                        14 Mart, Cuma, 18.00-18.30
                      </p>
                      <p className="appointment-time">30 dakika</p>
                    </div>
                      <div className="appointment-button-div">
                        <button
                          className="appointment-review-button"
                          onClick={handleReviewClick}
                        >
                          Görüşmeyi Değerlendir
                        </button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
