/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAKAO_MAP_APP_KEY?: string
  readonly VITE_KAKAO_JS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

type KakaoShareButton = {
  title: string
  link: {
    mobileWebUrl: string
    webUrl: string
  }
}

type KakaoShareFeed = {
  objectType: 'feed'
  content: {
    title: string
    description: string
    imageUrl: string
    link: {
      mobileWebUrl: string
      webUrl: string
    }
  }
  buttonTitle?: string
  buttons?: readonly KakaoShareButton[]
}

interface Window {
  Kakao?: {
    init: (key: string) => void
    isInitialized: () => boolean
    Share: {
      sendDefault: (options: KakaoShareFeed) => void
    }
  }
}
