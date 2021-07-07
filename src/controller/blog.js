const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1624893232548,
      author: 'Zhang San',
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 1624893276419,
      author: 'Li Si',
    },
    {
      id: 3,
      title: '标题C',
      content: '内容C',
      createTime: 1624893287122,
      author: 'Wang Wu',
    },
  ]
}

const getDetail = (id) => {
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1624893232548,
    author: 'Zhang San',
  }
}

const createBlog = (blogData = {}) => {
  return {
    id: 3,
  }
}

module.exports = {
  getList,
  getDetail,
  createBlog,
}
