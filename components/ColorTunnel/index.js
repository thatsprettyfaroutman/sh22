import { useRef } from 'react'
import styled from 'styled-components'
// import chroma from "chroma-js";
import { useIsomorphicLayoutEffect } from '@hooks/useIsomorphicLayoutEffect'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'
// import lerp from "lerp";

// const lerpInOut = (x, y, alpha) => lerp(x, lerp(y * 4, x, alpha), alpha);

const CANVAS_SCALE = 1

const COLORS = [
  '#54C4DB',
  '#F560B9',
  '#FFD31A',
  // "#FFD31A",
  // "#F560B9",
  // "#FFD31A",
  // "#54C4DB",
  // "#F560B9",
  // "#FFD31A"
]

const SColorTunnel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  > canvas {
    transform-origin: 0 0;
    transform: scale(${CANVAS_SCALE}, ${CANVAS_SCALE});
  }
`

export const ColorTunnel = ({ ...restProps }) => {
  const { addSpringListener } = useInfiniteSpringContext()
  const canvasRef = useRef()
  const circlesRef = useRef([])
  const lockedRef = useRef(false)
  const circleIndexRef = useRef(0)

  useIsomorphicLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    const w = (canvas.width = window.innerWidth / CANVAS_SCALE)
    const h = (canvas.height = window.innerHeight / CANVAS_SCALE)

    const x = w * 0.5
    const y = h * 0.47

    const render = () => {
      ctx.save()

      for (let i = 0; i < circlesRef.current.length; i++) {
        const circle = circlesRef.current[i]
        if (circle.r > window.innerWidth * 2 || circle.r <= 0) {
          continue
        }
        ctx.beginPath()
        ctx.arc(x, y, circle.r, 0, 2 * Math.PI)
        ctx.fillStyle = circle.color
        ctx.fill()
        // ctx.lineWidth = 2 / CANVAS_SCALE;
        // ctx.stroke();
        circle.r *= 1.025
      }

      ctx.restore()
    }

    const unlisten = addSpringListener((time) => {
      const spawnP = (time % 5000) / 5000

      if (!lockedRef.current && spawnP < 0.1) {
        lockedRef.current = true
        circlesRef.current.push({
          r: 100 / CANVAS_SCALE,
          color: COLORS[circleIndexRef.current % COLORS.length],
        })
        circleIndexRef.current++

        if (circlesRef.current.length >= 100) {
          circlesRef.current = circlesRef.current.slice(-50)
        }
      }

      if (lockedRef.current && spawnP > 0.9) {
        lockedRef.current = false
      }

      requestAnimationFrame(render)
    })

    return () => unlisten()

    // const t = setInterval(() => {
    //   requestAnimationFrame(render);
    // }, 1000 / 60);

    // return () => clearInterval(t);
  }, [addSpringListener])

  return (
    <SColorTunnel {...restProps}>
      <canvas ref={canvasRef} />
    </SColorTunnel>
  )
}
