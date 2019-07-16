import { useState, useEffect, useRef } from 'react'

export default () => {
  const [scrollToTop, setScrollToTop] = useState(true)
  const scrollElt = useRef(null)
  useEffect(() => {
    if (scrollToTop) {
      scrollElt.current.parentNode.scrollTop = 0
      setScrollToTop(false)
    }
  }, [scrollToTop])
  return scrollElt
}
