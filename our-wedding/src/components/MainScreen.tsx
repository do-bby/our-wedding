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
import kakaoIcon from '../images/kakaoIcon.png'
import './MainScreen.css'

type MainScreenProps = {
  isMusicPlaying: boolean
  onToggleMusic: () => void
}

const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_JS_KEY
const SHARE_TITLE = '박윤수💍김서현 결혼합니다.'
const SHARE_DESCRIPTION = `8월 29일(토), 13:40
아이벡스컨벤션 / AK광명점 5층`

export default function MainScreen({ isMusicPlaying, onToggleMusic }: MainScreenProps) {  

  const shareInvitation = async () => {
    const pageUrl = window.location.href.split('#')[0]
    const imageUrl = new URL('images/thumb.png', pageUrl).href    

    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        if (!KAKAO_JS_KEY) {
          window.alert('카카오 JavaScript 키를 VITE_KAKAO_JS_KEY에 설정해주세요.')
          return
        }

        window.Kakao.init(KAKAO_JS_KEY)
      }

      try {
        const sharePayload = {
          objectType: 'feed',
          content: {
            title: SHARE_TITLE,
            description: SHARE_DESCRIPTION,
            imageUrl,
            link: {
              mobileWebUrl: pageUrl,
              webUrl: pageUrl,
            },
          },
          buttons: [
            {
              title: '청첩장 보기',
              link: {
                mobileWebUrl: pageUrl,
                webUrl: pageUrl,
              },
            },
          ],
        } as const

        console.log('kakao share payload', sharePayload)
        window.Kakao.Share.sendDefault(sharePayload)
      } catch (error) {
        console.error('Kakao share failed', error)
        window.alert('카카오톡 공유 호출에 실패했어요. 콘솔 오류와 카카오 플랫폼 도메인 설정을 확인해주세요.')
      }
      return
    }

    window.alert('카카오 SDK를 불러오지 못했어요.')

    if (navigator.share) {
      await navigator.share({
        title: SHARE_TITLE,
        text: SHARE_DESCRIPTION,
        url: pageUrl,
      })
      return
    }

    await navigator.clipboard.writeText(pageUrl)
    window.alert('링크를 복사했어요.')
  }

  return (
    <main className="shell">
      <div className="main-content">
        <button
          type="button"
          className="music-toggle"
          onClick={onToggleMusic}
          aria-label={isMusicPlaying ? '음악 중지' : '음악 재생'}
        >
          {isMusicPlaying ? 'Ⅱ' : '▶'}
        </button>

        <button
          type="button"
          className="kakao-share"
          onClick={shareInvitation}
          aria-label="카카오톡 공유하기"
        >
          <span className="kakao-share-label" aria-hidden="true">공유</span>
          <img
            className="kakao-share-icon"
            src={kakaoIcon}
            alt=""
            onError={(event) => {
              event.currentTarget.style.display = 'none'
            }}
          />
        </button>

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
            <div className="lockscreen-married">
              We are getting
              <br />
              <span className="lockscreen-married-emphasis">married!</span>
            </div>
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

        {/* <footer className="footer">© {pageTitle}</footer> */}
      </div>
    </main>
  )
}
