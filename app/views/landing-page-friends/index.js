import React, { Component, useState } from 'react'
import { injectIntl, defineMessages, addLocaleData } from 'react-intl'
import localeDataLoader from '../../../config/locales/data-loader'
import { connect } from 'react-redux'
import { fetchBpoom } from '../app/Actions'
import { deleteFlash } from '../../components/flash/Actions'
import CSSVariableApplicator from '../../components/css-var'
import StripeCheckoutComponent from '../../components/stripe'
import Bubble from '../../components/bubble'
import BpoomImg from '../../components/bpoom-img'
import THEMES from '../app/themes'
import ItemList from '../../components/item-list'
import NotFound from '../not-found'
import i18n from '../../i18n/i18n'
import config from '../../../config'
import t from '../../i18n/i18n'
import imgPath from '../../../lib/img-path'
import loadIntl from '../../../lib/intl-detection'
import Tracking from '../../../lib/tracking'
import { updateLocale } from '../../i18n/hot-intl-provider/HotIntlProviderActions'
import { Column, Row } from 'simple-flexbox'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'
import ReactPlayer from 'react-player/youtube'
import { Carousel } from 'react-responsive-carousel'
import Modal from 'react-modal'
import { flash } from '../../components/flash/Actions'
import './styles.scss'

function setLocaleData(localeData) {
  addLocaleData(new Function(`return ${localeData}`)())
}

function getThemeName(bpoom) {
  let hack = (('undefined' !== typeof window && window.location.hash) || '').substr(1)
  return hack && hack in THEMES ? hack : bpoom.gender ? ('M' === bpoom.gender ? 'boy' : 'girl') : 'default'
}

