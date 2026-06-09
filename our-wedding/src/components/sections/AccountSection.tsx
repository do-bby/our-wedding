import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import './AccountSection.css'

type AccountSectionProps = {
  id?: string
}

const accounts = [
  {
    label: '신랑측 마음 전하실 곳',
    name: '박윤수',
    phone: '010-2217-9743',
    account: '카카오뱅크 3333-12-6777544',
  },
  {
    label: '신랑 부모님 마음 전하실 곳',
    name: '신랑 부모님',
    phone: '',
    account: '계좌번호를 입력해주세요',
  },
  {
    label: '신부측 마음 전하실 곳',
    name: '김서현',
    phone: '010-2743-0705',
    account: '국민 592202-01-653258',
  },
  {
    label: '신부 부모님 마음 전하실 곳',
    name: '신부 부모님',
    phone: '',
    account: '국민 496502-91-106264',
  },
]

export default function AccountSection({ id = 'account' }: AccountSectionProps) {
  const prefersReducedMotion = useReducedMotion()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const softEase = [0.22, 1, 0.36, 1] as const
  const sectionTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: softEase }

  const sectionVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  } as const

  return (
    <section className="section" id={id}>
      <motion.div
        className="card account-card"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        transition={sectionTransition}
      >
        <div className="account-head">
          <div className="account-kicker">🖤</div>
          <div className="account-sub">마음 전하실 곳</div>
        </div>

        <div className="account-list">
          {accounts.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div className="account-item" key={item.label}>
                <button
                  type="button"
                  className="account-toggle"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.label}</span>
                  <span className={isOpen ? 'account-chevron is-open' : 'account-chevron'}>⌄</span>
                </button>

                {isOpen ? (
                  <div className="account-panel">
                    <div className="account-line">
                      <span className="account-label">이름</span>
                      <span>{item.name}</span>
                    </div>
                    <div className="account-line">
                      <span className="account-label">계좌</span>
                      <span>{item.account}</span>
                    </div>
                    {item.phone ? (
                      <div className="account-line">
                        <span className="account-label">연락처</span>
                        <a className="account-phone" href={`tel:${item.phone}`}>
                          {item.phone}
                        </a>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
