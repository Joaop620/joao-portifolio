import { tools } from '../data'

export default function Marquee() {
  const row = [...tools, ...tools]
  return (
    <div className="relative overflow-hidden border-y border-white/5 py-5"
      style={{ WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)' }}>
      <div className="flex w-max animate-marquee gap-10">
        {row.map((tool, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl text-white/35 sm:text-3xl">
            {tool}
            <span className="text-gold/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
