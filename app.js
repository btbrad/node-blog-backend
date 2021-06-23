const blogRouterHandler = require('./src/blog')
const userRouterHandler = require('./src/user')

const serverHandler = (req, res) => {
  const path = req.url.split('?')[0]
  req.path = path
  // 处理blog路由
  const blogResult = blogRouterHandler(req, res)
  blogResult && handleResult(res, blogResult)

  // 处理user路由
  const userResult = userRouterHandler(req, res)
  userResult && handleResult(res, userResult)

  // 404
  res.writeHead(404, { 'Content-type': 'text/plain' })
  res.write('404 Not Found\n')
  res.end()
}

const handleResult = (res, result) => {
  // 设置返回格式JSON
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify(result))
  res.end()
  return
}

module.exports = serverHandler
