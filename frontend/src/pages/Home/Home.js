import React from 'react';
import "./Home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import ChatWidget from '../../components/chatWidget/chatWidget';

const Home = () => {
  const handleSearch = () => {
    console.log("Arama işlemi başlatıldı!");
  };
  
  return (
    <div className='home-container'> 
      <header>
      </header>
      <main>
        <section className="hero">
          <h1>Kariyer yolculuğunuzda yalnız yürümek zorunda değilsiniz, birlikte daha güçlü olabiliriz.</h1>
          <p>Yüzlerce farklı mentor ile sınırsız görüntülü görüşmeleri ücretsiz bir şekilde planlayın.</p>
          <ul>
            <li><FontAwesomeIcon icon={faCircle} style={{color: 'white', fontSize: '18px' }} /> Sektör profesyonelleriyle birebir görüşmeler yapın</li>
            <li><FontAwesomeIcon icon={faCircle} style={{color: 'white', fontSize: '18px' }}/> Kariyer hedeflerinize uygun tavsiyeler alın</li>
            <li><FontAwesomeIcon icon={faCircle} style={{color: 'white', fontSize: '18px' }}/> Özgeçmişinizi geliştirmek için ücretsiz araçlara erişin</li>
            <li><FontAwesomeIcon icon={faCircle} style={{color: 'white', fontSize: '18px' }}/> Başarı hikayelerinden ilham alın ve yol haritanızı oluşturun</li>
            <li><FontAwesomeIcon icon={faCircle} style={{color: 'white', fontSize: '18px' }}/> Mentorlarınızdan düzenli geribildirim alın</li>
            <li><FontAwesomeIcon icon={faCircle} style={{color: 'white', fontSize: '18px' }}/> Sektör bazlı en iyi uygulama rehberlerini keşfedin</li>
          </ul>
          <div className="stats">
            <p><strong>10.000+</strong> Seans rezerve edildi</p>
            <p><strong>100+</strong> Onaylanmış akıl hocası</p>
            <p><strong>4.8/5</strong> Ortalama oturum derecelendirmesi</p>
          </div>
        </section>
      </main>
      <ChatWidget/>
    </div>
  );
};

export default Home;
