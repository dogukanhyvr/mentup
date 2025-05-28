import React, { useEffect, useState } from "react";
import './ProfileSettingsBar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGear, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ProfileSettingsBar = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get("http://localhost:5001/user-role/role", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setRole(res.data.role))
      .catch(err => console.error("Rol alınamadı:", err));  
  }, []);

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (role === "mentee") {
      window.location.href = "/menteeprofile";
    } else if (role === "mentor") {
      window.location.href = "/mentorprofile";
    }
  };

  const handleAccountClick = (e) => {
    e.preventDefault();
    if (role === "mentee") {
      window.location.href = "/accountsettings";
    } else if (role === "mentor") {
      window.location.href = "/mentoraccountsettings";
    }
  };

    const handleAvailabilityClick = (e) => {
    e.preventDefault();
    // Burada uygunluk ayarları sayfasına yönlendirebilirsin
    window.location.href = "/mentoravailabilitysettings";
  };

  return (
    <div className="profile-settings-bar">
      <div>
        <a
          className="profile-settings-bar-profile-option"
          href="#"
          onClick={handleProfileClick}
        >
          <FontAwesomeIcon
            icon={faUser}
            style={{
              marginRight: "16px",
              color: "white",
              fontSize: "20px",
            }}
          />
          Profil Bilgileri
        </a>
        <a
          className="profile-settings-bar-account-settings-option"
          href="#"
          onClick={handleAccountClick}
        >
          <FontAwesomeIcon
            icon={faGear}
            style={{
              marginRight: "14px",
              color: "white",
              fontSize: "20px",
            }}
          />
          Hesap Bilgileri
        </a>
                {role === "mentor" && (
          <a
            className="profile-settings-bar-availability-option"
            href="#"
            onClick={handleAvailabilityClick}
          >
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{
                marginRight: "14px",
                color: "white",
                fontSize: "20px",
              }}
            />
            Uygunluk Ayarları
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileSettingsBar;