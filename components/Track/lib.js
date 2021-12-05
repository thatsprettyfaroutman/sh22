import lerp from 'lerp'
export const lerpInOut = (x, y, alpha) => lerp(x, lerp(y * 4, x, alpha), alpha)
