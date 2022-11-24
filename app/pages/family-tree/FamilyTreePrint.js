import React, { Component, useDebugValue } from 'react'
import html2canvas from 'html2canvas'
import FamilyTree from './index'
import { connect } from 'react-redux'
import { injectIntl, defineMessages, addLocaleData } from 'react-intl'

import loadIntl from '../../../lib/intl-detection'
import localeDataLoader from '../../../config/locales/data-loader'
import i18n from '../../i18n/i18n'
import { fetchBpoom } from '../../views/app/Actions'
import THEMES from '../../views/app/themes'
import './styles.theme-BP_ALBUM_THEME.scss'
import CSSVariableApplicator from '../../components/css-var'
import './tree.scss'

function setLocaleData(localeData) {
  addLocaleData(new Function(`return ${localeData}`)())
}

function getThemeName(bpoom) {
  let hack = (('undefined' !== typeof window && window.location.hash) || '').substr(1)
  return hack && hack in THEMES ? hack : bpoom.gender ? ('M' === bpoom.gender ? 'boy' : 'girl') : 'default'
}

class FamilyTreePrint extends Component {
  constructor(props) {
    super(props)
    this.selectorRef = React.createRef(null)
    this.state = {
      imgBase64: null,
    }
  }

  static fetchData(store, params) {
    return store.dispatch(fetchBpoom(params.uuid))
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      theme: getThemeName(nextProps.bpoom),
    }
  }

  componentDidMount() {
    if (!this.props.bpoom.uuid) {
      this.props
        .fetchBpoom(this.props.match.params.uuid)
        .then((bpoom) => {
          loadIntl([bpoom.locale], () => {
            localeDataLoader(bpoom.locale).then((json) => {
              setLocaleData(json.data)
            })
          })
          this.exportAsImage()
        })
        .catch(() => {
          this.props.history.push('/not-found')
        })
    } else {
      setLocaleData(i18n.localeData)
    }
  }

  async exportAsImage() {
    const canvas = await html2canvas(this.selectorRef.current, {
      height: 793,
      width: 1123,
      allowTaint: true,
      useCORS: true,
    })

    const image = canvas.toDataURL('image/png', 1.0)
    var link = document.createElement('a')
    link.download = 'familyTree.png'
    link.href = image
    link.click()
    this.setState({ imgBase64: image })
  }

  render() {
    const base64 = this.state.imgBase64

    return (
      <div ref={this.selectorRef} styleName="previewTree">
        {!base64 ? (
          <CSSVariableApplicator data-variables={THEMES[this.state.theme]}>
            <FamilyTree {...this.props} />
          </CSSVariableApplicator>
        ) : (
          <img src={base64} alt="image-file" />
        )}
      </div>
    )
  }
}

export default injectIntl(connect(mapStateToProps, { fetchBpoom })(FamilyTreePrint))
function mapStateToProps(state) {
  const {
    app: { bpoom, params },
  } = state
  return { bpoom, params }
}
