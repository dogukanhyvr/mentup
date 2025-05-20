import React, { useEffect, useState } from "react";
import "./mentorAppointmentRequests.css";

const MentorAppointmentRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Burada backend'den mentorun gelen randevu taleplerini çekmelisin
    // Örnek veri:
    setRequests([
      {
        request_id: 1,
        mentee: {
          name: "Ayşe",
          surname: "Yılmaz",
          photo_url: "/images/mentee.png"
        },
        slot: {
          date: "2025-05-25",
          start_time: "19:00",
          end_time: "19:30"
        }
      },
      // ... diğer talepler
    ]);
  }, []);

  const handleApprove = (requestId) => {
    // Onayla işlemi
    // API çağrısı ve ardından listeyi güncelle
  };

  const handleReject = (requestId) => {
    // Reddet işlemi
    // API çağrısı ve ardından listeyi güncelle
  };

  return (
    <div className="appointment-requests-container">
      <div className="appointment-requests-content-div">
        <h1 className="appointment-requests-title">Gelen Görüşme Talepleri</h1>
        <div className="appointment-requests-cards">
          {requests.map((req) => (
            <div className="appointment-requests-card" key={req.request_id}>
              <div
                className="appointment-requests-image"
                style={{
                  backgroundImage: `url(${
                    req.mentee.photo_url || "/images/mentee.png"
                  })`,
                }}
              ></div>
              <div className="appointment-requests-info-content">
                <h2 className="appointment-requests-info-title">Yeni web sitemin tasrımını geliştirme</h2>
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
                    })}{" "}
                  </p>

                  <p>
                    {req.slot.start_time} - {req.slot.end_time}
                  </p>
                </div>
                <div className="appointment-requests-button-div">
                  <button
                    className="appointment-requests-approve-button"
                    onClick={() => handleApprove(req.request_id)}
                  >
                    Talebi Onayla
                  </button>
                  <button
                    className="appointment-requests-reject-button"
                    onClick={() => handleReject(req.request_id)}
                  >
                    Talebi Reddet
                  </button>
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
    </div>
  );
};

export default MentorAppointmentRequests;