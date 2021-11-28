import window from 'handle-window-undefined'
import { useRef, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { range } from 'ramda'
import { a } from 'react-spring'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'
import lerp from 'lerp'

const POPSICLE_WIDTH = 83
const POPSICLE_HEIGHT = 84
// const LOLLIPOP_WIDTH = 116
// const LOLLIPOP_HEIGHT = 164
// const HOX_WIDTH = 105
// const HOX_HEIGHT = 107

const SFlyingThings = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0%;
  left: 0%;
  overflow: hidden;

  > img {
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    transform-origin: 50% 50%;
  }

  > img.FlyingThings__popsicle {
    width: 83px;
    height: 83px;
    margin: ${-POPSICLE_HEIGHT / 2}px 0 0 ${-POPSICLE_WIDTH / 2}px;
  }

  /* > img.FlyingThings__lollipop {
    margin: ${-LOLLIPOP_HEIGHT / 2}px 0 0 ${-LOLLIPOP_WIDTH / 2}px;
  }
  > img.FlyingThings__hox {
    margin: ${-HOX_HEIGHT / 2}px 0 0 ${-HOX_WIDTH / 2}px;
  } */
`

const getDistance = () =>
  Math.sqrt(Math.pow(window.innerWidth, 2), Math.pow(window.innerHeight, 2))

export const FlyingThings = ({ ...restProps }) => {
  const { infiniteSpring } = useInfiniteSpringContext()
  const distanceRef = useRef(getDistance())

  useEffect(() => {
    const resize = () => {
      distanceRef.current = getDistance()
    }
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  // const p = infiniteSpring.time.to((t) => (t % 5000) / 5000);
  // const p2 = infiniteSpring.time.to((t) => ((t + 1000) % 5000) / 5000);
  const p = infiniteSpring.time.to((t) => (t % 10000) / 10000)

  const popsicles = useMemo(
    () =>
      range(0, 128).map((i) => {
        {
          /* const angle = ((Math.PI * 2) / 256) * (i + 256) */
        }

        // nice spiral
        const angle = ((Math.PI * 0.25) / (256 * 0.5) - 0.25) * i
        // const angle = lerp(Math.PI * 0.75, Math.PI * 0.4, (i % 8) / 8)
        const rDir = Math.sin(angle) < 0 ? -1 : 1

        return (
          <a.img
            key={i}
            className="FlyingThings__popsicle"
            src="/images/popsicle.png"
            style={{
              // rotate: p.to((p) => `${lerp(angle, angle + Math.PI * 8, p)}rad`),
              rotate: p.to(
                (p) => `${lerp(angle, angle + Math.PI * 16 * rDir, p)}rad`
              ),
              x: p.to(
                (p) =>
                  Math.sin(angle) * ((p + i / 64) % 1) * distanceRef.current
              ),
              y: p.to(
                (p) =>
                  Math.cos(angle) *
                  ((p + i / 64) % 1) *
                  rDir *
                  distanceRef.current
              ),
            }}
          />
        )
      }),
    [p]
  )

  return (
    <SFlyingThings {...restProps}>
      {/* {range(0, 32).map((i) => {
          const angle = ((Math.PI * 2) / 32) * (i + 32);
          return (
            <a.img
              className="FlyingThings__lollipop"
              src={lollipop}
              style={{
                rotate: p.to(
                  (p) => `${p * angle * 6 * (i % 2 === 0 ? 1 : -1)}rad`
                ),
                x: p.to((p) => Math.sin(angle) * p * window.innerWidth),
                y: p.to((p) => Math.cos(angle) * p * window.innerHeight),
                scale: 0.5
              }}
            />
          );
        })} */}
      {/* {range(0, 32).map((i) => {
          const angle = ((Math.PI * 2) / 32) * (i + 32);
          return (
            <a.img
              className="FlyingThings__lollipop"
              src={lollipop}
              style={{
                rotate: p2.to((p) => `${p * angle * -4}rad`),
                x: p2.to(
                  (p) =>
                    Math.sin(angle) *
                    p *
                    window.innerWidth *
                    (i % 2 === 0 ? 1 : 1.5)
                ),
                y: p2.to(
                  (p) =>
                    Math.cos(angle) *
                    p *
                    window.innerHeight *
                    (i % 2 === 0 ? 1 : 1.5)
                ),
                scale: 0.4
              }}
            />
          );
        })} */}

      {popsicles}
    </SFlyingThings>
  )
}
