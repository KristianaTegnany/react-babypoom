const LOADERS = {
  'fr-FR': () => import('./data/fr-FR'),
  'en-US': () => import('./data/en-US')
}
export default locale => LOADERS[locale]()
