import type { IconName } from '@/lib/food-builder/catalog'

const paths: Record<IconName, React.ReactNode> = {
  orders: <><rect x="5" y="3.5" width="14" height="17" rx="2.5" /><path d="M9 8h6M9 12h6M9 16h3.5" /></>,
  chat: <><path d="M4.5 18.5 5.6 15A7.5 7.5 0 1 1 9 18.4z" /><path d="M9 11h6M9 13.8h3.5" /></>,
  kitchen: <><rect x="3.5" y="4.5" width="17" height="13" rx="2" /><path d="M9.5 4.5v13M15 4.5v13M8 20.5h8" /></>,
  printer: <><path d="M7 9V3.5h10V9" /><rect x="3.5" y="9" width="17" height="7.5" rx="2" /><path d="M7 14h10v6.5H7z" /></>,
  globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.6 2.4 3.6 5.2 3.6 8.5s-1 6.1-3.6 8.5c-2.6-2.4-3.6-5.2-3.6-8.5s1-6.1 3.6-8.5z" /></>,
  counter: <><path d="M5.5 4.5h3l1.6 3.4-2 1.4a10.5 10.5 0 0 0 6.6 6.6l1.4-2 3.4 1.6v3a1.9 1.9 0 0 1-2 1.9A15.5 15.5 0 0 1 3.6 6.5a1.9 1.9 0 0 1 1.9-2z" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4M12 13.5v3l2 1" /></>,
  table: <><path d="M3.5 9.5h17M6 9.5 4.5 19M18 9.5l1.5 9.5M12 9.5v9.5" /><path d="M8.5 9.5V6a3.5 3.5 0 0 1 7 0v3.5" /></>,
  map: <><path d="m9 5-5.5 2v13L9 18l6 2 5.5-2V5L15 7z" /><path d="M9 5v13M15 7v13" /></>,
  radius: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4" /><path d="M12 12h8.5" /><circle cx="12" cy="12" r=".9" fill="currentColor" /></>,
  scooter: <><circle cx="6" cy="17" r="2.5" /><circle cx="18" cy="17" r="2.5" /><path d="M8.5 17h7M15.5 17l-2-8H17M13.5 9h-7a3 3 0 0 0-3 3v2" /></>,
  bell: <><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z" /><path d="M10 20.5a2 2 0 0 0 4 0" /></>,
  tag: <><path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1.5 1.5 0 0 1 0 2.1l-6.3 6.3a1.5 1.5 0 0 1-2.1 0z" /><circle cx="8.3" cy="8.3" r="1.4" /></>,
  users: <><circle cx="9" cy="8.5" r="3.5" /><path d="M3 19.5a6 6 0 0 1 12 0" /><path d="M15.5 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.2a6 6 0 0 1 3.5 5.3" /></>,
  refresh: <><path d="M19.5 9A8 8 0 0 0 5 7.5M4.5 15A8 8 0 0 0 19 16.5" /><path d="M19.5 4v5h-5M4.5 20v-5h5" /></>,
  star: <><path d="m12 3.8 2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7.9-5.6-4-4 5.6-.8z" /></>,
  spark: <><path d="M12 3.5 13.6 9l5.4 1.6-5.4 1.6L12 17.7l-1.6-5.5L5 10.6 10.4 9z" /><path d="M18.5 15.5v4M16.5 17.5h4" /></>,
  trend: <><path d="M3.5 17 9 11.5l3.5 3.5 8-8" /><path d="M15 7h5.5v5.5" /></>,
  bulb: <><path d="M9 17.5h6M10 20.5h4" /><path d="M8.6 14.5a6 6 0 1 1 6.8 0c-.6.5-.9 1.2-.9 2v1H9.5v-1c0-.8-.3-1.5-.9-2z" /></>,
  chart: <><path d="M4 20.5h16" /><rect x="5.5" y="11" width="3" height="6.5" rx=".8" /><rect x="10.5" y="6.5" width="3" height="11" rx=".8" /><rect x="15.5" y="9" width="3" height="8.5" rx=".8" /></>,
  receipt: <><path d="M6 3.5h12v17l-2.4-1.5-2.4 1.5-2.4-1.5-2.4 1.5L6 19z" /><path d="M9 8h6M9 11.5h6M9 15h3.5" /></>,
  stores: <><path d="M3.5 9.5 5 4.5h14l1.5 5" /><path d="M3.5 9.5a2.8 2.8 0 0 0 5.7 0 2.8 2.8 0 0 0 5.6 0 2.8 2.8 0 0 0 5.7 0" /><path d="M5 12v8.5h14V12M10 20.5v-5h4v5" /></>,
  shield: <><path d="M12 3.5 19.5 6v5.5c0 4.5-3.2 7.9-7.5 9-4.3-1.1-7.5-4.5-7.5-9V6z" /><path d="m9 12 2.2 2.2L15.5 10" /></>,
  history: <><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3L4.5 9" /><path d="M4.5 4.5V9H9M12 8v4.5l3 1.8" /></>,
  help: <><circle cx="12" cy="12" r="8.5" /><path d="M9.6 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .9-1 1.6v.6" /><circle cx="12" cy="17" r=".9" fill="currentColor" /></>,
}

export default function ModuleIcon({ name }: { name: IconName }) {
  return (
    <span className="fb-ico" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
    </span>
  )
}
