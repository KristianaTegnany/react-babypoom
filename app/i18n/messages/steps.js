import { defineMessages } from 'react-intl';

export default defineMessages({
  step_with_number: {
    id: "step.step_with_number",
    defaultMessage: "{index, number}. {name}" // used to manage other locales with no 0-9 numbers
  },
  welcome: {
    id: "step.welcome",
    defaultMessage: "Bonjour !"
  },
  game: {
    id: "step.game",
    defaultMessage: "Mon prénom"
  },
  arrival: {
    id: "step.arrival",
    defaultMessage: "Mes infos"
  },
  trip: {
    id: "step.trip",
    defaultMessage: "Mon voyage"
  },
  visitorbook: {
    id: 'step.visitorbook',
    defaultMessage: "Mon livre d'or"
  },
  gift: {
    id: "step.gift",
    defaultMessage: "Les cadeaux"
  },
  souvenir: {
    id: "step.souvenir",
    defaultMessage: "Les souvenirs"
  },
  to_game: {
    id: "step.to_game",
    defaultMessage: "Je vous montre ma photo ? Pour ça il va falloir deviner mon joli prénom."
  },
  to_arrival: {
    id: "step.to_arrival",
    defaultMessage: "Je te propose maintenant de voir les détails de mon arrivée..."
  },
  to_trip: {
    id: "step.to_trip",
    defaultMessage: "Tu peux maintenant découvrir en images mon long voyage vers ton monde."
  },
  to_visitorbook: {
    id: "step.to_visitorbook",
    defaultMessage: "Si tu souhaites me laisser un petit message sur mon livre d'or..."
  },
  to_gift: {
    id: "step.to_gift",
    defaultMessage: "Désormais tu peux accéder à l'étape suivante pour voir toutes les possibilités de cadeaux Babypoom."
  },
  to_souvenir: {
    id: "step.to_souvenir",
    defaultMessage: "Avant de nous quitter je voudrais t'offrir un petit souvenir de ma naissance..."
  },
  to_finish: {
    id: "step.to_finish",
    defaultMessage: "TODO"
  }
});
