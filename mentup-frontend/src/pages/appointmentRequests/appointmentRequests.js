import React, { useState } from "react";
import "./appointmentRequests.css";

const AppointmentRequests = () => {
  const [requests] = useState([
    {
      request_id: 1,
      mentor: {
        name: "Mehmet",
        surname: "Demir",
        skills: ["Java", "React"],
        photo_url: "/images/mentor.png"
      },
      slot: {
        date: "2025-05-28",
        start_time: "20:00",
        end_time: "20:30"
      },
      meeting_reason: "Frontend geliştirme üzerine konuşmak istiyorum."
    }
  ]);
  const [modalReq, setModalReq] = useState(null);

  const openModal = (req) => setModalReq(req);
  const closeModal = () => setModalReq(null);

  return (
    <div className="appointment-requests-container">
      <div className="appointment-requests-content-div">
        <h1 className="appointment-requests-title">Yaptığım Görüşme Talepleri</h1>
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
                  backgroundImage: `url(${req.mentor.photo_url || "/images/mentor.png"})`,
                }}
              ></div>
              <div className="appointment-requests-info-content">
                <h2 className="appointment-requests-info-title">
                  {req.meeting_reason || "Görüşme Sebebi Yok"}
                </h2>
                <h3 className="appointment-requests-name">
                  {req.mentor.name} {req.mentor.surname}
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
                    {req.slot.start_time} - {req.slot.end_time}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
                {modalReq.mentor.name} {modalReq.mentor.surname}
              </p>
            </div>
            <div className="mar-modal-form-item">
              <label>Biyografi</label>
              <input
                className="mar-modal-text"
                value={"10 yıllık tecrübeli bir frontend geliştirici."}
                readOnly
                style={{ background: "#232323", color: "#fff", border: "1px solid #444" }}
              />
            </div>
            <div className="mar-modal-form-item">
              <label>Yazılım Dilleri</label>
              <p className="mar-modal-text">
                {modalReq.mentor.skills?.join(", ")}
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
                {modalReq.slot.start_time} - {modalReq.slot.end_time}
              </p>
            </div>
            <div className="mentee-appointment-requests-modal-cancel-row">
              <button
                className="mentee-appointment-requests-modal-cancel-button"
                onClick={() => {
                  // Buraya iptal işlemini ekleyebilirsin
                  closeModal();
                }}
              >
                Talebimi İptal Et
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentRequests;