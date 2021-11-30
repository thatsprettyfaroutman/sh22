import { useMemo, useRef } from 'react'
import { isNil } from 'ramda'

/**
 * Freezes the first not nil value
 * AND returns it for the rest of the time the hook is in effect
 * ACCEPTS default value `orValue`
 */

export function useFreezeValue(value, orValue) {
  const freezedRef = useRef(value)
  return useMemo(() => {
    if (isNil(freezedRef.current) && !isNil(value)) {
      // Freeze the value only when there is an actual value
      freezedRef.current = value
    }
    return !isNil(freezedRef.current) ? freezedRef.current : orValue
  }, [freezedRef, value, orValue])
}

/**
 * Freezes the first not nil value
 * AND returns it for the rest of the time the hook is in effect
 * UNLESS compare returns true
 */
export const useFreezeValueUnless = (value, compare) => {
  const freezedRef = useRef(value)
  return useMemo(() => {
    if (
      (isNil(freezedRef.current) &&
        !isNil(value) &&
        typeof compare === 'function') ||
      compare(freezedRef.current, value)
    ) {
      freezedRef.current = value
    }
    return freezedRef.current
  }, [freezedRef, value, compare])
}
