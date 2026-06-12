import { motion, useReducedMotion } from 'framer-motion'
import './QnASection.css'
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
}

const splitSentences = (text?: string) =>
  text
    ? text
        .split(/(?<=[.?!])\s+/)
        .map(sentence => sentence.trim())
        .filter(Boolean)
    : []

const QUESTIONS: QnAItem[] = [
  {
    q: '서로의 첫인상은?',
    seohyun: '서현: 처음엔 잘생긴 친구가 있네? 정도였는데, 대화를 해보니 정말 재미있고 배려심이 깊은 친구라는 걸 알게 됐어요.',
    yoonsoo: '윤수: 예쁘고 밝은 친구라는 첫인상이었어요. 대화를 해보니 다정한 친구라는 걸 알게 되었어요.'
  },
  {
    q: '데이트 할 때 메뉴를 더 못 고르는 사람은?',
    seohyun: '서현: 윤수를 배려하는거에요 ...',
    yoonsoo: '윤수: 서현이가 항상 더 못 고르는 편이었어요. 메뉴판을 보면 한참을 보다가 결국엔 제가 고르게 되더라고요.'
  },
  {
    q: '신혼 여행지는 어디인가요?',
    joint: '서현·윤수: 고유가 시대라 ....ㅠㅠ 내년을 기약 ...'
  },
  {
    q: '결혼 후 가장 기대되는 것은?',
    seohyun: '서현: 퇴근 후 집에서 윤수와의 시간',
    yoonsoo: '윤수: 퇴근 후 집에서 서현과의 시간'
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
                    <div className="qna-avatar-group">
                      <img className="qna-avatar" src={youngSeohyun} alt="서현" />
                      <img className="qna-avatar" src={youngYoonsoo} alt="윤수" />
                    </div>
                    <div className="qna-bubble qna-bubble--joint">
                      <div className="qna-text">
                        {splitSentences(item.joint).map((sentence, index) => (
                          <span key={index}>{sentence}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="qna-message qna-message--left">
                      <img className="qna-avatar" src={youngSeohyun} alt="서현" />
                      <div className="qna-bubble qna-bubble--seohyun">
                        <div className="qna-text">
                          {splitSentences(item.seohyun?.replace(/^서현:\s*/, '')).map((sentence, index) => (
                            <span key={index}>{sentence}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="qna-message qna-message--right">
                      <img className="qna-avatar" src={youngYoonsoo} alt="윤수" />
                      <div className="qna-bubble qna-bubble--yoonsoo">
                        <div className="qna-text">
                          {splitSentences(item.yoonsoo?.replace(/^윤수:\s*/, '')).map((sentence, index) => (
                            <span key={index}>{sentence}</span>
                          ))}
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
