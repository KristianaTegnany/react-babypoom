import React, { Component } from 'react'
import { connect } from 'react-redux'
import Page from '../../components/page'
import Title from '../../components/title'
import PresentationPanel from '../../components/presentation-panel'
import ContentPanel from '../../components/content-panel'
import t from '../../i18n/i18n'
import { defineMessages } from 'react-intl'
import './styles.theme-BP_ALBUM_THEME.scss'
import parse from 'html-react-parser';

class Firstname extends Component {
  render() {
    let { bpoom, params } = this.props

    //const cardURL = params.hd ? cardHdURL : cardThumbnailURL
    function markuptext(text,identifier,htmltag)
    {
        var array = text.split(identifier);
        var previous = "";
        var previous_i;
        var i;
        for (i = 0; i < array.length; i++) {
            if (i % 2)
            {
                //odd number
            }
            else if (i!=0)
            {
                previous_i = eval(i-1);
                array[previous_i] = "<"+htmltag+">"+previous+"</"+htmltag+">";
            }
            previous = array[i];
        }
        var newtext = "";
        for (i = 0; i < array.length; i++) {
            newtext += array[i];
        }
        return newtext
    }

    return (
      <Page>
        <PresentationPanel styleName="card-presentation-panel">
          <Title label={t(MSG.card)} description={t(MSG.description, {babyName: bpoom.baby_name} )} />
        </PresentationPanel>
        <ContentPanel styleName="content-panel" background centered>
          <div styleName="text-container">
            {bpoom.firstname_infos && bpoom.firstname_infos.replace (/^/,'<h1>'+bpoom.baby_name+'</h1>').split('\n').map(str => <p>{parse(markuptext(str,"**","strong"))}</p>)}
          </div>
        </ContentPanel>
      </Page>
    )
  }
}

export default connect(mapStateToProps)(Firstname)

function mapStateToProps(state) {
  const {
    app: { bpoom, params },
  } = state
  return { bpoom, params }
}

const MSG = defineMessages({
  card: {
    id: 'firstname.title',
    defaultMessage: `Mon\nprénom`,
  },
  description: {
    id: 'firstname.description',
    defaultMessage: `Quelques informations sur l'histoire de mon prénom {babyName}`,
  },
})
