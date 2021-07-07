const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const { method, path } = req

  if (method === 'GET') {
  }
  if (method === 'POST') {
    if (path === '/api/user/login') {
      const { username, password } = req.body
      const data = login(username, password)
      if (data) {
        return new SuccessModel(data)
      } else {
        return new ErrorModel('登录失败')
      }
    }
  }
}

module.exports = handleUserRouter
