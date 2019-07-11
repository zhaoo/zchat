export function validUsername(str) {
  return /^[a-zA-Z0-9_-]{5,16}$/.test(str)
}

export function validPassword(str) {
  return /^[a-zA-Z0-9_-]{5,16}$/.test(str)
}

export function validEmail(str) {
  return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(str)
}
