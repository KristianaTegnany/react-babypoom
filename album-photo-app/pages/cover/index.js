import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './styles.scss'

import Page from '../../components/page'
import Title from '../../components/title'
import ContentPanel from '../../components/content-panel'
import BorderBgBox from '../../components/border-bg-box'

// i18n
import t from '../../i18n/i18n'
import { FormattedDate } from 'react-intl'

class Cover extends Component {
  birthday = date => {
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
      <Page>
        <ContentPanel background centered styleName="panel">
          <div styleName="panel-content">
            <div styleName="decoration-box">
              <BorderBgBox styleName="border-box">
                <div styleName="box-content">
                  <span styleName="first-name">{bpoom.baby_name}</span>
                  <span styleName="last-name">{bpoom.lastname}</span>
                  <hr />
                  <time styleName="birthdate">{this.birthday(bpoom.birthday)}</time>
                </div>
              </BorderBgBox>
            </div>
          </div>
        </ContentPanel>
      </Page>
    )
  }
}

export default connect(mapStateToProps)(Cover)

function mapStateToProps(state) {
  const {
    app: { bpoom },
  } = state
  return { bpoom }
}
