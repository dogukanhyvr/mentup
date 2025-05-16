import React, { useState } from "react";
import "./calendar.css";

const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 08:00 - 19:00
const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

function getTodayMonday() {
  const today = new Date();
  const day = today.getDay() || 7;
  const monday = new Date(today);
  monday.setDate(today.getDate() - day + 1);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

const Calendar = ({ onSlotsChange }) => {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const monday = getTodayMonday();

  const handleCellClick = (dayIdx, hour) => {
    const date = addDays(monday, dayIdx);
    const start = new Date(date);
    start.setHours(hour, 0, 0, 0);
    const end = new Date(start);
    end.setHours(hour + 1);

    const exists = selectedSlots.some(
      (slot) =>
        slot.start.getTime() === start.getTime() &&
        slot.end.getTime() === end.getTime()
    );

    let updated;
    if (exists) {
      updated = selectedSlots.filter(
        (slot) =>
          !(
            slot.start.getTime() === start.getTime() &&
            slot.end.getTime() === end.getTime()
          )
      );
    } else {
      updated = [...selectedSlots, { start, end }];
    }
    setSelectedSlots(updated);
    if (onSlotsChange) onSlotsChange(updated);
  };

  const isSelected = (dayIdx, hour) => {
    const date = addDays(monday, dayIdx);
    const start = new Date(date);
    start.setHours(hour, 0, 0, 0);
    const end = new Date(start);
    end.setHours(hour + 1);
    return selectedSlots.some(
      (slot) =>
        slot.start.getTime() === start.getTime() &&
        slot.end.getTime() === end.getTime()
    );
  };

  return (
    <div className="simple-calendar">
      <table>
        <thead>
          <tr>
            <th></th>
            {days.map((d, i) => (
              <th key={i}>
                {d}
                <br />
                {addDays(monday, i).toLocaleDateString("tr-TR")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td>{hour}:00</td>
              {days.map((_, dayIdx) => (
                <td
                  key={dayIdx}
                  className={isSelected(dayIdx, hour) ? "selected" : ""}
                  onClick={() => handleCellClick(dayIdx, hour)}
                  style={{ cursor: "pointer" }}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 16 }}>
        <b>Seçili Slotlar:</b>
        <ul>
          {selectedSlots.map((slot, i) => (
            <li key={i}>
              {slot.start.toLocaleString()} - {slot.end.toLocaleTimeString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;