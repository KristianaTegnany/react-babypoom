const LOADERS = {
  fr: () => import('./data/fr'),
  en: () => import('./data/en')
}
export default locale => LOADERS[locale]()
