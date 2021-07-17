const queryString = require('querystring')
const blogRouterHandler = require('./src/router/blog')
const userRouterHandler = require('./src/router/user')

// 用于处理 post data
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', (chunk) => {
      postData += chunk
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}

const serverHandler = (req, res) => {
  const path = req.url.split('?')[0]
  req.path = path

  // 解析query
  req.query = queryString.parse(req.url.split('?')[1])

  // 处理post data
  getPostData(req).then((postData) => {
    req.body = postData

    // 处理blog路由
    const blogResult = blogRouterHandler(req, res)
    blogResult &&
      blogResult.then((data) => {
        handleResult(res, data)
      })

    // 处理user路由
    const userResult = userRouterHandler(req, res)
    userResult &&
      userResult.then((data) => {
        handleResult(res, data)
      })

    if (blogResult || userResult) return
    // 404
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.write('404 Not Found\n')
    res.end()
  })
}

const handleResult = (res, result) => {
  // 设置返回格式JSON
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify(result))
  res.end()
  return
}

module.exports = serverHandler
