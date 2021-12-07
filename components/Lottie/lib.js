import window from 'handle-window-undefined'
import { isNil } from 'ramda'

import { BREAKPOINT, SCALE } from '@styles/theme'

export const getLottieSize = (animationData, overrideScale = 1) => {
  if (!animationData) {
    throw new Error('getLottieSize, `animationData` not defined')
  }
  const { w, h, crop } = animationData
  if (!crop) {
    throw new Error(
      'getLottieSize, `animationData.crop` not defined. { x: number, y: number, w: number, height: number } expected'
    )
  }

  const scale = overrideScale
  // const scale = !isNil(overrideScale)
  //   ? overrideScale
  //   : window.innerWidth <= BREAKPOINT.phone
  //   ? SCALE.phone
  //   : window.innerWidth <= BREAKPOINT.tablet
  //   ? SCALE.tablet
  //   : 1

  return {
    scale,
    size: {
      w: crop.w * scale,
      h: crop.h * scale,
    },
    crop: {
      x: scale * -crop.x,
      y: scale * -crop.y,
      w: scale * w,
      h: scale * h,
    },
  }
}
