const handleBlogRouter = (req, res) => {
  const { method, path } = req

  // 获取博客列表
  if (method === 'GET') {
    if (path === '/api/blog/list') {
      return {
        msg: '这是获取博客列表的接口',
      }
    }
    if (path === '/api/blog/detail') {
      return {
        msg: '这是获取博客详情的接口',
      }
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
