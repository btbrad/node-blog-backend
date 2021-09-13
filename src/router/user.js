const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const { method, path } = req

  if (method === 'GET') {
    if (req.path === '/api/user/login-test') {
      if (req.cookie.username) {
        return Promise.resolve(
          new SuccessModel({ username: req.cookie.username })
        )
      }
      return Promise.resolve(new ErrorModel('尚未登录'))
    }
  }
  if (method === 'POST') {
    if (path === '/api/user/login') {
      const { username, password } = req.body
      return login(username, password).then((data) => {
        if (data.username) {
          // 操作cookie
          res.setHeader('Set-Cookie', `username=${data.username}; path=/`)
          return new SuccessModel()
        } else {
          return new ErrorModel('登录失败')
        }
      })
    }
  }
}

module.exports = handleUserRouter
