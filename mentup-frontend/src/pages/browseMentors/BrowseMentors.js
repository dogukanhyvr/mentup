import React, { useState, useRef, useEffect } from "react";
import "./BrowseMentors.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// Çoklu seçimli custom dropdown menu
const CustomDropdownMenu = ({ options, selectedOptions, setSelectedOptions }) => {
  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="custom-dropdown-menu">
      {options.map((option, i) => (
        <div
          key={i}
          className={`custom-dropdown-option${selectedOptions.includes(option) ? " selected" : ""}`}
          onClick={() => handleOptionClick(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

// Tekli seçimli custom dropdown menu (BrowseMentors'a özel)
const BmSingleSelectDropdown = ({ options, selectedOption, setSelectedOption, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".bm-custom-dropdown")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="bm-custom-dropdown">
      <label className="bm-custom-dropdown-label">{label}</label>
      <div className="bm-custom-dropdown-input" onClick={toggleDropdown}>
        {selectedOption?.label || "Seçim yapın"}
      </div>
      {isOpen && (
        <div className="bm-custom-dropdown-menu upwards">
          {options.map((option, index) => (
            <div
              key={option.value}
              className={`bm-custom-dropdown-option ${
                selectedOption && selectedOption.value === option.value ? "selected" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const BrowseMentors = () => {
  const [loading, setLoading] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mentors, setMentors] = useState([]);
  const [mentorSlots, setMentorSlots] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showScheduler, setShowScheduler] = useState(false);

  const menuRef = useRef(null);

  const menuData = [
    {
      label: "Beceri Alanları",
      options: [
        "Yazılım Geliştirme", "Web Teknolojileri", "Mobil Teknolojiler",
        "Oyun Geliştirme", "Veritabanı ve Backend", "Yapay Zeka & Veri Bilimi",
        "Veri Analizi & BI", "Tasarım & UI/UX", "Pazarlama & İş Geliştirme"
      ],
      type: "skills",
    },
    {
      label: "Yazılım Dilleri",
      options: [
        "C", "C++", "C#", "CSS", "HTML", "Java", "JavaScript", "Kotlin",
        "PHP", "Python", "R", "TypeScript"
      ],
      type: "languages",
    }
  ];

  // Menü açma/kapama
  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  // Menü dışına tıklanınca kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtreli mentorları çek
  useEffect(() => {
    if (selectedSkills.length === 0 && selectedLanguages.length === 0 && !searchTerm) {
      setMentors([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    axios
      .get("http://localhost:5001/mentor/filterMentors", {
        params: {
          skills: [...selectedSkills, ...selectedLanguages].join(","),
          search: searchTerm
        }
      })
      .then((res) => {
        setMentors(res.data);
        setLoading(false);
        console.log("Gelen mentorlar:", res.data);
      })
      .catch((err) => {
        setMentors([]);
        setLoading(false);
        console.error("Mentorlar alınamadı:", err);
      });
  }, [selectedSkills, selectedLanguages, searchTerm]);

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {};

  const handleScheduleClick = async (mentor) => {
    setSelectedMentor(mentor);
    setShowScheduler(true);
    setMentorSlots([]);
    setSelectedSlot("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5001/mentor/availability/getMentorAvailability/${mentor.user_id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMentorSlots(res.data.slots);
    } catch (err) {
      setMentorSlots([]);
      alert("Mentorun müsaitlikleri alınamadı.");
    }
  };

  const handleConfirm = () => {
    if (!selectedSlot) {
      alert("Lütfen bir müsaitlik seçin.");
      return;
    }
    alert("Seçilen Slot ID: " + selectedSlot);
    setShowScheduler(false);
  };

  return (
    <div className="browse-mentors-container">
      <header></header>
      <main>
        <div className="browse-mentors-form-div">
          <div className="browse-mentors-form">
            <h2 className="browse-mentors-form-title">Mentor Ara</h2>
            <div className="browse-mentors-search-bar">
              <div className="browse-mentors-search-input-wrapper">
                <input
                  type="text"
                  placeholder="Ada veya anahtar kelimeye göre arama yapın"
                  value={searchTerm}
                  onChange={handleSearchInput}
                />
                <button
                  className="browse-mentors-search-icon"
                  onClick={handleSearch}
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ color: "black", fontSize: "16px" }}
                  />
                </button>
              </div>
              <div className="browse-mentors-search-filters" ref={menuRef}>
                <div className="browse-mentors-search-tags">
                  {menuData.map((menu, index) => (
                    <div key={index} className="browse-mentors-menu-filter">
                      <button
                        className={`browse-mentors-search-tag-${menu.type}`}
                        onClick={() => toggleMenu(index)}
                      >
                        <span>{menu.label}</span>
                        <span>
                          <FontAwesomeIcon icon={faAngleDown} />
                        </span>
                      </button>
                      {openMenuIndex === index && (
                        <div style={{ minWidth: 200 }}>
                          <CustomDropdownMenu
                            options={menu.options}
                            selectedOptions={
                              menu.type === "skills" ? selectedSkills : selectedLanguages
                            }
                            setSelectedOptions={
                              menu.type === "skills" ? setSelectedSkills : setSelectedLanguages
                            }
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mentor kartları */}
            <div className="mentor-list-container">
              {loading ? (
                <div style={{ color: "#fff", marginTop: "32px" }}>Yükleniyor...</div>
              ) : mentors.length === 0 && (selectedSkills.length > 0 || selectedLanguages.length > 0 || searchTerm) ? (
                <div style={{ color: "#fff", marginTop: "32px" }}>Mentor bulunamadı.</div>
              ) : (
                mentors.map((mentor, index) => (
                  <div key={index} className="mentor-card">
                    <div
                      className="mentor-image"
                      style={{
                        backgroundImage:
                          mentor.profile && mentor.profile.photo_url
                            ? `url(${mentor.profile.photo_url})`
                            : mentor.short_photo_url
                            ? `url(${mentor.short_photo_url})`
                            : `url('/images/mentor.png')`,
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                    ></div>
                    <div className="mentor-info">
                      <h3>{mentor.name} {mentor.surname}</h3>
                      <p className="mentor-title">
                        {mentor.industries
                          ? JSON.parse(mentor.industries).join(", ")
                          : ""}
                      </p>
                      <p className="mentor-title">
                        {mentor.skills
                          ? JSON.parse(mentor.skills).join(", ")
                          : ""}
                      </p>
                      <p className="mentor-description">{mentor.bio}</p>
                    </div>
                    <div className="mentor-actions">
                      <button
                        onClick={() => handleScheduleClick(mentor)}
                        className="schedule-button"
                      >
                        Görüşme Planla
                      </button>
                      {showScheduler && selectedMentor && selectedMentor.user_id === mentor.user_id && (
                        <div className="scheduler-panel">
                          <BmSingleSelectDropdown
                            label="Müsaitlik Seç"
                            options={mentorSlots.map((slot) => {
                              const date = new Date(`${slot.date}T${slot.start_time}`);
                              const dayName = date.toLocaleDateString("tr-TR", { weekday: "long" });
                              const dateStr = date.toLocaleDateString("tr-TR");
                              const startTime = slot.start_time.slice(0, 5);
                              const endTime = slot.end_time.slice(0, 5);
                              return {
                                value: slot.slot_id,
                                label: `${dateStr} ${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${startTime}-${endTime}`,
                              };
                            })}
                            selectedOption={
                              mentorSlots
                                .map((slot) => {
                                  const date = new Date(`${slot.date}T${slot.start_time}`);
                                  const dayName = date.toLocaleDateString("tr-TR", { weekday: "long" });
                                  const dateStr = date.toLocaleDateString("tr-TR");
                                  const startTime = slot.start_time.slice(0, 5);
                                  const endTime = slot.end_time.slice(0, 5);
                                  return {
                                    value: slot.slot_id,
                                    label: `${dateStr} ${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${startTime}-${endTime}`,
                                  };
                                })
                                .find((opt) => opt.value === selectedSlot) || null
                            }
                            setSelectedOption={(option) => setSelectedSlot(option.value)}
                          />
                          <button onClick={handleConfirm}>Görüşme Talebinde Bulun</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrowseMentors;
