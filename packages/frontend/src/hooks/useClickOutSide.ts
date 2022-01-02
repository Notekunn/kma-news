import { current } from '@reduxjs/toolkit'
import { useRef, useEffect, useState } from 'react'
const MOUSEDOWN = 'mousedown'
const TOUCHSTART = 'touchstart'
type HandledEvents = [typeof MOUSEDOWN, typeof TOUCHSTART]

type HandledEventsType = HandledEvents[number]
type PossibleEvent = {
  [Type in HandledEventsType]: HTMLElementEventMap[Type]
}[HandledEventsType]
type event = keyof GlobalEventHandlersEventMap
// const [state, setstate] = useState(false)
export const useClickOutside = (handler: () => void, ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    let maybeHandler = (event: PossibleEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler()
    }

    document.addEventListener('mousedown', maybeHandler)

    return () => {
      document.removeEventListener('mousedown', maybeHandler)
    }
  })

  return ref
}
