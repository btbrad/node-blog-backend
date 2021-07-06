const handleUserRouter = (req, res) => {
  const { method, path } = req

  if (method === 'GET') {
  }
  if (method === 'POST') {
    if (path === '/api/user/login') {
      return {
        msg: '这是登录的接口',
      }
    }
  }
}

module.exports = handleUserRouter
