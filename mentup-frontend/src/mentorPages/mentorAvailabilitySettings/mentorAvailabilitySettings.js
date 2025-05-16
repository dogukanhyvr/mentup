import React, { useState } from "react";
import axios from "axios";
import "./mentorAvailabilitySettings.css";
import Calendar from "../../components/Calendar/calendar";

const MentorAvailabilitySettings = () => {
  const [slots, setSlots] = useState([]);

  // Takvimden slotlar değiştikçe güncelle
  const handleSlotsChange = (updatedSlots) => {
    setSlots(updatedSlots);
  };

  // Kaydet butonuna basınca API'ye gönder
  const handleSave = async () => {
    // Slotları backend formatına çevir
    const formattedSlots = slots.map((slot) => ({
      date: slot.start.toISOString().slice(0, 10),
      start_time: slot.start.toTimeString().slice(0, 5),
      end_time: slot.end.toTimeString().slice(0, 5),
    }));

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5001/mentor/save",
        { slots: formattedSlots },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Müsaitlikler kaydedildi!");
    } catch (err) {
      alert("Kayıt sırasında hata oluştu!");
      console.error(err);
    }
  };

  return (
    <div className="mentor-availability-settings-container">
      <Calendar onSlotsChange={handleSlotsChange} />
    </div>
  );
};

export default MentorAvailabilitySettings;
