export default classes =>
  Object.keys(classes)
    .filter(x => classes[x])
    .join(' ')
