const { exec } = require('../db/mysql')

const login = (username, password) => {
  const sql = `
    select username, password from users where username='${username}' and password='${password}'
  `
  // if (username === 'admin' && password === '123456') {
  //   return true
  // }
  // return false
  return exec(sql).then((res) => {
    return res[0] || {}
  })
}

module.exports = {
  login,
}
