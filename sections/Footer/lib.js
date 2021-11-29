import { range } from "ramda";
import { SECONDS_PER_BITE } from "./consts";

const RANDOMS = range(0, 100).map((x) => Math.random());
export const rand = (i = 0) => RANDOMS[Math.floor(i) % RANDOMS.length];

export const getBites = (secondsPassed = 0) =>
  Math.floor(secondsPassed / SECONDS_PER_BITE);

const createGetBitePath = (originalWidth = 0, originalHeight = 0, path) => {
  if (!path) {
    throw new Error("createGetBitePath, `path` required");
  }

  const preProps = path
    .trim()
    .split("\n")
    .map((x) => x.trim())
    .map((row) => {
      const firstChar = row.charAt(0);
      return [
        firstChar,
        row
          .substr(1)
          .split(" ")
          .map((xy, i) => {
            const isX = i % 2 === 0;
            return isX
              ? Number(xy) / originalWidth
              : Number(xy) / originalHeight;
          })
      ];
    });

  return (x = 0, y = 0, w = 80, h = 30) =>
    preProps
      .map(
        ([char, xys]) =>
          `${char}${xys
            .map((xy, i) => {
              const isX = i % 2 === 0;
              return isX ? x + xy * w : y + xy * h;
            })
            .join(" ")}`
      )
      .join("");
};

export const getBitePathA = createGetBitePath(
  37,
  8,
  `L0 0
   C0.273926 3.90903 3.52588 7 7.5 7
   C8.86719 7 10.1489 6.63412 11.2529 5.9949
   C12.2617 7.21933 13.7896 8 15.5 8
   C16.6069 8 17.6372 7.67307 18.5 7.11053
   C19.3628 7.67307 20.3931 8 21.5 8
   C23.2104 8 24.7383 7.21933 25.7471 5.9949
   C26.8511 6.63412 28.1328 7 29.5 7
   C33.4741 7 36.7261 3.90903 36.9834 0
  `
);

export const getBitePathB = createGetBitePath(
  37,
  8,
  `L0 0
   C1.45637 2.91299 4.23449 5 7.5 5
   C8.50928 5 9.47266 4.80054 10.3516 4.4389
   C11.1357 6.51978 13.145 8 15.5 8
   C16.9502 8 18.2695 7.4386 19.2524 6.52124
   C19.9385 6.82889 20.6992 7 21.5 7
   C22.9019 7 24.1812 6.47556 25.1523 5.61215
   C26.3789 6.48602 27.8794 7 29.5 7
   C33.4741 7 36.7263 3.90903 36.9836 0
  `
);
