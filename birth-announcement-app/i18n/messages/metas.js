import { defineMessages } from 'react-intl'

// ******************************************************************************************
// We use defineMessages only to extract them for i18n purposes
// Don't use any intl formatter here. Just very basic string interpolation.
// ******************************************************************************************

export default defineMessages({
  title: {
    id: 'metas.title',
    defaultMessage: '{parent_1_name} et {parent_2_name} souhaitent te présenter bébé !',
  },
  description: {
    id: 'metas.description',
    defaultMessage: 'Hello, il y a un petit bébé qui a très envie de faire ta connaissance, retrouve-le ici !',
  },
})
