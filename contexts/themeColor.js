import { useState, useCallback, useEffect, useMemo } from 'react'
import constate from 'constate'
import { useSpring } from 'react-spring'
import chroma from 'chroma-js'

const useThemeColor = ({ theme }) => {
  const [sectionOrder, setSectionOrder] = useState([])
  const [sectionMap, setSectionMap] = useState({})

  const setSection = useCallback((name, inView) => {
    setSectionMap((state) => {
      const nextState = { ...state }
      nextState[name] = { name, inView }
      return nextState
    })
  }, [])

  const meta = useMemo(() => {
    if (typeof document === 'undefined') {
      return
    }
    let meta = document.head.querySelector('[name="theme-color"]')
    if (meta) {
      return meta
    }
    meta = document.createElement('meta')
    meta.setAttribute('name', 'theme-color')
    document.head.appendChild(meta)
    return meta
  }, [])

  const [, setThemeColor] = useSpring(
    useCallback(
      () => ({
        themeColor: 'rgb(255, 255, 255, 0)',
        onChange: ({ value: { themeColor } }) => {
          meta?.setAttribute('content', themeColor)
        },
      }),
      [meta]
    )
  )

  useEffect(() => {
    const sortedSections = sectionOrder
      .map((name) => {
        const section = sectionMap[name]
        if (section?.inView) {
          return section
        }
      })
      .filter(Boolean)

    const topSection = sortedSections[0]
    if (!topSection) {
      return
    }

    const color = theme?.color?.section?.[topSection.name]?.bg

    if (!color) {
      console.error(
        `useThemeColor, \`theme.color.section.${topSection.name}.bg\` not found`
      )
      return
    }

    setThemeColor({
      themeColor: chroma(color).css('rgba'),
    })
  }, [sectionOrder, sectionMap, setThemeColor])

  return {
    setSectionOrder,
    setSection,
    theme,
  }
}

const [provider, hook] = constate(useThemeColor)

export const ThemeColorProvider = provider
export const useThemeColorContext = hook
