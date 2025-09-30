import { useEffect, useRef } from 'react'

export default function Particles(){
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(()=>{
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const hero = canvas.parentElement as HTMLElement

    function size(){
      canvas.width = hero.clientWidth
      canvas.height = hero.clientHeight
    }
    size(); addEventListener('resize', size)

    class P{ x= Math.random()*canvas.width; y= Math.random()*canvas.height; vx=(Math.random()-0.5)*0.6; vy=(Math.random()-0.5)*0.6; r=Math.random()*2+1;
      update(){ this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x>canvas.width)this.vx*=-1; if(this.y<0||this.y>canvas.height)this.vy*=-1; }
      draw(){ ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fillStyle = '#FFD700'; ctx.fill(); }
    }
    const ps = Array.from({length:80}, ()=> new P())
    function connect(){
      for(let i=0;i<ps.length;i++){ for(let j=i+1;j<ps.length;j++){ const dx=ps[i].x-ps[j].x, dy=ps[i].y-ps[j].y, d=Math.hypot(dx,dy);
        if(d<110){ ctx.strokeStyle='rgba(255,215,0,0.22)'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(ps[i].x,ps[i].y); ctx.lineTo(ps[j].x,ps[j].y); ctx.stroke(); }
      } }
    }
    let raf=0
    function loop(){
      raf = requestAnimationFrame(loop)
      ctx.clearRect(0,0,canvas.width,canvas.height)
      ps.forEach(p=>{p.update(); p.draw();})
      connect()
    }
    loop()

    return ()=>{ cancelAnimationFrame(raf); removeEventListener('resize', size) }
  },[])

  return <canvas ref={ref} className="absolute inset-0 -z-10 w-full h-full pointer-events-none" aria-hidden="true" />
}
