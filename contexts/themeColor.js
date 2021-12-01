import { useState, useCallback, useEffect, useMemo } from 'react'
import constate from 'constate'
import { useSpring } from 'react-spring'
import chroma from 'chroma-js'

const useThemeColor = () => {
  const [sectionOrder, setSectionOrder] = useState([])
  const [sectionMap, setSectionMap] = useState({})

  const setSection = useCallback((name, inView, color) => {
    setSectionMap((state) => {
      const nextState = { ...state }
      nextState[name] = { name, inView, color }
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

    setThemeColor({
      themeColor: chroma(topSection.color).css('rgba'),
    })
  }, [sectionOrder, sectionMap, setThemeColor])

  return {
    setSectionOrder,
    setSection,
  }
}

const [provider, hook] = constate(useThemeColor)

export const ThemeColorProvider = provider
export const useThemeColorContext = hook
