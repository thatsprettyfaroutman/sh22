# lottie files!

These lottie files are a bit special

## `crop`-prop

They have additional `crop` prop that is used in the `Lottie` component, so make sure that exists.
Example:

```javascript
{
  ...
  "crop": { "x": 48, "y": 94, "w": 188, "h": 211 },
  ...
}
```

## Svg fallback

Make sure there is a corresponding svg file for each lottie file. Svg is shown if javascript is disabled.
