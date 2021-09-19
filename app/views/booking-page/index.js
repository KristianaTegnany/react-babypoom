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
import StripeCheckoutComponent from '../../components/stripe'
import Modal from 'react-modal'
import './styles.scss'

function setLocaleData(localeData) {
  addLocaleData(new Function(`return ${localeData}`)())
}

function getThemeName(bpoom) {
  let hack = (('undefined' !== typeof window && window.location.hash) || '').substr(1)
  return hack && hack in THEMES ? hack : bpoom.gender ? ('M' === bpoom.gender ? 'boy' : 'girl') : 'default'
}


class BookingPage extends Component {
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

  successModal(bpoom,params) {
    if (!params.success){
      return
    }

    return (
      <Modal
        isOpen={true}
        contentLabel="Example Modal"
      >
        <Column flexGrow={1}>
          <Row horizontal="center">
            <h1 styleName="stripe-success">
              {t(MSG.success_album_order, {
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
              <img styleName="success-mascot" src={imgPath("/mascot/stork-sitting-on-branch.png")}></img>
            </Column>
          </Row>
          <Row horizontal="center">
            <div styleName="button-order">
              <a onClick={()=>window.location = window.location.href.split("?")[0]}>
                {t(MSG.close)}
              </a>
            </div>
          </Row>
        </Column>
      </Modal>
    )
  }

  render() {
    let { bpoom, params } = this.props
    if (bpoom.not_found) {
      return <NotFound />
    }
    Tracking.track("ParentAlbumBookingLandingPage_Visited", {bpoom_id: bpoom.id})

    return (
      <CSSVariableApplicator data-variables={THEMES[this.state.theme]}>
        {this.renderFlash()}
        {this.successModal(bpoom, params)}
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
                      {t(MSG.album_description,
                        {
                          babyname: (
                            bpoom.baby_name
                          ),
                        })}
                    </span>
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
                        {
                          title: t(MSG.album_argument_1_4),
                        },
                        {
                          title: t(MSG.album_argument_1_5),
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
                    <div styleName="button-update-order">
                      <div styleName="order first">
                      {!bpoom.album_paid && (
                      <StripeCheckoutComponent
                      label={t(MSG.album_order, {
                        babyname: (
                          bpoom.baby_name
                        ),
                      })}
                      bpoomId={bpoom.id}
                      paymentType="BOOKING_ALBUM_PARENT"
                     />
                      )}
                      </div>
                    </div>
                    <span>
                      {bpoom.album_paid ? t(MSG.to_late_infos) : t(MSG.update_infos)}
                    </span>

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
                    <h3 styleName="lp-title"> {t(MSG.album_gallery_title)} </h3>
                    <Carousel showThumbs={false} showStatus={false}>
                       <div>
                            <img src={bpoom.album_teaser2_url} />
                        </div>
                        <div>
                            <img src={bpoom.gender=='M' ? imgPath("/album/album-visitorbook-teaser-boy.jpg") : imgPath("/album/album-visitorbook-teaser-girl.jpg")} />
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
                      {t(MSG.album_order_now)}
                    </span>
                    <div styleName="button-update-order">
                      <a href={config.orderLink.replace('{{id}}', bpoom.id)}>
                        {t(MSG.album_order_now_bt, {
                          babyname: (
                            bpoom.baby_name
                          ),
                        })}
                      </a>
                    </div>
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

export default injectIntl(connect(mapStateToProps, { fetchBpoom, updateLocale, deleteFlash })(BookingPage))

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
    defaultMessage: `Réservez l'album de {babyname}`,
  },
  album_description_title: {
    id: 'app.album_description_title',
    defaultMessage: `A quoi sert la réservation ?`,
  },
  album_description: {
    id: 'app.album_description',
    defaultMessage: `Vous souhaitez recevoir l'album souvenir de {babyname} mais vous n'avez pas eu le temps de le peaufiner à votre guise ? Pas de problème, nous savons bien que le temps se fait rare avec l'arrivée d'un bout de chou, c'est pourquoi nous vous proposons une solution de réservation de votre album.`,
  },
  order: {
    id: 'app.order',
    defaultMessage: `Commander`,
  },
  album_argument_1_title: {
    id: 'app.album_argument_1_title',
    defaultMessage: `Les avantages de la réservation`,
  },
  album_argument_1_1: {
    id: 'app.album_argument_1_1',
    defaultMessage: `Pas de précipitation, l'expiration de votre album est suspendue`,
  },
  album_argument_1_2: {
    id: 'app.album_argument_1_2',
    defaultMessage: `Vous avez tout le temps pour ajouter, modifier vos textes et vos photos des moments importants de bébé ou demander à vos proches d'ajouter une photo à leur message du livre d'or`,
  },
  album_argument_1_3: {
    id: 'app.album_argument_1_3',
    defaultMessage: `Pas de surplus à payer! Lorsque vous êtes prêt à commander votre album, vous renseignez votre adresse de livraison et le prix de cette réservation est automatiquement déduit du prix de l'album`,
  },
  album_argument_1_4: {
    id: 'app.album_argument_1_4',
    defaultMessage: `Si vous avez un code promo, vous pourrez encore l'utiliser sur le reste à payer`,
  },
  album_argument_1_5: {
    id: 'app.album_argument_1_5',
    defaultMessage: `Souriez! vous êtes livré à domicile d'un album intemporel qui correspond parfaitement à vos attentes`,
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
    defaultMessage: `En réservant ce souvenir vous encouragez aussi une société française et son équipe qui a fait le choix assumé de ne pas utiliser la pub et la vente de données pour se financer 🙏🏼`,
  },
  album_pricing_title: {
    id: 'app.album_pricing_title',
    defaultMessage: `Tarifs`,
  },
  album_pricing_description: {
    id: 'app.album_pricing_description',
    defaultMessage: `Prenez votre temps et réserver votre album de naissance personnalisé pour`,
  },
  album_pricing: {
    id: 'app.album_pricing',
    defaultMessage: `20€`,
  },
  album_coupon_code: {
    id: 'app.album_coupon_code',
    defaultMessage: `LAST-CHANCE-10`,
  },
  album_pricing_coupon: {
    id: 'app.album_pricing_coupon',
    defaultMessage: `Et parce qu'une bonne nouvelle n'arrive jamais seule, nous vous offrons les frais de livraison et ce code promo qui vous permettra de bénéficier de 10 euros de réduction immédiate sur votre commande.`,
  },
  album_pricing_coupon_expiration: {
    id: 'app.album_pricing_coupon_expiration',
    defaultMessage: `Ce coupon disparaîtra et ne sera plus valable dans:`,
  },
  album_preview: {
    id: 'app.album_preview',
    defaultMessage: `Feuilleter l'album de {babyname}`,
  },
  album_order: {
    id: 'app.album_order',
    defaultMessage: `Réserver l'album de {babyname}`,
  },
  album_order_now: {
    id: 'app.album_update_order',
    defaultMessage: `Bien évidemment, si votre album semble déjà à votre goût, pas besoin de réservation, vous pouvez le recevoir directement.`,
  },
  album_order_now_bt: {
    id: 'app.album_order_now_bt',
    defaultMessage: `Commander l'album de {babyname}`,
  },
  update_infos: {
    id: 'app.update_infos',
    defaultMessage: `⚠️ Sachez que ce n'est pas un surplus à payer. Lorsque vous serez prêt à commander votre album final, cette somme sera automatiquement déduite du prix final de votre album.`,
  },
  album_gallery_title: {
    id: 'app.album_gallery_title',
    defaultMessage: `Quelques autres photos de l'album Babypoom`,
  },
  success_album_order: {
    id: 'app.success_album_order',
    defaultMessage: `Félicitations votre réservation a bien été reçue ✅`,
  },
  close: {
    id: 'app.close',
    defaultMessage: `Fermer`,
  },
  to_late_infos: {
    id: 'app.to_late_infos',
    defaultMessage: `⚠️ Désolé cet album a déjà été payé.`,
  },
})
