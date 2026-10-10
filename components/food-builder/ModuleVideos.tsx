'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ModuleVideo } from '@/lib/food-builder/videos'

const duration = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`
type ModuleDestination = { href: string; title: string }
export default function ModuleVideos({ videos, title, poster, nextModule, previousModule }: { videos: ModuleVideo[]; title: string; poster?: string; nextModule?: ModuleDestination; previousModule?: ModuleDestination }) {
  const router = useRouter()
  const player = useRef<HTMLVideoElement>(null)
  const container = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [muted, setMuted] = useState(true)
  const [continuous, setContinuous] = useState(true)
  const [elapsed, setElapsed] = useState(0)
  const [visible, setVisible] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [failed, setFailed] = useState(false)
  const resume = useRef(true)
  const visibleRef = useRef(false)
  const video = videos[index]

  useEffect(() => {
    const element = container.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting
      setVisible(entry.isIntersecting)
      const media = player.current
      if (!media) return
      if (entry.isIntersecting && resume.current && !media.ended) void media.play().catch(() => {})
      else if (!entry.isIntersecting) { media.pause() }
    }, { threshold: 0.25 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!continuous || !visible || countdown === null || !nextModule) return
    if (countdown === 0) { router.push(nextModule.href); return }
    const timer = window.setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [continuous, visible, countdown, nextModule, router])

  function select(next: number) {
    setElapsed(0); setCountdown(null); setFailed(false); setIndex(next); resume.current = true
    if (next === index && player.current) { player.current.currentTime = 0; void player.current.play().catch(() => {}) }
  }
  function ended() {
    if (index < videos.length - 1) select(index + 1)
    else if (continuous && nextModule) setCountdown(5)
  }
  if (!video) return null
  const total = videos.reduce((sum, clip) => sum + clip.seconds, 0)
  const progress = videos.slice(0, index).reduce((sum, clip) => sum + clip.seconds, 0) + elapsed
  return <div className="fm-videos" ref={container}>
    <div className="fm-video-heading"><span><i className={playing ? 'is-playing' : ''} aria-hidden="true" />Veja na prática</span><small>{duration(Math.min(progress, total))} / {duration(total)}</small></div>
    <div className="fm-video-stage">
      <video ref={player} key={video.src} className={video.height > video.width ? 'is-portrait' : ''} controls autoPlay={visible} muted={muted} playsInline preload="metadata" poster={index === 0 ? poster : undefined} width={video.width} height={video.height} aria-label={`${title}: ${video.title}`} onEnded={ended} onPlay={() => { resume.current = true; setPlaying(true) }} onPause={() => { if (visibleRef.current && !player.current?.ended) resume.current = false; setPlaying(false) }} onVolumeChange={event => setMuted(event.currentTarget.muted || event.currentTarget.volume === 0)} onTimeUpdate={event => setElapsed(event.currentTarget.currentTime)} onError={() => setFailed(true)}>
        <source src={video.src} type="video/mp4" />
        Seu navegador não consegue reproduzir este vídeo. <a href={video.src}>Abrir gravação</a>
      </video>
      {video.hasAudio !== false && muted && countdown === null && !failed && <button type="button" className="fm-sound-prompt" aria-label="Ligue o som do vídeo" onClick={() => { const media = player.current; if (!media) return; media.muted = false; if (media.volume === 0) media.volume = 1; setMuted(false); resume.current = true; void media.play().catch(() => {}) }}><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" /></svg><span>Ligue o som</span></button>}
      {countdown !== null && nextModule && <div className="fm-video-next" role="status"><small>A seguir</small><strong>{nextModule.title}</strong><span>{continuous ? `Começa em ${countdown}s` : 'Avanço pausado'}</span><div><button type="button" onClick={() => router.push(nextModule.href)}>Ver agora →</button><button type="button" onClick={() => { setCountdown(null); setContinuous(false) }}>Ficar neste módulo</button></div></div>}
    </div>
    <div className="fm-video-progress" aria-hidden="true"><span style={{ transform: `scaleX(${Math.min(progress / total, 1)})` }} /></div>
    {(nextModule || videos.length > 1) && <div className="fm-video-toolbar"><label><input type="checkbox" checked={continuous} onChange={e => { setContinuous(e.target.checked); if (!e.target.checked) setCountdown(null) }} /> Avançar entre módulos</label></div>}
    {failed && <p className="fb-note">Não foi possível carregar a gravação. <a href={video.src}>Abrir vídeo</a></p>}
    <p key={video.title} className="fm-video-caption">{video.title}</p>
    {videos.length > 1 && <div className="fm-video-chapters" role="group" aria-label="Escolher trecho">{videos.map((clip,i) => <button key={clip.src} type="button" aria-pressed={i===index} onClick={() => select(i)}><span aria-hidden="true">{i===index ? '▶' : String(i+1).padStart(2,'0')}</span><span>{clip.title}</span><small>{duration(clip.seconds)}</small></button>)}</div>}
    {(previousModule || (nextModule && countdown === null)) && <nav className="fm-module-nav" aria-label="Navegar pelas demonstrações">
      {previousModule && <button className="fm-next-link fm-prev-link" type="button" onClick={() => { setCountdown(null); player.current?.pause(); router.push(previousModule.href) }}><span className="fm-next-arrow" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5m6-6-6 6 6 6" /></svg></span><span className="fm-next-copy"><small>Módulo anterior</small><strong>{previousModule.title}</strong></span></button>}
      {nextModule && countdown === null && <button className="fm-next-link" type="button" onClick={() => router.push(nextModule.href)}><span className="fm-next-copy"><small>Próximo módulo</small><strong>{nextModule.title}</strong></span><span className="fm-next-arrow" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span></button>}
    </nav>}
    <p className="fb-note">Gravações do produto com dados de demonstração. As condições de configuração e ativação continuam valendo para cada recurso.</p>
  </div>
}
