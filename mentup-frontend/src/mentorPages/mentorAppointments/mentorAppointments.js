import React from 'react';
import { useNavigate } from 'react-router-dom';
import './mentorAppointments.css';

const MentorAppointments = () => {
  const navigate = useNavigate();
  const [isUpcoming, setIsUpcoming] = React.useState(true);

  const toggleView = () => {
    setIsUpcoming(!isUpcoming);
  };

  const handleJoinMeeting = () => {
    navigate('/videochat');
  };

  const handleReviewClick = () => {
    navigate('/mentorreview');
  };

  return (
    <div className="mentor-appointments-container">
      <div className="mentor-appointments-toggle-container">
        <span className={`mentor-appointments-tab-span ${isUpcoming ? "active" : ""}`}>Planlanan Görüşmelerim</span>
        <label className="mentor-appointments-switch">
          <input type="checkbox" checked={!isUpcoming} onChange={toggleView} />
          <span className="mentor-appointments-slider"></span>
        </label>
        <span className={`mentor-appointments-tab-span ${!isUpcoming ? "active" : ""}`}>Geçmiş Görüşmelerim</span>
      </div>

      <div className="mentor-appointments-content">
        {isUpcoming ? (
          <div className='mentor-appointments-content-div'>
            <h1>Planlanan Görüşmelerim</h1>
            <div className="mentor-appointments-form">
              <h2 className="mentor-appointments-date-title">Mayıs, 2025</h2>
              <div className="mentor-appointments-cards">
                <div className="mentor-appointments-card">
                  <div className="mentor-appointments-image"></div>
                  <div className="mentor-appointments-info-content">
                    <h3 className="mentor-appointments-title">
                      Yeni Web Sitemin Tasarımını Geliştirme
                    </h3>
                    <div className="mentor-appointments-mentor-details">
                      <p className="mentor-appointments-name">William Johnson</p>
                    </div>
                    <div className="mentor-appointments-description">
                      <p className="mentor-appointments-date">
                        25 Mayıs, Cumartesi, 19.00-19.30
                      </p>
                      <p className="mentor-appointments-time">30 dakika</p>
                    </div>
                    <div className="mentor-appointments-button-div">
                      <button className="mentor-appointments-message-button">Mesaj At</button>
                      <button
                        className="mentor-appointments-join-button"
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
            <div className="mentor-appointments-form">
              <h2 className="mentor-appointments-date-title">Mart, 2025</h2>
              <div className="mentor-appointments-cards">
                <div className="mentor-appointments-card">
                  <div className="mentor-appointments-image"></div>
                  <div className="mentor-appointments-info-content">
                    <h3 className="mentor-appointments-title">
                      Mobil oyunumun tasarımını geliştirme
                    </h3>
                    <div className="mentor-appointments-mentor-details">
                      <p className="mentor-appointments-name">Kyrie Irving</p>
                    </div>
                    <div className="mentor-appointments-description">
                      <p className="mentor-appointments-date">
                        14 Mart, Cuma, 18.00-18.30
                      </p>
                      <p className="mentor-appointments-time">30 dakika</p>
                    </div>
                    <div className="mentor-appointments-button-div">
                      <button
                        className="mentor-appointments-review-button"
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

export default MentorAppointments;
