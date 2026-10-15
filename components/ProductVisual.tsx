import Image from 'next/image'
import type { ProductId } from '@/lib/data'

const shots = {
  food: {
    desk: { src: '/food-builder/screens/kitchen-board.webp', w: 1600, h: 1000, alt: 'Painel de cozinha do Cenlo Food com pedidos por estado' },
    phone: { src: '/food-builder/screens/online-ordering-menu-mobile.webp', w: 390, h: 844, alt: 'Cardápio de pedidos online do Cenlo Food no celular' },
    toast: { title: 'Pedido #1042 entrou', line: 'pelo link de pedido', value: '34,40 €' },
  },
  beauty: {
    desk: { src: '/media/beauty/app-agenda.webp', w: 1152, h: 720, alt: 'Agenda do dia no Cenlo Beauty com marcações e estados' },
    phone: { src: '/media/beauty/sm-1-vitrine.webp', w: 390, h: 844, alt: 'Vitrine de agendamento do Cenlo Beauty no celular' },
    toast: { title: 'Marcação confirmada', line: 'pela vitrine · qui., 15:00', value: '45,00 €' },
  },
}

function Toast({ title, line, value }: { title: string; line: string; value: string }) {
  return (
    <div className="toast" data-parallax="-30">
      <span className="toast-ic" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
      </span>
      <span>
        <b>{title}</b>
        <span>{line} · <span className="mono">{value}</span></span>
      </span>
    </div>
  )
}

export function SmsPhone() {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div className="sms-phone" role="img" aria-label="SMS da Padaria do Bairro avisando que o pão de mistura saiu às 16h20">
        <div className="sms-screen" aria-hidden="true">
          <div className="sms-bar"><span>16:20</span><span>•••</span></div>
          <div className="sms-who"><span className="sms-avatar">PB</span><b>Padaria do Bairro</b><span>SMS · hoje 16:20</span></div>
          <div className="sms-thread">
            <span className="sms-meta">Hoje 16:20</span>
            <p className="sms-in" data-reveal>Padaria do Bairro: Pão de mistura saiu às 16h20. Enquanto houver.<br /><br />Responda com um número:<br />1 = já comprei<br />2 = pausar hoje<br />0 = sair dos avisos</p>
            <p className="sms-out" data-reveal>1</p>
            <p className="sms-in" data-reveal>Compra registrada. Hoje você não recebe mais avisos.</p>
          </div>
        </div>
      </div>
      <div className="sms-bread" aria-hidden="true" data-parallax="-40">
        <svg width="46" height="46" viewBox="0 0 220 220">
          <g fill="none" stroke="#B94A2A" strokeWidth="13" strokeLinecap="round"><path d="M70 55 L59 42" /><path d="M110 49 L110 27" /><path d="M150 55 L161 42" /></g>
          <path d="M42 156 C42 103 72 76 110 76 C148 76 178 103 178 156 C178 168 168 176 156 176 H64 C52 176 42 168 42 156 Z" fill="#B94A2A" />
          <g fill="none" stroke="#FFFDF8" strokeWidth="11" strokeLinecap="round"><path d="M76 125 C84 111 91 103 99 96" /><path d="M110 131 C119 116 128 106 138 99" /><path d="M142 137 C150 126 158 118 166 112" /></g>
        </svg>
      </div>
      <div className="sms-sent" aria-hidden="true" data-parallax="-24"><strong>84 de 84</strong>avisos entregues</div>
    </div>
  )
}

export default function ProductVisual({ id }: { id: ProductId }) {
  if (id === 'fornada') return <SmsPhone />
  const s = shots[id]
  return (
    <>
      <div className="shot shot-browser" data-parallax="6">
        <Image src={s.desk.src} width={s.desk.w} height={s.desk.h} alt={s.desk.alt} sizes="(max-width: 980px) 110vw, 640px" />
      </div>
      <div className="shot shot-phone" data-parallax="-18">
        <Image src={s.phone.src} width={s.phone.w} height={s.phone.h} alt={s.phone.alt} sizes="220px" />
      </div>
      <Toast {...s.toast} />
    </>
  )
}
