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
import Tracking from '../../../lib/tracking'
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
        .catch(() => {
          this.props.history.push('/not-found')
        })
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
      <div styleName={`alert alert-${flash.color}`} key={`alert-0`}>
        {i18n(flash.message)}
      </div>
    )
  }

  render() {
    let { bpoom, params } = this.props
    if (bpoom.not_found) {
      return <NotFound />
    }
    Tracking.track("ParentAlbumLandingPage_Visited", {bpoom_id: bpoom.id})

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
                    <Carousel autoPlay infiniteLoop={true} showThumbs={false} showStatus={false}>
                        <div>
                          <img styleName="responsive-album" src={bpoom.album_teaser_url} />
                        </div>
                        <div>
                          <img styleName="responsive-album" src={bpoom.album_teaser_url_theme2} />
                        </div>
                        <div>
                          <img styleName="responsive-album" src={bpoom.album_teaser_url_theme3} />
                        </div>
                    </Carousel>
                  </Column>
                </Row>
                <Row horizontal="center">
                  <div styleName="button-preview">
                    <a href={config.previewLink.replace('{{uuid}}', bpoom.uuid).replace('{{themeid}}', 1)}>
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
                      {t(MSG.album_description,{
                          babyname: (
                            bpoom.baby_name
                          ),
                        })}
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
                        },
                        {
                          title: t(MSG.album_argument_2_8),
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
                          title: t(MSG.album_argument_1_4),
                        },
                      ]}
                    />
                    <h3 styleName="lp-title"> {t(MSG.album_argument_3_title)} </h3>
                    <Carousel autoPlay infiniteLoop={true} showThumbs={false} showStatus={false}>
                        <div>
                          <img src={imgPath("/album/theme1/album-theme-stork-gift.png")} styleName="sample-img" />
                        </div>
                        <div>
                          <img src={imgPath("/album/album-open-min.png")} styleName="sample-img" />
                        </div>
                        <div>
                            <img src={bpoom.album_teaser2_url} styleName="sample-img" />
                        </div>
                        <div>
                          <img src={imgPath("/album/theme1/album-theme-stork-shoes.png")} styleName="sample-img" />
                        </div>
                        <div>
                          <img src={imgPath("/album/theme2/album-theme-zebra-2.jpg")} styleName="sample-img" />
                        </div>
                        <div>
                          <img src={imgPath("/album/theme3/album-theme-owl-2.jpg")} styleName="sample-img" />
                        </div>
                        <div>
                            <img src={imgPath("/album/album-with-mum-2.jpg")} />
                        </div>
                        <div>
                            <img src={imgPath("/album/album-with-mum.jpg")} />
                        </div>
                        <div>
                            <img src={imgPath("/album/album-teaser-4-opti.jpg")} />
                        </div>
                        <div>
                            <img src={imgPath("/album/album-teaser-3-opti.jpg")} />
                        </div>
                    </Carousel>
                    <span>
                      {t(MSG.album_photos_description)}
                    </span>
                    <h3 styleName="lp-title"> {t(MSG.album_argument_4_title)} </h3>
                    <ItemList
                      items={[
                        {
                          title: t(MSG.album_argument_4),
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
                        <div styleName="lp-coupon-background">
                          <span styleName="lp-coupon-old-price">{t(MSG.album_pricing_coupon)}</span>
                          <div styleName="lp-coupon-old-price-container">
                            <span styleName="lp-coupon-old-price-discount">{t(MSG.album_pricing_coupon_discount)}</span>
                            <span styleName="lp-coupon-old-price-before"><del>{t(MSG.album_pricing)}</del></span>
                            <span styleName="lp-coupon-old-price-after">{t(MSG.album_pricing_coupon_new)}</span>
                          </div>

                        <span styleName="lp-coupon-title">{t(MSG.album_pricing_coupon_intro)}</span>
                        <h3 styleName="lp-coupon">{bpoom.coupon_album.code}</h3>
                        </div>
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
                    {bpoom.album_sales_step && bpoom.album_sales_step.includes("expiration") && (
                      <>
                        <span>
                          {t(MSG.album_pdf_infos)}
                        </span>
                        <div styleName="button-booking-order">
                          <a href={config.orderLink.replace('{{id}}', bpoom.id)}>
                            {t(MSG.album_pdf_order, {
                              babyname: (
                                bpoom.baby_name
                              ),
                            })}
                          </a>
                        </div>
                      </>
                    )}
                    <span>
                      {t(MSG.update_infos)}
                    </span>
                    <div styleName="button-update-order">
                      <a href={config.orderLink.replace('{{id}}', bpoom.id)}>
                        {t(MSG.album_update_order, {
                          babyname: (
                            bpoom.baby_name
                          ),
                        })}
                      </a>
                    </div>

                    {bpoom.expiration_countdown && (
                    <>
                    <span>
                      {t(MSG.booking_infos)}
                    </span>
                    <div styleName="button-booking-order">
                      <a href={`/${bpoom.uuid}/booking`}>
                        {t(MSG.album_booking_order)}
                      </a>
                    </div>
                    </>
                    )}
                  </Column>
                </Row>

                {bpoom.expiration_countdown && (<Row wrap vertical="center">
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
                    <h3 styleName="lp-title expiration-title"> {t(MSG.expiration_title)} </h3>
                    <table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td align="center"><img src={bpoom.expiration_countdown} style={{display:"inline-block !important", width: "90% !important", maxWidth: "304px !important"}}/></td></tr></tbody></table>
                  </Column>
                </Row>
                )}



                {false && (<Row wrap vertical="center">
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
                    <h3 styleName="lp-title expiration-title"> {t(MSG.feedbacks_title)} </h3>
                    <span>
                      {t(MSG.feedbacks_description)}
                    </span>
                    <iframe src="https://babypoom.typeform.com/report/UK7ptO7j/kWKZZYr9hmES2wox"
                    style={{
                      marginTop: "15px",
                      backgroundColor: "white",
                      width: "100%",
                      height: "350px",
                      border:"4px solid #b5ceca",
                      mozBorderRadius: "15px",
                      borderRadius: "15px",
                      overflow: "hidden",
                    }} />
                  </Column>
                </Row>
                )}
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
    defaultMessage: `Offrez un souvenir inoubliable à {babyname} !`,
  },
  album_description_title: {
    id: 'app.album_description_title',
    defaultMessage: `Pourquoi un album de naissance ?`,
  },
  album_description: {
    id: 'app.album_description',
    defaultMessage: `L'album de naissance est la meilleure façon d'immortaliser les premiers moments si précieux avec {babyname} et les réactions de vos proches au moment de l'annonce. L'album Babypoom personnalisé de {babyname} est un véritable concentré d'amour, offrez lui la chance de le feuilleter dans quelques années et de pouvoir ainsi revivre les émotions de son arrivée dans la famille.`,
  },
  album_photos_description: {
    id: 'app.album_photos_description',
    defaultMessage: `Couverture cartonnée personnalisée - 3 thèmes (Cigogne, Zèbre, Hibou) au choix - Papier glacé 200g`,
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
    defaultMessage: `Simplifiez-vous la vie ! L'album est pré-rempli, vous pouvez le commander si vous le souhaitez en un clic! Fini les albums achetés en magasin que l'on ne remplit jamais totalement`,
  },
  album_argument_1_2: {
    id: 'app.album_argument_1_2',
    defaultMessage: `Plus de confort : vous le recevez directement chez vous`,
  },
  album_argument_1_4: {
    id: 'app.album_argument_1_4',
    defaultMessage: `Votre Babypoom n'expire plus et reste accessible dans votre application`,
  },
  album_argument_2_title: {
    id: 'app.album_argument_2_title',
    defaultMessage: `Que contient votre album Babypoom ?`,
  },
  album_argument_2_1: {
    id: 'app.album_argument_2_1',
    defaultMessage: `L'ensemble des messages et photos laissés par vos proches`,
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
    defaultMessage: `L'histoire du prénom de bébé (étymologie, origine, ...)`,
  },
  album_argument_2_5: {
    id: 'app.album_argument_2_5',
    defaultMessage: `La réaction des parents`,
  },
  album_argument_2_6: {
    id: 'app.album_argument_2_6',
    defaultMessage: `Toutes les photos chargées sur l'application`,
  },
  album_argument_2_7: {
    id: 'app.album_argument_2_7',
    defaultMessage: `Le faire-part souvenir de bébé`,
  },
  album_argument_2_8: {
    id: 'app.album_argument_2_8',
    defaultMessage: `Les statistiques du jeu de devinette du prénom`,
  },
  album_argument_3_title: {
    id: 'app.album_argument_3_title',
    defaultMessage: `À quoi ressemble votre album ?`,
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
  album_argument_4_title: {
    id: 'app.album_argument_4_title',
    defaultMessage: `Mais aussi...`,
  },
  album_argument_4: {
    id: 'app.album_argument_4',
    defaultMessage: `En vous offrant ce souvenir vous encouragez aussi une société française et son équipe qui a fait le choix assumé de ne pas utiliser la pub et la vente de données pour se financer 🙏🏼`,
  },
  album_pricing_title: {
    id: 'app.album_pricing_title',
    defaultMessage: `Prix`,
  },
  album_pricing_description: {
    id: 'app.album_pricing_description',
    defaultMessage: `L'album dans votre boite aux lettres pour seulement`,
  },
  album_pricing: {
    id: 'app.album_pricing',
    defaultMessage: `OPERATION BLACKFRIDAY -25% ! 36,75€ au lieu de 49€`,
  },
  album_coupon_code: {
    id: 'app.album_coupon_code',
    defaultMessage: `LAST-CHANCE-10`,
  },
  album_pricing_coupon: {
    id: 'app.album_pricing_coupon',
    defaultMessage: `Et parce qu'une bonne nouvelle n'arrive jamais seule, nous vous offrons une exceptionnelle réduction de -10€ sur votre album.`,
  },
  album_pricing_coupon_new: {
    id: 'app.album_pricing_coupon_new',
    defaultMessage: `39€`,
  },
  album_pricing_coupon_discount: {
    id: 'app.album_pricing_coupon_discount',
    defaultMessage: `-10€`,
  },
  album_pricing_coupon_intro: {
    id: 'app.album_pricing_coupon_intro',
    defaultMessage: `en utilisant le code`,
  },
  album_pricing_coupon_expiration: {
    id: 'app.album_pricing_coupon_expiration',
    defaultMessage: `Offre valable uniquement pendant`,
  },
  album_preview: {
    id: 'app.album_preview',
    defaultMessage: `Feuilleter l'album de {babyname}`,
  },
  album_order: {
    id: 'app.album_order',
    defaultMessage: `Commander l'album pour {babyname}`,
  },
  album_update_order: {
    id: 'app.album_update_order',
    defaultMessage: `Modifier l'album de {babyname}`,
  },
  album_booking_order: {
    id: 'app.album_booking_order',
    defaultMessage: `Réserver votre album`,
  },
  update_infos: {
    id: 'app.update_infos',
    defaultMessage: `⚠️ Sachez que vous pouvez encore modifier votre album avant de le commander (ajouter de nouvelles photos, modifier des textes...)`,
  },
  booking_infos: {
    id: 'app.booking_infos',
    defaultMessage: `🔒 Vous êtes intéressé(e) par ce souvenir mais vous avez besoin encore de temps pour le peaufiner ? Réservez le et prenez le temps qu'il vous faut, l'expiration sera suspendue.`,
  },
  album_pdf_infos: {
    id: 'app.album_pdf_infos',
    defaultMessage: `🖥  Vous n'êtes pas trop papier ? Une version numérique de votre album au format pdf est aussi diponible au prix de 19 €.`,
  },
  album_pdf_order: {
    id: 'app.album_pdf_order',
    defaultMessage: `Commander la version numérique pour 19 €`,
  },
  album_gallery_title: {
    id: 'app.album_gallery_title',
    defaultMessage: `Quelques autres photos de l'album Babypoom`,
  },
  expiration_title: {
    id: 'app.expiration_title',
    defaultMessage: `Votre Babypoom expirera dans`,
  },
  feedbacks_title: {
    id: 'app.feedbacks_title',
    defaultMessage: `Qu'en pensent les parents qui l'ont déjà reçu ?`,
  },
  feedbacks_description: {
    id: 'app.feedbacks_description',
    defaultMessage: `La qualité de nos produits est au coeur de nos préoccupations chez Babypoom, c'est pourquoi nous faisons régulièrement des sondages auprès des parents qui nous ont fait confiance. Nous vous partageons ici en toute transparence et sans filtre les résultats de notre dernier sondage.`,
  },
  feedbacks_link: {
    id: 'app.feedbacks_link',
    defaultMessage: `Voir les résultats du dernier sondage`,
  },
})
