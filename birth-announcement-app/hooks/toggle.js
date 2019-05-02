import { useState } from 'react'

export default (initialValue = false) => {
  const [visible, setVisibility] = useState(initialValue)
  const hide = () => setVisibility(false)
  const show = () => setVisibility(true)
  return { visible, show, hide }
}
