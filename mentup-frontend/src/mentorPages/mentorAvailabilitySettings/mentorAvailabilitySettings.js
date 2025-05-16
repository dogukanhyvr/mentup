import React from "react";
import CalendarComponent from "../../components/Calendar/calendar";
import "./mentorAvailabilitySettings.css";

const MentorAvailabilitySettings = () => {
  const handleSlotsChange = (slots) => {
    console.log("Seçilen slotlar:", slots);
    // Buradan API'ye gönderme işlemi yapabilirsin
  };

  return (
    <div className="mentor-availability-settings-container">
      <h1 className="mentor-availability-settings-title">Uygunluk Ayarları</h1>
      <div className="mentor-availability-settings-calendar-div">
        <CalendarComponent onSlotsChange={handleSlotsChange} />
      </div>

      <div className="mentor-availability-settings-button-div">
        <button className="mentor-availability-settings-button">
          Değişiklikleri Kaydet
        </button>
      </div>
    </div>
  );
};

export default MentorAvailabilitySettings;
