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
import imgPath from "../../../lib/img-path"
import loadIntl from '../../../lib/intl-detection'
import { updateLocale } from '../../i18n/hot-intl-provider/HotIntlProviderActions'
import { Column, Row } from "simple-flexbox";
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
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
    this.state = {donor: "XXX"};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      this.setState({donor: this.props.params.donor})
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
    this.setState({donor: event.target.value});
  }

  handleSubmit(event) {
    alert('Le nom a été soumis : ' + this.state.donor);
    event.preventDefault();
    flash('danger', "Le nom a été soumis : ")
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
                    <span>
                      {t(MSG.album_friend_intro, {babyname: bpoom.baby_name})}
                    </span>
                    <h3 styleName="lp-title">{t(MSG.album_description_title)}</h3>
                    <span>
                      {t(MSG.album_description, {babyname: bpoom.baby_name})}
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
                    <h3 styleName="lp-title"> {t(MSG.album_friend_custom_name)} </h3>
                    <span>
                      {t(MSG.album_friend_custom_name_form_description)}
                    </span>
                    <span styleName="dedicace">
                      {t(MSG.album_friend_custom_name_dedicace, {donor: this.state.donor})}
                    </span>
                    <img styleName="responsive-album" src={this.state.donor ? imgPath("/album/friend_custom_name_teaser.jpg") : imgPath("/album/friend_custom_name_teaser.jpg")} />
                    <hr styleName="little-separation"/>
                    <h3 styleName="lp-title"> {t(MSG.album_friend_custom_name_form_intro)} </h3>
                    <div styleName="form-custom">
                      <form onSubmit={this.handleSubmit}>
                        <label>{t(MSG.album_friend_custom_name_form)}</label>
                        <input type="text" value={this.state.donor || ''} onChange={this.handleChange} />
                        <div styleName="button-preview" >
                          <button type="submit">{t(MSG.album_friend_custom_name_form_bt)}</button>
                        </div>
                      </form>
                    </div>

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
                        babyname: (
                          bpoom.baby_name
                        ),
                      })}
                      bpoomId={bpoom.id}
                      paymentType="BOOKING_ALBUM_FRIEND"
                      donor={this.state.donor} />
                      )}
                      </div>
                    </div>
                    <span>
                      {bpoom.album_paid ? t(MSG.to_late_infos) : t(MSG.update_infos)}
                    </span>

                  </Column>
                </Row>

                <Row wrap vertical="center">
                  <Column flexGrow={1}
                    style={{
                      backgroundColor: "white",
                      maxWidth: 650,
                      padding: 5,
                      color: "white",
                      borderRadius:"15px",
                      margin: 30,
                    }}
                  >
                    <h3 styleName="lp-title"> {t(MSG.album_gift_process_title)} </h3>
                    <div styleName="trip-events">
                      <div styleName={'even'}>
                        <div />
                        <div styleName="img">
                          <BpoomImg
                            imgSrc={imgPath("/album/gift.png")}
                            imgText="1"
                          />
                        </div>
                        <div styleName="bubble">
                          <Bubble speechDir={null}>{t(MSG.album_gift_process_1, {babyname: (
                          bpoom.baby_name
                        ),})}</Bubble>
                        </div>
                      </div>
                      <div styleName={'even'}>
                        <div />
                        <div styleName="img">
                          <BpoomImg
                            imgSrc={imgPath("/album/gift-album-notification.png")}
                            imgText="2"
                          />
                        </div>
                        <div styleName="bubble">
                          <Bubble speechDir={null}>
                            {t(MSG.album_gift_process_2,{
                            babyname: (
                              bpoom.baby_name
                            ),
                            parent1Name: (
                              bpoom.parent_1_name
                            ),
                            parent2Name: (
                              bpoom.parent_2_name
                            ),
                            })}
                        </Bubble>
                        </div>
                      </div>
                      <div styleName={'even'}>
                        <div />
                        <div styleName="img">
                          <BpoomImg
                            imgSrc={imgPath("/album/gift-album-shipping.png")}
                            imgText="3"
                          />
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
                        babyname: (
                          bpoom.baby_name
                        ),
                      })}
                      bpoomId={bpoom.id}
                      paymentType="BOOKING_ALBUM_FRIEND"
                      donor={this.state.donor} />
                      )}
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
    defaultMessage: `Offrez à {babyname} un cadeau inoubliable !`,
  },
  album_friend_intro: {
    id: 'app.album_friend_intro',
    defaultMessage: `Envie de faire un cadeau original à {babyname} ? Un cadeau intemporel qui a coup sur fera plaisir à toute la famille. Offrez lui un magnifique album de naissance 100% personnalisé.`,
  },
  album_description_title: {
    id: 'app.album_description_title',
    defaultMessage: `Un album de naissance, pourquoi faire ?`,
  },
  album_description: {
    id: 'app.album_description',
    defaultMessage: `Il s’agit tout simplement de l’un des meilleurs moyens d’immortaliser tous ces moments liés à la naissance d'un enfant. En plus des informations de naissance et photos de naissance, tous les messages des proches laissés sur le livre d'or seront automatiquement intégrés dans l'album... Offrez ces précieux souvenirs dans un album photo qui sera le trésor de ces moments incroyables en famille. C'est un objet à la valeur affective inégalable qui se transmet de génération en
    génération, un concentré d’amour que bébé {babyname} découvrira quand il sera plus grand.`,
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
    defaultMessage: `Un gain de temps : l'album est prêt en un clic! Fini les albums achetés en magasin que les parents ne remplissent jamais totalement`,
  },
  album_argument_1_2: {
    id: 'app.album_argument_1_2',
    defaultMessage: `Plus de confort : l'album sera directement envoyé à l'adresse des parents (c'est eux qui renseigneront leur adresse)`,
  },
  album_argument_1_3: {
    id: 'app.album_argument_1_3',
    defaultMessage: `Un plaisir accessible : l'album personnalisé est 5 fois moins cher que ceux proposés par les photographes`,
  },
  album_argument_2_title: {
    id: 'app.album_argument_2_title',
    defaultMessage: `Que contient l'album Babypoom ?`,
  },
  album_argument_2_1: {
    id: 'app.album_argument_2_1',
    defaultMessage: `L'ensemble des messages et photos laissé par les proches dans le livre d'or`,
  },
  album_argument_2_2: {
    id: 'app.album_argument_2_2',
    defaultMessage: `Les infos de naissance de bébé : photo, date, heure, etc...`,
  },
  album_argument_2_3: {
    id: 'app.album_argument_2_3',
    defaultMessage: `Les moments forts de la grossesse et les premiers instants de bébé`,
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
  album_argument_2_8: {
    id: 'app.album_argument_2_8',
    defaultMessage: `Votre dédicace en fin de livre`,
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
  album_pricing_title: {
    id: 'app.album_pricing_title',
    defaultMessage: `Tarifs`,
  },
  album_pricing_description: {
    id: 'app.album_pricing_description',
    defaultMessage: `Offrez l'album de naissance personnalisé pour seulement`,
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
  update_infos: {
    id: 'app.update_infos',
    defaultMessage: `⚠️ Attention, pour éviter les doublons, il n'y aura qu'une seule personne qui pourra offrir ce cadeau. Une fois la commande passée, il ne sera plus possible de le commander pour les autres. Les parents seront notifiés de votre cadeau et pourront encore modifier l'album à souhait avant de le recevoir (ajouter de nouvelles photos, modifier des textes...)`,
  },
  to_late_infos: {
    id: 'app.to_late_infos',
    defaultMessage: `⚠️ Désolé cet album a déjà été offert.`,
  },
  album_gallery_title: {
    id: 'app.album_gallery_title',
    defaultMessage: `Quelques autres photos de l'album Babypoom`,
  },
  success_album_order: {
    id: 'app.success_album_order',
    defaultMessage: `Félicitations votre cadeau a bien été envoyé à {babyname} 🙏🏼`,
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
    defaultMessage: `1- Vous passez commande d'un album de naissance personnalisé pour {babyname}`,
  },
  album_gift_process_2: {
    id: 'app.album_gift_process_2',
    defaultMessage: `2- Nous notifions (sms, email et push) les parents ({parent1Name}, {parent2Name}) que vous avez offert l'album de naissance de {babyname}. Nous retirons ensuite l'album de la vente pour éviter les doublons.`,
  },
  album_gift_process_3: {
    id: 'app.album_gift_process_3',
    defaultMessage: `3- L'album est automatiquement remplit mais s'ils le souhaitent, les parents peuvent encore le modifier (ajouter des photos, textes...). Ils renseignent ensuite juste leur adresse postale et recoivent dans leur boite aux lettres votre cadeau dédicacé.`,
  },
  album_friend_custom_name: {
    id: 'app.album_friend_custom_name',
    defaultMessage: `Un cadeau dédicacé`,
  },
  album_friend_custom_name_form_description: {
    id: 'app.album_friend_custom_name_form_description',
    defaultMessage: `Au dos de votre cadeau sera affichée la petite dédicace suivante :`,
  },
  album_friend_custom_name_dedicace: {
    id: 'app.album_friend_custom_name_dedicace',
    defaultMessage: `"Offert avec amour par {donor}"`,
  },
  album_friend_custom_name_form_intro: {
    id: 'app.album_friend_custom_name_form_intro',
    defaultMessage: `Vous pouvez ici modifier le nom qui apparaîtra à la fin de l'album`,
  },
  album_friend_custom_name_form: {
    id: 'app.album_friend_custom_name_form',
    defaultMessage: `Votre nom:`,
  },
  album_friend_custom_name_form_bt: {
    id: 'app.album_friend_custom_name_form_bt',
    defaultMessage: `Dédicacer`,
  },
})
