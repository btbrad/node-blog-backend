const serverHandler = (req, res) => {
  // 设置返回格式JSON
  res.setHeader('Content-Type', 'application/json')

  const resData = {
    name: 'admin',
    site: 'test',
    env: process.env.NODE_ENV,
  }

  res.write(JSON.stringify(resData))
  res.end()
}

module.exports = serverHandler
