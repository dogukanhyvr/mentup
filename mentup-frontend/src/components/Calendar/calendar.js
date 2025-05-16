import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css"; // kendi stillerin
import tr from "date-fns/locale/tr";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
  "tr": tr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
  locale: tr,
});

const messages = {
  today: "Bugün",
  previous: "Geri",
  next: "İleri",
  week: "Hafta",
  day: "Gün",
  month: "Ay",
  agenda: "Ajanda",
  date: "Tarih",
  time: "Saat",
  event: "Etkinlik",
  noEventsInRange: "Bu tarihler arasında etkinlik yok.",
};


const CalendarComponent = ({ onSlotsChange }) => {
  const [slots, setSlots] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date()); // Yeni eklendi

  const handleSelectSlot = ({ start, end }) => {
    const newSlot = {
      title: "Uygun",
      start,
      end,
    };

    const updated = [...slots, newSlot];
    setSlots(updated);

    if (onSlotsChange) onSlotsChange(updated);
  };

  return (
    <div style={{ height: "100vh", padding: "10px" }}>
      <Calendar
        selectable
        culture="tr"
        localizer={localizer}
        events={slots}
        onSelectSlot={handleSelectSlot}
        defaultView="week"
        views={["week"]}
        step={60}
        timeslots={1}
        min={new Date(0, 0, 0, 9, 0)}
        max={new Date(0, 0, 0, 21, 0)}
        date={currentDate} // Eklendi
        onNavigate={(date) => setCurrentDate(date)} // Eklendi
        messages={messages}
        style={{ border: "1px solid #ccc", borderRadius: "10px" }}
      />
    </div>
  );
};

export default CalendarComponent;