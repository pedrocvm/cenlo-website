'use client'
import { useState } from 'react'
import type { ModuleVideo } from '@/lib/food-builder/videos'

const duration = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
export default function ModuleVideos({ videos, title, poster }: { videos: ModuleVideo[]; title: string; poster?: string }) {
  const [index, setIndex] = useState(0)
  const video = videos[index]
  if (!video) return null
  return <div className="fm-videos">
    <div className="fm-video-heading"><span>Veja na prática</span><small>{videos.length} {videos.length === 1 ? 'trecho' : 'trechos'} · {duration(videos.reduce((n,v) => n + v.seconds, 0))} no total</small></div>
    <video key={video.src} className={video.height > video.width ? 'is-portrait' : ''} controls playsInline preload="none" poster={index === 0 ? poster : undefined} width={video.width} height={video.height} aria-label={`${title}: ${video.title}`}>
      <source src={video.src} type="video/mp4" />
      Seu navegador não consegue reproduzir este vídeo. <a href={video.src}>Abrir gravação</a>
    </video>
    <p className="fm-video-caption">{video.title}</p>
    {videos.length > 1 && <div className="fm-video-chapters" role="group" aria-label="Escolher trecho">{videos.map((v,i) => <button key={v.src} type="button" aria-pressed={i===index} onClick={() => setIndex(i)}><span aria-hidden="true">{i===index ? '▶' : String(i+1).padStart(2,'0')}</span><span>{v.title}</span><small>{duration(v.seconds)}</small></button>)}</div>}
    <p className="fb-note">Gravações do produto com dados de demonstração. As condições de configuração e ativação continuam valendo para cada recurso.</p>
  </div>
}
