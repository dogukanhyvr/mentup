import React, { useEffect, useState } from "react";
import axios from "axios";
import "./mentorAppointmentRequests.css";

const MentorAppointmentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [modalReq, setModalReq] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/appointments/getMentorAppointmentRequest", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // API'den gelen veriyi uygun formata dönüştür
        const formatted = res.data.map((item) => ({
          request_id: item.id,
          mentee: {
            name: item.mentee?.name || "",
            surname: item.mentee?.surname || "",
            skills: item.mentee?.profile?.skills
              ? JSON.parse(item.mentee.profile.skills)
              : [],
            photo_url: item.mentee?.profile?.photo_url || "/images/mentee.png",
            bio: item.mentee?.profile?.bio || "",
          },
          slot: {
            date: item.scheduled_date,
            start_time: item.start_time,
            end_time: item.end_time,
          },
          meeting_reason: item.description,
        }));
        setRequests(formatted);
      } catch (err) {
        setRequests([]);
      }
    };
    fetchRequests();
  }, []);

  const openModal = (req) => setModalReq(req);
  const closeModal = () => setModalReq(null);

  const handleApprove = (requestId) => {
    // Onayla işlemi (backend'e istek atılabilir)
    closeModal();
  };

  const handleReject = (requestId) => {
    // Reddet işlemi (backend'e istek atılabilir)
    closeModal();
  };

  return (
    <div className="appointment-requests-container">
      <div className="appointment-requests-content-div">
        <h1 className="appointment-requests-title">Gelen Görüşme Talepleri</h1>
        <div className="appointment-requests-cards">
          {requests.map((req) => (
            <div
              className="appointment-requests-card"
              key={req.request_id}
              onClick={() => openModal(req)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="appointment-requests-image"
                style={{
                  backgroundImage: `url(${
                    req.mentee.photo_url || "/images/mentee.png"
                  })`,
                }}
              ></div>
              <div className="appointment-requests-info-content">
                <h2 className="appointment-requests-info-title">
                  {req.meeting_reason || "Görüşme Sebebi Yok"}
                </h2>
                <h3 className="appointment-requests-name">
                  {req.mentee.name} {req.mentee.surname}
                </h3>
                <div className="appointment-requests-description">
                  <p>
                    {new Date(req.slot.date).toLocaleDateString("tr-TR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      weekday: "long",
                    })}
                  </p>
                  <p>
                    {req.slot.start_time?.slice(0, 5)} - {req.slot.end_time?.slice(0, 5)}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {requests.length === 0 && (
            <div style={{ color: "#fff", marginTop: "32px" }}>
              Henüz görüşme talebi yok.
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {modalReq && (
        <div
          className="mar-modal-overlay"
          onClick={(e) =>
            e.target.classList.contains("mar-modal-overlay") && closeModal()
          }
        >
          <div className="mar-modal-card">
            <button
              className="mar-modal-close-button"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="mar-modal-form-item">
              <label>İsim Soyisim</label>
              <p className="mar-modal-text">
                {modalReq.mentee.name} {modalReq.mentee.surname}
              </p>
            </div>
            <div className="mar-modal-form-item">
              <label>Biyografi</label>
              <input
                className="mar-modal-text"
                value={modalReq.mentee.bio || "Biyografi bulunamadı."}
                readOnly
                style={{ background: "#232323", color: "#fff", border: "1px solid #444" }}
              />
            </div>
            <div className="mar-modal-form-item">
              <label>Yazılım Dilleri</label>
              <p className="mar-modal-text">
                {modalReq.mentee.skills?.join(", ")}
              </p>
            </div>
            <div className="mar-modal-form-item">
              <label>Görüşme Sebebi</label>
              <p className="mar-modal-text">
                {modalReq.meeting_reason || "Henüz eklenmedi"}
              </p>
            </div>
            <div className="mar-modal-form-item">
              <label>Görüşme Tarihi ve Saati</label>
              <p className="mar-modal-text">
                {new Date(modalReq.slot.date).toLocaleDateString("tr-TR", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}{" "}
                <br />
                {modalReq.slot.start_time?.slice(0, 5)} - {modalReq.slot.end_time?.slice(0, 5)}
              </p>
            </div>
            <div className="mar-modal-action-buttons">
              <button
                className="mar-modal-button reject"
                onClick={() => handleReject(modalReq.request_id)}
              >
                Talebi Reddet
              </button>
              <button
                className="mar-modal-button approve"
                onClick={() => handleApprove(modalReq.request_id)}
              >
                Talebi Onayla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorAppointmentRequests;