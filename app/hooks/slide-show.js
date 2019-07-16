import { useState } from 'react'

export default (bpoom, loadSlideshow, getItems) => {
  const [prevState, setPrevState] = useState({ bpoom: null, slideshowInit: false })

  if (prevState.bpoom !== bpoom || !prevState.slideshowInit) {
    let items = getItems()
    if (items.length) loadSlideshow({ items })
    setPrevState({ bpoom, slideshowInit: true })
  }
}
