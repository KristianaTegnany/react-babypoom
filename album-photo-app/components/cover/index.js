import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './styles.scss'
import page from '../../../config/styles/page.scss'

// i18n
import t from '../../i18n/i18n'
import { FormattedDate } from 'react-intl'

@connect(mapStateToProps)
class Cover extends Component {
  birthday(date) {
    if (!date) return ''
    let attrs = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }
    return <FormattedDate value={new Date(date)} {...attrs} />
  }

  render() {
    let { bpoom } = this.props
    return (
      <section styleName="styles.section">
        <div styleName="page.page page.page-with-bg styles.baby-resume-page">
          <div styleName="page.page-content page.centered-page styles.baby-resume-page-content">
            <div styleName="styles.baby-resume-container">
              <div styleName="page.border-with-bg styles.baby-resume-content-border">
                <div styleName="styles.baby-resume-content">
                  <p styleName="styles.baby-resume-first-name">{bpoom.babyname}</p>
                  <p styleName="styles.baby-resume-last-name">{bpoom.lastname}</p>
                  <hr />
                  <p styleName="styles.baby-resume-birthdate">
                    <time>{this.birthday(bpoom.birthday)}</time>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Cover

function mapStateToProps(state) {
  const {
    app: { bpoom },
  } = state
  return { bpoom }
}
