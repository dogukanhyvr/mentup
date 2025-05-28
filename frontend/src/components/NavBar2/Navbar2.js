import React, { useState, useEffect } from 'react';
import './Navbar2.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faBell, faAngleDown, faGear, faArrowRightFromBracket, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar2 = () => {  
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [photo_url, setPhoto_url] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/profile/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(response.data.name);
        setUserSurname(response.data.surname);
        setPhoto_url(response.data.profile?.photo_url || null); // Profil resmi yoksa null olarak ayarla
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:5001/auth/logout',
        {}, // Boş bir body gönderiyoruz
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Token'ı temizle ve kullanıcıyı giriş sayfasına yönlendir
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (e) {
      console.warn('Server logout hatası (yine de devam ediyoruz):', e);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  const closeDropdown = (event) => {
    if (!event.target.closest('.navbar-secondary-profile')) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeDropdown);
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <nav className="navbar-secondary">
      <div className="navbar-secondary-content">
        <div className="navbar-secondary-logo-name">
          <a href="/home" className="navbar-secondary-logo-link">
            <div className="navbar-secondary-logo-image" />
            <span>MentUp</span>
          </a>
        </div>
        <div className="navbar-secondary-apply-mentorship">
          <a href="/applymentorship">Mentorluk İçin Başvur</a>
        </div>
        <div className="navbar-secondary-items-right-col">
          <div className="navbar-secondary-items">
            <a href="/browsementors">Mentorlara Göz At</a>
            <a href="/mentors">Mentorlarımız</a>
            <a href="/appointments">Görüşmelerim</a>
            <a href="/appointmentrequests">Görüşmele Taleplerim</a>
            <a href="/contact">İletişim</a>
            <a href="/aboutus">Hakkımızda</a>
          </div>
          <div className="navbar-secondary-options">
            <button className="navbar-secondary-messages-button">
              <FontAwesomeIcon icon={faMessage} style={{ color: "white" }} />
            </button>
            <button className="navbar-secondary-notifications-button">
              <FontAwesomeIcon icon={faBell} style={{ color: "white" }} />
            </button>
            <div className="navbar-secondary-profile">
              <button
                className="navbar-secondary-profile-button"
                onClick={toggleDropdown}
              >
                <div className="navbar-secondary-profile-icon">
                  {photo_url ? (
                    <img
                      src={photo_url}
                      alt=""
                      className="navbar-secondary-profile-image"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faCircleUser} style={{ color: "white", fontSize: "24px" }} />
                  )}
                </div>
                <div className="navbar-secondary-arrow-down-icon">
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    style={{ color: "white" }}
                  />
                </div>
              </button>
              {isDropdownVisible && (
                <ul className="navbar-secondary-dropdown-menu">
                  <li>
                    <a 
                      className="navbar-secondary-profile-info"
                      href='/menteeprofile'
                    >
                      <div
                        className="navbar-secondary-profile-dropdown-image"
                        style={{
                          backgroundImage: photo_url
                            ? `url(${photo_url})`
                            : "none",
                        }}
                      >
                        {!photo_url && (
                          <FontAwesomeIcon
                            icon={faCircleUser}
                            style={{ color: "grey", fontSize: "40px" }}
                          />
                        )}
                      </div>
                      <div className="navbar-profile-details">
                        <span className="navbar-profile-name">{userName} {userSurname}</span>
                        <p className="navbar-view-profile-link">Profili Görüntüle</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      className="navbar-secondary-dropdown-menu-settings"
                      href="/accountsettings"
                    >
                      <FontAwesomeIcon
                        icon={faGear}
                        style={{ color: "white", marginRight: "10px" }}
                      />
                      Hesap Ayarları
                    </a>
                  </li>
                  <li>
                    <a
                      className="navbar-secondary-dropdown-menu-logout"
                      onClick={handleLogout}
                    >
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        style={{ color: "white", marginRight: "10px" }}
                      />
                      Çıkış Yap
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar2;
