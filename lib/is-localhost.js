export default function isLocalhost() {
  return typeof window !== 'undefined' && ['localhost', 'lvh', 'lvh.me', '127.0.0.1'].includes(location.hostname)
}
