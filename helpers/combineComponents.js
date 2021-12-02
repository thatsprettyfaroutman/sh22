export const combineComponents = (...components) =>
  components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      const CombinedComponents = (props) => (
        <AccumulatedComponents {...props}>
          <CurrentComponent {...props} />
        </AccumulatedComponents>
      )
      CombinedComponents.displayName = 'CombinedComponents'
      return CombinedComponents
    },
    ({ children }) => <>{children}</>
  )
