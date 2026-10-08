'use client'
import { useState } from 'react'
import AnimatedDetails from './AnimatedDetails'
import ModuleIcon from './ModuleIcon'
import ModuleVideos from './ModuleVideos'
import { videosFor } from '@/lib/food-builder/videos'
export type LoyaltyPromotion = { id: string; kind: 'loyalty-essential'; startsAt: string; endsAt: string; moduleId: 'loyalty'; duration: 'permanent'; terms: string }

export default function LoyaltyGift({ promotion, now, onContinue, busy, onDemo, reserved = false }: { promotion: LoyaltyPromotion; now: number; onContinue?: () => void; busy?: boolean; onDemo?: () => void; reserved?: boolean }) {
  const [demo, setDemo] = useState(false)
  if (!reserved && (!now || now < Date.parse(promotion.startsAt) || now >= Date.parse(promotion.endsAt))) return null
  const seconds = Math.max(0, Math.ceil((Date.parse(promotion.endsAt) - now) / 1000))
  const parts = [Math.floor(seconds / 3600), Math.floor(seconds % 3600 / 60), seconds % 60]
  const deadline = new Intl.DateTimeFormat('pt-PT', { timeZone: 'Europe/Lisbon', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(promotion.endsAt))
  return <section className={`fl-gift${reserved ? ' is-reserved' : ''}`} aria-label={reserved ? 'Clube de Fidelização reservado' : 'Presente por tempo limitado: Clube de Fidelização'}>
    <div className="fl-top"><span className="fl-eyebrow"><ModuleIcon name="star" /> {reserved ? 'Seu presente está registrado' : 'Um presente para fazer o cliente voltar'}</span><span className="fl-permanent">Benefício permanente</span></div>
    <div className="fl-layout"><div className="fl-copy"><h2>{reserved ? <>O Clube de Fidelização <em>é parte da sua solução.</em></> : <>Ganhe o Clube de Fidelização.<em>Sem aumentar a mensalidade.</em></>}</h2><p>O cliente compra. Acumula pontos. Descobre uma recompensa. E tem um motivo a mais para escolher o seu restaurante de novo.</p><p className="fl-value">Seu clube. Sua marca. Uma relação que continua depois do pedido.</p></div>
      <div className="fl-ticket"><span className="fl-ticket-label">Essential + Clube de Fidelização</span><strong>€49,90<small>/mês por unidade</small></strong><span className="fl-no-extra">Clube incluído · sem mensalidade adicional</span>{reserved ? <div className="fl-reserved"><ModuleIcon name="shield" /><strong>Garantido no seu pedido</strong><p>O prazo foi cumprido. O benefício permanece nesta contratação.</p></div> : <><div className="fl-countdown" role="timer" aria-label={`Condição termina em ${parts[0]} horas, ${parts[1]} minutos e ${parts[2]} segundos`}><small>Tempo para garantir seu presente</small><div>{parts.map((part, i) => <span key={i}><b>{String(part).padStart(2, '0')}</b><small>{['horas', 'min', 'seg'][i]}</small></span>)}</div></div><p className="fl-deadline">Até {deadline} · hora de Lisboa</p></>}</div></div>
    <div className="fl-unlocks"><span className="fl-section-label">O que você desbloqueia</span><ul>
      <li><ModuleIcon name="star" /><div><h3>Pontos que dão motivo para voltar</h3><p>Transforme compras em pontos e ofereça recompensas definidas pela sua loja.</p></div></li>
      <li><ModuleIcon name="globe" /><div><h3>Um clube com a sua marca</h3><p>Uma página própria para apresentar o clube e aproximar o cliente do restaurante.</p></div></li>
      <li><ModuleIcon name="tag" /><div><h3>Missões, recompensas e campanhas</h3><p>Crie novos motivos para participar e voltar a comprar, com regras escolhidas por você.</p></div></li>
      <li><ModuleIcon name="chart" /><div><h3>Recompense com controle</h3><p>Simule o custo das recompensas e acompanhe pontos e participação dos clientes.</p></div></li>
      <li><ModuleIcon name="receipt" /><div><h3>Compras de fora também contam</h3><p>Registre compras feitas fora do Cenlo usando o código QR do talão para participar do programa.</p></div></li>
      <li><ModuleIcon name="users" /><div><h3>Leve o clube para dentro da loja</h3><p>Use os materiais de divulgação com QR e NFC para apresentar o clube aos seus clientes.</p></div></li>
    </ul></div>
    <div className="fl-example"><ModuleIcon name="spark" /><p><strong>Imagine na sua operação:</strong> o cliente acumula pontos ao comprar e volta para resgatar uma recompensa do seu cardápio. Você define o prêmio e as regras. O clube mantém esse motivo para voltar visível.</p></div>
    <div className="fl-actions">{onContinue && <button type="button" className="fb-btn fb-btn-primary fl-cta" disabled={busy} onClick={onContinue}>{busy ? 'Preparando…' : 'Quero o Essential com meu Clube'}<span aria-hidden="true">→</span></button>}<button type="button" className="fl-demo-button" aria-expanded={demo} onClick={() => { setDemo(!demo); if (!demo) onDemo?.() }}>{demo ? 'Fechar demonstração' : 'Ver o Clube funcionando'} <span aria-hidden="true">{demo ? '−' : '▶'}</span></button></div>
    {demo && <div className="fl-demo"><ModuleVideos videos={videosFor('loyalty')} title="Clube de Fidelização" /></div>}
    <p className="fl-fineprint">{reserved ? 'Pedido recebido. Configuração e ativação serão organizadas na implantação.' : 'Envie seu pedido de implantação dentro do prazo para garantir o Clube. Enviar uma dúvida ou abrir o WhatsApp não reserva o presente.'} A implantação mantém os valores do Essential e é cobrada separadamente. Nenhuma cobrança é feita nesta etapa.</p>
    <AnimatedDetails className="fl-terms"><summary>Condições do presente <span aria-hidden="true">+</span></summary><p>{promotion.terms}</p><p>Os pontos e as regras são configurados na implantação. Google, SMS e carteiras dependem das credenciais correspondentes. O benefício inclui o Clube; não é um upgrade para todos os recursos de outro plano.</p></AnimatedDetails>
  </section>
}
