import { useEffect, useRef } from 'react'

export default function CursorTrail(){
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(()=>{
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let raf = 0
    let pts: {x:number,y:number,alpha:number}[] = []
    let mouse = { x: -9999, y: -9999 }
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    function size(){
      canvas.width = innerWidth; canvas.height = innerHeight
    }
    size()
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX; mouse.y = e.clientY
      pts.push({ x: mouse.x, y: mouse.y, alpha: 1 })
      if (pts.length > 60) pts.shift()
    }
    const onTouch = (e: TouchEvent) => {
      if(!e.touches[0]) return
      mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY
      pts.push({ x: mouse.x, y: mouse.y, alpha: 1 })
      if (pts.length > 60) pts.shift()
    }
    const loop = () => {
      raf = requestAnimationFrame(loop)
      ctx.clearRect(0,0,canvas.width,canvas.height)
      for (let i=0;i<pts.length;i++){
        const p = pts[i]
        p.alpha *= 0.96
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2 + i*0.04, 0, Math.PI*2)
        ctx.fillStyle = `rgba(255,215,0,${0.25*p.alpha})`
        ctx.fill()
      }
    }
    loop()
    addEventListener('resize', size)
    addEventListener('mousemove', onMove)
    addEventListener('touchmove', onTouch, { passive: true })
    return ()=>{
      cancelAnimationFrame(raf)
      removeEventListener('resize', size)
      removeEventListener('mousemove', onMove)
      removeEventListener('touchmove', onTouch as any)
    }
  },[])

  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-10" aria-hidden="true" />
}
