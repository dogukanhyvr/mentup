import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Mentors.css';

const Mentors = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/mentor/getMentors')
      .then(res => setMentors(res.data))
      .catch(err => console.error("Mentorlar alınamadı:", err));
  }, []);

  return (
    <div className='mentors-container'>
      <header></header>
      <main>
        <div className='mentors-section'>
          <h1 className='mentors-section-title'>Mentorlarımız</h1>
          <div className='mentor-cards'>
            {mentors.map((mentor) => (
              <div className='mentor-card' key={mentor.id}>
                <div
                  className='mentor-card-image'
                  style={{
                    backgroundImage: mentor.profile?.photo_url
                      ? `url(${mentor.profile.photo_url})`
                      : undefined,
                  }}
                />
                <h2 className='mentor-name'>{mentor.name} {mentor.surname}</h2>
                {/* <h3 className='mentor-job'>Web Tasarımcı</h3> */}
                <p className='mentor-info'>{mentor.profile?.bio}</p>
                <p className='mentor-skills'>
                  <strong>Beceri Alanları:</strong>{" "}
                  {mentor.profile?.skills
                    ? JSON.parse(mentor.profile.skills).join(", ")
                    : "Belirtilmemiş"}
                </p>
                <p className='mentor-languages'>
                  <strong>Yazılım Dilleri:</strong>{" "}
                  {mentor.profile?.languages
                    ? JSON.parse(mentor.profile.languages).join(", ")
                    : "Belirtilmemiş"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Mentors;
