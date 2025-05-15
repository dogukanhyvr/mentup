import React, { useState } from "react";
import "./mentorAvailabilitySettings.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addMinutes } from "date-fns";

const locales = {
  "en-US": require("date-fns/locale/en-US")
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

export default function MentorAvailabilitySettings() {
  const [slots, setSlots] = useState([]);

  const handleSelectSlot = ({ start, end }) => {
    const newSlot = {
      title: "Uygun",
      start,
      end
    };
    setSlots([...slots, newSlot]);
  };

  return (
    <div className="mentor-availability-settings-container">
      <h2 className="mentor-availability-settings-title">
        Mentor Uygunluk Takvimi
      </h2>
      <Calendar
        selectable
        localizer={localizer}
        events={slots}
        onSelectSlot={handleSelectSlot}
        defaultView="week"
        views={["week"]}
        step={60} // her slot 60 dk
        timeslots={1}
        min={new Date(0, 0, 0, 9, 0)} // 09:00
        max={new Date(0, 0, 0, 20, 0)} // 20:00
      />
    </div>
  );
}
