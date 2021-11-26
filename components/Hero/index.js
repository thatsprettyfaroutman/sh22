import window from 'handle-window-undefined'
import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { range } from 'ramda'
import { a } from 'react-spring'
import { ColorTunnel } from '@components/ColorTunnel'
import { Lottie } from '@components/Lottie'
import flowerboi from '@lotties/flowerboi.lottie.json'
import flowerboibg from '@lotties/flowerboibg.lottie.json'
import { useInfiniteSpringContext } from '@contexts/infiniteSpring'
// import popsicle from './popsicle2.png'
// import lollipop from './lollipop.svg'
// import hox from './hox.svg'
import lerp from 'lerp'

const POPSICLE_WIDTH = 83
const POPSICLE_HEIGHT = 84
const LOLLIPOP_WIDTH = 116
const LOLLIPOP_HEIGHT = 164
const HOX_WIDTH = 105
const HOX_HEIGHT = 107

const StyledHero = styled.div`
  position: relative;
  display: grid;
  align-content: center;
  min-height: inherit;
  width: 100%;
  overflow: hidden;
`

const Lotties = styled.div`
  position: relative;
  height: 420px;

  > * {
    position: absolute;
    top: -53px;
    left: 50%;
    transform: translate(-50%, 0);
    pointer-events: none;
  }

  > .Flowerboibg {
    width: 596px;
  }
  > .Flowerboi {
    width: 596px;
  }
`

const FlyingThings = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0%;
  left: 0%;
  overflow: hidden;
  /* background-color: #ff00ff22; */

  > img {
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    transform-origin: 50% 50%;
  }

  > img.Hero__popsicle {
    width: 83px;
    height: 83px;
    margin: ${-POPSICLE_HEIGHT / 2}px 0 0 ${-POPSICLE_WIDTH / 2}px;
  }

  > img.Hero__lollipop {
    margin: ${-LOLLIPOP_HEIGHT / 2}px 0 0 ${-LOLLIPOP_WIDTH / 2}px;
  }
  > img.Hero__hox {
    margin: ${-HOX_HEIGHT / 2}px 0 0 ${-HOX_WIDTH / 2}px;
  }
`

const getDistance = () =>
  Math.sqrt(Math.pow(window.innerWidth, 2), Math.pow(window.innerHeight, 2))

export const Hero = ({ ...restProps }) => {
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
  const p3 = infiniteSpring.time.to((t) => (t % 10000) / 10000)

  return (
    <StyledHero {...restProps}>
      {/* <ColorTunnel /> */}
      <FlyingThings>
        {/* {range(0, 32).map((i) => {
          const angle = ((Math.PI * 2) / 32) * (i + 32);
          return (
            <a.img
              className="Hero__lollipop"
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
              className="Hero__lollipop"
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
        {range(0, 256).map((i) => {
          const angle = ((Math.PI * 2) / 256) * (i + 256)

          return (
            <a.img
              key={i}
              className="Hero__popsicle"
              src="/images/popsicle.png"
              style={{
                rotate: p3.to(
                  (p) => `${lerp(angle, angle + Math.PI * 8, p)}rad`
                ),
                x: p3.to(
                  (p) =>
                    Math.sin(angle) * ((p + i / 64) % 1) * distanceRef.current
                ),
                y: p3.to(
                  (p) =>
                    Math.cos(angle) * ((p + i / 64) % 1) * distanceRef.current
                ),
              }}
            />
          )
        })}
      </FlyingThings>
      <Lotties>
        <Lottie animationData={flowerboibg} className="Flowerboibg" />
        <Lottie animationData={flowerboi} className="Flowerboi" />
      </Lotties>
    </StyledHero>
  )
}
