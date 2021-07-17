const {
  getList,
  getDetail,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const { method, path } = req

  // 获取博客列表
  if (method === 'GET') {
    if (path === '/api/blog/list') {
      const { author, keyword } = req.query
      // const list = getList(author, keyword)
      // return new SuccessModel(list)
      return getList(author, keyword).then((res) => {
        return new SuccessModel(res)
      })
    }
    if (path === '/api/blog/detail') {
      const { id } = req.query
      return getDetail(id).then((res) => {
        console.log(res)
        return new SuccessModel(res)
      })
    }
  }
  if (method === 'POST') {
    if (path === '/api/blog/new') {
      const blogData = req.body
      // const data = createBlog(blogData)
      // return new SuccessModel(data)
      return createBlog(blogData).then((res) => {
        return new SuccessModel(res)
      })
    }
    if (path === '/api/blog/update') {
      const { id } = req.query
      const blogData = req.body
      return updateBlog(id, blogData).then((data) => {
        if (data) {
          return new SuccessModel(data)
        } else {
          return new ErrorModel('更新博客失败')
        }
      })
    }
    if (path === '/api/blog/del') {
      const { id, author } = req.query
      return deleteBlog(id, author).then((data) => {
        if (data) {
          return new SuccessModel(data)
        } else {
          return new ErrorModel('删除博客失败')
        }
      })
    }
  }
}

module.exports = handleBlogRouter
