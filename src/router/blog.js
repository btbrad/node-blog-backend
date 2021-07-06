const { getList, getDetail } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const { method, path } = req

  // 获取博客列表
  if (method === 'GET') {
    if (path === '/api/blog/list') {
      const { author, keyword } = req.query
      const list = getList(author, keyword)
      return new SuccessModel(list)
    }
    if (path === '/api/blog/detail') {
      const { id } = req.query
      const detail = getDetail(id)
      return new SuccessModel(detail)
    }
  }
  if (method === 'POST') {
    if (path === '/api/blog/new') {
      return {
        msg: '只是新建博客的接口',
      }
    }
    if (path === '/api/blog/update') {
      return {
        msg: '只是更新博客的接口',
      }
    }
    if (path === '/api/blog/del') {
      return {
        msg: '只是删除博客的接口',
      }
    }
  }
}

module.exports = handleBlogRouter
