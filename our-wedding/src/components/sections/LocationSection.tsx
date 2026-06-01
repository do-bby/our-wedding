import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
// import directionsImage from '../../images/directions.jpg'
import kakaoMapImage from '../../images/kakaoMap.png'
import naverMapImage from '../../images/naverMap.png'
import tMapImage from '../../images/tMap.png'
import './LocationSection.css'

type LocationSectionProps = {
  id?: string
}

declare global {
  interface Window {
    kakao?: any
  }
}

export default function LocationSection({ id = 'location' }: LocationSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [isKakaoMapReady, setIsKakaoMapReady] = useState(false)
  const kakaoMapKey = import.meta.env.VITE_KAKAO_MAP_APP_KEY
  const place = {
    name: '아이벡스 컨벤션',
    lat: 37.416,
    lng: 126.884,
  }

  const softEase = [0.22, 1, 0.36, 1] as const
  const sectionTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: softEase }

  const sectionVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  } as const

  const mapLinks = [
    {
      label: '티맵',
      image: tMapImage,
      href: 'https://apis.openapi.sk.com/tmap/app/routes?appKey=&name=%EC%95%84%EC%9D%B4%EB%B2%A1%EC%8A%A4%20%EC%BB%A8%EB%B2%A4%EC%85%98&lon=126.884&lat=37.416',
    },
    {
      label: '카카오맵',
      image: kakaoMapImage,
      href: 'https://map.kakao.com/link/search/%EC%95%84%EC%9D%B4%EB%B2%A1%EC%8A%A4%20%EC%BB%A8%EB%B2%A4%EC%85%98',
    },
    {
      label: '네이버지도',
      image: naverMapImage,
      href: 'https://map.naver.com/v5/search/%EC%95%84%EC%9D%B4%EB%B2%A1%EC%8A%A4%20%EC%BB%A8%EB%B2%A4%EC%85%98',
    },
  ]

  useEffect(() => {
    if (!kakaoMapKey || !mapRef.current) return

    const initializeMap = () => {
      if (!window.kakao?.maps || !mapRef.current) return

      const center = new window.kakao.maps.LatLng(place.lat, place.lng)
      const map = new window.kakao.maps.Map(mapRef.current, {
        center,
        level: 3,
      })
      const marker = new window.kakao.maps.Marker({
        position: center,
      })
      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `
          <div
            style="
              display: inline-flex;
              align-items: center;
              gap: 8px;
              padding: 7px 12px;
              font-size: 12px;
              font-weight: 700;
              letter-spacing: -0.1px;
              line-height: 1;
              white-space: nowrap;
              color: rgba(15, 18, 24, 0.82);
              background: rgba(255, 255, 255, 0.92);
              border: 1px solid rgba(15, 18, 24, 0.10);
              border-radius: 999px;
              box-shadow: 0 8px 18px rgba(15, 18, 24, 0.12);
              backdrop-filter: blur(6px);
            "
          >
            <span style="width: 6px; height: 6px; border-radius: 999px; background: rgba(61, 169, 226, 0.92);"></span>
            <span>${place.name}</span>
          </div>
        `,
      })
      marker.setMap(map)
      infoWindow.open(map, marker)
      setIsKakaoMapReady(true)
    }

    if (window.kakao?.maps) {
      window.kakao.maps.load(initializeMap)
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-kakao-map-sdk="true"]',
    )

    if (existingScript) {
      existingScript.addEventListener('load', () => window.kakao?.maps.load(initializeMap), {
        once: true,
      })
      return
    }

    const script = document.createElement('script')
    script.dataset.kakaoMapSdk = 'true'
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`
    script.async = true
    script.onload = () => window.kakao?.maps.load(initializeMap)
    document.head.appendChild(script)
  }, [kakaoMapKey, place.lat, place.lng])

  return (
    <section className="section" id={id}>
      <motion.div
        className="card location-card"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        transition={sectionTransition}
      >
        <div className="location-head">
          <div className="location-pin-badge" aria-hidden="true">⌖</div>
          <div className="location-kicker">아이벡스 오시는 길</div>
          <div className="location-sub">경기도 광명시 양지로 17<br></br>광명점 AK플라자 5층</div>
        </div>

        <div
          className={isKakaoMapReady ? 'location-map has-kakao-map' : 'location-map'}
          aria-label="아이벡스 컨벤션 위치 지도"
        >
          <div ref={mapRef} className="kakao-map-view" aria-hidden={!isKakaoMapReady} />
          <div className="map-road horizontal top" />
          <div className="map-road horizontal middle" />
          <div className="map-road horizontal bottom" />
          <div className="map-road vertical left" />
          <div className="map-road vertical center" />
          <div className="map-road vertical right" />
          <div className="map-place main">아이벡스<br />컨벤션</div>
          <div className="map-place station">광명역</div>
          <div className="map-pin" aria-hidden="true" />
        </div>

        {/* <img className="location-directions" src={directionsImage} alt="아이벡스 컨벤션 오시는 길 안내" /> */}
        

        <div className="location-info">
          {/* <div className="location-row">
            <div className="location-label">주소</div>
            <div className="location-text">경기도 광명시 양지로 17 아이벡스 컨벤션</div>
          </div> */}

          {/* <div className="location-row">
            <div className="location-label">지하철</div>
            <div className="location-text">1호선 광명역 5번 출구 도보 5분</div>
          </div>*/}
          <div className="location-row">
            <div className="location-label">주차 안내</div>
            <div className="location-text">AK 플라자 주차장 B3~B8 (동시 3,200대 주차 가능)</div>
          </div>
        </div>

        <div className="map-link-title">앱 바로연결</div>

        <div className="map-link-list" aria-label="지도 앱 바로가기">
          {mapLinks.map(item => (
            <a
              className="map-link"
              href={item.href}
              target="_blank"
              rel="noreferrer"
              key={item.label}
            >
              <span className="map-link-heart">
                <img className="map-link-icon" src={item.image} alt="" />
              </span>
              <span className='location-text'>{item.label}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
