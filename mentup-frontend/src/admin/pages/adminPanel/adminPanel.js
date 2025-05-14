import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import "./adminPanel.css";

const AdminPanel = () => {
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get('http://localhost:5001/admin/applications', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setApplicants(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Başvuru verileri alınamadı:', err);
        setLoading(false);
      }
    };

  fetchApplicants();
}, []);

  const handleCardClick = (applicant) => {
    setSelectedApplicant(applicant);
  };

  const handleCloseDetails = () => {
    setSelectedApplicant(null);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('applicant-details')) {
      handleCloseDetails();
    }
  };

  const handleReject = async (applicantId) => {
    try {
      await axios.put(`http://localhost:5001/admin/applications/${applicantId}/reject`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setApplicants((prevApplicants) =>
        prevApplicants.filter((applicant) => applicant.id !== applicantId)
      );
      setSelectedApplicant(null);
      alert("Başvuru reddedildi.");
    } catch (error) {
      console.error("Başvuru reddedilemedi:", error);
      alert("Başvuru reddedilirken bir hata oluştu.");
    }
  };

  const handleApprove = async (applicantId) => {
    try {
      // Backend'e onaylama isteği gönder
      await axios.put(`http://localhost:5001/admin/applications/${applicantId}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Frontend'den başvuruyu kaldır
      setApplicants((prevApplicants) =>
        prevApplicants.filter((applicant) => applicant.id !== applicantId)
      );

      alert("Başvuru onaylandı ve kullanıcı mentor olarak güncellendi.");
    } catch (error) {
      console.error("Başvuru onaylanamadı:", error);
      alert("Başvuru onaylanırken bir hata oluştu.");
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const response = await fetch("http://localhost:5001/user/role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId, newRole }),
      });
  
      const data = await response.json();
      console.log("Rol güncelleme sonucu:", data.message);
    } catch (error) {
      console.error("Rol güncelleme hatası:", error);
    }
  };

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div className="admin-panel">
      <h2>Mentorluk Başvuruları</h2>
      <div className="applicant-cards">
        {applicants.map((applicant) => (
          <div
            key={applicant.id}
            className="applicant-card"
            onClick={() => handleCardClick(applicant)}
          >
            <div className="applicant-card-image-content">
              {applicant.profile?.photo_url ? (
                <img
                  className="applicant-card-image"
                  src={applicant.profile.photo_url}
                  alt="Profil Resmi"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="applicant-card-image-icon"
                  style={{ fontSize: "40px", color: "#ccc" }}
                />
              )}
              <div className="applicant-card-content">
                <div className="applicant-card-name-age-div">
                  <h3>
                    {applicant.name} {applicant.surname}
                  </h3>
                  <p>{applicant.age} yaşında</p>
                </div>
                <div className="applicant-card-skills-languages-div">
                  <p>
                    {(() => {
                      try {
                        const skills = JSON.parse(applicant.skills || "[]");
                        return skills.length > 0 ? skills.join(", ") : "Belirtilmemiş";
                      } catch (error) {
                        console.error("Skills parse error:", error);
                        return "Belirtilmemiş";
                      }
                    })()}
                  </p>
                  <p>
                    {(() => {
                      try {
                        const languages = JSON.parse(applicant.languages || "[]");
                        return languages.length > 0 ? languages.join(", ") : "Belirtilmemiş";
                      } catch (error) {
                        console.error("Languages parse error:", error);
                        return "Belirtilmemiş";
                      }
                    })()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detayları Göster */}
      {selectedApplicant && (
        <div className="applicant-details" onClick={handleOutsideClick}>
          <div className="admin-panel-form-card">
            <button className="close-button" onClick={handleCloseDetails}>
              &times;
            </button>
            <div className="admin-panel-name-surname-div">
              <div className="admin-panel-name">
                <label className="admin-panel-name-label">İsim</label>
                <p className="admin-panel-name-text">{selectedApplicant.name}</p>
              </div>
              <div className="admin-panel-surname">
                <label className="admin-panel-surname-label">Soyisim</label>
                <p className="admin-panel-surname-text">{selectedApplicant.surname || "Belirtilmemiş"}</p>
              </div>
            </div>
            <div className="admin-panel-form-item">
              <label>E-posta:</label>
              <p>{selectedApplicant.email || "Belirtilmemiş"}</p>
            </div>
            <div className="admin-panel-age-diploma-div">
              <div className="admin-panel-age">
                <label className="admin-panel-age-label">Yaş</label>
                <p className="admin-panel-age-text">{selectedApplicant.age}</p>
              </div>
              <div className="admin-panel-diploma">
                <label className="admin-panel-diploma-label">Diploma Numarası</label>
                <p className="admin-panel-diploma-text">{selectedApplicant.degree_number}</p>
              </div>
            </div>
            <div className="admin-panel-form-item">
              <label>Bilgisayar mühendisliği sektöründe kaç yıllık tecrübeniz var?</label>
              <p>{selectedApplicant.experience_years}</p>
            </div>
            <div className="admin-panel-form-item">
              <label>Neden mentor olmak istiyorsunuz?</label>
              <p>{selectedApplicant.why_mentor}</p>
            </div>
            <div className="admin-panel-form-item">
              <label>Beceri Alanları</label>
              <p className="admin-panel-skills-text">
                {(() => {
                  try {
                    const skills = JSON.parse(selectedApplicant.skills || "[]");
                    return skills.length > 0 ? skills.join(", ") : "Belirtilmemiş";
                  } catch (error) {
                    console.error("Skills parse error:", error);
                    return "Belirtilmemiş";
                  }
                })()}
              </p>
            </div>
            <div className="admin-panel-form-item">
              <label>Yazılım Dilleri</label>
              <p className="admin-panel-languages-text">
                {(() => {
                  try {
                    const languages = JSON.parse(selectedApplicant.languages || "[]");
                    return languages.length > 0 ? languages.join(", ") : "Belirtilmemiş";
                  } catch (error) {
                    console.error("Languages parse error:", error);
                    return "Belirtilmemiş";
                  }
                })()}
              </p>
            </div>
            <div className="admin-panel-form-item">
              <label>Özgeçmiş (CV):</label>
              <a
                href={selectedApplicant.cv_url}
                className="admin-panel-cv-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                CV'yi Görüntüle
              </a>
            </div>
            <div className="admin-panel-action-buttons">
              <button
                className="admin-button reject"
                onClick={() => handleReject(selectedApplicant.id)}
              >
                Reddet
              </button>
              <button
                className="admin-button approve"
                onClick={() => handleApprove(selectedApplicant.id)}
              >
                Onayla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
