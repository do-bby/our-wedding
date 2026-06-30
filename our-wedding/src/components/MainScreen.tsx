// import HeroSection from './sections/HeroSection'
import WordingSection from './sections/WordingSection'
import CalendarSection from './sections/CalendarSection'
import GallerySection from './sections/GallerySection'
import ProfileSection from './sections/ProfileSection'
import QnASection from './sections/QnASection'
import LocationSection from './sections/LocationSection'
import AccountSection from './sections/AccountSection'
// import TimelineSection from './sections/TimelineSection'
import coverImage from '../images/cover.png'
import './MainScreen.css'

export default function MainScreen() {
  const pageTitle = document.title || 'Our Wedding'

  return (
    <main className="shell">
      <div className="main-content">
        {/* <header className="topbar">
          <div className="topbar-title">Our Wedding</div>
          <nav className="topbar-nav">
            <a href="#wording">초대</a>
            <a href="#calendar">날짜</a>
            <a href="#profile">프로필</a>
            <a href="#timeline">타임라인</a>
          </nav>
        </header> */}

        <section className="cover-section" aria-label="Cover">
          <div
            className="lockscreen-inner"
            style={{ backgroundImage: `url(${coverImage})` }}
          >
            <div className="lockscreen-date">8월 29일 (토)</div>
            <div className="lockscreen-time">13:40</div>
          </div>
        </section>

        {/* <HeroSection /> */}
        <WordingSection />
        <CalendarSection />
        <LocationSection />
        <ProfileSection />
        <QnASection />
        <GallerySection />                
        {/* <TimelineSection />        */}
        <AccountSection /> 

        <footer className="footer">© {pageTitle}</footer>
      </div>
    </main>
  )
}
