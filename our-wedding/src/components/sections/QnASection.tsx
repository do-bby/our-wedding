import { motion, useReducedMotion } from 'framer-motion'
import './QnASection.css'
import honeymoonProfile from '../../images/9.jpg'
import youngSeohyun from '../../images/youngseohyun.png'
import youngYoonsoo from '../../images/youngyoonsoo.png'

type QnASectionProps = {
  id?: string
}

type QnAItem = {
  q: string
  seohyun?: string
  yoonsoo?: string
  joint?: string
  profileImage?: string
}

const formatAnswerText = (text?: string) =>
  text
    ? text
        .replace(/\\n/g, '\n')
        .split('\n')
        .map(line => line.trim())
        .join('\n')
        .trim()
    : ''

const QUESTIONS: QnAItem[] = [
  {
    q: '서로의 첫인상은?',
    seohyun: '서현: 순둥한 감자상에 웃는 모습이 참 보기 좋았어요. \n 그런데 노트북 앞에서는 꽤 멋있더라고요.🤭💻',
    yoonsoo: '윤수: 예쁘고 밝은 모습이 기억에 남아요. 대화를 해보니 생각이 깊고, 배려심이 많아서 좋았어요.🙂'
  },
  {
    q: '데이트 때 메뉴를 못 고르는 사람은?',
    seohyun: '서현: 윤수는 분명 저라고 할 거예요. 저는 못 고르는 게 아니라… \n 상대가 먹고 싶은 걸 먼저 생각하는 편입니다.😉',
    yoonsoo: '윤수: 서현이가 항상 더 못 고르는 편이었어요. 메뉴판을 보면 한참을 보다가 결국엔 제가 고르게 되더라고요.😅'
  },
  {
    q: '신혼 여행지는 어디인가요?',
    profileImage: honeymoonProfile,
    joint: '가을 스페인을 꿈꿨지만, \n 예상보다 오른 유류할증료 때문에 보류!🥹\n  대신 겨울쯤 따뜻한 휴양지로 떠날 예정이에요.\n결혼식이 끝난 후, \n 여유롭게 정해보려고 합니다.'
  },
  {
    q: '결혼 후 가장 기대되는 것은?',
    seohyun: '서현: 윤수가 차려주는 따뜻한 밥상? 🤭🍚',
    yoonsoo: '윤수: 주말에 서현이가 내려주는 맛있는 아메리카노 ? ☕'
  }
]

export default function QnASection({ id = 'qna' }: QnASectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const softEase = [0.22, 1, 0.36, 1] as const
  const sectionTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.8, ease: softEase }

  const sectionVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  } as const

  return (
    <section className="section qna-section qna" id={id}>
      <motion.div
        className="card invitation"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        transition={sectionTransition}
      >
        <div className="invitation-head">
          <div className="invitation-sub">💬</div>
        </div>

        <div className="invitation-body">
          <div className="qna-list">
          {QUESTIONS.map((item, idx) => (
            <div className="qna-item" key={idx}>
              <div className="qna-question">Q. {item.q}</div>
              <div className="qna-answer">
                {item.joint ? (
                  <div className="qna-message qna-message--joint">
                    {item.profileImage ? (
                      <img className="qna-avatar" src={item.profileImage} alt="" />
                    ) : (
                      <div className="qna-avatar-group">
                        <img className="qna-avatar" src={youngSeohyun} alt="서현" />
                        <img className="qna-avatar" src={youngYoonsoo} alt="윤수" />
                      </div>
                    )}
                    <div className="qna-bubble qna-bubble--joint">
                      <div className="qna-text">
                        {formatAnswerText(item.joint)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="qna-message qna-message--left">
                      <img className="qna-avatar" src={youngSeohyun} alt="서현" />
                      <div className="qna-bubble qna-bubble--seohyun">
                        <div className="qna-text">
                          {formatAnswerText(item.seohyun?.replace(/^서현:\s*/, ''))}
                        </div>
                      </div>
                    </div>

                    <div className="qna-message qna-message--right">
                      <img className="qna-avatar" src={youngYoonsoo} alt="윤수" />
                      <div className="qna-bubble qna-bubble--yoonsoo">
                        <div className="qna-text">
                          {formatAnswerText(item.yoonsoo?.replace(/^윤수:\s*/, ''))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
