import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './styles.scss'

import Page from '../page'
import Title from '../title'
import ContentPanel from '../content-panel'
import BorderBgBox from '../border-bg-box'

// i18n
import t from '../../i18n/i18n'
import { FormattedDate } from 'react-intl'

@connect(mapStateToProps)
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
      <section styleName="section">
        <Page>
          <ContentPanel background centered styleName="panel">
            <div styleName="panel-content">
              <div styleName="decoration-box">
                <BorderBgBox styleName="border-box">
                  <div styleName="box-content">
                    <span styleName="first-name">{bpoom.babyname}</span>
                    <span styleName="last-name">{bpoom.lastname}</span>
                    <hr />
                    <time styleName="birthdate">{this.birthday(bpoom.birthday)}</time>
                  </div>
                </BorderBgBox>
              </div>
            </div>
          </ContentPanel>
        </Page>
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
