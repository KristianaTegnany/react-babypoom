import React from "react"
import PropTypes from "prop-types"
import "./styles.scss"

export default function YoutubeEmbed({ embedId }) {
  return (
    <div styleName="video-responsive">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}?rel=0&loop=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Album babypoom"
      />
    </div>
  )
}

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
}
