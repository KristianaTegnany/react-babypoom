import React, { Component } from 'react'
import { injectIntl, defineMessages, addLocaleData } from 'react-intl'
import localeDataLoader from '../../../config/locales/data-loader'
import { connect } from 'react-redux'
import { fetchBpoom } from '../app/Actions'
import { deleteFlash } from '../../components/flash/Actions'
import CSSVariableApplicator from '../../components/css-var'
import THEMES from '../app/themes'
import ItemList from '../../components/item-list'
import NotFound from '../not-found'
import i18n from '../../i18n/i18n'
import config from '../../../config'
import t from '../../i18n/i18n'
import imgPath from "../../../lib/img-path"
import loadIntl from '../../../lib/intl-detection'
import { updateLocale } from '../../i18n/hot-intl-provider/HotIntlProviderActions'
import { Column, Row } from "simple-flexbox";
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './styles.scss'

function setLocaleData(localeData) {
  addLocaleData(new Function(`return ${localeData}`)())
}

function getThemeName(bpoom) {
  let hack = (('undefined' !== typeof window && window.location.hash) || '').substr(1)
  return hack && hack in THEMES ? hack : bpoom.gender ? ('M' === bpoom.gender ? 'boy' : 'girl') : 'default'
}


class LandingPage extends Component {
  constructor(props) {
    super(props)
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
              this.props.updateLocale({ locale: bpoom.locale, localeData: json.data, messages: json.messages })
              setLocaleData(json.data)
            })
          })
        })
        .catch(() => {})
    } else {
      setLocaleData(i18n.localeData)
    }
  }

  componentDidUpdate(prevProps) {
    let props = this.props

    // On route update
    if (props.location.pathname !== prevProps.location.pathname) {
      props.deleteFlash()
    }
  }

  renderFlash() {
    let { flash, location } = this.props
    if (!flash || !flash.message) {
      flash = (location.state || {}).flash
    }
    if (!flash || !flash.message) {
      return ''
    }
    return (
      <div styleName={`alert alert-${flash.color}`} key={`alert-${++UNIQ}`}>
        {i18n(flash.message)}
      </div>
    )
  }

  render() {
    let { bpoom, params } = this.props
    if (bpoom.not_found) {
      return <NotFound />
    }

    return (
      <CSSVariableApplicator data-variables={THEMES[this.state.theme]}>
        {this.renderFlash()}
        <div styleName={`lp-container ${bpoom.gender=='M' ? 'boys': 'girls'}`}>
          {!params.hd && (
            <div>
              <div className="loading-preview" styleName="loading-preview">
                <div />
              </div>
              <Column flexGrow={1}>
                <Row horizontal="center">
                  <h1 styleName="lp-slogan">
                    {t(MSG.lp_slogan, {
                      babyname: (
                        bpoom.baby_name
                      ),
                    })}
                  </h1>
                </Row>
                <Row wrap vertical="center">
                  <Column flexGrow={1} horizontal="center"
                    style={{
                      backgroundColor: "white",
                      maxWidth: 650,
                      padding: 12,
                      color: "#E0E0E0",
                      borderRadius:"15px",
                      margin: 30,
                    }}
                  >
                    <img styleName="responsive-album" src={bpoom.album_teaser_url}></img>
                  </Column>
                </Row>
                <Row horizontal="center">
                  <div styleName="button-preview">
                    <a href={config.previewLink.replace('{{uuid}}', bpoom.uuid)}>
                      {t(MSG.album_preview, {
                        babyname: (
                          bpoom.baby_name
                        ),
                      })}
                    </a>
                  </div>
                </Row>
                <Row vertical="center">
                  <Column flexGrow={1} horizontal="center"
                    style={{
                      backgroundColor: "white",
                      maxWidth: 650,
                      padding: 12,
                      color: "#646781",
                      borderRadius:"15px",
                      margin: 30,
                    }}
                  >
                    <h3 styleName="lp-title">{t(MSG.album_description_title)}</h3>
                    <span>
                      {t(MSG.album_description)}
                    </span>
                    <h3 styleName="lp-title"> {t(MSG.album_argument_2_title)} </h3>
                    <ItemList
                      items={[
                        {
                          title: t(MSG.album_argument_2_1),
                        },
                        {
                          title: t(MSG.album_argument_2_2),
                        },
                        {
                          title: t(MSG.album_argument_2_3),
                        },
                        {
                          title: t(MSG.album_argument_2_4),
                        },
                        {
                          title: t(MSG.album_argument_2_5),
                        },
                        {
                          title: t(MSG.album_argument_2_6),
                        },
                        {
                          title: t(MSG.album_argument_2_7),
                        }
                      ]}
                    />
                    <h3 styleName="lp-title"> {t(MSG.album_argument_1_title)} </h3>
                    <ItemList
                      items={[
                        {
                          title: t(MSG.album_argument_1_1),
                        },
                        {
                          title: t(MSG.album_argument_1_2),
                        },
                        {
                          title: t(MSG.album_argument_1_3),
                        },
                      ]}
                    />
                    <h3 styleName="lp-title"> {t(MSG.album_argument_3_title)} </h3>
                    <ItemList
                      items={[
                        {
                          title: t(MSG.album_argument_3_1),
                        },
                        {
                          title: t(MSG.album_argument_3_2),
                        },
                        {
                          title: t(MSG.album_argument_3_3),
                        },
                      ]}
                    />
                  </Column>
                </Row>

                <Row wrap vertical="center">
                  <Column flexGrow={1} horizontal="center"
                    style={{
                      backgroundColor: "white",
                      maxWidth: 650,
                      padding: 12,
                      color: "#646781",
                      borderRadius:"15px",
                      margin: 30,
                    }}
                  >
                    <h3 styleName="lp-title"> {t(MSG.album_pricing_title)} </h3>
                    <span>
                      {t(MSG.album_pricing_description)}
                    </span>
                    <h1 styleName="lp-title">{t(MSG.album_pricing)}</h1>
                    {bpoom.coupon_album && (
                      <div styleName="lp-coupon-container">
                        <span styleName="lp-coupon-title">{t(MSG.album_pricing_coupon)}</span>
                        <h3 styleName="lp-coupon">{bpoom.coupon_album.code}</h3>
                        <span styleName="lp-coupon-title">{t(MSG.album_pricing_coupon_expiration)}</span>
                        <img styleName="lp-coupon-image" src={bpoom.coupon_album.link} />
                      </div>
                    )}
                    <div styleName="button-order">
                      <a href={config.orderLink.replace('{{id}}', bpoom.id)}>
                        {t(MSG.album_order, {
                          babyname: (
                            bpoom.baby_name
                          ),
                        })}
                      </a>
                    </div>
                  </Column>
                </Row>

                <Row wrap vertical="center">
                  <Column flexGrow={1} horizontal="center"
                    style={{
                      backgroundColor: "white",
                      maxWidth: 650,
                      padding: 12,
                      color: "#E0E0E0",
                      borderRadius:"15px",
                      margin: 30,
                    }}
                  >
                    <h3 styleName="lp-title"> {t(MSG.album_gallery_title)} </h3>
                    <Carousel>
                        <div>
                            <img src={bpoom.album_teaser2_url} />
                        </div>
                        <div>
                            <img src={imgPath("/album/album-teaser-4-opti.jpg")} />
                        </div>
                        <div>
                            <img src={imgPath("/album/album-teaser-3-opti.jpg")} />
                        </div>
                    </Carousel>
                  </Column>
                </Row>

              </Column>
            </div>
          )}
        </div>
      </CSSVariableApplicator>
    )
  }
}

