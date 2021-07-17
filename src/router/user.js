const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const { method, path } = req

  if (method === 'GET') {
  }
  if (method === 'POST') {
    if (path === '/api/user/login') {
      const { username, password } = req.body
      return login(username, password).then((data) => {
        if (data.username) {
          return new SuccessModel()
        } else {
          return new ErrorModel('登录失败')
        }
      })
    }
  }
}

module.exports = handleUserRouter
