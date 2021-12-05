import analystLottie from '@lotties/track-analyst.lottie.json'
import dataLottie from '@lotties/track-data.lottie.json'
import developerLottie from '@lotties/track-developer.lottie.json'
import managerLottie from '@lotties/track-manager.lottie.json'

export const TRACK_LOTTIE_MAP = {
  ANALYST: analystLottie,
  DATA: dataLottie,
  DEVELOPER: developerLottie,
  MANAGER: managerLottie,
  DESIGNER: managerLottie,
  SALES: dataLottie,
}

export const TRACK_LOTTIE_PUPIL_SELECTOR_MAP = {
  ANALYST: [
    'div > svg > g > g:nth-child(3) > g > path',
    'div > svg > g > g:nth-child(5) > g > path',
  ],
  DATA: [
    'div > svg > g > g:nth-child(4) > g > path',
    'div > svg > g > g:nth-child(6) > g > path',
  ],
  DEVELOPER: [
    'div > svg > g > g:nth-child(4) > g > path',
    'div > svg > g > g:nth-child(6) > g > path',
  ],
  MANAGER: [
    'div > svg > g > g:nth-child(7) > g > path',
    'div > svg > g > g:nth-child(9) > g > path',
  ],
  DESIGNER: [
    'div > svg > g > g:nth-child(7) > g > path',
    'div > svg > g > g:nth-child(9) > g > path',
  ],
  SALES: [
    'div > svg > g > g:nth-child(4) > g > path',
    'div > svg > g > g:nth-child(6) > g > path',
  ],
}