export default injectIntl(connect(mapStateToProps, { fetchBpoom, updateLocale, deleteFlash })(LandingPage))

function mapStateToProps(state) {
  const {
    app: { bpoom, params },
    flash,
    i18n,
  } = state
  return { bpoom, params, flash, i18n }
}

const MSG = defineMessages({
  lp_slogan: {
    id: 'app.lp_slogan',
    defaultMessage: `Offrez à {babyname} un souvenir inoubliable!`,
  },
  album_description_title: {
    id: 'app.album_description_title',
    defaultMessage: `Un album de naissance, pourquoi faire?`,
  },
  album_description: {
    id: 'app.album_description',
    defaultMessage: `Il s’agit tout simplement de l’un des meilleurs moyens d’immortaliser tous ces moments liés à la naissance d'un enfant. Vos proches vous ont certainement aussi gratifié de jolis messages à l'arrivé de bébé... Gardez ces précieux souvenirs dans un album photo qui sera le trésor de ces moments incroyables en famille. C'est un objet à la valeur affective inégalable qui se transmet de génération en
    génération, un concentré d’amour que votre bébé découvrira quand il sera plus grand.`,
  },
  order: {
    id: 'app.order',
    defaultMessage: `Commander`,
  },
  album_argument_1_title: {
    id: 'app.album_argument_1_title',
    defaultMessage: `Des petits plus qui font toute la différence`,
  },
  album_argument_1_1: {
    id: 'app.album_argument_1_1',
    defaultMessage: `Un gain de temps : votre album est prêt en un clic! Fini les albums achetés en magasin que l'on ne remplit jamais totalement`,
  },
  album_argument_1_2: {
    id: 'app.album_argument_1_2',
    defaultMessage: `Plus de confort : vous le recevez directement chez vous`,
  },
  album_argument_1_3: {
    id: 'app.album_argument_1_3',
    defaultMessage: `Un plaisir accessible : votre album personnalisé est 5 fois moins cher que ceux proposés par les photographes`,
  },
  album_argument_2_title: {
    id: 'app.album_argument_2_title',
    defaultMessage: `Que contient votre album Babypoom?`,
  },
  album_argument_2_1: {
    id: 'app.album_argument_2_1',
    defaultMessage: `L'ensemble des messages et photos laissé par vos proches`,
  },
  album_argument_2_2: {
    id: 'app.album_argument_2_2',
    defaultMessage: `Les infos de naissance de votre bébé : photo, date, heure, etc...`,
  },
  album_argument_2_3: {
    id: 'app.album_argument_2_3',
    defaultMessage: `Les moments forts de la grossesse et des premiers moments de bébé`,
  },
  album_argument_2_4: {
    id: 'app.album_argument_2_4',
    defaultMessage: `La réaction des parents`,
  },
  album_argument_2_5: {
    id: 'app.album_argument_2_5',
    defaultMessage: `Toutes les photos chargées sur l'application`,
  },
  album_argument_2_6: {
    id: 'app.album_argument_2_6',
    defaultMessage: `Le faire-part souvenir de bébé`,
  },
  album_argument_2_7: {
    id: 'app.album_argument_2_7',
    defaultMessage: `Les statistiques du jeu de devinette du prénom`,
  },
  album_argument_3_title: {
    id: 'app.album_argument_3_title',
    defaultMessage: `À quoi ressemble votre album?`,
  },
  album_argument_3_1: {
    id: 'app.album_argument_3_1',
    defaultMessage: `Design soigné, plein de douceur`,
  },
  album_argument_3_2: {
    id: 'app.album_argument_3_2',
    defaultMessage: `Couverture cartonnée illustrée du prénom de votre bébé`,
  },
  album_argument_3_3: {
    id: 'app.album_argument_3_3',
    defaultMessage: `Papier glacé de haute qualité (200 g)`,
  },
  album_pricing_title: {
    id: 'app.album_pricing_title',
    defaultMessage: `Tarifs`,
  },
  album_pricing_description: {
    id: 'app.album_pricing_description',
    defaultMessage: `Recevez votre album de naissance personnalisé dans votre boite aux lettres pour seulement`,
  },
  album_pricing: {
    id: 'app.album_pricing',
    defaultMessage: `49€`,
  },
  album_pricing_coupon: {
    id: 'app.album_pricing_coupon',
    defaultMessage: `Et parce qu'une bonne nouvelle n'arrive jamais seule, nous vous offrons les frais de livraison et ce code promo qui vous permettra de bénéficier de 5 euros de réduction immédiate sur votre commande.`,
  },
  album_pricing_coupon_expiration: {
    id: 'app.album_pricing_coupon_expiration',
    defaultMessage: `Ce coupon disparaîtra et ne sera plus valable dans:`,
  },
  album_preview: {
    id: 'app.album_preview',
    defaultMessage: `Feuilletez l'album de {babyname}`,
  },
  album_order: {
    id: 'app.album_order',
    defaultMessage: `Commandez l'album pour {babyname}`,
  },
  album_gallery_title: {
    id: 'app.album_gallery_title',
    defaultMessage: `Quelques autres photos de l'album Babypoom`,
  },
})
