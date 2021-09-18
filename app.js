const queryString = require('querystring')
const blogRouterHandler = require('./src/router/blog')
const userRouterHandler = require('./src/router/user')
const { set, get } = require('./src/db/redis')

// 获取cookie过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d.toGMTString()
}

// session数据
// const SESSION_DATA = {}

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

  // 解析cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach((item) => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })

  // 解析session
  let needSetCookie = false
  let sId = req.cookie.sid
  if (sId) {
    if (!get(sId)) {
      set(sId, {})
    }
  } else {
    needSetCookie = true
    sId = `${Date.now()}_${Math.random()}`
    set(sId, {})
  }
  req.sid = sId
  req.session = get(sId)

  // 处理post data
  getPostData(req).then((postData) => {
    req.body = postData

    // 处理blog路由
    const blogResult = blogRouterHandler(req, res)
    blogResult &&
      blogResult.then((data) => {
        handleResult(req, res, data, needSetCookie)
      })

    // 处理user路由
    const userResult = userRouterHandler(req, res)
    userResult &&
      userResult.then((data) => {
        handleResult(req, res, data, needSetCookie)
      })

    if (blogResult || userResult) return
    // 404
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.write('404 Not Found\n')
    res.end()
  })
}

const handleResult = (req, res, result, needSetCookie) => {
  // 设置返回格式JSON
  res.setHeader('Content-Type', 'application/json')

  if (needSetCookie) {
    res.setHeader(
      'Set-Cookie',
      `sid=${req.sid}; path=/; httpOnly; expires=${getCookieExpires()}`
    )
  }
  res.write(JSON.stringify(result))
  res.end()
  return
}

module.exports = serverHandler
