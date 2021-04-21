import { defineMessages } from 'react-intl'

export default defineMessages({
  error_105202: {
    id: 'mangopay.error_105202',
    defaultMessage: 'Erreur sur le numéro de carte. Seules les cartes mastercard, visa et maestro sont acceptées.',
  },
  error_105203: {
    id: 'mangopay.error_105203',
    defaultMessage: "Erreur sur la date d'expiration. Format accepté MM/AA (ex: 09/17 pour septembre 2017).",
  },
  error_105204: {
    id: 'mangopay.error_105204',
    defaultMessage: 'Erreur sur le champs CVV. Vérifiez le numéro au dos de la carte (3 derniers caractères ex: 523).',
  },
  error_default: {
    id: 'mangopay.error_default',
    defaultMessage:
      "Malheureusement votre paiement a échoué. Merci de vérifier vos informations ou d'essayer avec une autre carte.",
  },
})