class LandingPageFriends extends Component {
  constructor(props) {
    super(props)
    this.state = { donor: 'XXX' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    if (this.props.params.donor) {
      this.setState({ donor: this.props.params.donor })
    }
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

  handleChange(event) {
    this.setState({ donor: event.target.value })
  }

  handleSubmit(event) {
    alert('Le nom a été soumis : ' + this.state.donor)
    event.preventDefault()
    flash('danger', 'Le nom a été soumis : ')
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

  successModal(bpoom, params) {
    if (!params.success) {
      return
    }

    return (
      <Modal isOpen={true} contentLabel="Example Modal">
        <Column flexGrow={1}>
          <Row horizontal="center">
            <h1 styleName="stripe-success">
              {t(MSG.success_album_order, {
                babyname: bpoom.baby_name,
              })}
            </h1>
          </Row>
          <Row wrap vertical="center">
            <Column
              flexGrow={1}
              horizontal="center"
              style={{
                backgroundColor: 'white',
                padding: 12,
                color: '#E0E0E0',
                borderRadius: '15px',
                margin: 30,
              }}
            >
              <img styleName="success-mascot" src={imgPath('/mascot/stork-sitting-on-branch.png')}></img>
            </Column>
          </Row>
          <Row horizontal="center">
            <div styleName="button-order">
              <a onClick={() => (window.location = window.location.href.split('?')[0])}>{t(MSG.close)}</a>
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

    Tracking.track('FriendAlbumLandingPage_Visited', { bpoom_id: bpoom.id })

    return (
      <CSSVariableApplicator data-variables={THEMES[this.state.theme]}>
        {this.renderFlash()}
        {this.successModal(bpoom, params)}
        <div styleName={`lp-container ${bpoom.gender == 'M' ? 'boys' : 'girls'}`}>
          {!params.hd && (
            <div>
              <div className="loading-preview" styleName="loading-preview">
                <div />
              </div>
              <Column flexGrow={1}>
                <Row horizontal="center">
                  <h1 styleName="lp-slogan">
                    {t(MSG.lp_slogan, {
                      babyname: bpoom.baby_name,
                    })}
                  </h1>
                </Row>
                <Row wrap vertical="center">
                  <Column
                    flexGrow={1}
                    horizontal="center"
                    style={{
                      backgroundColor: 'white',
                      maxWidth: 650,
                      padding: 12,
                      color: '#E0E0E0',
                      borderRadius: '15px',
                      margin: 30,
                    }}
                  >
                    <div className="player-wrapper">
                      <ReactPlayer
                        url="https://youtu.be/3F8ThIDnM2g"
                        className="react-player"
                        width="100%"
                        height="100%"
                        controls
                        playing
                      />
                    </div>
                  </Column>
                </Row>
                <Row vertical="center">
                  <Column
                    flexGrow={1}
                    horizontal="center"
                    style={{
                      backgroundColor: 'white',
                      maxWidth: 650,
                      padding: 12,
                      color: '#646781',
                      borderRadius: '15px',
                      margin: 30,
                    }}
                  >
                    <span>{t(MSG.album_friend_intro, { babyname: bpoom.baby_name })}</span>
                    <h3 styleName="lp-title">{t(MSG.album_description_title)}</h3>
                    <span styleName="lp-description">
                      {t(MSG.album_description_2, {
                        babyname: bpoom.baby_name,
                        gender_pronoun:
                          'M' === bpoom.gender ? t(MSG.gender_pronoun_male_2) : t(MSG.gender_pronoun_female),
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
                        },
                        {
                          title: t(MSG.album_argument_2_9),
                        },
                      ]}
                    />
                    <h3 styleName="lp-title"> {t(MSG.album_argument_1_title)} </h3>
                    <ItemList
                      items={[
                        {
                          title: t(MSG.album_argument_1_1, { babyname: bpoom.baby_name }),
                        },
                      ]}
                    />
                    <h3 styleName="lp-title"> {t(MSG.album_argument_3_title)} </h3>
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
                      <div>
                        <img src={imgPath('/album/3-albums-pos1-wall1-min.png')} />
                      </div>
                      <div>
                        <img src={imgPath('/album/album-open-min.png')} styleName="sample-img" />
                      </div>
                      <div>
                        <img src={imgPath('/album/theme1/album-theme-stork-gift.png')} styleName="sample-img" />
                      </div>
                      <div>
                        <img src={imgPath('/album/theme1/album-theme-stork-shoes.png')} styleName="sample-img" />
                      </div>
                      <div>
                        <img src={imgPath('/album/theme2/album-cover2-min.png')} styleName="sample-img" />
                      </div>
                      <div>
                        <img src={imgPath('/album/theme3/album-cover3-min.png')} styleName="sample-img" />
                      </div>
                      <div>
                        <img src={imgPath('/album/album-with-mum.jpg')} styleName="sample-img" />
                      </div>
                      <div>
                        <img src={imgPath('/album/3-albums-pos2-wall2-min.png')} styleName="sample-img" />
                      </div>
                    </Carousel>
                    <span>{t(MSG.album_photos_description)}</span>
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
                  <Column
                    flexGrow={1}
                    horizontal="center"
                    style={{
                      backgroundColor: 'white',
                      maxWidth: 650,
                      padding: 12,
                      color: '#646781',
                      borderRadius: '15px',
                      margin: 30,
                    }}
                  >
                    <h3 styleName="lp-title"> {t(MSG.album_friend_custom_name)} </h3>
                    <span>{t(MSG.album_friend_custom_name_form_description)}</span>
                    <span styleName="dedicace">
                      {t(MSG.album_friend_custom_name_dedicace, { donor: this.state.donor })}
                    </span>
                    <img
                      styleName="responsive-album"
                      src={
                        this.state.donor
                          ? imgPath('/album/friend_custom_name_teaser.jpg')
                          : imgPath('/album/friend_custom_name_teaser.jpg')
                      }
                    />
                    <hr styleName="little-separation" />
                    <h3 styleName="lp-title">
                      {' '}
                      {t(MSG.album_friend_custom_name_form_intro, {
                        babyname: bpoom.baby_name,
                        gender_pronoun:
                          'M' === bpoom.gender ? t(MSG.gender_pronoun_male) : t(MSG.gender_pronoun_female),
                      })}{' '}
                    </h3>
                    <div styleName="form-custom">
                      <form onSubmit={this.handleSubmit}>
                        <label>{t(MSG.album_friend_custom_name_form)}</label>
                        <input type="text" value={this.state.donor || ''} onChange={this.handleChange} />
                        <div styleName="button-preview">
                          <button type="submit">{t(MSG.album_friend_custom_name_form_bt)}</button>
                        </div>
                      </form>
                    </div>
                  </Column>
                </Row>

                <Row wrap vertical="center">
                  <Column
                    flexGrow={1}
                    horizontal="center"
                    style={{
                      backgroundColor: 'white',
                      maxWidth: 650,
                      padding: 12,
                      color: '#646781',
                      borderRadius: '15px',
                      margin: 30,
                    }}
                  >
                    <h3 styleName="lp-title"> {t(MSG.album_pricing_title)} </h3>
                    <span>{t(MSG.album_pricing_description)}</span>
                    <div styleName="pricing">
                      <span styleName="pricing-old">
                        <del>{t(MSG.album_pricing_old)}</del>
                      </span>
                      <span styleName="pricing-new">{t(MSG.album_pricing)}</span>
                    </div>
                    <span>{t(MSG.album_pricing_shipping_free)}</span>
                    {false && (
                      <div styleName="lp-coupon-container">
                        <span styleName="lp-coupon-title">{t(MSG.album_pricing_coupon)}</span>
                        <h3 styleName="lp-coupon">{t(MSG.album_coupon_code)}</h3>
                        <span styleName="lp-coupon-title">{t(MSG.album_pricing_coupon_expiration)}</span>
                        <img styleName="lp-coupon-image" src="http://i.countdownmail.com/15kjxv.gif" />
                      </div>
                    )}
                    <div styleName="button-update-order">
                      <div styleName="order first">
                        {!bpoom.album_paid && (
                          <StripeCheckoutComponent
                            label={t(MSG.album_order, {
                              babyname: bpoom.baby_name,
                            })}
                            bpoomId={bpoom.id}
                            paymentType="BOOKING_ALBUM_FRIEND"
                            donor={this.state.donor}
                          />
                        )}
                      </div>
                    </div>
                    {bpoom.album_paid ? (
                      <span>{t(MSG.to_late_infos)}</span>
                    ) : (
                      <>
                        <span>{t(MSG.update_infos_1)}</span>
                        <span>{t(MSG.update_infos_2)}</span>
                        <span styleName="available-offer">{t(MSG.update_infos_3)}</span>
                      </>
                    )}
                  </Column>
                </Row>

                <Row wrap vertical="center">
                  <Column
                    flexGrow={1}
                    style={{
                      backgroundColor: 'white',
                      maxWidth: 650,
                      padding: 5,
                      color: 'white',
                      borderRadius: '15px',
                      margin: 30,
                    }}
                  >
                    <h3 styleName="lp-title"> {t(MSG.album_gift_process_title)} </h3>
                    <div styleName="trip-events">
                      <div styleName={'even'}>
                        <div />
                        <div styleName="img">
                          <BpoomImg imgSrc={imgPath('/album/gift.png')} imgText="1" />
                        </div>
                        <div styleName="bubble">
                          <Bubble speechDir={null}>{t(MSG.album_gift_process_1, { babyname: bpoom.baby_name })}</Bubble>
                        </div>
                      </div>
                      <div styleName={'even'}>
                        <div />
                        <div styleName="img">
                          <BpoomImg imgSrc={imgPath('/album/gift-album-notification.png')} imgText="2" />
                        </div>
                        <div styleName="bubble">
                          <Bubble speechDir={null}>
                            {t(MSG.album_gift_process_2, {
                              babyname: bpoom.baby_name,
                              parent1Name: bpoom.parent_1_name,
                              parent2Name: bpoom.parent_2_name,
                            })}
                          </Bubble>
                        </div>
                      </div>
                      <div styleName={'even'}>
                        <div />
                        <div styleName="img">
                          <BpoomImg imgSrc={imgPath('/album/gift-album-shipping.png')} imgText="3" />
                        </div>
                        <div styleName="bubble">
                          <Bubble speechDir={null}>{t(MSG.album_gift_process_3)}</Bubble>
                        </div>
                      </div>
                    </div>
                    <div styleName="order first">
                      {!bpoom.album_paid && (
                        <StripeCheckoutComponent
                          label={t(MSG.album_order, {
                            babyname: bpoom.baby_name,
                          })}
                          bpoomId={bpoom.id}
                          paymentType="BOOKING_ALBUM_FRIEND"
                          donor={this.state.donor}
                        />
                      )}
                    </div>
                  </Column>
                </Row>

                <Row wrap vertical="center">
                  <Column
                    flexGrow={1}
                    horizontal="center"
                    style={{
                      backgroundColor: 'white',
                      maxWidth: 650,
                      padding: 12,
                      color: '#646781',
                      borderRadius: '15px',
                      margin: 30,
                    }}
                  >
                    <h3 styleName="lp-title"> {t(MSG.babypoom_presentation_title)} </h3>
                    <span>
                      {t(MSG.babypoom_presentation_description, {
                        parent1Name: bpoom.parent_1_name,
                        parent2Name: bpoom.parent_2_name,
                      })}
                    </span>
                    <img styleName="logo-img" src={imgPath('/corporate/logo-and-brand.png')} />
                    <iframe
                      src="https://api.babypoom.com/reviews.html"
                      style={{
                        marginTop: '15px',
                        backgroundColor: 'white',
                        width: '100%',
                        height: '350px',
                        border: '4px solid #b5ceca',
                        mozBorderRadius: '15px',
                        borderRadius: '15px',
                        overflow: 'hidden',
                      }}
                    />
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

export default injectIntl(connect(mapStateToProps, { fetchBpoom, updateLocale, deleteFlash })(LandingPageFriends))

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
    defaultMessage: `Offrez un cadeau inoubliable à {babyname} !`,
  },
  album_friend_intro: {
    id: 'app.album_friend_intro',
    defaultMessage: `Vous cherchez une idée cadeau originale à offrir à {babyname} ? Un cadeau intemporel qui a coup sur fera plaisir à toute la famille. Soyez celle ou celui qui immortalisera pour {babyname} ses plus beaux souvenirs de naissance. Offrez lui son album de naissance 100% personnalisé. `,
  },
  album_description_title: {
    id: 'app.album_description_title',
    defaultMessage: `Pourquoi offrir l'album de naissance ?`,
  },
  album_description: {
    id: 'app.album_description',
    defaultMessage: `Il s’agit tout simplement de l’un des meilleurs moyens d’immortaliser tous ces moments liés à la naissance d'un enfant. En plus des informations de naissance et photos de naissance, l'album Babypoom contient automatiquement tous les messages et photos des proches laissés sur le livre d'or...`,
  },
  album_description_2: {
    id: 'app.album_description_2',
    defaultMessage: `Vous permettrez ainsi à {babyname} de s'émouvoir quand {gender_pronoun} sera plus grand en feuilletant son album Babypoom personnalisé, avec votre dédicace. C'est un souvenir riche en émotions qu'{gender_pronoun} consultera tout au long de sa vie.`,
  },
  order: {
    id: 'app.order',
    defaultMessage: `Commander`,
  },
  album_argument_1_title: {
    id: 'app.album_argument_1_title',
    defaultMessage: `Simplifiez la vie des parents`,
  },
  album_argument_1_1: {
    id: 'app.album_argument_1_1',
    defaultMessage: `Un gain de temps : Fini les albums achetés en magasin que les parents ne remplissent jamais totalement. L'album est prêt en un clic, ce sera donc une démarche facile pour les parents de {babyname}`,
  },
  album_argument_1_2: {
    id: 'app.album_argument_1_2',
    defaultMessage: `Plus de confort : l'album sera directement envoyé à l'adresse des parents (c'est eux qui renseigneront leur adresse)`,
  },
  album_argument_2_title: {
    id: 'app.album_argument_2_title',
    defaultMessage: `Que contient l'album Babypoom ?`,
  },
  album_argument_2_1: {
    id: 'app.album_argument_2_1',
    defaultMessage: `L'ensemble des messages et photos laissés par les proches dans le livre d'or`,
  },
  album_argument_2_2: {
    id: 'app.album_argument_2_2',
    defaultMessage: `Les infos de naissance de bébé : photos, date, heure, etc...`,
  },
  album_argument_2_3: {
    id: 'app.album_argument_2_3',
    defaultMessage: `Les moments forts de la grossesse et les premiers instants de bébé`,
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
  album_argument_2_9: {
    id: 'app.album_argument_2_9',
    defaultMessage: `Votre dédicace au dos du livre`,
  },
  album_argument_3_title: {
    id: 'app.album_argument_3_title',
    defaultMessage: `À quoi ressemble l'album ?`,
  },
  album_argument_3_1: {
    id: 'app.album_argument_3_1',
    defaultMessage: `Design soigné, plein de douceur`,
  },
  album_argument_3_2: {
    id: 'app.album_argument_3_2',
    defaultMessage: `Couverture cartonnée illustrée du prénom de bébé`,
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
    defaultMessage: `En offrant ce souvenir vous encouragez aussi une société française et son équipe qui a fait le choix assumé de ne pas utiliser la pub et la vente de données pour se financer 🙏🏼`,
  },
  album_photos_description: {
    id: 'app.album_photos_description',
    defaultMessage: `Couverture cartonnée personnalisée - 3 thèmes (Cigogne, Zèbre, Hibou) au choix pour les parents - Papier glacé 200g`,
  },
  album_pricing_title: {
    id: 'app.album_pricing_title',
    defaultMessage: `Prix`,
  },
  album_pricing_description: {
    id: 'app.album_pricing_description',
    defaultMessage: `Offrez l'album de naissance personnalisé pour seulement`,
  },
  album_pricing_shipping_free: {
    id: 'app.album_pricing_shipping_free',
    defaultMessage: `Profitez des frais de livraison offerts en ce moment !`,
  },
  album_pricing_old: {
    id: 'app.album_pricing_old',
    defaultMessage: `56€`,
  },
  album_pricing: {
    id: 'app.album_pricing',
    defaultMessage: `49€`,
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
    defaultMessage: `Offrir l'album à {babyname}`,
  },
  album_update_order: {
    id: 'app.album_update_order',
    defaultMessage: `Modifier l'album de {babyname}`,
  },
  update_infos_1: {
    id: 'app.update_infos_1',
    defaultMessage: `⚠️ Attention, si cette idée cadeau vous plaît, soyez le premier ou la première à l'offrir après il sera trop tard.`,
  },
  update_infos_2: {
    id: 'app.update_infos_2',
    defaultMessage: `Pour éviter les doublons, il n'y aura qu'une seule personne qui pourra offrir ce cadeau unique !`,
  },
  update_infos_3: {
    id: 'app.update_infos_3',
    defaultMessage: `✅ album disponible`,
  },
  to_late_infos: {
    id: 'app.to_late_infos',
    defaultMessage: `🔴 Désolé cet album a déjà été offert et n'est plus disponible.`,
  },
  album_gallery_title: {
    id: 'app.album_gallery_title',
    defaultMessage: `Quelques autres photos de l'album Babypoom`,
  },
  success_album_order: {
    id: 'app.success_album_order',
    defaultMessage: `Félicitations votre cadeau a bien été envoyé à {babyname} et ses parents ont bien été prévenus. 🙏🏼`,
  },
  close: {
    id: 'app.close',
    defaultMessage: `Fermer`,
  },
  album_gift_process_title: {
    id: 'app.album_gift_process_title',
    defaultMessage: `Comment ça marche ?`,
  },
  album_gift_process_1: {
    id: 'app.album_gift_process_1',
    defaultMessage: `1- Vous commandez l'album personnalisé de {babyname}`,
  },
  album_gift_process_2: {
    id: 'app.album_gift_process_2',
    defaultMessage: `2- Nous prévenons {parent1Name} et {parent2Name} que vous avez offert son album de naissance à {babyname} et le retirons de la vente pour éviter les doublons.`,
  },
  album_gift_process_3: {
    id: 'app.album_gift_process_3',
    defaultMessage: `3- L'album est automatiquement rempli mais s'ils le souhaitent, les parents peuvent encore le modifier (changer le thème, ajouter des photos, textes...). Après avoir saisi leur adresse postale, ils recevront ensuite votre cadeau dédicacé directement dans leur boite aux lettres`,
  },
  album_friend_custom_name: {
    id: 'app.album_friend_custom_name',
    defaultMessage: `Un cadeau dédicacé`,
  },
  album_friend_custom_name_form_description: {
    id: 'app.album_friend_custom_name_form_description',
    defaultMessage: `Au dos de l'album sera affichée votre dédicace`,
  },
  album_friend_custom_name_dedicace: {
    id: 'app.album_friend_custom_name_dedicace',
    defaultMessage: `"Offert avec amour par {donor}"`,
  },
  album_friend_custom_name_form_intro: {
    id: 'app.album_friend_custom_name_form_intro',
    defaultMessage: `Faites savoir à {babyname} que vous avez pensé à {gender_pronoun}`,
  },
  album_friend_custom_name_form: {
    id: 'app.album_friend_custom_name_form',
    defaultMessage: `Votre nom:`,
  },
  album_friend_custom_name_form_bt: {
    id: 'app.album_friend_custom_name_form_bt',
    defaultMessage: `Dédicacer`,
  },
  gender_pronoun_male: {
    id: 'app.gender_pronoun_male',
    defaultMessage: `lui`,
  },
  gender_pronoun_male_2: {
    id: 'app.gender_pronoun_male_2',
    defaultMessage: `il`,
  },
  gender_pronoun_female: {
    id: 'app.gender_pronoun_female',
    defaultMessage: `elle`,
  },
  babypoom_presentation_title: {
    id: 'app.babypoom_presentation_title',
    defaultMessage: `Qui sommes nous ?`,
  },
  babypoom_presentation_description: {
    id: 'app.babypoom_presentation_description',
    defaultMessage: `Babypoom revisite le concept de faire-part de naissance de façon ludique et originale. Comme {parent1Name} et {parent2Name}, de nombreux parents nous font aujourd'hui confiance pour célébrer l'arrivée de leur bout de chou.`,
  },
})
