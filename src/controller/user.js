const login = (username, password) => {
  if (username === 'admin' && password === '123456') {
    return true
  }
  return false
}

module.exports = {
  login,
}
